import { serverApi } from "@/lib/serverApi";
import { COMPARE_CURRENCIES } from "@/data/constants";

export const getCompareRates = async (base, amount) => {
  const quotes = COMPARE_CURRENCIES.filter((c) => c !== base).join(",");

  const rates = await serverApi(`/rates?base=${base}&quotes=${quotes}`, {
    next: { revalidate: 3600 },
  });

  console.log(rates);

  return rates.map((r) => ({
    ...r,
    convertedAmount: Number((amount * r.rate).toFixed(2)),
  }));
};
