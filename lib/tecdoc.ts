/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/tecdoc.ts
import { ENV } from "./env"
import { logDebug } from "./logger"

export function qp(req: Request, key: string, fallback?: string): string | undefined {
  const v = new URL(req.url).searchParams.get(key)
  return (v ?? fallback) ?? undefined
}
export function qpn(req: Request, key: string, fallback?: number): number | undefined {
  const v = new URL(req.url).searchParams.get(key)
  if (v == null) return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

/** Interne helper om paging robuust te maken. */
function normalizePaging(params: Record<string, any>) {
  const p: any = { ...params }
  if (typeof p.page === "object" && p.page) {
    const n = Number(p.page.number ?? p.page.page ?? 1)
    const s = Number(p.page.size ?? p.page.perPage ?? p.perPage ?? 25)
    p.page = Number.isFinite(n) ? n : 1
    p.perPage = Number.isFinite(s) ? s : 25
  }
  if (!Number.isFinite(p.page)) p.page = 1
  if (!Number.isFinite(p.perPage)) delete p.perPage
  return p
}

export async function tecdocCall<T=any>(resource: string, params: Record<string, any>) {
  const base = ENV.TECDOC_BASE_JSON
  const provider = ENV.TECDOC_PROVIDER_ID
  const lang = params.lang ?? ENV.TECDOC_LANG_DEFAULT
  const country = params.country ?? ENV.TECDOC_LINKAGE_COUNTRY

  let bodyParams: Record<string, any> = {
    provider,
    lang,
    country,
    countryCode: country,     // sommige methodes verwachten expliciet countryCode
    articleCountry: ENV.TECDOC_ARTICLE_COUNTRIES[0],
    ...params,
  }
  bodyParams = normalizePaging(bodyParams)

  const payload = { [resource]: bodyParams }

  const res = await fetch(base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": ENV.TECDOC_API_KEY,
    },
    body: JSON.stringify(payload),
    keepalive: true,
  })

  const text = await res.text().catch(() => "")
  logDebug("[TecDoc] REQUEST", { resource, url: base, body: payload })

  if (!res.ok) {
    throw new Error(`TecDoc ${resource} ${res.status}: ${text}`)
  }

  let json: any = {}
  try { json = text ? JSON.parse(text) : {} } catch {
    throw new Error(`TecDoc ${resource}: invalid JSON response`)
  }

  if (json?.status && json.status >= 300) {
    // TecDoc kan fout in body signalleren met 200 OK
    logDebug("[TecDoc] RESPONSE", json)
  } else {
    logDebug("[TecDoc] RESPONSE", { resource, status: json?.status ?? 200 })
  }

  return json as T
}
