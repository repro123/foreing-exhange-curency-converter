"use client";

import { LoaderCircle } from "lucide-react";

import { useHistoryNavigation } from "@/features/history/HistoryNavigationProvider";

function HistoryPendingOverlay() {
  const { isPending } = useHistoryNavigation();

  if (!isPending) return null;

  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-background/70 backdrop-blur-[2px]">
      <div
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm"
        role="status"
        aria-live="polite"
      >
        <LoaderCircle className="size-4 animate-spin text-primary" />
        <span>Loading history</span>
      </div>
    </div>
  );
}

export default HistoryPendingOverlay;
