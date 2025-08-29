/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { extractArray } from "@/lib/normalize"

export default function Page(){
  const [rows,setRows]=React.useState<any[]>([])
  const [err,setErr]=React.useState<string|undefined>()

  React.useEffect(()=>{(async()=>{
    try{
      const r=await fetch("/api/brands")
      const j=await r.json()
      setRows(extractArray(j)) // → [{ brandId, brandName, brandLogoID }]
    }catch(e:any){ setErr(e.message) }
  })()},[])

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle>AM Brands</CardTitle></CardHeader>
        <CardContent className="px-0">
          {err && <p className="text-sm text-rose-600 px-4">{err}</p>}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Logo ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length===0 && (<TableRow><TableCell colSpan={3} className="text-muted-foreground">Geen data</TableCell></TableRow>)}
                {rows.map((b:any)=>(
                  <TableRow key={b?.brandId}>
                    <TableCell className="font-medium">{b?.brandId}</TableCell>
                    <TableCell>{b?.brandName}</TableCell>
                    <TableCell>{b?.brandLogoID ?? "—"}</TableCell>
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
