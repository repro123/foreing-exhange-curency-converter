import CacheWriter from "@/features/cache/CacheWriter";
import CachedComparePanel from "@/features/compare/CachedComparePanel";
import { getCompareRates } from "@/lib/compare-rates";
import ComparePanel from "@/features/compare/ComparePanel";
import { COMPARE_CURRENCIES } from "@/data/constants";
import { getSingleCurrency } from "@/lib/currencies";
import { cacheKeys } from "@/lib/dataCache";

async function ComparePanelWrapper({ from, amount }) {
  let rates;
  let currencyDetails;

  try {
    [rates, currencyDetails] = await Promise.all([
      getCompareRates(from, amount),
      Promise.all(COMPARE_CURRENCIES.map((cur) => getSingleCurrency(cur))),
    ]);
  } catch {
    return <CachedComparePanel from={from} amount={amount} />;
  }

  const updatedRates = rates.map((rate) => {
    const details = currencyDetails.find((cur) => cur.iso_code === rate.quote);
    return { ...rate, quoteDetails: details ?? null };
  });

  const cachedRates = updatedRates.map(({ convertedAmount, ...rate }) => rate);

  return (
    <>
      <CacheWriter
        cacheKey={cacheKeys.compareRates(from)}
        payload={{ rates: cachedRates }}
      />
      <ComparePanel rates={updatedRates} from={from} amount={amount} />
    </>
  );
}

export default ComparePanelWrapper;
