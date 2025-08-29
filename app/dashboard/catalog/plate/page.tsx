/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { extractArray, first } from "@/lib/normalize"

export default function Page() {
  const [plate, setPlate] = React.useState("")
  const [rows, setRows] = React.useState<any[]>([])
  const [err, setErr] = React.useState<string | undefined>()
  const [loading, setLoading] = React.useState(false)
  const [selected, setSelected] = React.useState<any | undefined>()
  const [specs, setSpecs] = React.useState<any | undefined>()
  const [specErr, setSpecErr] = React.useState<string | undefined>()
  const [specLoading, setSpecLoading] = React.useState(false)

  async function run() {
    setLoading(true)
    setErr(undefined)
    try {
      const r = await fetch(`/api/plates?plate=${encodeURIComponent(plate)}&country=nl`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || j?.statusText || "Request failed")
      const arr = extractArray(j)
      setRows(arr)
      setSelected(undefined)
      setSpecs(undefined)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function loadSpecs(v: any) {
    setSelected(v)
    setSpecs(undefined)
    setSpecErr(undefined)
    if (!v?.carId) return
    setSpecLoading(true)
    try {
      const r = await fetch(`/api/vehicle-details?carId=${v.carId}&country=nl&lang=nl`)
      const j = await r.json()
      if (!r.ok) throw new Error(j?.error || "Details ophalen mislukt")
      // probeer verschillende vormen—haal eerste record met rich fields
      const it = first<any>(j) || j?.data || j
      setSpecs(it)
    } catch (e: any) {
      setSpecErr(e.message)
    } finally {
      setSpecLoading(false)
    }
  }

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Zoek op kenteken</CardTitle></CardHeader>
        <CardContent className="flex gap-2">
          <Input placeholder="Bijv. G123AB" value={plate} onChange={(e) => setPlate(e.target.value)} onKeyDown={(e) => e.key === "Enter" && run()} />
          <Button onClick={run} disabled={!plate || loading}>{loading ? "Zoeken…" : "Zoek"}</Button>
          {err && <span className="text-sm text-rose-600">{err}</span>}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Voertuigen</CardTitle></CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Land</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-muted-foreground">Geen resultaten</TableCell></TableRow>
                )}
                {rows.map((r: any) => (
                  <TableRow key={r.carId}>
                    <TableCell className="font-medium">{r.carId}</TableCell>
                    <TableCell>{r.carName}</TableCell>
                    <TableCell>{r.firstCountry}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant={selected?.carId === r.carId ? "secondary" : "default"} onClick={() => loadSpecs(r)}>
                        {selected?.carId === r.carId ? "Geselecteerd" : "Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader><CardTitle>Motor specificaties</CardTitle></CardHeader>
        <CardContent className="px-0">
          {specLoading && <div className="px-4 py-3 text-sm">Laden…</div>}
          {specErr && <div className="px-4 py-3 text-sm text-rose-600">{specErr}</div>}
          {!specLoading && !specErr && !specs && <div className="px-4 py-3 text-sm text-muted-foreground">Selecteer een voertuig om specificaties te tonen.</div>}

          {specs && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kenmerk</TableHead>
                    <TableHead>Waarde</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Toon de meest gangbare velden als ze bestaan; fallback naar engineCode array */}
                  {[
                    ["Motorcodes", Array.isArray(specs.engineCode) ? specs.engineCode.join(", ") : (specs.engineCode ?? specs.motorCode ?? "—")],
                    ["Cilinders", specs.cylinder ?? specs.cylinders ?? "—"],
                    ["Cilinderinhoud (ccm)", specs.cylinderCapacityCcm ?? "—"],
                    ["Cilinderinhoud (L)", specs.cylinderCapacityLiter ? Number(specs.cylinderCapacityLiter) / 100 : "—"],
                    ["Vermogen (kW)", specs.powerKwTo ?? specs.powerKW ?? "—"],
                    ["Vermogen (hp)", specs.powerHpTo ?? specs.powerHP ?? "—"],
                    ["Brandstof", specs.fuelType ?? "—"],
                    ["Motor type", specs.engineType ?? "—"],
                    ["Inspuitsysteem", specs.fuelTypeProcess ?? "—"],
                    ["Aandrijving", specs.impulsionType ?? specs.driveSystemSynonym ?? "—"],
                    ["Klep per cilinder", specs.valves ?? "—"],
                    ["Bouwjaar van", specs.yearOfConstrFrom ?? "—"],
                    ["Bouwjaar tot", specs.yearOfConstrTo ?? "—"],
                    ["Type naam", specs.typeName ?? "—"],
                  ].map(([k, v]) => (
                    <TableRow key={k as string}>
                      <TableCell className="font-medium">{k}</TableCell>
                      <TableCell>{String(v)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
