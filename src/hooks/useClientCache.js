"use client";

import { useCallback, useSyncExternalStore } from "react";

import { CLIENT_CACHE_CHANGE_EVENT, readClientCache } from "@/lib/clientCache";

function subscribeToStorage(onStoreChange) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CLIENT_CACHE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CLIENT_CACHE_CHANGE_EVENT, onStoreChange);
  };
}

export function useClientCache(cacheKey, validate) {
  const getSnapshot = useCallback(
    () => readClientCache(cacheKey, validate),
    [cacheKey, validate],
  );

  return useSyncExternalStore(subscribeToStorage, getSnapshot, () => undefined);
}
