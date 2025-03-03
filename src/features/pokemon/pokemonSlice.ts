import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  teams: { [teamName: string]: string[] }; 
  selectedTeam: string; 
  pokemonStats: { [pokemonName: string]: any }; 
}

const initialState: PokemonState = {
  teams: {},
  selectedTeam: '', 
  pokemonStats: {}, 
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<{ teamName: string; pokemon: string }>) => {
      const { teamName, pokemon } = action.payload;
      if (!state.teams[teamName]) {
        state.teams[teamName] = [];
      }

      if (state.teams[teamName].length < 6) {
        state.teams[teamName].push(pokemon);
      } else {
        console.log('Este equipo ya tiene 6 Pokémon.');
      }
    },
    removePokemon: (state, action: PayloadAction<{ teamName: string; pokemon: string }>) => {
      const { teamName, pokemon } = action.payload;
      state.teams[teamName] = state.teams[teamName].filter((p) => p !== pokemon);
    },
    
    createTeam: (state, action: PayloadAction<string>) => {
      const teamName = action.payload;
      if (!state.teams[teamName]) {
        state.teams[teamName] = [];
        state.selectedTeam = teamName; // Seleccionamos automáticamente el nuevo equipo
      }
    },

    selectTeam: (state, action: PayloadAction<string>) => {
      state.selectedTeam = action.payload;
    },

    setPokemonStats: (state, action: PayloadAction<{ pokemonName: string, stats: any }>) => {
      const { pokemonName, stats } = action.payload;
      state.pokemonStats[pokemonName] = stats;
    },
  },
});

export const { addPokemon, removePokemon, createTeam, selectTeam, setPokemonStats } = pokemonSlice.actions;
export default pokemonSlice.reducer;
