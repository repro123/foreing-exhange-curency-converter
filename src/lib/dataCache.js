import { readClientCache } from "@/lib/clientCache";

export const cacheKeys = {
  currencies: "currencies:all",
  compareRates: (base) => `compare-rates:${base}`,
  exchangeRate: (from, to) => `exchange-rate:${from}:${to}`,
  history: (fromCurrency, toCurrency, period) =>
    `history-panel:${fromCurrency}:${toCurrency}:${period}`,
  ticker: "live-market-ticker",
};

export function isValidCurrency(currency) {
  return (
    currency &&
    typeof currency.iso_code === "string" &&
    typeof currency.name === "string"
  );
}

export function isValidCurrenciesCache(entry) {
  return (
    entry &&
    typeof entry.savedAt === "string" &&
    Array.isArray(entry.currencies) &&
    entry.currencies.every(isValidCurrency)
  );
}

export function isValidExchangeRateCache(entry) {
  return (
    entry &&
    typeof entry.savedAt === "string" &&
    entry.rateData &&
    typeof entry.rateData.rate === "number"
  );
}

export function isValidCompareRatesCache(entry) {
  return (
    entry &&
    typeof entry.savedAt === "string" &&
    Array.isArray(entry.rates) &&
    entry.rates.every(
      (rate) =>
        typeof rate.base === "string" &&
        typeof rate.quote === "string" &&
        typeof rate.rate === "number" &&
        (!rate.quoteDetails || isValidCurrency(rate.quoteDetails)),
    )
  );
}

export function isValidHistoryCache(entry) {
  return (
    entry &&
    typeof entry.savedAt === "string" &&
    Array.isArray(entry.series) &&
    entry.series.every(
      (point) => typeof point.date === "string" && typeof point.rate === "number",
    )
  );
}

export function isValidTickerCache(entry) {
  return (
    entry &&
    typeof entry.savedAt === "string" &&
    Array.isArray(entry.items) &&
    entry.items.every(
      (item) =>
        typeof item.pair === "string" &&
        typeof item.rate === "number" &&
        typeof item.change === "number",
    )
  );
}

export const readCachedCurrencies = () =>
  readClientCache(cacheKeys.currencies, isValidCurrenciesCache);

export const readCachedExchangeRate = (from, to) =>
  readClientCache(cacheKeys.exchangeRate(from, to), isValidExchangeRateCache);

export const readCachedCompareRates = (base) =>
  readClientCache(cacheKeys.compareRates(base), isValidCompareRatesCache);

export const readCachedHistory = (fromCurrency, toCurrency, period) =>
  readClientCache(
    cacheKeys.history(fromCurrency, toCurrency, period),
    isValidHistoryCache,
  );

export const readCachedTicker = () =>
  readClientCache(cacheKeys.ticker, isValidTickerCache);
