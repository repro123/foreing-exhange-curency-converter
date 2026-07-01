"use client";

import Ticker from "@/features/scrolling-ticker/Ticker";
import TickerWrapperSkeleton from "@/features/scrolling-ticker/TickerWrapperSkeleton";
import { useClientCache } from "@/hooks/useClientCache";
import { cacheKeys, isValidTickerCache } from "@/lib/dataCache";

function CachedTickerWrapper() {
  const cacheEntry = useClientCache(cacheKeys.ticker, isValidTickerCache);

  if (cacheEntry === undefined) {
    return <TickerWrapperSkeleton />;
  }

  if (!cacheEntry) {
    return (
      <p className="preset-6 text-nav md:preset-5">
        Live market data unavailable
      </p>
    );
  }

  const tickerItems = [...cacheEntry.items, ...cacheEntry.items];

  return (
    <div className="ticker-wrapper grid h-full w-full place-items-center overflow-hidden">
      <div className="ticker-track preset-6 flex h-full w-max items-stretch gap-4 md:preset-5">
        {tickerItems.map((item, index) => (
          <Ticker key={`${item.pair}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default CachedTickerWrapper;
