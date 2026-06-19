"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useCurrencyParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") ?? "USD";
  const to = searchParams.get("to") ?? "EUR";
  const amount = searchParams.get("amount") ?? "1000";

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value == null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  }

  return {
    from,
    to,
    amount: Number(amount),
    updateParams,
  };
}
