import React, { useState } from "react";
import UploadDataset from "./components/UploadDataset";
import TrainScreen from "./components/TrainScreen";
import PredictForm from "./components/PredictForm";
import * as tf from "@tensorflow/tfjs";

export default function App() {
  const [dataset, setDataset] = useState<any[] | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [featureKeys, setFeatureKeys] = useState<string[]>([]);

  return (
    <>
      <header className="bg-white shadow mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Uni-logo" className="h-8 w-8" />
            <span className="font-semibold text-xl">
              Student Churn Predictor
            </span>
          </div>
          <span className="font-medium">Ім'я Прізвище</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-16">
        {!dataset && (
          <UploadDataset
            onReady={(rows, keys) => {
              setDataset(rows);
              setFeatureKeys(keys);
              setModel(null);
            }}
          />
        )}

        {dataset && !model && (
          <TrainScreen
            data={dataset}
            featureKeys={featureKeys}
            onTrained={(m) => setModel(m)}
          />
        )}

        {dataset && model && (
          <PredictForm model={model} featureKeys={featureKeys} />
        )}
      </main>
    </>
  );
}
