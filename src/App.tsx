import React, { useState } from "react";
import UploadDataset from "./components/UploadDataset";
import TrainScreen from "./components/TrainScreen";
import PredictForm from "./components/PredictForm";
import InfoPanel from "./components/InfoPanel";
import * as tf from "@tensorflow/tfjs";

export default function App() {
  const [dataset, setDataset] = useState<any[] | null>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [featureKeys, setFeatureKeys] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 px-6 py-4 shadow flex items-center gap-6">
        <img
          src="../assets/image.png"
          alt="Логотип університету"
          className="h-14 w-auto"
        />
        <div className="text-sm">
          <p>Розроблено студентом групи САМ-11</p>
          <p className="font-semibold">Шаріфов А.А.</p>
        </div>
      </header>

      <main
        className={`${
          showInfo ? "max-w-[90vw]" : "max-w-5xl"
        } mx-auto px-6 py-10`}
      >
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
            onTrained={setModel}
          />
        )}

        {dataset && model && (
          <div className="flex items-start space-x-6">
            <div className="flex-1 relative w-full max-w-[1200px]">
              <PredictForm model={model} featureKeys={featureKeys} />

              <button
                onClick={() => setShowInfo((prev) => !prev)}
                className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full focus:outline-none ${
                  showInfo
                    ? "bg-gray-700 text-white"
                    : "bg-yellow-500 text-white animate-pulse"
                } text-2xl`}
                aria-label="Показати/приховати опис змінних"
              >
                ?
              </button>
            </div>

            {showInfo && (
              <div className="flex-1 overflow-y-auto max-h-[80vh]">
                <InfoPanel />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
