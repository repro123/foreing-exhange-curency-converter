import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLogsStore = create(
  persist(
    (set, get) => ({
      logs: [],
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      addLog: (log) =>
        set((state) => {
          const exists = state.logs.some((l) => l.id === log.id);

          if (exists) return state;

          return { logs: [...state.logs, log] };
        }),

      removeLog: (id) =>
        set((state) => ({ logs: state.logs.filter((l) => l.id !== id) })),

      isLogged: (id) => get().logs.some((l) => l.id === id),
    }),
    {
      name: "logged-conversions",
      partialize: (state) => ({ logs: state.logs }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // calls set() internally, triggers re-render
      },
    },
  ),
);
