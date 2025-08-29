export function logDebug(label: string, payload: unknown) {
try { console.log(`[TecDoc] ${label}:`, JSON.stringify(payload)) } catch {}
}
export function logError(label: string, payload: unknown) {
try { console.error(`[TecDoc][ERROR] ${label}:`, JSON.stringify(payload)) } catch {}
}