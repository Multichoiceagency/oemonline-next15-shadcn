/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";

export default function Page() {
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      const r = await fetch("/api/categories");
      setData(await r.json());
    })();
  }, []);
  return (
    <pre className="px-6 text-xs overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
