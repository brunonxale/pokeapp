import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  teams: { [teamName: string]: string[] }; // Equipos con los nombres de Pokémon
  selectedTeam: string; // Equipo actualmente seleccionado
  pokemonStats: { [pokemonName: string]: any }; // Estadísticas de los Pokémon
}

const initialState: PokemonState = {
  teams: {},
  selectedTeam: '', // Inicialmente, no hay equipo seleccionado
  pokemonStats: {}, // Almacena las estadísticas de los Pokémon
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // Agregar un Pokémon a un equipo
    addPokemon: (state, action: PayloadAction<{ teamName: string; pokemon: string }>) => {
      const { teamName, pokemon } = action.payload;
      if (!state.teams[teamName]) {
        state.teams[teamName] = [];
      }

      // Verificar si el equipo ya tiene 6 Pokémon
      if (state.teams[teamName].length < 6) {
        state.teams[teamName].push(pokemon);
      } else {
        console.log('Este equipo ya tiene 6 Pokémon.');
      }
    },
    // Remover un Pokémon de un equipo
    removePokemon: (state, action: PayloadAction<{ teamName: string; pokemon: string }>) => {
      const { teamName, pokemon } = action.payload;
      state.teams[teamName] = state.teams[teamName].filter((p) => p !== pokemon);
    },
    // Crear un nuevo equipo
    createTeam: (state, action: PayloadAction<string>) => {
      const teamName = action.payload;
      if (!state.teams[teamName]) {
        state.teams[teamName] = [];
        state.selectedTeam = teamName; // Seleccionamos automáticamente el nuevo equipo
      }
    },
    // Cambiar entre equipos
    selectTeam: (state, action: PayloadAction<string>) => {
      state.selectedTeam = action.payload;
    },
    // Establecer estadísticas de un Pokémon
    setPokemonStats: (state, action: PayloadAction<{ pokemonName: string, stats: any }>) => {
      const { pokemonName, stats } = action.payload;
      state.pokemonStats[pokemonName] = stats;
    },
  },
});

export const { addPokemon, removePokemon, createTeam, selectTeam, setPokemonStats } = pokemonSlice.actions;
export default pokemonSlice.reducer;
