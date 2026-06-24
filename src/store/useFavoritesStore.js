import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      addFavorite: (favorite) =>
        set((state) => {
          const exists = state.favorites.some((l) => l.id === favorite.id);

          if (exists) return state;

          return { favorites: [...state.favorites, favorite] };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((l) => l.id !== id),
        })),

      removeAllFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorite-pairs",
      partialize: (state) => ({ favorites: state.favorites }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // calls set() internally, triggers re-render
      },
    },
  ),
);
