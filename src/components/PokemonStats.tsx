import { useGetPokemonStatsQuery } from '@/features/pokemon/pokemonApi';
import { PokemonStatsProps, Stat } from "@/types/pokemon";

const PokemonStats = ({ name, id, position }: PokemonStatsProps) => {
  const { data: stats, isLoading, error } = useGetPokemonStatsQuery(id);
  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Error loading stats</div>;
  return (
    <div
      className="fixed top-0 left-0 z-50 bg-gray-800 text-white text-sm p-4 rounded-md shadow-lg w-60"
      style={{ top: position.y + 10, left: position.x + 10 }}
    >
      <h3 className="text-center font-bold capitalize">{name} Stats</h3>
      <ul>
        {stats?.map((stat: Stat) => (
          <li key={stat.name} className="flex justify-between">
            <span className="capitalize">{stat.name}</span>
            <span className="font-semibold">{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonStats;
