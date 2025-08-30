/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/logger.ts
import { ENV } from "./env"

export function logDebug(label: string, data?: any) {
  if (!ENV.TECDOC_DEBUG) return
  try { console.log(`[TecDoc] ${label}`, data ?? "") } catch {}
}
export function logError(label: string, data?: any) {
  try { console.error(`[TecDoc][ERROR] ${label}:`, data ?? "") } catch {}
}
