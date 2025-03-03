export interface PokemonStat {
    stat: { name: string };
    base_stat: number;
  }
  
  export type TeamStats = {
    attack: number;
    defense: number;
    speed: number;
    hp: number;
    'special-attack': number;
    'special-defense': number;
  };
  export const initialStats: TeamStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0,
  };
  