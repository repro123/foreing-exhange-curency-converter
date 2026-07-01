"use client";

import CachedDataNotice from "@/features/cache/CachedDataNotice";
import HistoryPanel from "@/features/history/HistoryPanel";
import HistoryPanelSkeleton from "@/features/history/HistoryPanelSkeleton";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";
import { useClientCache } from "@/hooks/useClientCache";
import { cacheKeys, isValidHistoryCache } from "@/lib/dataCache";
import { formatCacheDate } from "@/lib/utils";

function CachedHistoryPanel({ fromCurrency, toCurrency, period }) {
  const cacheEntry = useClientCache(
    cacheKeys.history(fromCurrency, toCurrency, period),
    isValidHistoryCache,
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
      <CachedDataNotice title="Saved history data">
        Live rates are temporarily unavailable. Showing {fromCurrency}/
        {toCurrency} {period} history saved{" "}
        {formatCacheDate(cacheEntry.savedAt)}.
      </CachedDataNotice>

      <HistoryPanel
        series={cacheEntry.series}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </div>
  );
}

export default CachedHistoryPanel;
