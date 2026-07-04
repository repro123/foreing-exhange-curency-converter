import { create } from "zustand";
import { persist } from "zustand/middleware";

const sortFavoritesByDate = (favorites = []) =>
  [...favorites].sort((a, b) => {
    const dateA = a?.date ? new Date(a.date).getTime() : 0;
    const dateB = b?.date ? new Date(b.date).getTime() : 0;

    return dateB - dateA;
  });

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

          return {
            favorites: sortFavoritesByDate([...state.favorites, favorite]),
          };
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
        if (state) {
          state.favorites = sortFavoritesByDate(state.favorites);
          state.setHydrated();
        }
      },
    },
  ),
);
