import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface Props {
  model: tf.LayersModel;
  featureKeys: string[];
}

export default function PredictForm({ model, featureKeys }: Props) {
  const [rawStr, setRawStr] = useState("");
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [prob, setProb] = useState<number | null>(null);
  const [err, setErr] = useState("");

  const parseNum = (s: string) => Number(s.replace(",", "."));

  const handleParse = () => {
    const parts = rawStr
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (parts.length !== featureKeys.length) {
      setErr(`Очікую ${featureKeys.length} значень, отримано ${parts.length}`);
      return;
    }
    const next: Record<string, number> = {};
    featureKeys.forEach((k, i) => (next[k] = parseNum(parts[i]) || 0));
    setInputs(next);
    setErr("");
  };

  const handlePredict = () => {
    const scaler = (window as any).__SCALER__ as
      | { mean: number[]; std: number[] }
      | undefined;

    if (!scaler) {
      setErr("Сеанс ще не тренувався — немає скейлера.");
      return;
    }

    const z = (v: number, i: number) => (v - scaler.mean[i]) / scaler.std[i];

    const x = tf.tensor2d([featureKeys.map((k, i) => z(inputs[k] ?? 0, i))]);

    const y = model.predict(x) as tf.Tensor;
    y.data().then((d) => {
      setProb(d[0]);
      tf.dispose([x, y]);
    });
  };

  return (
    <section>
      <h2 className="font-semibold text-lg mb-4">3️⃣ Прогноз ризику відтоку</h2>

      <textarea
        rows={2}
        value={rawStr}
        onChange={(e) => setRawStr(e.target.value)}
        placeholder={featureKeys.join(";")}
        className="w-full border p-2 rounded mb-2"
      />
      <button
        onClick={handleParse}
        className="bg-yellow-500 text-white px-3 py-1 rounded mb-6"
      >
        Parse
      </button>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {featureKeys.map((k) => (
          <input
            key={k}
            type="text"
            placeholder={k}
            value={inputs[k] ?? ""}
            onChange={(e) =>
              setInputs((p) => ({ ...p, [k]: parseNum(e.target.value) }))
            }
            className="border p-1 rounded text-sm"
          />
        ))}
      </div>

      <button
        onClick={handlePredict}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>

      {err && <p className="text-red-600 mt-3">{err}</p>}
      {prob !== null && !err && (
        <p className="mt-4 text-xl">
          Ймовірність Dropout:&nbsp;
          <span className="font-semibold">{(prob * 100).toFixed(1)}%</span>
        </p>
      )}
    </section>
  );
}
