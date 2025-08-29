/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
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

const demoPairs = [
  { articleId: 3355356, articleLinkId: 63383220 },
  { articleId: 3353893, articleLinkId: 63385341 },
  { articleId: 3355078, articleLinkId: 5570576 },
  { articleId: 3354554, articleLinkId: 5565266 },
];

export default function Page() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [err, setErr] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState(false);
  async function run() {
    setLoading(true);
    setErr(undefined);
    try {
      const r = await fetch("/api/assigned-articles-by-ids", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          articleIdPairs: demoPairs,
          linkingTargetType: "P",
          linkingTargetId: 8772,
          manuId: 121,
          modId: 463,
        }),
      });
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
          <CardTitle>Assigned Articles by IDs 6</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Button onClick={run} disabled={loading}>
            {loading ? "Laden…" : "Voorbeeld laden"}
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
                  <TableHead>Naam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-muted-foreground">
                      Nog niets opgehaald
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r: any, i: number) => (
                  <TableRow key={r?.articleId ?? i}>
                    <TableCell className="font-medium">
                      {r?.articleId ?? r?.id}
                    </TableCell>
                    <TableCell>{r?.articleName ?? r?.name}</TableCell>
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
