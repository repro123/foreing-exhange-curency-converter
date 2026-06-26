"use client";

import { useState, useEffect } from "react";

function formatDateTime() {
  const now = new Date();
  const timeZoneAbbr = now
    .toLocaleTimeString("en-US", { timeZoneName: "short" })
    .split(" ")
    .pop();

  return (
    now
      .toLocaleDateString("en-US", { month: "short", day: "numeric" })
      .toUpperCase() +
    " · " +
    now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }) +
    " " +
    timeZoneAbbr
  );
}

function CurrentDateTime() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLabel(formatDateTime());
  }, []);

  return <span suppressHydrationWarning>{label}</span>;
}

export default CurrentDateTime;
