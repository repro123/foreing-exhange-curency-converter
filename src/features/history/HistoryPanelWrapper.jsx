import CacheWriter from "@/features/cache/CacheWriter";
import CachedHistoryPanel from "@/features/history/CachedHistoryPanel";
import { HistoryNavigationProvider } from "@/features/history/HistoryNavigationProvider";
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
      <HistoryNavigationProvider>
        <CachedHistoryPanel
          period={period}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </HistoryNavigationProvider>
    );
  }

  return (
    <HistoryNavigationProvider>
      <CacheWriter
        cacheKey={cacheKeys.history(fromCurrency, toCurrency, period)}
        payload={{ series }}
      />
      <HistoryPanel
        series={series}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        period={period}
      />
    </HistoryNavigationProvider>
  );
}

export default HistoryPanelWrapper;
