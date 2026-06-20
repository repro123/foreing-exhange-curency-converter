import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import InputCard from "@/features/check-rates/InputCard";
import SwapBtn from "@/features/check-rates/SwapBtn";
import { Star } from "lucide-react";

import { getCurrencies } from "@/lib/currencies";
import { POPULAR_CURRENCIES } from "@/data/constants";
import { Suspense } from "react";
import ConvertedAmount from "@/features/check-rates/ConvertedAmount";
import RateSummary from "@/features/check-rates/RateSummary";

async function CheckRateSection({ searchParams }) {
  const currencies = await getCurrencies();

  const popularCurrencies = POPULAR_CURRENCIES.map((cur) =>
    currencies.find((currency) => currency.iso_code === cur),
  ).filter(Boolean);

  const otherCurrencies = currencies.filter(
    (currency) => !POPULAR_CURRENCIES.includes(currency.iso_code),
  );

  const from = searchParams.from ?? "USD";
  const to = searchParams.to ?? "EUR";
  const amount = Number(searchParams.amount ?? "1000");

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
            {" "}
            <Suspense
              key={`${from}-${to}-${amount}`}
              fallback={
                <p className="preset-1-tablet lg:preset-1 text-primary">...</p>
              }
            >
              <ConvertedAmount from={from} to={to} amount={amount} />
            </Suspense>
          </InputCard>
        </div>

        <div className="p-4 border-t border-dashed flex flex-col items-center gap-4 md:flex-row md:justify-between w-full">
          <Suspense
            key={`${from}-${to}`}
            fallback={<p className="preset-6 md:preset-5">Loading rate...</p>}
          >
            <RateSummary from={from} to={to} />
          </Suspense>

          <div className="flex items-center gap-4">
            <Toggle
              aria-label="Toggle bookmark"
              size="lg"
              variant="outline"
              className="uppercase preset-5-medium"
            >
              <Star className="group-aria-pressed/toggle:fill-black" />
              Favorite
            </Toggle>

            <Button
              size="lg"
              variant="outline"
              className="uppercase preset-5-medium"
            >
              Log conversion
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckRateSection;
