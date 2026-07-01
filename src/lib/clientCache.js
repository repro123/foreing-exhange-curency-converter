const parseCache = new Map();
export const CLIENT_CACHE_CHANGE_EVENT = "client-cache-change";

export function readClientCache(key, validate) {
  if (typeof window === "undefined") return null;

  let raw;

  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return null;
  }

  if (!raw) {
    parseCache.delete(key);
    return null;
  }

  const cached = parseCache.get(key);

  if (cached && cached.raw === raw) {
    return cached.parsed;
  }

  try {
    const parsed = JSON.parse(raw);
    const valid = validate(parsed);
    const value = valid ? parsed : null;

    parseCache.set(key, { raw, parsed: value });
    return value;
  } catch {
    parseCache.set(key, { raw, parsed: null });
    return null;
  }
}

export function writeClientCache(key, payload) {
  if (typeof window === "undefined") return;

  const cacheEntry = {
    ...payload,
    savedAt: new Date().toISOString(),
  };

  try {
    const raw = JSON.stringify(cacheEntry);

    window.localStorage.setItem(key, raw);
    parseCache.set(key, { raw, parsed: cacheEntry });
    window.dispatchEvent(new CustomEvent(CLIENT_CACHE_CHANGE_EVENT));
  } catch {
    // Storage can fail in private browsing or when the user has blocked it.
  }
}
