import { PokemonCardProps } from '@/types/pokemon';
import { useState } from 'react';

const PokemonCard = ({ name, id, onHover, onLeave, onAdd }: PokemonCardProps) => {
  const [imageUrl] = useState(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  );

  return (
    <div
      className="cursor-pointer relative bg-gray-100 border rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
      onMouseEnter={() => onHover(name, id)}
      onMouseLeave={onLeave}
    >
      <div className="bg-gray-100 rounded-md p-2 w-24 h-24 flex items-center justify-center">
        <img src={imageUrl} alt={name} className="w-20 h-20 object-contain" />
      </div>
      <p className="capitalize text-lg font-semibold mt-2">{name}</p>
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
