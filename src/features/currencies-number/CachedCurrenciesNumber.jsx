"use client";

import CurrenciesNumberSkeleton from "@/features/currencies-number/CurrenciesNumberSkeleton";
import { useClientCache } from "@/hooks/useClientCache";
import { cacheKeys, isValidCurrenciesCache } from "@/lib/dataCache";

function CachedCurrenciesNumber() {
  const cacheEntry = useClientCache(cacheKeys.currencies, isValidCurrenciesCache);

  if (cacheEntry === undefined) {
    return <CurrenciesNumberSkeleton />;
  }

  if (!cacheEntry) {
    return <p>Rates unavailable</p>;
  }

  return <p>{cacheEntry.currencies.length} currencies</p>;
}

export default CachedCurrenciesNumber;
