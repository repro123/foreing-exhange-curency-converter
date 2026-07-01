"use client";

import CachedDataNotice from "@/features/cache/CachedDataNotice";
import CheckRatesSectionSkeleton from "@/features/check-rates/CheckRatesSectionSkeleton";
import CheckRatePanel from "@/features/check-rates/CheckRatePanel";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";
import { useClientCache } from "@/hooks/useClientCache";
import {
  cacheKeys,
  isValidCurrenciesCache,
  isValidExchangeRateCache,
} from "@/lib/dataCache";
import { formatCacheDate } from "@/lib/utils";

function CachedCheckRateSection({ from, to, amount }) {
  const currenciesCache = useClientCache(
    cacheKeys.currencies,
    isValidCurrenciesCache,
  );
  const rateCache = useClientCache(
    cacheKeys.exchangeRate(from, to),
    isValidExchangeRateCache,
  );

  if (currenciesCache === undefined || rateCache === undefined) {
    return <CheckRatesSectionSkeleton />;
  }

  if (!currenciesCache || !rateCache) {
    return (
      <EmptyPanelState
        heading="Rate data unavailable"
        paragraph={`We couldn't load live ${from}/${to} data, and there is no saved conversion data on this device yet.`}
      />
    );
  }

  return (
    <div>
      <CachedDataNotice title="Saved conversion data">
        Live rates are temporarily unavailable. Showing {from}/{to} data saved{" "}
        {formatCacheDate(rateCache.savedAt)}.
      </CachedDataNotice>

      <CheckRatePanel
        currencies={currenciesCache.currencies}
        from={from}
        to={to}
        amount={amount}
        rate={rateCache.rateData.rate}
      />
    </div>
  );
}

export default CachedCheckRateSection;
