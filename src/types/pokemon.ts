export interface PokemonStat {
  stat: { name: string };
  base_stat: number;
}

export interface TeamStats {
  [key: string]: number;
}

export const initialStats: TeamStats = {
  hp: 0,
  attack: 0,
  defense: 0,
  'special-attack': 0,
  'special-defense': 0,
  speed: 0,
};

export interface PokemonStatsProps {
  name: string;
  id: number;
  position: { x: number; y: number };
}
export type Stat = {
  name: string;
  value: number;
}

export interface PokemonCardProps {
  name: string;
  id: number;
  onHover: (name: string, id: number) => void;
  onLeave: () => void;
  onAdd: (name: string) => void;
}

export interface PokemonStatsProps {
  name: string;
  stats: { name: string; value: number }[];
  position: { x: number; y: number };
}