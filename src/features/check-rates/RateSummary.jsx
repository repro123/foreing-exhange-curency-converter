import { getExchangeRate } from "@/lib/exchange-rate";

async function RateSummary({ from, to }) {
  const data = await getExchangeRate(from, to, 1);

  return (
    <p className="preset-6 md:preset-5">
      1 {from} = {data.rate} {to}
    </p>
  );
}

export default RateSummary;
