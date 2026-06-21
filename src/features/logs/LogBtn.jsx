"use client";

import { Button } from "@/components/ui/button";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function LogBtn({ convertedAmount }) {
  const [log, setLog, hydrated] = useLocalStorage("logged-conversions", []);
  const { from, to, amount } = useCurrencyParams();

  const id = `${from}-${amount}-${to}-${formattedAmount}`;
  const isLogged = hydrated && log.some((f) => f.id === id);

  function handleLog() {
    if (isLogged) return;
    setLog((prev) => [
      ...prev,
      { from, to, amount, convertedAmount, id, date: new Date().toISOString() },
    ]);
  }

  return (
    <div className={isLogged ? "cursor-not-allowed" : ""}>
      <Button
        size="lg"
        variant="outline"
        className="uppercase preset-5-medium"
        onClick={handleLog}
        disabled={isLogged}
      >
        {isLogged ? "Logged" : "Log conversion"}
      </Button>
    </div>
  );
}

export default LogBtn;
