"use client";

import { WifiOff } from "lucide-react";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";

function NetworkStatusBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="bg-card-base border-b px-4 py-2 text-foreground"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 text-center">
        <WifiOff className="size-4 text-primary" aria-hidden="true" />
        <p className="preset-5">
          You are offline. Saved data will be shown when live rates cannot load.
        </p>
      </div>
    </div>
  );
}

export default NetworkStatusBanner;
