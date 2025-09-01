/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/tecdoc.ts
import { ENV } from "./env"
import { logDebug } from "./logger"

// ---------- Endpoint catalog (type-safe ops) ----------
export const TecdocOps = {
  // Vehicle tree
  manufacturers: "getManufacturers",
  modelSeries: "getModelSeries",
  types: "getTypes",

  // Vehicle details / linkages
  vehiclesByIds2: "getVehiclesByIds2",
  linkageTargets: "getLinkageTargets",
  linkageTargetsByCarIds: "getLinkageTargetsByCarIds",
  vehicleByVinV3: "getVehicleByVIN",
  vehiclesByVin2: "getVehiclesByVIN2",

  // Plate
  vehiclesByPlate: "getVehiclesByKeyNumberPlates",

  // Brands
  amBrands: "getAmBrands",

  // Categories (Generic Articles)
  genericArticles: "getGenericArticles",
  genericArticlesByLinkingTarget: "getGenericArticlesByLinkingTarget",

  // Assigned articles
  assignedByLinkingTarget: "getAssignedArticlesByLinkingTarget",
  assignedByLinkingTarget2: "getAssignedArticlesByLinkingTarget2",
  assignedByLinkingTarget3: "getAssignedArticlesByLinkingTarget3",
  assignedByIds6: "getAssignedArticlesByIds6",

  // Article search / details / media
  articleSearchByTerm: "articleSearchByTerm",
  articleDirectSearchV3: "articleDirectSearchV3",
  articlesByVehicleV3: "getArticlesByVehicle",
  articleById: "getArticles",
  articleMediaByIds: "getArticleMediaByIds",
  articleMediaByIds6: "getArticleMediaByIds6",
} as const
export type TecdocOp = typeof TecdocOps[keyof typeof TecdocOps]
export type TecdocResource = string

// ---------- Query helpers ----------
export function qp(req: Request, key: string, def?: string) {
  const url = new URL(req.url)
  const val = url.searchParams.get(key)
  return val == null ? def : val
}
export function qpn(req: Request, key: string, def?: number) {
  const v = qp(req, key)
  if (v == null) return def
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}
/** wrap array → { array: [...] } */
export function toArrayParam<T = any>(a?: T[] | null) {
  if (!a || a.length === 0) return undefined
  return { array: a }
}
/** unwrap arrays from various TecDoc shapes */
export function extractArray<T = any>(data: any): T[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.array)) return data.array
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.data?.array)) return data.data.array
  return []
}
function clean<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue
    if (typeof v === "string" && v.trim() === "") continue
    out[k] = v
  }
  return out as T
}
function withApiKey(url: string, apiKey?: string) {
  if (!apiKey) return url
  const hasQuery = url.includes("?")
  return url + (hasQuery ? "&" : "?") + "api_key=" + encodeURIComponent(apiKey)
}
export const TECDOC_ENDPOINT =
  ENV.TECDOC_BASE_JSON ||
  "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint"

// ---------- Defaults ----------
export const VehicleTargetType = {
  Passenger: "P",
  Transporter: "L",
  Truck: "K",
  Tractor: "T",
  Bike: "B",
  Engine: "M",
} as const
export type VehicleTarget = typeof VehicleTargetType[keyof typeof VehicleTargetType]

const COMMON_DEFAULTS = clean({
  lang: ENV.TECDOC_LANG_DEFAULT,
  country: ENV.TECDOC_LINKAGE_COUNTRY,
  countryCode: ENV.TECDOC_LINKAGE_COUNTRY,
  countryGroup: ENV.TECDOC_COUNTRY_GROUP,
  currency: ENV.TECDOC_CURRENCY,
  articleCountry: (ENV.TECDOC_ARTICLE_COUNTRIES && ENV.TECDOC_ARTICLE_COUNTRIES[0])
    ? ENV.TECDOC_ARTICLE_COUNTRIES[0]
    : ENV.TECDOC_LINKAGE_COUNTRY,
})
const DEFAULT_PAGE = 1
const DEFAULT_PER_PAGE = 40
const MAX_PER_PAGE = 500

function withPageDefaults(payload: Record<string, any>) {
  const page = Number(payload.page ?? DEFAULT_PAGE)
  const perPageRaw = Number(payload.perPage ?? DEFAULT_PER_PAGE)
  const perPage = Math.max(1, Math.min(MAX_PER_PAGE, perPageRaw || DEFAULT_PER_PAGE))
  return { ...payload, page, perPage }
}
function withTargetType(payload: Record<string, any>) {
  const linkingTargetType: VehicleTarget =
    (payload.linkingTargetType as VehicleTarget) ||
    (ENV.TECDOC_DEFAULT_TARGET as VehicleTarget) ||
    VehicleTargetType.Passenger
  return { ...payload, linkingTargetType }
}
function withTenantExtras(resource: string, payload: Record<string, any>) {
  if (resource === TecdocOps.vehiclesByPlate) {
    if (ENV.TECDOC_PLATE_KEY_SYSTEM_NUMBER) {
      payload.keySystemNumber = ENV.TECDOC_PLATE_KEY_SYSTEM_NUMBER
    }
    payload.country = payload.country || ENV.TECDOC_PLATE_COUNTRY || ENV.TECDOC_LINKAGE_COUNTRY
  }
  return payload
}

// ---------- Main call ----------
export async function tecdocCall<T = any>(
  resource: TecdocResource,
  payload: Record<string, any>
): Promise<T> {
  let fields: Record<string, any> = clean({
    provider: ENV.TECDOC_PROVIDER_ID,
    ...COMMON_DEFAULTS,
    ...payload,
  })

  fields = withPageDefaults(fields)
  const needsTargetType =
    resource === TecdocOps.assignedByLinkingTarget ||
    resource === TecdocOps.assignedByLinkingTarget2 ||
    resource === TecdocOps.assignedByLinkingTarget3 ||
    resource === TecdocOps.genericArticlesByLinkingTarget ||
    resource === TecdocOps.linkageTargets ||
    resource === TecdocOps.linkageTargetsByCarIds
  if (needsTargetType) fields = withTargetType(fields)
  fields = withTenantExtras(resource, fields)
  fields = clean(fields)

  const bodyObj: Record<string, any> = { [resource]: fields }
  const url = withApiKey(TECDOC_ENDPOINT, ENV.TECDOC_API_KEY)

  const controller = new AbortController()
  setTimeout(() => controller.abort(), Math.max(3000, ENV.TECDOC_TIMEOUT_MS || 15000))

    logDebug("REQUEST", { resource, url, body: bodyObj })
    // You may want to add the actual fetch/request logic here, e.g.:
    // const response = await fetch(url, { ... });
    // return await response.json();

    // Temporary mock return to satisfy return type
    return {} as T
  }
