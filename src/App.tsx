import { useState } from "react";
import UploadDataset from "./components/UploadDataset";
import TrainScreen from "./components/TrainScreen";
import PredictForm from "./components/PredictForm";
import * as tf from "@tensorflow/tfjs";

export default function App() {
  const [dataset, setDataset] = useState<any[] | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [featureKeys, setFeatureKeys] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800 px-6 py-4 shadow flex items-center gap-6">
        <img
          src="../assets/image.png"
          alt="Лого університету"
          className="h-12 w-auto shrink-0"
        />
        <div>
          <p className="text-sm">Розроблено студентом групи САМ-11</p>
          <p className="font-semibold">Шаріфов А.А.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
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
    </div>
  );
}
