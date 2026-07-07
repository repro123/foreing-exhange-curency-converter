"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

import { HISTORY_PERIODS } from "@/data/constants";
import { useHistoryNavigation } from "@/features/history/HistoryNavigationProvider";

export default function HistoryPeriodButtons() {
  const { activePeriod, isPending, selectPeriod } = useHistoryNavigation();

  return (
    <div>
      <ButtonGroup aria-label="History period buttons">
        {HISTORY_PERIODS.map((period) => (
          <Button
            variant="secondary"
            key={period.value}
            aria-label={`View history for ${period["aria-label"]}`}
            aria-pressed={period.value === activePeriod}
            disabled={isPending}
            onClick={() => selectPeriod(period.value)}
            className={`${period.value === activePeriod ? "text-foreground bg-card-base" : "text-nav"}`}
          >
            {period.value}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
