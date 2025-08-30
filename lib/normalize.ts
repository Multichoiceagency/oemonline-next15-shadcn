// lib/normalize.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export function extractArray(x: any): any[] {
  if (!x) return []
  if (Array.isArray(x)) return x

  const cands = [
    x.data?.data?.array,
    x.data?.array,
    x.array,
    x.results,
    x.items,
    x.data?.data,
    x.data,
  ]
  for (const c of cands) if (Array.isArray(c)) return c

  const nested = x?.data?.array?.array
  if (Array.isArray(nested)) return nested

  return []
}

export function first<T = any>(x: any): T | undefined {
  const arr = extractArray(x)
  return (arr[0] as T) ?? (x?.data as T) ?? (x as T)
}

export const lc = (v: any) => (v ?? "").toString().toLowerCase()
