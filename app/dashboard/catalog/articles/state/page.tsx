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
  const [brands, setBrands] = React.useState("41,146,145,57,206,30,2,37,9");
  const [linkingTargetId, setLinkingTargetId] = React.useState("303");
  const [rows, setRows] = React.useState<any[]>([]);
  const [err, setErr] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);
  async function run() {
    setLoading(true);
    setErr(undefined);
    try {
      const url = `/api/article-ids-with-state?brandNo=${encodeURIComponent(
        brands
      )}&linkingTargetId=${encodeURIComponent(
        linkingTargetId
      )}&linkingTargetType=P&sort=1`;
      const r = await fetch(url);
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
          <CardTitle>Article IDs with State</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm w-28">BrandNo(s)</label>
            <Input value={brands} onChange={(e) => setBrands(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm w-28">Linking ID</label>
            <Input
              value={linkingTargetId}
              onChange={(e) => setLinkingTargetId(e.target.value)}
            />
          </div>
          <Button onClick={run} disabled={loading}>
            {loading ? "Laden…" : "Ophalen"}
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
                  <TableHead>Article ID</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-muted-foreground">
                      Geen resultaten
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r: any) => (
                  <TableRow key={r?.articleId}>
                    <TableCell className="font-medium">
                      {r?.articleId}
                    </TableCell>
                    <TableCell>{r?.state}</TableCell>
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
