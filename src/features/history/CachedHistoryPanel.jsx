"use client";

import { useCallback, useSyncExternalStore } from "react";

import HistoryPanel from "@/features/history/HistoryPanel";
import HistoryPanelSkeleton from "@/features/history/HistoryPanelSkeleton";
import { readHistoryCache } from "@/features/history/historyCache";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";

function formatSavedAt(savedAt) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(savedAt));
}

function CachedHistoryPanel({ fromCurrency, toCurrency, period }) {
  const getSnapshot = useCallback(
    () => readHistoryCache(fromCurrency, toCurrency, period),
    [fromCurrency, period, toCurrency],
  );

  const cacheEntry = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);

      return () => window.removeEventListener("storage", onStoreChange);
    },
    getSnapshot,
    () => undefined,
  );

  if (cacheEntry === undefined) {
    return <HistoryPanelSkeleton />;
  }

  if (!cacheEntry) {
    return (
      <EmptyPanelState
        heading="History data unavailable"
        paragraph={`We couldn't load live history for ${fromCurrency}/${toCurrency}, and there is no saved ${period} history on this device yet.`}
      />
    );
  }

  return (
    <div>
      <div
        role="status"
        className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-primary"
      >
        <p className="preset-5-medium uppercase">Saved history data</p>
        <p className="preset-5 mt-1 text-foreground">
          Live rates are temporarily unavailable. Showing {fromCurrency}/
          {toCurrency} {period} history saved {formatSavedAt(cacheEntry.savedAt)}.
        </p>
      </div>

      <HistoryPanel
        series={cacheEntry.series}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}

export default CachedHistoryPanel;
