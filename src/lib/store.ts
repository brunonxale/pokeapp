// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/features/pokemon/pokemonApi';
import pokemonReducer from '@/features/pokemon/pokemonSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
