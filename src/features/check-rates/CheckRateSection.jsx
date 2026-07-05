import CachedCheckRateSection from "@/features/check-rates/CachedCheckRateSection";
import CheckRatePanelWithCache from "@/features/check-rates/CheckRatePanelWithCache";
import { getCurrencies } from "@/lib/currencies";
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
    <CheckRatePanelWithCache
      currencies={currencies}
      rateData={rateData}
      from={from}
      to={to}
      amount={amount}
    />
  );
}

export default CheckRateSection;
