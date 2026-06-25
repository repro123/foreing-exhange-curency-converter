import { formatNumber, getCurrencyFlag } from "@/lib/utils";
import Image from "next/image";

import CompareToggleFavoriteBtn from "@/features/compare/CompareToggleFavoriteBtn";

function CompareRow({ rateItem }) {
  return (
    <li className="bg-card border rounded-xl flex items-center gap-4 justify-between p-4">
      <div className="flex items-center gap-2">
        <Image
          src={`/flags/${getCurrencyFlag(rateItem.quote)}.webp`}
          alt={`${rateItem.quoteDetails.name} flag`}
          width={20}
          height={20}
        />

        <div className="flex flex-col gap-1">
          <span aria-hidden="true" className="preset-4">
            {rateItem.quote}
          </span>
          <p className="text-nav preset-5">{rateItem.quoteDetails.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1 text-right">
          <span className="preset-3">
            {formatNumber(rateItem.convertedAmount)}
          </span>
          <span className="preset-6 text-nav">@ {rateItem.rate}</span>
        </div>

        <CompareToggleFavoriteBtn rateItem={rateItem} />
      </div>
    </li>
  );
}

export default CompareRow;
