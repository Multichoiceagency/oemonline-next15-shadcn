/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractArray } from "@/lib/normalize";

export default function Page() {
  const [manus, setManus] = React.useState<any[]>([]);
  const [models, setModels] = React.useState<any[]>([]);
  const [types, setTypes] = React.useState<any[]>([]);
  React.useEffect(() => {
    (async () => {
      const r = await fetch("/api/vehicles?mode=manufacturers");
      const j = await r.json();
      setManus(extractArray(j));
    })();
  }, []);
  async function pickManu(id: number) {
    setModels([]);
    setTypes([]);
    const r = await fetch(`/api/vehicles?mode=models&manufacturerId=${id}`);
    const j = await r.json();
    setModels(extractArray(j));
  }
  async function pickModel(id: number) {
    setTypes([]);
    const r = await fetch(`/api/vehicles?mode=types&modelSeriesId=${id}`);
    const j = await r.json();
    setTypes(extractArray(j));
  }
  return (
    <div className="px-4 lg:px-6 grid gap-6 md:grid-cols-3">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Merken</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 max-h-96 overflow-auto">
          {manus.map((m: any) => (
            <button
              key={m.id}
              onClick={() => pickManu(m.id)}
              className="w-full text-left px-3 py-1 rounded hover:bg-muted"
            >
              {m.name}
            </button>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Modellen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 max-h-96 overflow-auto">
          {models.map((m: any) => (
            <button
              key={m.id}
              onClick={() => pickModel(m.id)}
              className="w-full text-left px-3 py-1 rounded hover:bg-muted"
            >
              {m.name}
            </button>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Types / Bouwjaar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 max-h-96 overflow-auto">
          {types.map((t: any) => (
            <div key={t.id} className="px-3 py-1 rounded bg-muted/30">
              {t.name}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
