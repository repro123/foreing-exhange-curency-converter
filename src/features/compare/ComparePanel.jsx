import CompareRow from "@/features/compare/CompareRow";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";
import { formatNumber } from "@/lib/utils";

function ComparePanel({ rates, from, amount }) {
  if (!rates.length) {
    return (
      <EmptyPanelState
        heading="No comparison available"
        paragraph="Enter an amount in SEND above to see what your money is worth in other currencies"
      />
    );
  }
  return (
    <div className="bg-card-base rounded-2xl p-4">
      <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between">
        <div className="uppercase flex items-center gap-2">
          <p className="preset-4 text-nav">multi-currency</p>
          <p className="preset-3-medium">
            {formatNumber(amount)} from {from}
          </p>
        </div>

        <p className="preset-5 uppercase text-nav">{rates.length} pairs</p>
      </div>

      <ul className="grid gap-4 mt-8">
        {rates.map((rate) => (
          <CompareRow rateItem={rate} key={`${rate.base}-${rate.quote}`} />
        ))}
      </ul>
    </div>
  );
}

export default ComparePanel;
