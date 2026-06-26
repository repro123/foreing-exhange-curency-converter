"use client";

function HistoryTooltip({
  active,
  payload,
  label,
  fromCurrency,
  toCurrency,
  percentChange,
}) {
  if (!active || !payload?.length) return null;

  const rate = payload[0].value;

  const isPositive = percentChange > 0;
  const isNegative = percentChange < 0;

  const changeClass = isPositive
    ? "text-success"
    : isNegative
      ? "text-destructive"
      : "text-nav";

  const sign = isPositive ? "+" : isNegative ? "-" : "";

  return (
    <div className="min-w-52 rounded-xl border bg-card p-4 shadow-lg">
      <p className="preset-5 text-nav">
        {new Date(label).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="mt-3 space-y-2">
        <p className="preset-3 text-nav">Exchange Rate</p>

        <p className="preset-2">
          1 {fromCurrency} ={" "}
          <span className="text-primary">{Number(rate).toFixed(4)}</span>{" "}
          {toCurrency}
        </p>
      </div>

      <p className="mt-2 border-t pt-2 flex items-center gap-2">
        <span className={`preset-5-medium ${changeClass}`}>
          {sign}
          {Math.abs(percentChange).toFixed(2)}%
        </span>

        <span className="preset-5 text-nav">Change over selected period</span>
      </p>
    </div>
  );
}

export default HistoryTooltip;
