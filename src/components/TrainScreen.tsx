import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

interface Props {
  data: any[];
  featureKeys: string[];
  onTrained: (m: tf.LayersModel) => void;
}

const SEED = 123;

export default function TrainScreen({ data, featureKeys, onTrained }: Props) {
  const [training, setTraining] = useState(false);
  const [valAcc, setValAcc] = useState<number | null>(null);

  const train = async () => {
    setTraining(true);
    setValAcc(null);

    const norm = (s = "") => s.trim().toLowerCase();
    const recs = data
      .filter((r) =>
        ["dropout", "graduate", "graduated"].includes(norm(r.Target))
      )
      .map((r) => ({
        x: featureKeys.map((k) => +r[k] || 0),
        y: norm(r.Target) === "dropout" ? 1 : 0,
      }));

    if (!recs.length) {
      alert("Немає рядків із мітками Dropout/Graduate.");
      setTraining(false);
      return;
    }

    tf.util.shuffle(recs, SEED);

    const F = featureKeys.length;
    const split = Math.floor(recs.length * 0.8);
    const trainR = recs.slice(0, split);
    const valR = recs.slice(split);

    // Z-score
    const mean = Array(F).fill(0);
    const std = Array(F).fill(0);
    trainR.forEach((r) => r.x.forEach((v, i) => (mean[i] += v)));
    mean.forEach((_, i) => (mean[i] /= trainR.length));
    trainR.forEach((r) =>
      r.x.forEach((v, i) => {
        const d = v - mean[i];
        std[i] += d * d;
      })
    );
    std.forEach((_, i) => (std[i] = Math.sqrt(std[i] / trainR.length) || 1e-8));
    const z = (v: number, i: number) => (v - mean[i]) / std[i];

    const tensor = (arr: typeof recs) => ({
      xs: tf.tensor2d(
        arr.map((r) => r.x.map((v, i) => z(v, i))),
        [arr.length, F]
      ),
      ys: tf.tensor2d(
        arr.map((r) => [r.y]),
        [arr.length, 1]
      ),
    });
    const { xs: tXs, ys: tYs } = tensor(trainR);
    const { xs: vXs, ys: vYs } = tensor(valR);

    const dCnt = trainR.filter((r) => r.y === 1).length;
    const gCnt = trainR.length - dCnt;
    const cw = { 0: trainR.length / (2 * gCnt), 1: trainR.length / (2 * dCnt) };

    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 32, activation: "relu", inputShape: [F] })
    );
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
    model.compile({
      optimizer: tf.train.adam(1e-3),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    await model.fit(tXs, tYs, {
      epochs: 60,
      batchSize: 32,
      validationData: [vXs, vYs],
      classWeight: cw,
      verbose: 0,
      callbacks: {
        onEpochEnd: (_, logs) => {
          if (logs?.val_accuracy) setValAcc(logs.val_accuracy as number);
        },
      },
    });

    (window as any).__SCALER__ = { mean, std };
    tf.dispose([tXs, tYs, vXs, vYs]);
    setTraining(false);
    onTrained(model);
  };

  return (
    <section className="bg-gray-800/70 rounded-xl p-8 shadow">
      <h2 className="text-2xl font-semibold mb-6">2️⃣ Навчити модель</h2>

      <button
        onClick={train}
        disabled={training}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
      >
        {training ? "Навчання…" : "Навчити"}
      </button>

      {valAcc != null && (
        <p className="mt-4">
          Валідаційна точність:&nbsp;
          <b>{(valAcc * 100).toFixed(2)}%</b>
        </p>
      )}
    </section>
  );
}
