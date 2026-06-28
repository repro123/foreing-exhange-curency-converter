import Header from "@/components/layout/header/Header";
import Aside from "@/components/layout/aside/Aside";
import Main from "@/components/layout/main/Main";
import { redirect } from "next/navigation";

function normalizeCurrencyParams(params) {
  const from = Array.isArray(params.from) ? params.from[0] : params.from;
  const to = Array.isArray(params.to) ? params.to[0] : params.to;
  const fromCurrency = from ?? "USD";
  const toCurrency = to ?? "EUR";

  if (fromCurrency.toUpperCase() !== toCurrency.toUpperCase()) return null;

  const nextParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => nextParams.append(key, item));
    } else if (value != null) {
      nextParams.set(key, value);
    }
  });

  nextParams.set("from", fromCurrency.toUpperCase());
  nextParams.set("to", fromCurrency.toUpperCase() === "EUR" ? "USD" : "EUR");

  return `/?${nextParams.toString()}`;
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const normalizedUrl = normalizeCurrencyParams(params);

  if (normalizedUrl) redirect(normalizedUrl);

  return (
    <>
      <Header />
      <Aside />
      <Main searchParams={params} />
    </>
  );
}
