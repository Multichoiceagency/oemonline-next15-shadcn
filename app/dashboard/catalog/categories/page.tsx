/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extractArray } from "@/lib/normalize"

type Category = { genericArticleId: number; name: string; count: number }

export default function CategoriesPage() {
  // vehicle cascade
  const [manus, setManus] = React.useState<any[]>([])
  const [models, setModels] = React.useState<any[]>([])
  const [types, setTypes] = React.useState<any[]>([])
  const [manuId, setManuId] = React.useState<string>("")
  const [modelSeriesId, setModelSeriesId] = React.useState<string>("")
  const [typeId, setTypeId] = React.useState<string>("") // == carId

  // filters
  const [amBrands, setAmBrands] = React.useState<any[]>([])
  const [brandNo, setBrandNo] = React.useState<string>("")
  const [q, setQ] = React.useState("")

  // data
  const [cats, setCats] = React.useState<Category[]>([])

  // loading / errors
  const [loadingModels, setLoadingModels] = React.useState(false)
  const [loadingTypes, setLoadingTypes] = React.useState(false)
  const [loadingCats, setLoadingCats] = React.useState(false)
  const [err, setErr] = React.useState<string | undefined>()

  // init: brands + manufacturers
  React.useEffect(() => {
    ;(async () => {
      try {
        const [brandsRes, manusRes] = await Promise.all([
          fetch("/api/brands"),
          fetch("/api/vehicles?mode=manufacturers"),
        ])
        const [bJson, mJson] = await Promise.all([brandsRes.json(), manusRes.json()])
        setAmBrands(extractArray(bJson))
        setManus(extractArray(mJson)) // [{id,name}]
      } catch (e: any) {
        setErr(e?.message || "Init laden mislukt")
      }
    })()
  }, [])

  async function fetchModels(mid: string) {
    setLoadingModels(true)
    try {
      const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${mid}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Modellen laden mislukt")
      setModels(extractArray(j))
      if (extractArray(j).length === 0) setErr("Geen modellen gevonden voor dit merk.")
      else setErr(undefined)
    } catch (e: any) {
      setModels([])
      setErr(e?.message || "Modellen laden mislukt")
    } finally {
      setLoadingModels(false)
    }
  }

  // >>> FIX: manufacturerId meesturen bij types
  async function fetchTypes(msid: string) {
    setLoadingTypes(true)
    try {
      const qs = new URLSearchParams({ modelSeriesId: String(msid) })
      if (manuId) qs.set("manufacturerId", String(manuId))
      const r = await fetch(`/api/vehicles?mode=types&${qs.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Motor/Type laden mislukt")
      const list = extractArray(j)
      setTypes(list)
      if (list.length === 0) setErr("Geen motoren/types voor dit model.")
      else setErr(undefined)
    } catch (e: any) {
      setTypes([])
      setErr(e?.message || "Motor/Type laden mislukt")
    } finally {
      setLoadingTypes(false)
    }
  }

  const loadCategories = React.useCallback(
    async (carId?: string, brand?: string, term?: string) => {
      const id = (carId ?? typeId)?.toString()
      if (!id) return
      setLoadingCats(true)
      try {
        const params = new URLSearchParams({ carId: id })
        if (brand) params.set("brandNo", brand)
        if (term) params.set("q", term)
        const r = await fetch(`/api/categories?${params.toString()}`)
        const j = await r.json()
        if (!r.ok) throw new Error(j?.error || "Kon categorieën niet laden")
        setCats(extractArray(j))
        setErr(undefined)
      } catch (e: any) {
        setCats([])
        setErr(e?.message || "Fout bij laden")
      } finally {
        setLoadingCats(false)
      }
    },
    [typeId]
  )

  // cascade handlers
  async function onPickManu(id: string) {
    setManuId(id)
    setModels([]); setTypes([]); setCats([])
    setModelSeriesId(""); setTypeId("")
    setBrandNo(""); setQ("")
    await fetchModels(id)
  }
  async function onPickModel(id: string) {
    setModelSeriesId(id)
    setTypes([]); setCats([]); setTypeId("")
    setBrandNo(""); setQ("")
    await fetchTypes(id)
  }
  async function onPickType(id: string) {
    setTypeId(id)
    setCats([])
    await loadCategories(id, brandNo, q)
  }

  // herlaad categorieën bij merkfilter wijziging
  React.useEffect(() => {
    if (typeId) void loadCategories(typeId, brandNo, q)
  }, [brandNo, loadCategories, q, typeId])

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Categorieën (Generic Articles)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* voertuigselectie */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Automerk</span>
              <Select value={manuId} onValueChange={onPickManu}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecteer merk" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {manus.map((m: any) => (
                    <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Model</span>
              <Select
                value={modelSeriesId}
                onValueChange={onPickModel}
                disabled={!manuId || loadingModels}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder={loadingModels ? "Laden…" : (manuId ? "Selecteer model" : "Kies automerk eerst")} />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {models.map((m: any) => (
                    <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Motor / Type</span>
              <Select
                value={typeId}
                onValueChange={onPickType}
                disabled={!modelSeriesId || loadingTypes}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder={loadingTypes ? "Laden…" : (modelSeriesId ? "Selecteer motor/type" : "Kies model eerst")} />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {types.map((t: any) => (
                    <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* filters */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">AM-merk</span>
              <Select value={brandNo} onValueChange={setBrandNo} disabled={!typeId}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Alle merken" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {amBrands.map((b: any) => (
                    <SelectItem key={b.brandId} value={String(b.brandId)}>{b.brandName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Zoek in categorieën"
                onKeyDown={(e) => e.key === "Enter" && loadCategories(typeId, brandNo, q)}
                disabled={!typeId}
              />
              <Button onClick={() => loadCategories(typeId, brandNo, q)} disabled={!typeId || loadingCats}>
                {loadingCats ? "Laden…" : "Toepassen"}
              </Button>
            </div>
          </div>

          {/* status */}
          {err && <div className="text-sm text-rose-600">{err}</div>}
        </CardContent>
      </Card>

      {/* resultaten */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Resultaten</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {!typeId && <p className="text-sm text-muted-foreground">Kies eerst motor/type.</p>}
          {typeId && cats.length === 0 && !loadingCats && (
            <p className="text-sm text-muted-foreground">Geen categorieën gevonden.</p>
          )}

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cats.map((c) => {
              const href =
                `/dashboard/catalog/search?carId=${typeId}` +
                `&genericArticleId=${c.genericArticleId}` +
                (brandNo ? `&brandNo=${brandNo}` : "")
              return (
                <Link
                  key={c.genericArticleId}
                  href={href}
                  className="flex items-center justify-between rounded-xl border px-3 py-2 hover:bg-muted"
                  title={`${c.count} artikelen`}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs">{c.count}</span>
                </Link>
              )
            })}
          </div>

          <div className="text-xs text-muted-foreground">
            Automerk: <span className="font-medium">{manuId || "—"}</span>{" • "}
            Model: <span className="font-medium">{modelSeriesId || "—"}</span>{" • "}
            Type: <span className="font-medium">{typeId || "—"}</span>{" • "}
            AM-merk: <span className="font-medium">{brandNo || "—"}</span>{" • "}
            Getoond: <span className="font-medium">{cats.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
