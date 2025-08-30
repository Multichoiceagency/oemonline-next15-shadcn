/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { extractArray } from "@/lib/normalize"

// Kleine helper om een thumbnail te vinden, ongeacht veldnaam
function thumbFrom(it: any): string | undefined {
  // probeer diverse varianten
  return (
    it?.imageUrl ||
    it?.thumbnailUrl ||
    it?.thumbUrl ||
    it?.thumb ||
    it?.images?.[0]?.url ||
    it?.thumbnails?.[0]?.url
  )
}

type Category = { genericArticleId: number; name: string; count: number }

export default function CategoriesPage() {
  // cascade
  const [manus, setManus] = React.useState<any[]>([])
  const [models, setModels] = React.useState<any[]>([])
  const [types, setTypes] = React.useState<any[]>([])
  const [manuId, setManuId] = React.useState<string>("")
  const [modelSeriesId, setModelSeriesId] = React.useState<string>("")
  const [typeId, setTypeId] = React.useState<string>("") // == carId

  // subcats + artikelen
  const [cats, setCats] = React.useState<Category[]>([])
  const [selectedGA, setSelectedGA] = React.useState<number | undefined>(undefined)

  // filters
  const [amBrands, setAmBrands] = React.useState<any[]>([])
  const [brandNo, setBrandNo] = React.useState<string>("")
  const [q, setQ] = React.useState("")

  // artikellijst + paging
  const [rows, setRows] = React.useState<any[]>([])
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(48)

  // loading / errors
  const [loadingModels, setLoadingModels] = React.useState(false)
  const [loadingTypes, setLoadingTypes] = React.useState(false)
  const [loadingCats, setLoadingCats] = React.useState(false)
  const [loadingProducts, setLoadingProducts] = React.useState(false)
  const [err, setErr] = React.useState<string | undefined>()

  // ─── INIT ──────────────────────────────────────────────────────────────
  React.useEffect(() => {
    ;(async () => {
      try {
        const [brandsRes, manusRes] = await Promise.all([
          fetch("/api/brands"),
          fetch("/api/vehicles?mode=manufacturers"),
        ])
        const [bJson, mJson] = await Promise.all([brandsRes.json(), manusRes.json()])
        setAmBrands(extractArray(bJson)) // AM-merken
        setManus(extractArray(mJson))    // automerken
      } catch (e: any) {
        setErr(e?.message || "Initialisatie mislukt")
      }
    })()
  }, [])

  // ─── HELPERS: API Calls ────────────────────────────────────────────────
  async function fetchModels(mid: string) {
    setLoadingModels(true)
    try {
      const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${mid}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Modellen laden mislukt")
      setModels(extractArray(j))
    } catch (e: any) {
      setModels([]); setErr(e.message)
    } finally {
      setLoadingModels(false)
    }
  }

  // >>> FIX: stuur manufacturerId mee bij het ophalen van types
  async function fetchTypes(msid: string) {
    setLoadingTypes(true)
    try {
      const qs = new URLSearchParams({ modelSeriesId: String(msid) })
      if (manuId) qs.set("manufacturerId", String(manuId))
      const r = await fetch(`/api/vehicles?mode=types&${qs.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Motor/Type laden mislukt")
      setTypes(extractArray(j))
    } catch (e: any) {
      setTypes([]); setErr(e.message)
    } finally {
      setLoadingTypes(false)
    }
  }

  async function loadCategories(carId: string, brand?: string, term?: string) {
    setLoadingCats(true)
    try {
      const params = new URLSearchParams({ carId })
      if (brand) params.set("brandNo", brand)
      if (term) params.set("q", term)
      const r = await fetch(`/api/categories?${params.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Categorieën laden mislukt")
      setCats(extractArray(j))
    } catch (e: any) {
      setCats([]); setErr(e.message)
    } finally {
      setLoadingCats(false)
    }
  }

  async function loadProducts(carId: string, opts?: { page?: number; ga?: number; brandNo?: string; q?: string }) {
    const p = opts?.page ?? page
    setLoadingProducts(true)
    try {
      const qs = new URLSearchParams()
      qs.set("carId", carId)
      qs.set("linkingTargetType", "P")
      qs.set("page", String(p))
      qs.set("perPage", String(perPage))
      if (opts?.ga) qs.set("genericArticleId", String(opts.ga))
      if (opts?.brandNo || brandNo) qs.set("brandNo", String(opts?.brandNo ?? brandNo))
      if (opts?.q ?? q) qs.set("q", String(opts?.q ?? q))

      const r = await fetch(`/api/search?${qs.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Producten laden mislukt")
      setRows(extractArray(j))
      setPage(p)
    } catch (e: any) {
      setRows([]); setErr(e.message)
    } finally {
      setLoadingProducts(false)
    }
  }

  // ─── CASCADE HANDLERS ─────────────────────────────────────────────────
  async function onPickManu(id: string) {
    setManuId(id)
    setModels([]); setTypes([])
    setModelSeriesId(""); setTypeId("")
    setCats([]); setRows([]); setSelectedGA(undefined); setErr(undefined)
    await fetchModels(id)
  }

  async function onPickModel(id: string) {
    setModelSeriesId(id)
    setTypes([])
    setTypeId(""); setCats([]); setRows([]); setSelectedGA(undefined); setErr(undefined)
    await fetchTypes(id)
  }

  async function onPickType(id: string) {
    setTypeId(id)
    setSelectedGA(undefined)
    setErr(undefined)
    // 1) laad subcategorieën
    await loadCategories(id, brandNo, q)
    // 2) laad alle producten voor dit voertuig (geen GA filter)
    await loadProducts(id, { page: 1 })
  }

  // filters → herladen
  async function applyFilters() {
    if (!typeId) return
    await Promise.all([
      loadCategories(typeId, brandNo, q),               // update counts
      loadProducts(typeId, { page: 1, ga: selectedGA, brandNo, q }),
    ])
  }

  // subcategorie klikken → meteen producten ophalen
  async function onPickGA(ga: number | undefined) {
    setSelectedGA(ga)
    if (!typeId) return
    await loadProducts(typeId, { page: 1, ga, brandNo, q })
  }

  // pagination next/prev
  async function goTo(pg: number) {
    if (!typeId || pg < 1) return
    await loadProducts(typeId, { page: pg, ga: selectedGA, brandNo, q })
  }

  // ─── UI ───────────────────────────────────────────────────────────────
  return (
    <div className="px-4 lg:px-6 space-y-4">
      {/* FILTERBALK */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Onderdelen voor jouw voertuig</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {/* Voertuig: automerk → model → motor/type */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Automerk</span>
              <Select value={manuId} onValueChange={onPickManu}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Selecteer merk" /></SelectTrigger>
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

          {/* Extra filters */}
          <div className="grid gap-3 md:grid-cols-3">
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

            <div className="flex items-center gap-2 md:col-span-2">
              <span className="w-28 text-sm text-muted-foreground">Zoek</span>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Zoek in producten (naam / nummer)"
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                disabled={!typeId}
              />
              <Button onClick={applyFilters} disabled={!typeId || loadingProducts || loadingCats}>
                {loadingProducts || loadingCats ? "Laden…" : "Toepassen"}
              </Button>
              {typeId && (
                <Button
                  variant="secondary"
                  onClick={() => { setBrandNo(""); setQ(""); setSelectedGA(undefined); void applyFilters() }}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {err && <div className="text-sm text-rose-600">{err}</div>}
        </CardContent>
      </Card>

      {/* SUBCATEGORIEËN */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Subcategorieën (Generic Articles)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {!typeId && <p className="text-sm text-muted-foreground">Kies eerst motor/type.</p>}
          {typeId && (
            <>
              {loadingCats && <p className="text-sm text-muted-foreground">Categorieën laden…</p>}
              {!loadingCats && cats.length === 0 && (
                <p className="text-sm text-muted-foreground">Geen categorieën gevonden.</p>
              )}

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* “Alles” knop */}
                <button
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left hover:bg-muted ${!selectedGA ? "bg-muted" : ""}`}
                  onClick={() => onPickGA(undefined)}
                  title="Toon alle producten voor dit voertuig"
                >
                  <span className="truncate">Alle categorieën</span>
                </button>

                {cats.map((c) => (
                  <button
                    key={c.genericArticleId}
                    onClick={() => onPickGA(c.genericArticleId)}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left hover:bg-muted ${selectedGA === c.genericArticleId ? "bg-muted" : ""}`}
                    title={`${c.count} artikelen`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs">{c.count}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* PRODUCTEN GRID */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            {selectedGA ? "Producten in subcategorie" : "Alle producten voor dit voertuig"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!typeId && <p className="text-sm text-muted-foreground">Kies eerst motor/type.</p>}

          {typeId && (
            <>
              {loadingProducts && <p className="text-sm text-muted-foreground">Producten laden…</p>}
              {!loadingProducts && rows.length === 0 && (
                <p className="text-sm text-muted-foreground">Geen producten gevonden.</p>
              )}

              {/* grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {rows.map((it: any) => {
                  const img = thumbFrom(it)
                  const brand = it?.supplierName ?? it?.brand ?? it?.mfrName
                  const gaName = it?.genericArticleName ?? it?.genericArticleDescription
                  const id = it?.articleId ?? it?.id
                  return (
                    <Card key={`${id}-${brand}-${gaName}`} className="rounded-xl overflow-hidden">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-20 shrink-0 rounded-md border bg-white flex items-center justify-center overflow-hidden">
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={img} alt={it?.articleName ?? "product"} className="object-contain w-full h-full" />
                            ) : (
                              <div className="text-xs text-muted-foreground">Geen<br />afbeelding</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{it?.articleName ?? it?.name ?? `Artikel #${id}`}</div>
                            <div className="text-xs text-muted-foreground truncate">{brand || "—"}</div>
                            <div className="text-xs text-muted-foreground truncate">{gaName || "—"}</div>
                            <div className="text-[10px] text-muted-foreground font-mono mt-1">ID: {id}</div>
                          </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                          <Link
                            href={`/dashboard/catalog/search?carId=${typeId}${selectedGA ? `&genericArticleId=${selectedGA}` : ""}${id ? `&articleId=${id}` : ""}`}
                            className="text-xs underline text-muted-foreground hover:text-foreground"
                          >
                            Details
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* pagination */}
              {rows.length > 0 && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => goTo(Math.max(1, page - 1))} disabled={page <= 1 || loadingProducts}>
                      Vorige
                    </Button>
                    <Button variant="outline" onClick={() => goTo(page + 1)} disabled={loadingProducts}>
                      Volgende
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Per pagina</span>
                    <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); if (typeId) void loadProducts(typeId, { page: 1, ga: selectedGA }) }}>
                      <SelectTrigger className="h-8 w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[24, 48, 96, 150].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
