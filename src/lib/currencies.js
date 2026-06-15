import { serverApi } from "@/lib/serverApi";

export const getCurrencies = async () => {
  const res = await serverApi("/currencies", {
    next: { revalidate: 86400 },
  });

  return res;
};
