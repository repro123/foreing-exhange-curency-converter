import { serverApi } from "@/lib/serverApi";

export const getTimeSeries = async (base, quote, from, to, group = null) => {
  const groupParam = group ? `&group=${group}` : "";
  const res = await serverApi(
    `/rates?base=${base}&quotes=${quote}&from=${from}&to=${to}${groupParam}`,
    { next: { revalidate: 3600 } },
  );
  return res;
};
