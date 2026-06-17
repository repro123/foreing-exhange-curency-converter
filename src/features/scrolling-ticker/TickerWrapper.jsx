import Ticker from "@/features/scrolling-ticker/Ticker";
import { today, yesterday } from "@/lib/utils";
import { MARKET_PAIRS } from "@/data/constants";
import { getLiveMarketRates } from "@/lib/live-market";

async function TickerWrapper() {
  const [todayRates, yesterdayRates] = await Promise.all([
    Promise.all(
      MARKET_PAIRS.map((pair) =>
        getLiveMarketRates(pair.base, pair.quote, today),
      ),
    ),
    Promise.all(
      MARKET_PAIRS.map((pair) =>
        getLiveMarketRates(pair.base, pair.quote, yesterday),
      ),
    ),
  ]);

  const items = todayRates.map((today) => {
    const yesterday = yesterdayRates.find(
      (y) => y.base === today.base && y.quote === today.quote,
    );

    const change = yesterday
      ? ((today.rate - yesterday.rate) / yesterday.rate) * 100
      : 0;

    return {
      pair: `${today.base}/${today.quote}`,
      rate: today.rate,
      change: parseFloat(change.toFixed(2)),
    };
  });

  const tickerItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full h-full grid place-items-center ticker-wrapper">
      <div className="ticker-track flex items-stretch h-full w-max gap-4  preset-6 md:preset-5">
        {tickerItems.map((item, index) => (
          <Ticker key={`${item.pair}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default TickerWrapper;
