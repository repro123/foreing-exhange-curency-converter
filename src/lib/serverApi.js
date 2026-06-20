const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_PROVIDER = process.env.NEXT_PUBLIC_API_PROVIDER;

export async function serverApi(endpoint, options) {
  const res = await fetch(
    `${BASE_URL}${endpoint}${BASE_PROVIDER === "ALL" ? "" : `?providers=${BASE_PROVIDER}`}`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
