import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ModalBody, ModalFooter } from "@nextui-org/react";
import { NoCameraFill } from "./fonesa-icons";
import { BrowserMultiFormatReader } from "@zxing/library";

interface BarcodeScannerProps {
  onClose: () => void;
  applyData: (key: string, value: string) => void;
}

const BarcodeScanner = ({ onClose, applyData }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = useCallback(() => {
    if (videoRef.current) {
      setError(null);
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
          setIsCameraActive(true);
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setError("Erro ao acessar a câmera.");
        });
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  }, []);

  const decodeBarcodeFromImage = useCallback(
    async (imageDataUrl: string) => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const result = await codeReader.decodeFromImageUrl(imageDataUrl);
        applyData("barcode", result.getText());
        onClose();
      } catch (error) {
        console.error("Error decoding barcode:", error);
        setError("Nenhum código de barras detectado.");
      }
    },
    [applyData, onClose]
  );

  const captureImage = useCallback(() => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const imageDataUrl = canvasRef.current.toDataURL("image/png");
        decodeBarcodeFromImage(imageDataUrl);
      }
    }
  }, [decodeBarcodeFromImage]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <>
      <ModalBody>
        <div className="relative flex justify-center items-center overflow-hidden w-full h-64 mt-2 rounded-md bg-[#d6d6d6] dark:bg-[#212121]">
          {isCameraActive ? (
            <video
              ref={videoRef}
              className="absolute top-0 left-0 min-w-full min-h-full object-contain"
            />
          ) : (
            <NoCameraFill className="text-[8rem] text-[#b1b1b1] dark:text-[#525252] select-none" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </ModalBody>
      <ModalFooter className="flex justify-between items-center">
        <Button color="default" variant="flat" onPress={captureImage}>
          Tirar Foto e Escanear
        </Button>
        <Button color="default" variant="flat" onPress={onClose}>
          Sair
        </Button>
      </ModalFooter>
    </>
  );
};

export default BarcodeScanner;
