const TECDOC_BASE = process.env.TECDOC_BASE_JSON!;
const TECDOC_PROVIDER_ID = process.env.TECDOC_PROVIDER_ID!;
const TECDOC_API_KEY = process.env.TECDOC_API_KEY!;
const TECDOC_LANG = process.env.TECDOC_LANG_DEFAULT!;
const TECDOC_COUNTRY = process.env.TECDOC_LINKAGE_COUNTRY!;

export async function tecdocRequest(method: string, params: any) {
  const body = {
    [method]: {
      provider: TECDOC_PROVIDER_ID,
      lang: TECDOC_LANG,
      linkageTargetCountry: TECDOC_COUNTRY,
      articleCountry: TECDOC_COUNTRY,
      ...params,
    },
  };

  console.log("TecDoc Request:", method, params);

  const res = await fetch(TECDOC_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": TECDOC_API_KEY,
    },
    body: JSON.stringify(body),
  });

  console.log("TecDoc Response Status:", res.status);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TecDoc API error: ${res.status} - ${text}`);
  }

  return res.json();
}
