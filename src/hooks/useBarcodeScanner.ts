import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export const useBarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [code, setCode] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  const startScanner = async () => {
    setError(null);
    setScannerActive(true);
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;
    try {
      const devices = await codeReader.listVideoInputDevices();
      if (devices.length === 0) {
        throw new Error("No video input devices found");
      }

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
            setScannerActive(false);
          }
        }
      );
    } catch (error: any) {
      console.error("Error initializing barcode scanner:", error);
      setError(error.message || "An error occurred while reading the barcode.");
    }
  };

  const stopScanner = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      tracks?.forEach((track) => track.stop());
    }
    setScannerActive(false);
    setCode(null);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return { videoRef, code, scannerActive, error, startScanner, stopScanner };
};
