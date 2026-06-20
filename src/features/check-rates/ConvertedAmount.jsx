import { getExchangeRate } from "@/lib/exchange-rate";

async function ConvertedAmount({ from, to, amount }) {
  const data = await getExchangeRate(from, to, amount);

  const formatted =
    data.convertedAmount > 1_000_000_000
      ? new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(data.convertedAmount)
      : data.convertedAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

  return (
    <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar has-focus:outline-0 has-focus:border-primary has-focus:rounded-lg border-2 border-transparent">
      <output
        htmlFor="send-amount"
        tabIndex="0"
        className="preset-1-tablet lg:preset-1 text-primary overflow-auto  w-full whitespace-nowrap "
      >
        {formatted}
      </output>
    </div>
  );
}

export default ConvertedAmount;
