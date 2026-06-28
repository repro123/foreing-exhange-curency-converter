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

    const nextUrl = `?${params.toString()}`;
    const currentUrl = `?${searchParams.toString()}`;

    if (nextUrl === currentUrl) return;

    router.push(nextUrl, { scroll: false });
  }

  return {
    from,
    to,
    amount: Number(amount),
    updateParams,
  };
}
