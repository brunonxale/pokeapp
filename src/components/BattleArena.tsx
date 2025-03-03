
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useState, useEffect, useCallback } from 'react';

// Tipos
interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

interface TeamStats {
  [key: string]: number;
}

const initialStats: TeamStats = {
  hp: 0,
  attack: 0,
  defense: 0,
  'special-attack': 0,
  'special-defense': 0,
  speed: 0,
};

const BattleArena = () => {
  const teams = useSelector((state: RootState) => state.pokemon.teams) as { [teamName: string]: string[] };

  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [battleState, setBattleState] = useState({
    result: '',
    isLoading: false,
    stats1: initialStats,
    stats2: initialStats,
  });

  // Función para calcular estadísticas de un equipo
  const calculateTeamStats = useCallback(async (teamName: string): Promise<TeamStats> => {
    if (!teamName || !teams[teamName]) return { ...initialStats };

    const totalStats: TeamStats = { ...initialStats };

    await Promise.all(
      teams[teamName].map(async (pokemonName) => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
          if (!res.ok) throw new Error(`Failed to fetch ${pokemonName}`);

          const data = await res.json();
          data.stats.forEach((stat: PokemonStat) => {
            if (totalStats[stat.stat.name] !== undefined) {
              totalStats[stat.stat.name] += stat.base_stat;
            }
          });
        } catch (error) {
          console.error(error);
        }
      })
    );

    return totalStats;
  }, [teams]);

  // Función para iniciar la batalla
  const determineWinner = async () => {
    if (!team1 || !team2 || team1 === team2) {
      setBattleState((prev) => ({ ...prev, result: 'Please select two different teams.' }));
      return;
    }

    setBattleState({ result: 'Battle in progress...', isLoading: true, stats1: initialStats, stats2: initialStats });

    const [stats1, stats2] = await Promise.all([calculateTeamStats(team1), calculateTeamStats(team2)]);

    const sumStats = (stats: TeamStats) => Object.values(stats).reduce((acc, curr) => acc + curr, 0);
    const total1 = sumStats(stats1);
    const total2 = sumStats(stats2);

    const result =
      total1 > total2 ? `${team1} wins! 🏆` :
      total1 < total2 ? `${team2} wins! 🏆` :
      "It's a tie! 🤝";

    setBattleState({ result, isLoading: false, stats1, stats2 });
  };

  return (
    <div className="w-full mx-auto p-6 bg-blue-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Battle Arena</h2>

      {/* Seleccionar equipos */}
      <div className="mb-4">
        <label className="text-lg block">Select Team 1:</label>
        <select
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="px-4 py-2 w-full rounded-md shadow-md text-black"
        >
          <option value="">Select Team</option>
          {Object.keys(teams).map((teamName) => (
            <option key={teamName} value={teamName} disabled={teamName === team2}>
              {teamName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-lg block">Select Team 2:</label>
        <select
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="px-4 py-2 w-full rounded-md shadow-md text-black"
        >
          <option value="">Select Team</option>
          {Object.keys(teams).map((teamName) => (
            <option key={teamName} value={teamName} disabled={teamName === team1}>
              {teamName}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para iniciar la batalla */}
      <div className="mb-4">
        <button
          onClick={determineWinner}
          disabled={!team1 || !team2 || team1 === team2 || battleState.isLoading}
          className={`px-4 py-2 w-full rounded-md transition-colors ${
            !team1 || !team2 || team1 === team2 || battleState.isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {battleState.isLoading ? 'Battling...' : 'Start Battle'}
        </button>
      </div>

      {/* Mostrar resultado de la batalla */}
      {battleState.result && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
          <h3 className="text-xl font-bold">{battleState.result}</h3>
        </div>
      )}

      {/* Mostrar estadísticas de los equipos */}
      {team1 && team2 && !battleState.isLoading && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold text-center mb-4">Total Team Stats</h3>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{team1} Stats</span>
            <span>{Object.values(battleState.stats1).reduce((acc, curr) => acc + curr, 0)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{team2} Stats</span>
            <span>{Object.values(battleState.stats2).reduce((acc, curr) => acc + curr, 0)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
