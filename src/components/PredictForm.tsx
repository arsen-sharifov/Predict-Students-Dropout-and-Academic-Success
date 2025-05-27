import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface Props {
  model: tf.LayersModel;
  featureKeys: string[];
}

export default function PredictForm({ model, featureKeys }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [raw, setRaw] = useState("");
  const [prob, setProb] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [reasons, setReasons] = useState<{ k: string; z: number }[]>([]);

  const handleParse = () => {
    const parts = raw
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length !== featureKeys.length) {
      setErr(`Очікую ${featureKeys.length} значень, отримано ${parts.length}.`);
      return;
    }
    const next: Record<string, string> = {};
    featureKeys.forEach((k, i) => (next[k] = parts[i]));
    setInputs(next);
    setErr("");
  };

  const predict = () => {
    const scaler = (window as any).__SCALER__ as
      | { mean: number[]; std: number[] }
      | undefined;
    if (!scaler) {
      setErr("Спочатку натренуйте модель.");
      return;
    }

    for (let k of featureKeys) {
      if (!inputs[k]) {
        setErr(`Заповніть поле «${k}».`);
        return;
      }
    }

    const z = (v: number, i: number) => (v - scaler.mean[i]) / scaler.std[i];
    const row: number[] = [];
    const zValues: number[] = [];

    featureKeys.forEach((k, i) => {
      const num = Number(inputs[k].replace(",", ".")) || 0;
      const zi = z(num, i);
      row.push(zi);
      zValues.push(zi);
    });

    const x = tf.tensor2d([row]);
    const y = model.predict(x) as tf.Tensor;
    y.data().then((d) => {
      setProb(d[0]);
      tf.dispose([x, y]);
    });

    const indexed = zValues.map((zv, i) => ({ k: featureKeys[i], z: zv }));
    indexed.sort((a, b) => Math.abs(b.z) - Math.abs(a.z));
    setReasons(indexed.slice(0, 5));
    setErr("");
  };

  const handleChange = (k: string, v: string) =>
    setInputs((p) => ({ ...p, [k]: v }));

  return (
    <section className="bg-gray-800/70 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-semibold mb-6">3️⃣ Прогноз ризику відтоку</h2>

      <div className="mb-6">
        <textarea
          rows={2}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={`Введіть ${featureKeys.length} значень через ';'`}
          className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-sm
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleParse}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-1 rounded"
        >
          Розпарсити рядок
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {featureKeys.map((k) => (
          <div key={k} className="flex flex-col">
            <label className="mb-1 text-sm">{k}</label>
            <input
              value={inputs[k] || ""}
              onChange={(e) => handleChange(k, e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={predict}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Прогнозувати
      </button>

      {err && <p className="text-red-400 mt-4">{err}</p>}

      {prob !== null && !err && (
        <div className="mt-6 space-y-4">
          <p className="text-lg">
            Ймовірність відтоку:&nbsp;
            <span className="font-semibold">{(prob * 100).toFixed(1)}%</span>
          </p>

          <div className="bg-gray-700/60 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Потенційні причини ризику</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {reasons.map(({ k, z }) => (
                <li key={k}>
                  <b>{k}</b> &nbsp;
                  <span className="italic text-gray-300">
                    (σ&nbsp;{z.toFixed(2)} від середнього)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
