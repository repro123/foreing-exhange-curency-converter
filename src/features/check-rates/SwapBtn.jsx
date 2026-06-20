"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import HorizontalIconExchange from "@/components/SVGs/HorizontalIconExchange";
import VerticalExchangeIcon from "@/components/SVGs/VerticalExchangeIcon";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

function SwapBtn() {
  const { from, to, updateParams } = useCurrencyParams();
  const [rotated, setRotated] = useState(false);

  function handleSwapCurrencies() {
    updateParams({
      from: to,
      to: from,
    });
    setRotated((prev) => !prev);
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handleSwapCurrencies}
      aria-label="Swap currencies"
      className={`transition-transform duration-500 ${rotated ? "rotate-180" : "rotate-0"}`}
    >
      <HorizontalIconExchange className="hidden md:block" />
      <VerticalExchangeIcon className="md:hidden block" />
    </Button>
  );
}

export default SwapBtn;
