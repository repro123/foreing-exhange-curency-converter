import { serverApi } from "@/lib/serverApi";

export const getLiveMarketRates = async (base, quote, date) => {
  const [res] = await serverApi(
    `/rates?base=${base}&quotes=${quote}&date=${date}`,
    {
      next: { revalidate: 3600 },
    },
  );

  return res;
};
