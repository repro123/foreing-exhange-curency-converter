import { serverApi } from "@/lib/serverApi";

export const getExchangeRate = async (from, to, amount) => {
  const res = await serverApi(`/rate/${from}/${to}`, {
    next: { revalidate: 500 },
  });

  const converted = (amount * res.rate).toFixed(2);

  return {
    ...res,
    convertedAmount: Number(converted),
  };
};
