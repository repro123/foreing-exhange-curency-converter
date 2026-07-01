"use client";

import { useEffect } from "react";

import { writeHistoryCache } from "@/features/history/historyCache";

function HistoryCacheWriter({ fromCurrency, toCurrency, period, series }) {
  useEffect(() => {
    writeHistoryCache({ fromCurrency, toCurrency, period, series });
  }, [fromCurrency, period, series, toCurrency]);

  return null;
}

export default HistoryCacheWriter;
