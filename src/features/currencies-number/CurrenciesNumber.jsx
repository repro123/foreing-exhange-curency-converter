import CacheWriter from "@/features/cache/CacheWriter";
import CachedCurrenciesNumber from "@/features/currencies-number/CachedCurrenciesNumber";
import { getCurrencies } from "@/lib/currencies";
import { cacheKeys } from "@/lib/dataCache";

async function CurrenciesNumber() {
  let currencies;

  try {
    currencies = await getCurrencies();
  } catch {
    return <CachedCurrenciesNumber />;
  }

  return (
    <>
      <CacheWriter
        cacheKey={cacheKeys.currencies}
        payload={{ currencies }}
      />
      <p>{currencies.length} currencies</p>
    </>
  );
}

export default CurrenciesNumber;
