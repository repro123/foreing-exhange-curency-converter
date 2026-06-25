import HistoryPanel from "@/features/history/HistoryPanel";
import { getTimeSeries } from "@/lib/time-series";
import { getDateRange } from "@/lib/utils";

async function HistoryPanelWrapper({ fromCurrency, toCurrency, period }) {
  const group = period === "5Y" ? "month" : period === "1Y" ? "week" : null;
  const { startDate, endDate } = getDateRange(period);

  const series = await getTimeSeries(
    fromCurrency,
    toCurrency,
    startDate,
    endDate,
    group,
  );

  console.log(startDate, endDate);
  console.log(series);

  return (
    <HistoryPanel
      series={series}
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
    />
  );
}

export default HistoryPanelWrapper;
