/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { extractArray } from "@/lib/normalize";

export default function Page() {
  const [motorId, setMotorId] = React.useState("");
  const [carType, setCarType] = React.useState<"P" | "O" | "L">("P");
  const [rows, setRows] = React.useState<any[]>([]);
  const [err, setErr] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);

  async function run() {
    setLoading(true);
    setErr(undefined);
    try {
      const r = await fetch(
        `/api/vehicles/motor?motorId=${encodeURIComponent(
          motorId
        )}&carType=${carType}`
      );
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Request failed");
      setRows(extractArray(j));
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 lg:px-6 space-y-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Motor → Voertuigen</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm w-24">Motor ID</label>
            <Input
              value={motorId}
              onChange={(e) => setMotorId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              placeholder="bv. 123456"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm w-24">Type</label>
            <select
              className="h-9 rounded-xl border bg-transparent px-3 text-sm"
              value={carType}
              onChange={(e) => setCarType(e.target.value as any)}
            >
              <option value="P">Passenger (P)</option>
              <option value="O">Commercial (O)</option>
              <option value="L">Light commercial (L)</option>
            </select>
          </div>
          <Button onClick={run} disabled={!motorId || loading}>
            {loading ? "Zoeken…" : "Zoek"}
          </Button>
          {err && <span className="text-sm text-rose-600">{err}</span>}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Resultaten</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Eerste land</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">
                      Geen resultaten
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r: any) => (
                  <TableRow key={r.carId}>
                    <TableCell className="font-medium">{r.carId}</TableCell>
                    <TableCell>{r.carName}</TableCell>
                    <TableCell>{r.firstCountry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
