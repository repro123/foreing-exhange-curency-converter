import { getExchangeRate } from "@/lib/exchange-rate";

async function ConvertedAmount({ from, to, amount }) {
  const data = await getExchangeRate(from, to, amount);
  return (
    <output
      htmlFor="send-amount"
      tabIndex="0"
      className="preset-1-tablet lg:preset-1 text-primary border-2 border-transparent focus:border-primary focus:rounded-lg focus:outline-0"
    >
      {data.convertedAmount}
    </output>
  );
}

export default ConvertedAmount;
