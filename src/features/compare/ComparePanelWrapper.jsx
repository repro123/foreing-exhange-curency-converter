import { getCompareRates } from "@/lib/compare-rates";
import ComparePanel from "@/features/compare/ComparePanel";
import { COMPARE_CURRENCIES } from "@/data/constants";
import { getSingleCurrency } from "@/lib/currencies";

async function ComparePanelWrapper({ from, amount }) {
  const [rates, currencyDetails] = await Promise.all([
    getCompareRates(from, amount),
    Promise.all(COMPARE_CURRENCIES.map((cur) => getSingleCurrency(cur))),
  ]);

  const updatedRates = rates.map((rate) => {
    const details = currencyDetails.find((cur) => cur.iso_code === rate.quote);
    return { ...rate, quoteDetails: details ?? null };
  });

  return <ComparePanel rates={updatedRates} from={from} amount={amount} />;
}

export default ComparePanelWrapper;
