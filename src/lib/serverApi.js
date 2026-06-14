const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverApi(endpoint, options) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
