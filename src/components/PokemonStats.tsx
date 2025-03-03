interface PokemonStatsProps {
    name: string;
    stats: { name: string; value: number }[];
    position: { x: number; y: number };
  }
  
  const PokemonStats = ({ name, stats, position }: PokemonStatsProps) => {
    return (
      <div
        className="fixed top-0 left-0 z-50 bg-gray-800 text-white text-sm p-4 rounded-md shadow-lg w-60"
        style={{ top: position.y + 10, left: position.x + 10 }}
      >
        <h3 className="text-center font-bold capitalize">{name} Stats</h3>
        <ul>
          {stats.map((stat) => (
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
  