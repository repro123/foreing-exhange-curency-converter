"use client";

import { Button } from "@/components/ui/button";
import { useCurrencyParams } from "@/hooks/useCurrencyParams";

import { useLogsStore } from "@/store/useLogsStore";

function LogBtn({ convertedAmount }) {
  const logs = useLogsStore((state) => state.logs);
  const addLog = useLogsStore((state) => state.addLog);
  const hydrated = useLogsStore((state) => state.hydrated);
  const { from, to, amount } = useCurrencyParams();

  const id = `${from}-${amount}-${to}-${convertedAmount}`;
  const logged = hydrated && logs.some((log) => log.id === id);

  function handleLog() {
    addLog({
      from,
      to,
      amount,
      convertedAmount,
      id,
      date: new Date().toISOString(),
    });
  }

  return (
    <div className={logged ? "cursor-not-allowed" : ""}>
      <Button
        size="lg"
        variant="outline"
        className="uppercase preset-5-medium"
        onClick={() => handleLog()}
        disabled={logged}
      >
        {logged ? "Logged" : "Log conversion"}
      </Button>
    </div>
  );
}

export default LogBtn;
