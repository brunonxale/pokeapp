'use client';

import { useGetPokemonListQuery } from '@/features/pokemon/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from '@/features/pokemon/pokemonSlice';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import PokemonCard from './PokemonCard';
import PokemonStats from './PokemonStats';

const PokemonList = () => {
  const { data, error, isLoading } = useGetPokemonListQuery(151);
  const dispatch = useDispatch();
  const selectedTeam = useSelector((state: any) => state.pokemon.selectedTeam);

  const [stats, setStats] = useState<{ [key: string]: { name: string; value: number }[] }>({});
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);

  const fetchStats = useCallback(
    debounce(async (name: string, id: number) => {
      if (stats[name]) return;
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setStats((prev) => ({
          ...prev,
          [name]: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }, 500),
    []
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (name: string, id: number) => {
    setHoveredPokemon(name);
    fetchStats(name, id);
  };

  const handleMouseLeave = () => {
    setHoveredPokemon(null);
  };

  const handleAddPokemon = (name: string) => {
    if (selectedTeam) {
      dispatch(addPokemon({ teamName: selectedTeam, pokemon: name }));
    } else {
      console.log('No team selected');
    }
  };

  if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error loading Pokémon</p>;

  return (
    <div
      className="bg-gray-500 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 p-6 w-full h-[80vh] overflow-y-auto rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
    >
      {data?.results.map((pokemon: any, index: number) => {
        const pokemonId = index + 1;
        return (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            id={pokemonId}
            onHover={handleMouseEnter}
            onLeave={handleMouseLeave}
            onAdd={handleAddPokemon}
          />
        );
      })}

      {hoveredPokemon && stats[hoveredPokemon] && (
        <PokemonStats name={hoveredPokemon} stats={stats[hoveredPokemon]} position={hoverPosition} />
      )}
    </div>
  );
};

export default PokemonList;
