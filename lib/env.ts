export function req(name: string, fallback?: string) {
const v = process.env[name] ?? fallback
if (!v) throw new Error(`Missing env: ${name}`)
return v
}


export const ENV = {
TECDOC_PROVIDER_ID: req("TECDOC_PROVIDER_ID"),
TECDOC_API_KEY: req("TECDOC_API_KEY"),
TECDOC_LANG_DEFAULT: req("TECDOC_LANG_DEFAULT", "nl"),
TECDOC_LANGS: req("TECDOC_LANGS", "nl,fr").split(","),
TECDOC_ARTICLE_COUNTRIES: req("TECDOC_ARTICLE_COUNTRIES", "nl,be,lu").split(","),
TECDOC_LINKAGE_COUNTRY: req("TECDOC_LINKAGE_COUNTRY", "nl"),
TECDOC_BASE_JSON: req("TECDOC_BASE_JSON"),
TECDOC_PLATE_ENABLED: (process.env.TECDOC_PLATE_ENABLED ?? "true") === "true",
TECDOC_PLATE_COUNTRY: req("TECDOC_PLATE_COUNTRY", "nl"),
TECDOC_DOWNLOAD_IMAGES: (process.env.TECDOC_DOWNLOAD_IMAGES ?? "true") === "true",
TECDOC_DEBUG: (process.env.TECDOC_DEBUG ?? "true") === "true",
}