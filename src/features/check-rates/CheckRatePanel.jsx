import { POPULAR_CURRENCIES } from "@/data/constants";

import ConvertedAmount from "@/features/check-rates/ConvertedAmount";
import InputCard from "@/features/check-rates/InputCard";
import RateSummary from "@/features/check-rates/RateSummary";
import SwapBtn from "@/features/check-rates/SwapBtn";
import CopyLinkButton from "@/features/copy-link/CopyLinkButtons";
import FavoriteToggleBtn from "@/features/favorites/FavoriteToggleBtn";
import LogBtn from "@/features/logs/LogBtn";

function CheckRatePanel({ currencies, from, to, amount, rate }) {
  const convertedAmount = Number((amount * rate).toFixed(2));

  const popularCurrencies = POPULAR_CURRENCIES.map((cur) =>
    currencies.find((currency) => currency.iso_code === cur),
  ).filter(Boolean);

  const otherCurrencies = currencies.filter(
    (currency) => !POPULAR_CURRENCIES.includes(currency.iso_code),
  );

  return (
    <section>
      <h1 className="preset-2 uppercase">check the rate </h1>

      <div className="bg-card-base mt-4 rounded-[20px]">
        <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
          <InputCard
            type="send"
            currencies={currencies}
            popularCurrencies={popularCurrencies}
            otherCurrencies={otherCurrencies}
          />

          <SwapBtn />

          <InputCard
            type="receive"
            currencies={currencies}
            popularCurrencies={popularCurrencies}
            otherCurrencies={otherCurrencies}
          >
            <ConvertedAmount convertedAmount={convertedAmount} />
          </InputCard>
        </div>

        <div className="flex w-full flex-col items-center gap-4 border-t border-dashed p-4 md:flex-row md:justify-between">
          <RateSummary from={from} to={to} rate={rate} />

          <div className="flex items-center gap-4">
            <FavoriteToggleBtn />

            <LogBtn convertedAmount={convertedAmount} />

            <CopyLinkButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckRatePanel;
