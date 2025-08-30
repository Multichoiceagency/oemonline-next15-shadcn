/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extractArray } from "@/lib/normalize"

type TypeOption = { id: number; name: string; raw?: any }

export default function AdminProductsPage() {
  const [q, setQ] = React.useState("")
  const [brandNo, setBrandNo] = React.useState<string>("")

  // voertuig cascade
  const [manus, setManus] = React.useState<any[]>([])
  const [models, setModels] = React.useState<any[]>([])
  const [types, setTypes] = React.useState<TypeOption[]>([])
  const [years, setYears] = React.useState<number[]>([])
  const [manuId, setManuId] = React.useState<string>("")
  const [modelSeriesId, setModelSeriesId] = React.useState<string>("")
  const [typeId, setTypeId] = React.useState<string>("")
  const [year, setYear] = React.useState<string>("") // bouwjaar-filter in UI; client-side filter op types

  // data
  const [rows, setRows] = React.useState<any[]>([])
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(50)
  const [loading, setLoading] = React.useState(false)
  const [err, setErr] = React.useState<string | undefined>()

  React.useEffect(() => {
    ;(async () => {
      try {
        const r = await (await fetch("/api/vehicles?mode=manufacturers")).json()
        setManus(extractArray(r))
      } catch {}
    })()
  }, [])

  async function fetchModels(mid: string) {
    const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${mid}`)
    const j = await r.json()
    setModels(extractArray(j))
  }
  async function fetchTypes(msid: string) {
    const r = await fetch(`/api/vehicles?mode=types&modelSeriesId=${msid}`)
    const j = await r.json()
    const list = extractArray(j) as TypeOption[]
    setTypes(list)

    // bouwjaren opbouwen uit raw-velden
    const ys = new Set<number>()
    for (const t of list) {
      const from = Number(t?.raw?.yearOfConstrFrom)
      const to = Number(t?.raw?.yearOfConstrTo)
      if (Number.isFinite(from)) ys.add(from)
      if (Number.isFinite(to)) ys.add(to)
    }
    const yrs = Array.from(ys).filter((n) => n > 1900).sort((a, b) => a - b)
    setYears(yrs)
  }

  async function onPickManu(id: string) {
    setManuId(id); setModels([]); setTypes([]); setYears([])
    setModelSeriesId(""); setTypeId(""); setYear(""); setRows([])
    await fetchModels(id)
  }
  async function onPickModel(id: string) {
    setModelSeriesId(id); setTypes([]); setYears([])
    setTypeId(""); setYear(""); setRows([])
    await fetchTypes(id)
  }

  // filter types op gekozen bouwjaar
  const filteredTypes = React.useMemo(() => {
    if (!year) return types
    const y = Number(year)
    return types.filter((t) => {
      const from = Number(t?.raw?.yearOfConstrFrom)
      const to = Number(t?.raw?.yearOfConstrTo)
      if (Number.isFinite(from) && Number.isFinite(to)) {
        return y >= from && y <= to
      }
      if (Number.isFinite(from) && !Number.isFinite(to)) return y >= from
      if (!Number.isFinite(from) && Number.isFinite(to)) return y <= to
      return true
    })
  }, [types, year])

  async function run(p = page) {
    setLoading(true); setErr(undefined)
    try {
      const qs = new URLSearchParams()
      qs.set("page", String(p))
      qs.set("perPage", String(perPage))
      if (q) qs.set("q", q)
      if (brandNo) qs.set("brandNo", brandNo)
      // kies typeId indien beschikbaar (voertuigkoppeling)
      const carId = typeId || ""
      if (carId) qs.set("carId", carId)

      const r = await fetch(`/api/admin/products?${qs.toString()}`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Laden mislukt")
      setRows(extractArray(j))
      setPage(p)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Admin • Producten</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* merk → model → bouwjaar → motor/type */}
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Automerk</span>
            <Select value={manuId} onValueChange={onPickManu}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Alle merken" /></SelectTrigger>
              <SelectContent className="max-h-80">
                {manus.map((m: any) => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Model</span>
            <Select value={modelSeriesId} onValueChange={onPickModel} disabled={!manuId}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Alle modellen" /></SelectTrigger>
              <SelectContent className="max-h-80">
                {models.map((m: any) => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Bouwjaar</span>
            <Select value={year} onValueChange={setYear} disabled={years.length === 0}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Alle bouwjaren" /></SelectTrigger>
              <SelectContent className="max-h-80">
                {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Motor / Type</span>
            <Select value={typeId} onValueChange={setTypeId} disabled={filteredTypes.length === 0}>
              <SelectTrigger className="h-9"><SelectValue placeholder="Alle types" /></SelectTrigger>
              <SelectContent className="max-h-80">
                {filteredTypes.map((t: any) => <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* AM-merk + tekst */}
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">AM-merk</span>
            <Input
              placeholder="bv. 30 (BOSCH) of 30,41"
              value={brandNo}
              onChange={(e) => setBrandNo(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-28 text-sm text-muted-foreground">Zoek</span>
            <Input
              placeholder="naam / nummer"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run(1)}
            />
          </div>

          {/* acties */}
          <div className="col-span-full flex gap-2">
            <Button onClick={() => run(1)} disabled={loading}>{loading ? "Laden…" : "Laden"}</Button>
            <Button variant="secondary" onClick={() => { setQ(""); setBrandNo(""); setTypeId(""); setYear(""); setRows([]) }}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Resultaten (pagina {page})</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {err && <div className="px-4 py-2 text-sm text-rose-600">{err}</div>}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{width: 110}}>Artikel ID</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Merk</TableHead>
                  <TableHead>GA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-muted-foreground">Geen resultaten</TableCell></TableRow>
                )}
                {rows.map((r: any) => (
                  <TableRow key={r?.articleId ?? r?.id}>
                    <TableCell className="font-mono">{r?.articleId ?? r?.id}</TableCell>
                    <TableCell>{r?.articleName ?? r?.name}</TableCell>
                    <TableCell>{r?.supplierName ?? r?.brand ?? r?.mfrName}</TableCell>
                    <TableCell>{r?.genericArticleName ?? r?.genericArticleDescription}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* pagination */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => run(Math.max(1, page - 1))} disabled={page <= 1 || loading}>Vorige</Button>
              <Button variant="outline" onClick={() => run(page + 1)} disabled={loading}>Volgende</Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Per pagina</span>
              <Select value={String(perPage)} onValueChange={(v) => setPerPage(Number(v))}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[25, 50, 100, 200].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
