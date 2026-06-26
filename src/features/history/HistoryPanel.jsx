import HistoryCards from "@/features/history/HistoryCards";
import HistoryChart from "@/features/history/HistoryChart";
import HistoryPeriodButtons from "@/features/history/HistoryPeriodButtons";
import EmptyPanelState from "@/features/tabs/EmptyPanelState";

function HistoryPanel({ series, fromCurrency, toCurrency }) {
  if (!series.length) {
    return (
      <EmptyPanelState
        heading="No chart data available"
        paragraph={`We couldn't load history for ${fromCurrency}/${toCurrency} right now. This usually clears up in a minute`}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-8 lg:items-center xl:gap-12">
        <HistoryCards series={series} />

        <HistoryPeriodButtons />
      </div>

      <div className="mt-8">
        <HistoryChart
          series={series}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </div>
  );
}

export default HistoryPanel;
