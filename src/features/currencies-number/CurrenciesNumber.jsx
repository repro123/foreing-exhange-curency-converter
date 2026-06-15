import CurrenciesNumberSkeleton from "@/features/currencies-number/CurrenciesNumberSkeleton";
import { getCurrencies } from "@/lib/currencies";

async function CurrenciesNumber() {
  const currencies = await getCurrencies();

  return <p>{currencies.length} currencies</p>;
}

export default CurrenciesNumber;
