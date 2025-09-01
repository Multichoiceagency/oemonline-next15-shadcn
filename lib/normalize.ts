/* eslint-disable @typescript-eslint/no-explicit-any */

// Unwrap TecDoc-achtige responses naar een gewone array
export function extractArray<T = any>(data: any): T[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.array)) return data.array
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.data?.array)) return data.data.array
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.data?.items)) return data.data.items
  return []
}

// Pak het eerste element dat we kunnen vinden
export function first<T = any>(data: any): T | undefined {
  const arr = extractArray<T>(data)
  if (arr.length) return arr[0]
  if (data && typeof data === "object") {
    for (const v of Object.values(data)) {
      const a = extractArray<T>(v)
      if (a.length) return a[0]
    }
  }
  return undefined
}
