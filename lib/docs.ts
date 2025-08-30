// lib/docs.ts
import { ENV } from "./env"

/** Absolute TecDoc documents base (Pegasus 3.0). */
export const TECDOC_DOCS_BASE =
  "https://webservice.tecalliance.services/pegasus-3-0/documents"

/** Bouw een document-URL (logo, image, pdf) zonder de API-key te lekken naar de client. */
export function buildDocUrl(docId: string | number, size = 200) {
  const pid = ENV.TECDOC_PROVIDER_ID
  return `${TECDOC_DOCS_BASE}/${pid}/${docId}/${size}?api_key=${ENV.TECDOC_API_KEY}`
}
