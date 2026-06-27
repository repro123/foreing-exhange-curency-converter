"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { formatDateTime } from "@/lib/utils";

function CurrentDateTime() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(formatDateTime());
  }, []);

  if (!label) {
    return (
      <span className="inline-block h-3 w-24 rounded bg-muted overflow-hidden">
        <Skeleton className="w-fill h-full" />
      </span>
    );
  }

  return <span suppressHydrationWarning>{label}</span>;
}

export default CurrentDateTime;
