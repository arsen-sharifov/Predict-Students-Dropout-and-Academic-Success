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

  const handleTrain = async () => {
    setTraining(true);
    setValAcc(null);

    const norm = (s: string) => (s ?? "").toString().trim().toLowerCase();
    const records = data
      .filter((r) =>
        ["dropout", "graduate", "graduated"].includes(norm(r.Target))
      )
      .map((r) => ({
        x: featureKeys.map((k) => +r[k] || 0),
        y: norm(r.Target) === "dropout" ? 1 : 0,
      }));

    if (!records.length) {
      alert("У датасеті немає рядків з мітками Dropout / Graduate.");
      setTraining(false);
      return;
    }

    tf.util.shuffle(records, SEED);

    const featCnt = featureKeys.length;
    const trainCnt = Math.floor(records.length * 0.8);
    const trainR = records.slice(0, trainCnt);
    const valR = records.slice(trainCnt);

    const mean = Array(featCnt).fill(0);
    const std = Array(featCnt).fill(0);
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

    const toTensor = (recs: typeof records) => ({
      xs: tf.tensor2d(
        recs.map((r) => r.x.map((v, i) => z(v, i))),
        [recs.length, featCnt]
      ),
      ys: tf.tensor2d(
        recs.map((r) => [r.y]),
        [recs.length, 1]
      ),
    });

    const { xs: trainXs, ys: trainYs } = toTensor(trainR);
    const { xs: valXs, ys: valYs } = toTensor(valR);

    const dropCnt = trainR.filter((r) => r.y === 1).length;
    const gradCnt = trainR.length - dropCnt;
    const classWeight = {
      0: trainR.length / (2 * gradCnt),
      1: trainR.length / (2 * dropCnt),
    };

    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 32, activation: "relu", inputShape: [featCnt] })
    );
    model.add(tf.layers.dropout({ rate: 0.2 }));
    model.add(tf.layers.dense({ units: 16, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
    model.compile({
      optimizer: tf.train.adam(1e-3),
      loss: "binaryCrossentropy",
      metrics: ["accuracy"],
    });

    await model.fit(trainXs, trainYs, {
      epochs: 60,
      batchSize: 32,
      validationData: [valXs, valYs],
      classWeight,
      verbose: 0,
      callbacks: {
        onEpochEnd: (_e, logs) => {
          if (logs?.val_accuracy != null)
            setValAcc(logs.val_accuracy as number);
        },
      },
    });

    (window as any).__SCALER__ = { mean, std };

    tf.dispose([trainXs, trainYs, valXs, valYs]);
    setTraining(false);
    onTrained(model);
  };

  return (
    <section className="mb-10">
      <h2 className="font-semibold text-lg mb-2">2️⃣ Train model</h2>
      <button
        onClick={handleTrain}
        disabled={training}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {training ? "Training…" : "Train"}
      </button>
      {valAcc !== null && (
        <p className="mt-3">
          Validation accuracy:&nbsp;
          <b>{(valAcc * 100).toFixed(2)}%</b>
        </p>
      )}
    </section>
  );
}
