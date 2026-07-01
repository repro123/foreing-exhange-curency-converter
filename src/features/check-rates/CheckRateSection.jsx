import CacheWriter from "@/features/cache/CacheWriter";
import CachedCheckRateSection from "@/features/check-rates/CachedCheckRateSection";
import CheckRatePanel from "@/features/check-rates/CheckRatePanel";
import { getCurrencies } from "@/lib/currencies";
import { cacheKeys } from "@/lib/dataCache";
import { getExchangeRate } from "@/lib/exchange-rate";

async function CheckRateSection({ searchParams }) {
  const from = searchParams.from ?? "USD";
  const to = searchParams.to ?? "EUR";
  const amount = Number(searchParams.amount ?? "1000");
  let currencies;
  let rateData;

  try {
    currencies = await getCurrencies();
    rateData = await getExchangeRate(from, to, 1);
  } catch {
    return <CachedCheckRateSection from={from} to={to} amount={amount} />;
  }

  return (
    <>
      <CacheWriter
        cacheKey={cacheKeys.currencies}
        payload={{ currencies }}
      />
      <CacheWriter
        cacheKey={cacheKeys.exchangeRate(from, to)}
        payload={{ rateData }}
      />
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

export default CheckRateSection;
