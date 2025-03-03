import { useGetPokemonDetailsQuery } from '@/features/pokemon/pokemonApi';
import { PokemonCardProps } from '@/types/pokemon';
import { FaFire, FaWater, FaLeaf, FaBolt, FaRegSmile, FaBug, FaHandRock, FaStar, FaGhost, FaSkull, FaBlackberry, FaCertificate, FaDragon, FaBrain } from 'react-icons/fa';
import { SiFampay } from 'react-icons/si';
import { JSX } from 'react';

const typeIcons: Record<string, JSX.Element> = {
  fire: <FaFire className="text-red-500 mr-1" />,
  water: <FaWater className="text-blue-500 mr-1" />,
  grass: <FaLeaf className="text-green-500 mr-1" />,
  electric: <FaBolt className="text-yellow-500 mr-1" />,
  normal: <FaRegSmile className="text-yellow-500 mr-1" />,
  bug: <FaBug className="text-green-500 mr-1" />,
  ground: <FaBlackberry className="text-orange-950 mr-1" />,
  fairy: <FaStar className="text-yellow-500 mr-1" />,
  ghost: <FaGhost className="text-indigo-950 mr-1" />,
  poison: <FaSkull className="text-indigo-600 mr-1" />,
  fighting: <FaHandRock className="text-orange-600 mr-1" />,
  rock: <FaCertificate className="text-orange-600 mr-1" />,
  dragon: <FaDragon className="text-red-600 mr-1" />,
  psychic: <FaBrain className="text-red-200 mr-1" />,
  flying: <SiFampay className="text-blue-500 mr-1" />,
};

const getPokemonImageUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PokemonCard = ({ name, id, onHover, onLeave, onAdd }: PokemonCardProps) => {
  const imageUrl = getPokemonImageUrl(id);
  const { data: pokemonDetails, isLoading, error } = useGetPokemonDetailsQuery(name);

  return (
    <div
      className="cursor-pointer relative bg-gray-100 border rounded-lg shadow-md p-4 flex flex-col justify-between items-center hover:scale-105 transition-transform"
      onMouseEnter={() => onHover(name, id)}
      onMouseLeave={onLeave}
    >
      <div className="bg-gray-100 rounded-md p-2 w-24 h-24 flex items-center justify-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-contain" />
      </div>
      <p className="capitalize text-lg font-semibold mt-2">{name}</p>
      {isLoading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">Error loading details</div>}
      {pokemonDetails && (
        <div className="mt-2 text-sm flex flex-col gap-2">
          <div className="flex flex-col">
            Type:
            {pokemonDetails.types.map((type: any) => (
              <span key={type.type.name} className="flex items-center">
                {typeIcons[type.type.name] || null}
                <span className="capitalize">{type.type.name}</span>
              </span>
            ))}
          </div>
          {pokemonDetails.abilities && (
            <div className="flex flex-col">
              Abilities:
              {pokemonDetails.abilities.map((ability: any) => (
                <span key={ability.ability.name} className="capitalize">{ability.ability.name}</span>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => onAdd(name)}
        className="mt-3 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
      >
        Team up!
      </button>
    </div>
  );
};

export default PokemonCard;
