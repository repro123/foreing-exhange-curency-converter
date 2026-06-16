function Ticker({ item }) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap self-stretch border-r border-foreground/20 pr-4">
      <span className="text-nav">{item.pair}</span>

      <span className="md:preset-5-medium">{item.rate}</span>

      <span
        className={`${item.change >= 0 ? "text-success" : "text-destructive"} flex gap-2 items-center`}
      >
        <span>{item.change >= 0 ? "▲" : "▼"}</span>
        <span>{Math.abs(item.change)}%</span>
      </span>
    </div>
  );
}

export default Ticker;
