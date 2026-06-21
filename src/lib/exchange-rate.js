import { serverApi } from "@/lib/serverApi";

export const getExchangeRate = async (from, to, amount) => {
  const res = await serverApi(`/rate/${from}/${to}`, {
    next: { revalidate: 500 },
  });

  return {
    ...res,
  };
};
