import { getCurrencies } from "@/lib/currencies";
import { getExchangeRate } from "@/lib/exchange-rate";

import { POPULAR_CURRENCIES } from "@/data/constants";

import InputCard from "@/features/check-rates/InputCard";
import SwapBtn from "@/features/check-rates/SwapBtn";
import ConvertedAmount from "@/features/check-rates/ConvertedAmount";
import RateSummary from "@/features/check-rates/RateSummary";
import FavoriteToggleBtn from "@/features/favorites/FavoriteToggleBtn";
import LogBtn from "@/features/logs/LogBtn";

async function CheckRateSection({ searchParams }) {
  const from = searchParams.from ?? "USD";
  const to = searchParams.to ?? "EUR";
  const amount = Number(searchParams.amount ?? "1000");

  const currencies = await getCurrencies();

  const { rate } = await getExchangeRate(from, to, 1);
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
        <div className="p-4 flex flex-col gap-4 md:flex-row items-center">
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

        <div className="p-4 border-t border-dashed flex flex-col items-center gap-4 md:flex-row md:justify-between w-full">
          <RateSummary from={from} to={to} rate={rate} />

          <div className="flex items-center gap-4">
            <FavoriteToggleBtn />

            <LogBtn convertedAmount={convertedAmount} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckRateSection;
