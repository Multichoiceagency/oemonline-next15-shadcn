/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extractArray } from "@/lib/normalize"

export default function Page() {
  // data
  const [brands, setBrands] = React.useState<any[]>([])      // actuele lijst (all / by-vehicle)
  const [allBrands, setAllBrands] = React.useState<any[]>([])// cache van all /api/brands
  const [manus, setManus] = React.useState<any[]>([])        // manufacturers [{id,name}]
  const [models, setModels] = React.useState<any[]>([])      // model series  [{id,name}]
  const [types, setTypes] = React.useState<any[]>([])        // types        [{id,name}]

  // ui state
  const [err, setErr] = React.useState<string | undefined>()
  const [loading, setLoading] = React.useState(false)
  const [loadingModels, setLoadingModels] = React.useState(false)
  const [loadingTypes, setLoadingTypes] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [manuId, setManuId] = React.useState<string>("")
  const [modelSeriesId, setModelSeriesId] = React.useState<string>("")
  const [typeId, setTypeId] = React.useState<string>("")

  // init
  React.useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const [bRes, mRes] = await Promise.all([
          fetch("/api/brands"),
          fetch("/api/vehicles?mode=manufacturers"),
        ])
        const [bJson, mJson] = await Promise.all([bRes.json(), mRes.json()])
        const all = extractArray(bJson)
        setAllBrands(all)
        setBrands(all)
        setManus(extractArray(mJson))
      } catch (e: any) {
        setErr(e?.message || "Laden mislukt")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function onPickManu(id: string) {
    setManuId(id)
    setModels([]); setTypes([])
    setModelSeriesId(""); setTypeId("")
    try {
      setLoadingModels(true)
      const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${id}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Modellen laden mislukt")
      setModels(extractArray(j))
      setBrands(allBrands) // reset tot type gekozen is
    } catch (e: any) {
      setModels([]); setBrands(allBrands); setErr(e.message)
    } finally {
      setLoadingModels(false)
    }
  }

  // >>> FIX: manufacturerId meesturen bij types
  async function onPickModel(id: string) {
    setModelSeriesId(id)
    setTypes([]); setTypeId("")
    try {
      setLoadingTypes(true)
      const qs = new URLSearchParams({ modelSeriesId: String(id) })
      if (manuId) qs.set("manufacturerId", String(manuId))
      const r = await fetch(`/api/vehicles?mode=types&${qs.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Motor/Type laden mislukt")
      setTypes(extractArray(j))
      setBrands(allBrands)
    } catch (e: any) {
      setTypes([]); setBrands(allBrands); setErr(e.message)
    } finally {
      setLoadingTypes(false)
    }
  }

  async function onPickType(id: string) {
    setTypeId(id)
    if (!id) { setBrands(allBrands); return }
    try {
      setLoading(true)
      const r = await fetch(`/api/brands/by-vehicle?carId=${id}`)
      const j = await r.json()
      const arr = extractArray(j).map((x: any) => ({
        brandId: x.brandNo,
        brandName: x.brandName,
        count: x.count,
      }))
      setBrands(arr)
    } catch (e: any) {
      setErr(e?.message || "Voertuig-merken laden mislukt")
      setBrands(allBrands)
    } finally {
      setLoading(false)
    }
  }

  // client-side zoekfilter
  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return brands
    return brands.filter((b: any) => String(b?.brandName ?? "").toLowerCase().includes(term))
  }, [brands, q])

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Merken per voertuig</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vehicle cascade */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Automerk</span>
              <Select value={manuId} onValueChange={onPickManu}>
                <SelectTrigger className="h-9"><SelectValue placeholder="Alle automerken" /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {manus.map((m: any) => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Model</span>
              <Select value={modelSeriesId} onValueChange={onPickModel} disabled={!manuId || loadingModels}>
                <SelectTrigger className="h-9"><SelectValue placeholder={loadingModels ? "Laden…" : (manuId ? "Alle modellen" : "Kies automerk eerst")} /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {models.map((m: any) => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-28 text-sm text-muted-foreground">Motor / Type</span>
              <Select value={typeId} onValueChange={onPickType} disabled={!modelSeriesId || loadingTypes}>
                <SelectTrigger className="h-9"><SelectValue placeholder={loadingTypes ? "Laden…" : (modelSeriesId ? "Alle types" : "Kies model eerst")} /></SelectTrigger>
                <SelectContent className="max-h-80">
                  {types.map((t: any) => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Brand name zoekveld */}
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Zoek merk</span>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="bv. BOSCH, HELLA…" />
          </div>

          {err && <p className="text-sm text-rose-600">{err}</p>}
          {loading && <p className="text-sm text-muted-foreground">Laden…</p>}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merk</TableHead>
                  <TableHead style={{ width: 140 }}>Brand ID</TableHead>
                  <TableHead style={{ width: 120 }}>Aantal (voertuig)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={3} className="text-muted-foreground">Geen data</TableCell></TableRow>
                )}
                {filtered.map((b: any) => (
                  <TableRow key={b?.brandId ?? b?.brandNo}>
                    <TableCell className="font-medium">{b?.brandName}</TableCell>
                    <TableCell className="font-mono">{b?.brandId ?? b?.brandNo}</TableCell>
                    <TableCell className="font-mono">{b?.count ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-xs text-muted-foreground">
            Automerk: <span className="font-medium">{manuId || "—"}</span>{" • "}
            Model: <span className="font-medium">{modelSeriesId || "—"}</span>{" • "}
            Type: <span className="font-medium">{typeId || "—"}</span>{" • "}
            Getoond: <span className="font-medium">{filtered.length}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
