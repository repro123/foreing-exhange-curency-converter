"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import HorizontalIconExchange from "@/components/SVGs/HorizontalIconExchange";
import VerticalExchangeIcon from "@/components/SVGs/VerticalExchangeIcon";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

function SwapBtn() {
  const { from, to, updateParams } = useCurrencyParams();
  const [rotated, setRotated] = useState(false);

  const handleSwapCurrencies = useCallback(() => {
    updateParams({ from: to, to: from });
    setRotated((prev) => !prev);
  }, [from, to, updateParams]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.altKey && e.key === "s") {
        e.preventDefault();
        handleSwapCurrencies();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSwapCurrencies]);

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={handleSwapCurrencies}
      aria-label="Swap currencies (Alt+S)"
      title="Swap currencies (Alt+S)"
      className={`transition-transform duration-500 ${rotated ? "rotate-180" : "rotate-0"}`}
    >
      <HorizontalIconExchange className="hidden md:block" />
      <VerticalExchangeIcon className="md:hidden block" />
    </Button>
  );
}

export default SwapBtn;
