"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_PERIOD = "1M";

const HistoryNavigationContext = createContext(null);

export function HistoryNavigationProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlPeriod = searchParams.get("period") || DEFAULT_PERIOD;
  const [optimisticPeriod, setOptimisticPeriod] = useOptimistic(
    urlPeriod,
    (_, nextPeriod) => nextPeriod,
  );

  const selectPeriod = useCallback(
    (nextPeriod) => {
      if (isPending || nextPeriod === optimisticPeriod) return;

      startTransition(() => {
        setOptimisticPeriod(nextPeriod);

        const nextParams = new URLSearchParams(searchParams.toString());

        if (nextPeriod === DEFAULT_PERIOD) {
          nextParams.delete("period");
        } else {
          nextParams.set("period", nextPeriod);
        }

        const queryString = nextParams.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
          scroll: false,
        });
      });
    },
    [
      isPending,
      optimisticPeriod,
      pathname,
      router,
      searchParams,
      setOptimisticPeriod,
      startTransition,
    ],
  );

  const value = useMemo(
    () => ({
      activePeriod: optimisticPeriod,
      isPending,
      selectPeriod,
    }),
    [isPending, optimisticPeriod, selectPeriod],
  );

  return (
    <HistoryNavigationContext.Provider value={value}>
      {children}
    </HistoryNavigationContext.Provider>
  );
}

export function useHistoryNavigation() {
  const context = useContext(HistoryNavigationContext);

  if (!context) {
    throw new Error(
      "useHistoryNavigation must be used inside HistoryNavigationProvider",
    );
  }

  return context;
}
