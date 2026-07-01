"use client";

import CachedDataNotice from "@/features/cache/CachedDataNotice";
import ComparePanel from "@/features/compare/ComparePanel";
import ComparePanelSkeleton from "@/features/compare/ComparePanelSkeleton";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";
import { useClientCache } from "@/hooks/useClientCache";
import { cacheKeys, isValidCompareRatesCache } from "@/lib/dataCache";
import { formatCacheDate } from "@/lib/utils";

function CachedComparePanel({ from, amount }) {
  const cacheEntry = useClientCache(
    cacheKeys.compareRates(from),
    isValidCompareRatesCache,
  );

  if (cacheEntry === undefined) {
    return <ComparePanelSkeleton />;
  }

  if (!cacheEntry) {
    return (
      <EmptyPanelState
        heading="Comparison unavailable"
        paragraph={`We couldn't load live comparison rates for ${from}, and there is no saved comparison data on this device yet.`}
      />
    );
  }

  const rates = cacheEntry.rates.map((rate) => ({
    ...rate,
    convertedAmount: Number((amount * rate.rate).toFixed(2)),
  }));

  return (
    <div>
      <CachedDataNotice title="Saved comparison data">
        Live comparison rates are temporarily unavailable. Showing {from} rates
        saved {formatCacheDate(cacheEntry.savedAt)}.
      </CachedDataNotice>

      <ComparePanel rates={rates} from={from} amount={amount} />
    </div>
  );
}

export default CachedComparePanel;
