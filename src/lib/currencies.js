import { serverApi } from "@/lib/serverApi";

export const getCurrencies = async () => {
  const res = await serverApi("/currencies", {
    next: { revalidate: 86400 },
  });

  return res;
};

export const getSingleCurrency = async (cur) => {
  const res = await serverApi(`/currency/${cur}`, {
    next: { revalidate: 86400 },
  });

  return res;
};
