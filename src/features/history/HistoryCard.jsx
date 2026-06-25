function HistoryCard({ label, value, className = "" }) {
  return (
    <div className="bg-card-base rounded-2xl p-4 px-6 flex flex-col gap-8">
      <span className="preset-4 text-nav uppercase">{label}</span>
      <span className={`preset-2 ${className}`}>{value}</span>
    </div>
  );
}

export default HistoryCard;
