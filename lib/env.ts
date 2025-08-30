// lib/env.ts
// Helpers ---------------------------------------------------
function req(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback
  if (v === undefined) throw new Error(`Missing env var: ${name}`)
  return v
}

function optBool(name: string, def = false) {
  const v = process.env[name]
  if (v === undefined) return def
  return ["1", "true", "yes", "on"].includes(String(v).toLowerCase())
}

function parseCsv(name: string, def: string[] = []) {
  const v = process.env[name]
  if (!v) return def
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
}

// Normalizer voor linkingTargetType (TecDoc Pegasus 3.0)
// Geldige waarden (volgens onboarding guide):
// P = Vehicle Type (Passenger + Motorcycle + LCV)
// V = Passenger Car
// L = LCV
// B = Motorcycle
// O = CV Type (Commercial + Tractor)
// C = Commercial Vehicle
// T = Tractor
// M = Engine
// A = Axle
// K = CV Body Type
// H = HMD Vehicle
function normalizeLinkingTargetType(
  input?: string
): "P" | "V" | "L" | "B" | "O" | "C" | "T" | "M" | "A" | "K" | "H" {
  const s = (input || "").toUpperCase()
  if (["P"].includes(s)) return "P"
  if (["V"].includes(s)) return "V"
  if (["L"].includes(s)) return "L"
  if (["B"].includes(s)) return "B"
  if (["O"].includes(s)) return "O"
  if (["C"].includes(s)) return "C"
  if (["T"].includes(s)) return "T"
  if (["M"].includes(s)) return "M"
  if (["A"].includes(s)) return "A"
  if (["K"].includes(s)) return "K"
  if (["H"].includes(s)) return "H"
  return "V"
}

// ENV object ------------------------------------------------
export const ENV = {
  // --- TecDoc credentials ---
  TECDOC_PROVIDER_ID: req("TECDOC_PROVIDER_ID"),
  TECDOC_API_KEY: req("TECDOC_API_KEY"),

  // --- Defaults ---
  TECDOC_LANG_DEFAULT: process.env.TECDOC_LANG_DEFAULT || "nl",
  TECDOC_LANGS: parseCsv("TECDOC_LANGS", ["nl"]),
  TECDOC_ARTICLE_COUNTRIES: parseCsv("TECDOC_ARTICLE_COUNTRIES", ["nl"]),
  TECDOC_LINKAGE_COUNTRY: process.env.TECDOC_LINKAGE_COUNTRY || "nl",

  // --- Base endpoint Pegasus 3.0 ---
  TECDOC_BASE_JSON:
    process.env.TECDOC_BASE_JSON ||
    "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint",

  // --- Vehicle type filter ---
  TECDOC_LINKING_TARGET_TYPE: normalizeLinkingTargetType(
    process.env.TECDOC_LINKING_TARGET_TYPE || "P"
  ),

  // --- Extra opties ---
  TECDOC_PLATE_ENABLED: optBool("TECDOC_PLATE_ENABLED", false),
  TECDOC_PLATE_COUNTRY: process.env.TECDOC_PLATE_COUNTRY || "nl",
  TECDOC_DOWNLOAD_IMAGES: optBool("TECDOC_DOWNLOAD_IMAGES", false),
  TECDOC_DEBUG: optBool("TECDOC_DEBUG", false),
} as const

export type EnvShape = typeof ENV
