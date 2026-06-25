"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

import { HISTORY_PERIODS } from "@/data/constants";
import { useRouter, useSearchParams } from "next/navigation";

export default function HistoryPeriodButtons() {
  const urlParams = useSearchParams();
  const router = useRouter();

  const activePeriod = urlParams.get("period") || "1M";

  const handlePeriodChange = (value) => {
    const params = new URLSearchParams(urlParams.toString());

    if (value === "1M") {
      params.delete("period");
    } else {
      params.set("period", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <ButtonGroup aria-label="History period buttons">
        {HISTORY_PERIODS.map((period) => (
          <Button
            variant="secondary"
            key={period.value}
            aria-label={`View history for ${period["aria-label"]}`}
            onClick={() => handlePeriodChange(period.value)}
            className={`${period.value === activePeriod ? "text-foreground bg-card-base" : "text-nav"}`}
          >
            {period.value}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
