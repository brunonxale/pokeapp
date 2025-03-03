// features/pokemon/pokemonApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    
    getPokemonList: builder.query({
      query: (limit = 20) => `pokemon?limit=${limit}`,
    }),
    
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    
    getPokemonStats: builder.query({
      query: (id) => `pokemon/${id}`,
      transformResponse: (response: any) => {
        return response.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        }));
      },
    }),
  }),
});

// Exporta los hooks generados por Redux Toolkit Query
export const { useGetPokemonListQuery, useGetPokemonDetailsQuery, useGetPokemonStatsQuery } = pokemonApi;
