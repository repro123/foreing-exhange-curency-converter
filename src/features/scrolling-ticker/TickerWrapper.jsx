import CacheWriter from "@/features/cache/CacheWriter";
import CachedTickerWrapper from "@/features/scrolling-ticker/CachedTickerWrapper";
import Ticker from "@/features/scrolling-ticker/Ticker";
import { today, yesterday } from "@/lib/utils";
import { MARKET_PAIRS } from "@/data/constants";
import { cacheKeys } from "@/lib/dataCache";
import { getLiveMarketRates } from "@/lib/live-market";

async function TickerWrapper() {
  let todayRates;
  let yesterdayRates;

  try {
    [todayRates, yesterdayRates] = await Promise.all([
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
  } catch {
    return <CachedTickerWrapper />;
  }

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
    <>
      <CacheWriter cacheKey={cacheKeys.ticker} payload={{ items }} />
      <div className="ticker-wrapper grid h-full w-full place-items-center overflow-hidden">
        <div className="ticker-track preset-6 flex h-full w-max items-stretch gap-4 md:preset-5">
          {tickerItems.map((item, index) => (
            <Ticker key={`${item.pair}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TickerWrapper;
