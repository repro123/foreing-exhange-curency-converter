import Ticker from "@/features/scrolling-ticker/Ticker";

const items = [
  { pair: "1USD/JPY", rate: 154.3, change: 2 },
  { pair: "2USD/JPY", rate: 154.3, change: 0.2 },
  { pair: "3USD/JPY", rate: 1454.3, change: 0 },
  { pair: "4USD/JPY", rate: 14.3, change: 0.5 },
  { pair: "5USD/JPY", rate: 154.3, change: 2 },
  { pair: "6USD/JPY", rate: 154.3, change: 2 },
  { pair: "7USD/JPY", rate: 154.3, change: 5 },
  { pair: "8USD/JPY", rate: 154.3, change: 2 },
  { pair: "9USD/JPY", rate: 154.3, change: 2 },
  { pair: "0USD/JPY", rate: 154.3, change: 2 },
];

function TickerWrapper() {
  const tickerItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full h-full grid place-items-center ticker-wrapper">
      <div className="ticker-track flex items-stretch h-full w-max gap-4  preset-6 md:preset-5">
        {tickerItems.map((item, index) => (
          <Ticker key={`${item.pair}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default TickerWrapper;
