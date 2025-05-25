import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface Props {
  model: tf.LayersModel;
  featureKeys: string[];
}

export default function PredictForm({ model, featureKeys }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [raw, setRaw] = useState(""); // рядок з «;»
  const [prob, setProb] = useState<number | null>(null);
  const [err, setErr] = useState("");

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

    // перевіряємо повноту
    for (let k of featureKeys) {
      if (!inputs[k]) {
        setErr(`Заповніть поле «${k}».`);
        return;
      }
    }

    const z = (v: number, i: number) => (v - scaler.mean[i]) / scaler.std[i];
    const row = featureKeys.map((k, i) =>
      z(Number(inputs[k].replace(",", ".")) || 0, i)
    );

    const x = tf.tensor2d([row]);
    const y = model.predict(x) as tf.Tensor;
    y.data().then((d) => {
      setProb(d[0]);
      tf.dispose([x, y]);
      setErr("");
    });
  };

  return (
    <section className="bg-gray-800/70 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-semibold mb-6">3️⃣ Прогноз ризику відтоку</h2>

      {/* ——— строка для швидкого заповнення ——— */}
      <div className="mb-6">
        <textarea
          rows={2}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={`Введіть ${featureKeys.length} значень через \";\"`}
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

      {/* ——— ручне редагування кожної ознаки ——— */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {featureKeys.map((k) => (
          <div key={k} className="flex flex-col">
            <label className="mb-1 text-sm">{k}</label>
            <input
              value={inputs[k] || ""}
              onChange={(e) =>
                setInputs((p) => ({ ...p, [k]: e.target.value }))
              }
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
        <p className="text-lg mt-4">
          Ймовірність відтоку:&nbsp;
          <span className="font-semibold">{(prob * 100).toFixed(1)}%</span>
        </p>
      )}
    </section>
  );
}
