function RateSummary({ from, to, rate }) {
  return (
    <p className="preset-6 md:preset-5">
      1 {from} = {rate.toFixed(4)} {to}
    </p>
  );
}

export default RateSummary;
