import CachedHistoryPanel from "@/features/history/CachedHistoryPanel";
import HistoryCacheWriter from "@/features/history/HistoryCacheWriter";
import HistoryPanel from "@/features/history/HistoryPanel";
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
      <HistoryCacheWriter
        series={series}
        period={period}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
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
