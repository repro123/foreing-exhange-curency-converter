// const HISTORY_CACHE_PREFIX = "history-panel";

// export function getHistoryCacheKey(fromCurrency, toCurrency, period) {
//   return `${HISTORY_CACHE_PREFIX}:${fromCurrency}:${toCurrency}:${period}`;
// }

// export function readHistoryCache(fromCurrency, toCurrency, period) {
//   if (typeof window === "undefined") return null;

//   try {
//     const cached = window.localStorage.getItem(
//       getHistoryCacheKey(fromCurrency, toCurrency, period),
//     );

//     if (!cached) return null;

//     const parsed = JSON.parse(cached);
//     const hasValidSeries =
//       Array.isArray(parsed.series) &&
//       parsed.series.every(
//         (point) => typeof point.date === "string" && typeof point.rate === "number",
//       );

//     if (!hasValidSeries || typeof parsed.savedAt !== "string") {
//       return null;
//     }

//     return parsed;
//   } catch {
//     return null;
//   }
// }

// export function writeHistoryCache({ fromCurrency, toCurrency, period, series }) {
//   if (typeof window === "undefined" || !series.length) return;

//   const cacheEntry = {
//     fromCurrency,
//     toCurrency,
//     period,
//     series,
//     savedAt: new Date().toISOString(),
//   };

//   try {
//     window.localStorage.setItem(
//       getHistoryCacheKey(fromCurrency, toCurrency, period),
//       JSON.stringify(cacheEntry),
//     );
//   } catch {
//     // Storage can fail in private browsing or when the user has blocked it.
//   }
// }

const HISTORY_CACHE_PREFIX = "history-panel";

// key -> { raw, parsed }
const parseCache = new Map();

export function getHistoryCacheKey(fromCurrency, toCurrency, period) {
  return `${HISTORY_CACHE_PREFIX}:${fromCurrency}:${toCurrency}:${period}`;
}

export function readHistoryCache(fromCurrency, toCurrency, period) {
  if (typeof window === "undefined") return null;

  const key = getHistoryCacheKey(fromCurrency, toCurrency, period);

  let raw;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return null;
  }

  if (!raw) {
    parseCache.delete(key);
    return null;
  }

  const cached = parseCache.get(key);
  if (cached && cached.raw === raw) {
    return cached.parsed; // same reference, no re-render
  }

  try {
    const parsed = JSON.parse(raw);
    const hasValidSeries =
      Array.isArray(parsed.series) &&
      parsed.series.every(
        (point) =>
          typeof point.date === "string" && typeof point.rate === "number",
      );

    if (!hasValidSeries || typeof parsed.savedAt !== "string") {
      parseCache.set(key, { raw, parsed: null });
      return null;
    }

    parseCache.set(key, { raw, parsed });
    return parsed;
  } catch {
    parseCache.set(key, { raw, parsed: null });
    return null;
  }
}

export function writeHistoryCache({
  fromCurrency,
  toCurrency,
  period,
  series,
}) {
  if (typeof window === "undefined" || !series.length) return;

  const cacheEntry = {
    fromCurrency,
    toCurrency,
    period,
    series,
    savedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      getHistoryCacheKey(fromCurrency, toCurrency, period),
      JSON.stringify(cacheEntry),
    );
  } catch {
    // Storage can fail in private browsing or when the user has blocked it.
  }
}
