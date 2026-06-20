"use client";

import CurrencySelect from "@/features/check-rates/CurrencySelect";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";
import { useEffect, useState } from "react";

function InputCard({
  type,
  currencies,
  popularCurrencies,
  otherCurrencies,
  children,
}) {
  console.log("render");
  const { amount, updateParams } = useCurrencyParams();
  const [inputVal, setInputVal] = useState(amount);

  const isSend = type === "send";

  useEffect(() => {
    if (!isSend) return;

    const timeout = setTimeout(() => {
      console.log(type, inputVal);
      updateParams({
        amount: inputVal,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputVal, isSend, type]);

  return (
    <div className="bg-card rounded-2xl p-4 w-full border min-w-0">
      <p className="uppercase preset-4 text-card-heading">{type}</p>

      <div className="flex items-center gap-4 justify-between mt-8 min-w-0">
        {isSend ? (
          <>
            <label className="sr-only" htmlFor={`${type}-amount`}>
              Amount
            </label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              id={`${type}-amount`}
              className="preset-1-tablet lg:preset-1 w-full border border-transparent hover:border-b-foreground hover:border-dashed focus:border-primary focus:rounded-lg outline outline-transparent focus:outline-primary"
            />
          </>
        ) : (
          children
        )}

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
