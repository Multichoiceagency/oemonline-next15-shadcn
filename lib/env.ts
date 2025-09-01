/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/env.ts
function toBool(v: any, def = false) {
  if (v === undefined || v === null || v === "") return def
  const s = String(v).trim().toLowerCase()
  return ["1", "true", "yes", "y", "on"].includes(s)
}
function toNum(v: any, def: number) {
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}
/** Parse CSV ("nl,be,lu") OR JSON ('["nl","be","lu"]') → string[] */
function toStrArray(v: any): string[] {
  if (!v) return []
  const s = String(v).trim()
  try {
    const parsed = JSON.parse(s)
    if (Array.isArray(parsed)) return parsed.map((x) => String(x))
  } catch {
    return s.split(",").map((x) => x.trim()).filter(Boolean)
  }
  return []
}
/** Validate target type (P/L/K/T/B/M). Fallback 'P'. */
function toTargetType(v: any): "P" | "L" | "K" | "T" | "B" | "M" {
  const s = String(v || "").trim().toUpperCase()
  return (["P","L","K","T","B","M"] as const).includes(s as any) ? (s as any) : "P"
}

export const ENV = {
  // TecDoc base
  TECDOC_BASE_JSON: process.env.TECDOC_BASE_JSON || "",
  TECDOC_API_KEY: process.env.TECDOC_API_KEY || "",
  TECDOC_PROVIDER_ID: process.env.TECDOC_PROVIDER_ID || "",

  // Locale / geo
  TECDOC_LANG_DEFAULT: process.env.TECDOC_LANG_DEFAULT || "nl",
  TECDOC_LANGS: toStrArray(process.env.TECDOC_LANGS),
  TECDOC_LINKAGE_COUNTRY: process.env.TECDOC_LINKAGE_COUNTRY || "nl",
  TECDOC_COUNTRY_GROUP: process.env.TECDOC_COUNTRY_GROUP || undefined,
  TECDOC_CURRENCY: process.env.TECDOC_CURRENCY || undefined,

  // Articles
  TECDOC_ARTICLE_COUNTRIES: toStrArray(process.env.TECDOC_ARTICLE_COUNTRIES),

  // Target type (personenauto standaard)
  TECDOC_DEFAULT_TARGET: toTargetType(
    process.env.TECDOC_DEFAULT_TARGET ?? process.env.TECDOC_LINKING_TARGET_TYPE
  ),

  // Plate lookup (tenant-specific)
  TECDOC_PLATE_ENABLED: toBool(process.env.TECDOC_PLATE_ENABLED, false),
  TECDOC_PLATE_COUNTRY: process.env.TECDOC_PLATE_COUNTRY || process.env.TECDOC_LINKAGE_COUNTRY || "nl",
  TECDOC_PLATE_KEY_SYSTEM_NUMBER: process.env.TECDOC_PLATE_KEY_SYSTEM_NUMBER || "",

  // Misc
  TECDOC_DOWNLOAD_IMAGES: toBool(process.env.TECDOC_DOWNLOAD_IMAGES, false),
  TECDOC_DEBUG: toBool(process.env.TECDOC_DEBUG, false),
  TECDOC_TIMEOUT_MS: toNum(process.env.TECDOC_TIMEOUT_MS, 15000),

  // Supabase / DB / Secrets (server-only)
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
  DATABASE_EXTRA: process.env.DATABASE_EXTRA || "",
}
