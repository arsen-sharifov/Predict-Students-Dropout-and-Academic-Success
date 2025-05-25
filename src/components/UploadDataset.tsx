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
      transformHeader: (h) => h.trim().replace(/\"+/g, ""),
      complete: ({ data }) => {
        if (!data.length) {
          setErr("CSV порожній або некоректний.");
          return;
        }
        const keys = Object.keys(data[0]).filter((k) => k !== "Target");
        onReady(data, keys);
      },
      error: (e) => setErr(`Помилка парсингу: ${e.message}`),
    });
  };

  return (
    <section className="bg-gray-800/70 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-semibold mb-6">1️⃣ Завантажте датасет</h2>

      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block w-full text-gray-100 file:bg-indigo-600 file:hover:bg-indigo-700
                   file:border-0 file:rounded-md file:px-5 file:py-2 cursor-pointer"
      />

      {err && <p className="text-red-400 mt-4">{err}</p>}
    </section>
  );
}
