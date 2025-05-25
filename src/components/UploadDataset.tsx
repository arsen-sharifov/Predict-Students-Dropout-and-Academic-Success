import React, { useRef, useState } from "react";
import Papa from "papaparse";

interface Props {
  onReady: (rows: any[], featureKeys: string[]) => void;
}

export default function UploadDataset({ onReady }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState("");

  const handleFile = () => {
    const f = fileRef.current?.files?.[0];
    if (!f) return;

    Papa.parse(f, {
      header: true,
      delimiter: ";",
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (h) => h.trim().replace(/"+/g, ""),
      complete: ({ data }) => {
        if (!data.length) {
          setErr("CSV порожній");
          return;
        }
        const featureKeys = Object.keys(data[0]).filter((k) => k !== "Target");
        onReady(data, featureKeys);
      },
      error: (e) => setErr(`Помилка парсингу: ${e.message}`),
    });
  };

  return (
    <section className="mb-10">
      <h2 className="font-semibold text-lg mb-2">
        1️⃣ Завантажте датасет (CSV із “;”)
      </h2>
      <input type="file" accept=".csv" ref={fileRef} onChange={handleFile} />
      {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
    </section>
  );
}
