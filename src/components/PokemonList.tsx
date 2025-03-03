'use client';

import { useGetPokemonListQuery } from '@/features/pokemon/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { addPokemon } from '@/features/pokemon/pokemonSlice';
import { useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import PokemonStats from '@/components/PokemonStats';

const PokemonList = () => {
  const { data, error, isLoading } = useGetPokemonListQuery(151);
  const dispatch = useDispatch();
  const selectedTeam = useSelector((state: any) => state.pokemon.selectedTeam);

  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);
  const [hoveredPokemonId, setHoveredPokemonId] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (name: string, id: number) => {
    setHoveredPokemon(name);
    setHoveredPokemonId(id);
  };

  const handleMouseLeave = () => {
    setHoveredPokemon(null);
    setHoveredPokemonId(null);
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
      className="bg-gray-500 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-4 p-6 w-full h-[80vh] overflow-y-auto rounded-lg shadow-lg"
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
      {hoveredPokemon && hoveredPokemonId !== null && (
        <PokemonStats
          name={hoveredPokemon}
          id={hoveredPokemonId}
          stats={data?.results.find((pokemon: any) => pokemon.name === hoveredPokemon)?.stats || []}
          position={hoverPosition}
        />
      )}
    </div>
  );
};

export default PokemonList;
