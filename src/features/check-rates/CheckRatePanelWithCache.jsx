"use client";

import CachedDataNotice from "@/features/cache/CachedDataNotice";
import CacheWriter from "@/features/cache/CacheWriter";
import CheckRatePanel from "@/features/check-rates/CheckRatePanel";
import { useClientCache } from "@/hooks/useClientCache";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import {
  cacheKeys,
  isValidCurrenciesCache,
  isValidExchangeRateCache,
} from "@/lib/dataCache";
import { formatCacheDate } from "@/lib/utils";

function CheckRatePanelWithCache({ currencies, rateData, from, to, amount }) {
  const isOnline = useNetworkStatus();
  const currenciesCache = useClientCache(
    cacheKeys.currencies,
    isValidCurrenciesCache,
  );
  const rateCache = useClientCache(
    cacheKeys.exchangeRate(from, to),
    isValidExchangeRateCache,
  );

  if (!isOnline && currenciesCache && rateCache) {
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

  return (
    <>
      {isOnline ? (
        <>
          <CacheWriter
            cacheKey={cacheKeys.currencies}
            payload={{ currencies }}
          />
          <CacheWriter
            cacheKey={cacheKeys.exchangeRate(from, to)}
            payload={{ rateData }}
          />
        </>
      ) : null}

      <CheckRatePanel
        currencies={currencies}
        from={from}
        to={to}
        amount={amount}
        rate={rateData.rate}
      />
    </>
  );
}

export default CheckRatePanelWithCache;
