
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removePokemon, createTeam, selectTeam } from '@/features/pokemon/pokemonSlice';
import { useState, useEffect, useCallback, useMemo } from 'react';

const TeamList = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.pokemon.teams) as { [key: string]: string[] };
  const selectedTeam = useSelector((state: RootState) => state.pokemon.selectedTeam);
  const [newTeamName, setNewTeamName] = useState('');
  const [pokemonData, setPokemonData] = useState<{ [key: string]: { image: string; stats: { [key: string]: number } } }>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!selectedTeam || !teams[selectedTeam]) return;

    const fetchPokemonData = async () => {
      setError(null);
      const newPokemonData: { [key: string]: { image: string; stats: { [key: string]: number } } } = {};

      try {
        await Promise.all(
          teams[selectedTeam].map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            if (!res.ok) throw new Error(`Failed to fetch ${name}`);
            const data = await res.json();

            newPokemonData[name] = {
              image: data.sprites.other['official-artwork'].front_default,
              stats: Object.fromEntries(
                data.stats.map((stat: { stat: { name: string }; base_stat: number }) => [stat.stat.name, stat.base_stat])
              ),
            };
          })
        );

        setPokemonData(newPokemonData);
      } catch {
        setError('Failed to load Pokémon data');
      }
    };

    fetchPokemonData();
  }, [teams, selectedTeam]);

  const totalStats = useMemo(() => {
    if (!selectedTeam || !teams[selectedTeam]) return null;

    return teams[selectedTeam].reduce(
      (acc, name) => {
        const stats = pokemonData[name]?.stats || {};
        Object.entries(stats).forEach(([stat, value]) => {
          acc[stat] = (acc[stat] || 0) + value;
        });
        return acc;
      },
      {} as { [key: string]: number }
    );
  }, [teams, selectedTeam, pokemonData]);

  const handleCreateTeam = useCallback(() => {
    if (newTeamName.trim()) {
      dispatch(createTeam(newTeamName.trim()));
      setNewTeamName('');
    }
  }, [newTeamName, dispatch]);

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto p-6 bg-red-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">My Pokémon Teams</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter team name"
          className="flex-1 px-4 py-2 rounded-md shadow-md text-black"
        />
        <button
          onClick={handleCreateTeam}
          className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Create Team
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg">Select Team:</h3>
        <select
          value={selectedTeam || ''}
          onChange={(e) => dispatch(selectTeam(e.target.value))}
          className="w-full px-4 py-2 rounded-md shadow-md text-black"
        >
          <option value="" disabled>Select a team</option>
          {Object.keys(teams).map((teamName) => (
            <option key={teamName} value={teamName}>
              {teamName}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {selectedTeam && (!teams[selectedTeam] || teams[selectedTeam].length === 0) && (
        <p className="text-center">No Pokémon selected</p>
      )}

      <div className="flex flex-col gap-4">
        {selectedTeam &&
          teams[selectedTeam]?.map((pokemonName) => (
            <div
              key={pokemonName}
              className="flex items-center bg-red-700 px-4 py-2 rounded-md shadow-md"
            >
              <img
                src={pokemonData[pokemonName]?.image || '/placeholder.png'}
                alt={pokemonName}
                className="w-16 h-16 object-contain mr-4"
                loading="lazy"
              />
              <p className="capitalize text-lg font-semibold flex-1">{pokemonName}</p>
              <button
                onClick={() => dispatch(removePokemon({ teamName: selectedTeam, pokemon: pokemonName }))}
                className="bg-black px-3 py-1 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
      </div>

      {selectedTeam && totalStats && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-4">Total Team Stats</h3>
          <div>
            {Object.entries(totalStats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between">
                <span className="capitalize">{stat.replace('-', ' ')}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;
