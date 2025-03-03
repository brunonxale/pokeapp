// features/pokemon/pokemonApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    // Obtiene una lista de Pokémon con un límite configurable
    getPokemonList: builder.query({
      query: (limit = 20) => `pokemon?limit=${limit}`,
      // Opcionalmente podrías agregar un transformResponse para manejar los datos antes de ser almacenados
      // transformResponse: (response) => response.results,
    }),
    // Obtiene los detalles de un Pokémon específico por su nombre
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

// Exporta los hooks generados por Redux Toolkit Query
export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
