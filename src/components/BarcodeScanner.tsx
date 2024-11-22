import React, { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const BarcodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [code, setCode] = useState<string | null>(null);

  const startScanner = async () => {
    const codeReader = new BrowserMultiFormatReader();
    try {
      const devices = await codeReader.listVideoInputDevices();
      const selectedDeviceId =
        devices.find((device) => device.label.includes("back"))?.deviceId ||
        devices[0]?.deviceId;

      await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current!,
        (result) => {
          if (result) {
            setCode(result.getText());
            codeReader.reset();
          }
        }
      );
    } catch (error) {
      console.error("Error initializing barcode scanner:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Barcode Scanner</h1>
      {code ? (
        <div className="text-center">
          <p className="mb-4 text-lg">
            Scanned Code: <strong>{code}</strong>
          </p>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => setCode(null)}
          >
            Scan Again
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            className="mb-4 w-full max-w-sm rounded shadow-md"
          />
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
