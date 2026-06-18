import CurrencySelect from "@/features/check-rates/CurrencySelect";

function InputCard({ type, currencies, popularCurrencies, otherCurrencies }) {
  return (
    <div className="bg-card rounded-2xl p-4 w-full border">
      <p className="uppercase preset-4 text-card-heading">{type}</p>

      <div className="flex items-center gap-4 justify-between mt-8">
        <label className="sr-only" htmlFor={`${type}-amount`}>
          Amount
        </label>
        <input
          type="number"
          name="send"
          id={`${type}-amount`}
          className={`preset-1-tablet lg:preset-1 ${type === "receive" ? "text-primary" : ""} w-full border border-transparent hover:border-b-foreground hover:border-dashed focus:border-primary focus:rounded-lg outline outline-transparent focus:outline-primary`}
        />

        <CurrencySelect
          currencies={currencies}
          popularCurrencies={popularCurrencies}
          otherCurrencies={otherCurrencies}
          paramKey={type === "send" ? "from" : "to"}
          defaultValue={type === "send" ? "USD" : "EUR"}
        />
      </div>
    </div>
  );
}

export default InputCard;
