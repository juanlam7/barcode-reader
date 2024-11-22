import React from "react";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";

const BarcodeScanner: React.FC = () => {
  const { videoRef, code, scannerActive, error, startScanner, stopScanner } =
    useBarcodeScanner();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Barcode Scanner</h1>
      {error && (
        <div className="text-red-500 mb-4 text-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      {code ? (
        <>
          <p className="mb-4 text-lg break-words max-w-xs sm:max-w-md">
            Scanned Code: <strong>{code}</strong>
          </p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={stopScanner}
          >
            Scan Again
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            className={`mb-4 w-full max-w-sm rounded shadow-md ${
              !scannerActive ? "hidden" : ""
            }`}
          />
          {!scannerActive && (
            <div className="mb-4 w-64 h-36 max-w-sm rounded flex text-center items-center shadow-md">
              <p className="flex text-center items-center">
                Press 'Start Scanner' button to read a barcode
              </p>
            </div>
          )}
          <button
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            onClick={startScanner}
          >
            Start Scanner
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
