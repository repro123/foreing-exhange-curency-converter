import HistoryCard from "@/features/history/HistoryCard";

function HistoryCards({ series }) {
  const openRate = series[0].rate;
  const lastRate = series[series.length - 1].rate;
  const change = lastRate - openRate;
  const percentChange = (change / openRate) * 100;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

  const changeDisplay =
    change > 0
      ? { sign: "+", color: "text-success" }
      : change < 0
        ? { sign: "-", color: "text-destructive" }
        : { sign: "", color: "text-nav" };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <HistoryCard label="open" value={formatter.format(openRate)} />

      <HistoryCard label="last" value={formatter.format(lastRate)} />

      <HistoryCard
        label="change"
        className={changeDisplay.color}
        value={`${changeDisplay.sign}${Math.abs(change).toFixed(2)}%`}
      />

      <HistoryCard
        label="% change"
        className={changeDisplay.color}
        value={`${changeDisplay.sign}${Math.abs(percentChange).toFixed(2)}%`}
      />
    </div>
  );
}

export default HistoryCards;
