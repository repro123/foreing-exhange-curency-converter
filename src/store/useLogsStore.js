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

      removeAllLog: () => set({ logs: [] }),

      isLogged: (id) => get().logs.some((l) => l.id === id),

      exportAsCSV: () => {
        const logs = get().logs;
        if (!logs.length) return;

        const headers = ["Date", "From", "To", "Amount", "Converted Amount"];
        const rows = logs.map((log) => [
          new Date(log.date).toLocaleDateString(),
          log.from,
          log.to,
          log.amount,
          log.convertedAmount,
        ]);

        const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `conversion-logs-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      },
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
