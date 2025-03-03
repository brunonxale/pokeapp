import { useGetPokemonDetailsQuery } from '@/features/pokemon/pokemonApi';
import { PokemonCardProps } from '@/types/pokemon';
import { useState } from 'react';
import { FaFire, 
  FaWater, 
  FaLeaf, 
  FaBolt , 
  FaRegSmile, 
  FaBug, FaHandRock, 
  FaStar, 
  FaGhost, 
  FaSkull, 
  FaBlackberry, 
  FaCertificate, 
  FaDragon, 
  FaBrain} from 'react-icons/fa';
import { SiFampay } from 'react-icons/si';

const getPokemonImageUrl = (id: number) => 
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const PokemonCard = ({ name, id, onHover, onLeave, onAdd }: PokemonCardProps) => {
  const [imageUrl] = useState(getPokemonImageUrl(id));
  const { data: pokemonDetails, isLoading, error } = useGetPokemonDetailsQuery(name);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details</div>;
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return <FaFire className="text-red-500 mr-1" />;
      case 'water':
        return <FaWater className="text-blue-500 mr-1" />;
      case 'grass':
        return <FaLeaf className="text-green-500 mr-1" />;
      case 'electric':
        return <FaBolt className="text-yellow-500 mr-1" />;
      case 'normal':
        return <FaRegSmile className="text-yellow-500 mr-1" />;
      case 'bug':
        return <FaBug className="text-green-500 mr-1" />;
      case 'ground':
        return <FaBlackberry className="text-orange-950 mr-1" />;
      case 'fairy':
        return <FaStar className="text-yellow-500 mr-1" />;
      case 'ghost':
        return <FaGhost className="text-indigo-950 mr-1" />;
      case 'poison':
        return <FaSkull className="text-indigo-600 mr-1" />;
      case 'fighting':
        return <FaHandRock className="text-orange-600 mr-1" />;
      case 'rock':
        return <FaCertificate className="text-orange-600 mr-1" />;
      case 'dragon':
        return <FaDragon className="text-red-600 mr-1" />;
      case 'psychic':
        return <FaBrain className="text-red-200 mr-1" />;
      case 'flying':
        return <SiFampay className="text-blue-500 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="
      cursor-pointer 
      relative bg-gray-100 
      border 
      rounded-lg 
      shadow-md p-4 
      flex 
      flex-col
      justify-between 
      items-center 
      hover:scale-105 
      transition-transform"
      onMouseEnter={() => onHover(name, id)}
      onMouseLeave={onLeave}
    >
      <div className="bg-gray-100 rounded-md p-2 w-24 h-24 flex items-center justify-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-contain" />
      </div>
      <p className="capitalize text-lg font-semibold mt-2">{name}</p>
      {pokemonDetails && (
        <div className="mt-2 text-sm flex flex-col gap-2">
          <div className="flex flex-col">
            Type:
            {pokemonDetails.types.map((type: any) => (
              <span key={type.type.name} className="flex items-center">
                {getTypeIcon(type.type.name)}
                <span className="capitalize">{type.type.name}</span>
              </span>
            ))}
          </div>
          {pokemonDetails.abilities && (
            <div className="flex flex-col">
              Abilities:
              {pokemonDetails.abilities.map((ability: any) => (
                <span key={ability.ability.name} className="capitalize">
                  {ability.ability.name}
                </span>
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
