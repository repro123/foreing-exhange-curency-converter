import { getCurrencies } from "@/lib/currencies";

async function CurrenciesNumber() {
  const currencies = await getCurrencies();

  return <span>{currencies.length} currencies</span>;
}

export default CurrenciesNumber;
