import CacheWriter from "@/features/cache/CacheWriter";
import CachedHistoryPanel from "@/features/history/CachedHistoryPanel";
import HistoryPanel from "@/features/history/HistoryPanel";
import { cacheKeys } from "@/lib/dataCache";
import { getTimeSeries } from "@/lib/time-series";
import { getDateRange } from "@/lib/utils";

async function HistoryPanelWrapper({ fromCurrency, toCurrency, period }) {
  const group = period === "5Y" ? "month" : period === "1Y" ? "week" : null;
  const { startDate, endDate } = getDateRange(period);
  let series;

  try {
    series = await getTimeSeries(
      fromCurrency,
      toCurrency,
      startDate,
      endDate,
      group,
    );
  } catch {
    return (
      <CachedHistoryPanel
        period={period}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    );
  }

  return (
    <>
      <CacheWriter
        cacheKey={cacheKeys.history(fromCurrency, toCurrency, period)}
        payload={{ series }}
      />
      <HistoryPanel
        series={series}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
      />
    </>
  );
}

export default HistoryPanelWrapper;
