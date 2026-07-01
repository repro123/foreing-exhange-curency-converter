"use client";

import { useEffect } from "react";

import { writeClientCache } from "@/lib/clientCache";

function CacheWriter({ cacheKey, payload }) {
  useEffect(() => {
    writeClientCache(cacheKey, payload);
  }, [cacheKey, payload]);

  return null;
}

export default CacheWriter;
