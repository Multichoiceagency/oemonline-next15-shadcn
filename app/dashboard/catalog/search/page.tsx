/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extractArray, first } from "@/lib/normalize"

type Subcat = { genericArticleId: number; name: string; count: number }

export default function Page() {
  // vrije tekst + optionele AM-merk filter
  const [q, setQ] = React.useState("")
  const [brandNo, setBrandNo] = React.useState<string>("")

  // voertuig-keuze
  const [plate, setPlate] = React.useState("")
  const [carId, setCarId] = React.useState<string>("")      // kType
  const [manus, setManus] = React.useState<any[]>([])
  const [models, setModels] = React.useState<any[]>([])
  const [types, setTypes] = React.useState<any[]>([])
  const [manuId, setManuId] = React.useState<string>("")
  const [modelSeriesId, setModelSeriesId] = React.useState<string>("")
  const [typeId, setTypeId] = React.useState<string>("")    // == carId

  // subcategorieën en artikelen
  const [subcats, setSubcats] = React.useState<Subcat[]>([])
  const [gaId, setGaId] = React.useState<number | undefined>(undefined)
  const [rows, setRows] = React.useState<any[]>([])

  // sets/flags
  const [amBrands, setAmBrands] = React.useState<any[]>([])
  const [err, setErr] = React.useState<string | undefined>()
  const [loading, setLoading] = React.useState(false)
  const [subLoading, setSubLoading] = React.useState(false)

  // motor specificaties
  const [specs, setSpecs] = React.useState<any | undefined>()
  const [specLoading, setSpecLoading] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      try {
        const b = await (await fetch("/api/brands")).json()
        setAmBrands(extractArray(b)) // [{brandId, brandName}]
      } catch {}
      try {
        const r = await (await fetch("/api/vehicles?mode=manufacturers")).json()
        setManus(extractArray(r)) // [{id,name}]
      } catch {}
    })()
  }, [])

  // helpers
  async function fetchModels(mid: string) {
    const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${mid}`)
    const j = await r.json()
    setModels(extractArray(j)) // [{id,name}]
  }
  async function fetchTypes(msid: string) {
    const r = await fetch(`/api/vehicles?mode=types&modelSeriesId=${msid}`)
    const j = await r.json()
    setTypes(extractArray(j)) // [{id,name}]
  }

  async function loadSpecs(kType: string) {
    setSpecs(undefined); setSpecLoading(true)
    try {
      const r = await fetch(`/api/vehicle-details?carId=${kType}&country=nl&lang=nl`)
      const j = await r.json()
      const it = first<any>(j) || j?.normalized || j?.data || j
      setSpecs(it)
    } finally { setSpecLoading(false) }
  }

  async function loadSubcats(kType?: string) {
    const id = (kType ?? typeId ?? carId)?.toString()
    if (!id) { setSubcats([]); return }
    setSubLoading(true)
    try {
      const p = new URLSearchParams({ carId: id })
      if (brandNo) p.set("brandNo", brandNo)
      const r = await fetch(`/api/subcategories?${p.toString()}`)
      const j = await r.json()
      setSubcats(extractArray(j) as any)
    } finally { setSubLoading(false) }
  }

  // cascade — handmatige selectie
  async function onPickManu(id: string) {
    setManuId(id); setModels([]); setTypes([])
    setModelSeriesId(""); setTypeId(""); setCarId(""); setRows([]); setSubcats([]); setGaId(undefined)
    setPlate("")
    await fetchModels(id)
  }
  async function onPickModel(id: string) {
    setModelSeriesId(id); setTypes([])
    setTypeId(""); setCarId(""); setRows([]); setSubcats([]); setGaId(undefined)
    setPlate("")
    await fetchTypes(id)
  }
  async function onPickType(id: string) {
    setTypeId(id); setCarId(id); setRows([]); setGaId(undefined)
    setPlate("")
    await Promise.all([loadSpecs(id), loadSubcats(id)])
  }

  // kenteken → sync selects + subcats + specs
  async function resolvePlate() {
    if (!plate) return
    setErr(undefined)
    try {
      const r = await fetch(`/api/plates?plate=${encodeURIComponent(plate)}&country=nl`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || j?.statusText || "Kenteken lookup mislukt")
      const picked = first<any>(j)
      if (!picked?.carId) throw new Error("Geen voertuig gevonden voor dit kenteken")

      const det = await fetch(`/api/vehicle-details?carId=${picked.carId}&country=nl&lang=nl`)
      const dj = await det.json()
      if (!det.ok) throw new Error(dj?.error || "Voertuigdetails mislukt")
      const n = dj?.normalized || {}

      if (n.manuId) { setManuId(String(n.manuId)); await fetchModels(String(n.manuId)) }
      if (n.modelSeriesId) { setModelSeriesId(String(n.modelSeriesId)); await fetchTypes(String(n.modelSeriesId)) }

      const kType = String(n.typeId ?? picked.carId)
      setTypeId(kType); setCarId(kType); setGaId(undefined)
      await Promise.all([loadSpecs(kType), loadSubcats(kType)])
    } catch (e: any) {
      setErr(e.message)
    }
  }

  // herlaad subcats wanneer carId/brandNo wijzigt
  React.useEffect(() => {
    if (carId) { void loadSubcats(carId) }
  }, [carId, brandNo])

  // zoeken (carId verplicht)
  async function run(ga?: number) {
    if (!carId) { setErr("Kies eerst merk → model → motor/type of koppel via kenteken."); return }
    const useGa = ga ?? gaId
    setLoading(true); setErr(undefined)
    try {
      const p = new URLSearchParams()
      p.set("carId", carId); p.set("linkingTargetType", "P")
      if (q) p.set("q", q)
      if (brandNo) p.set("brandNo", brandNo)
      if (useGa) p.set("genericArticleId", String(useGa))
      const r = await fetch(`/api/search?${p.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Zoekopdracht mislukt")
      setRows(extractArray(j))
    } catch (e: any) {
      setErr(e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="px-4 lg:px-6 space-y-4">
      {/* VEHICLE SELECTION */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Voertuig kiezen</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex items-center gap-2">
            <label className="w-28 text-sm text-muted-foreground">Kenteken</label>
            <Input value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="bv. 12-ABC3" />
            <Button variant="secondary" onClick={resolvePlate}>Koppel voertuig</Button>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <label className="w-28 text-sm text-muted-foreground">Automerk</label>
              <Select value={manuId} onValueChange={onPickManu}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Selecteer merk" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {manus.map((m: any) => (<SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-28 text-sm text-muted-foreground">Model</label>
              <Select value={modelSeriesId} onValueChange={onPickModel} disabled={!manuId}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Selecteer model" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {models.map((m: any) => (<SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-28 text-sm text-muted-foreground">Motor / Type</label>
              <Select value={typeId} onValueChange={onPickType} disabled={!modelSeriesId}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Selecteer motor/type" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {types.map((t: any) => (<SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            {specLoading ? "Specificaties laden…" : (specs?.typeName ? `Geselecteerd: ${specs.typeName}` : "Nog geen motor/type gekozen")}
          </div>

          {err && <div className="text-sm text-rose-600">{err}</div>}
        </CardContent>
      </Card>

      {/* SUBCATEGORIES */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Subcategorieën voor dit voertuig</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subLoading && <div className="text-sm text-muted-foreground px-1">Laden…</div>}
            {!subLoading && subcats.length === 0 && <div className="text-sm text-muted-foreground px-1">Geen subcategorieën gevonden. Kies een voertuig.</div>}
            {subcats.map(sc => (
              <button
                key={sc.genericArticleId}
                onClick={() => { setGaId(sc.genericArticleId); void run(sc.genericArticleId) }}
                className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left hover:bg-muted ${gaId === sc.genericArticleId ? "bg-muted" : ""}`}
                title={`${sc.count} artikelen`}
              >
                <span className="truncate">{sc.name}</span>
                <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs">{sc.count}</span>
              </button>
            ))}
          </div>

          {/* extra filters */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <label className="w-28 text-sm text-muted-foreground">AM-merk</label>
              <Select value={brandNo} onValueChange={(v) => { setBrandNo(v); if (carId && gaId) void run(gaId) }}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Alle merken" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {amBrands.map((b: any) => (<SelectItem key={b.brandId} value={String(b.brandId)}>{b.brandName}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter (naam/nummer)" onKeyDown={(e) => e.key === "Enter" && run()} />
              <Button onClick={() => run()} disabled={!carId || subLoading || loading}>{loading ? "Zoeken…" : "Zoek"}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RESULTS */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Artikelen</CardTitle></CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Merk</TableHead>
                  <TableHead>GA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-muted-foreground">Nog geen artikelen — kies een subcategorie of gebruik filters.</TableCell></TableRow>
                )}
                {rows.map((r: any) => (
                  <TableRow key={r?.articleId ?? r?.id}>
                    <TableCell className="font-medium">{r?.articleId ?? r?.id}</TableCell>
                    <TableCell>{r?.articleName ?? r?.name}</TableCell>
                    <TableCell>{r?.supplierName ?? r?.brand ?? r?.mfrName}</TableCell>
                    <TableCell>{r?.genericArticleName ?? r?.genericArticleDescription}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
