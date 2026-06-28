import { formatNumber } from "@/lib/utils";

function ConvertedAmount({ convertedAmount }) {
  const formatted = formatNumber(convertedAmount);

  return (
    <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar has-focus:outline-0 has-focus:border-primary has-focus:rounded-lg border-2 border-transparent">
      <output
        aria-live="polite"
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
