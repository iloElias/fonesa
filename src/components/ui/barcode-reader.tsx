import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, ModalBody, ModalFooter, Input } from "@nextui-org/react";
import { NoCameraFill } from "./fonesa-icons";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { BrowserMultiFormatReader } from "@zxing/library";

interface BarcodeScannerProps {
  onClose: () => void;
  applyData: (key: string, value: string) => void;
}

const BarcodeScanner = ({ onClose, applyData }: BarcodeScannerProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerInstance = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    if (scannerInstance.current && scannerInstance.current.getState() === Html5QrcodeScannerState.SCANNING) {
      scannerInstance.current.stop().catch(() => setError("Erro ao parar a câmera."));
      scannerInstance.current = null;
    }
  }, []);

  const startCamera = useCallback(() => {
    if (scannerRef.current) {
      const { clientWidth, clientHeight } = scannerRef.current;
      if (clientWidth === 0 || clientHeight === 0) {
        setError("Camera container is not visible.");
        return;
      }
      const newScanner = new Html5Qrcode(scannerRef.current.id);
      scannerInstance.current = newScanner;

      newScanner
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              height: 75,
              width: 250,
            },
          },
          (decodedText: string) => {
            applyData("barcode", decodedText);
            stopCamera();
          },
          (errorMessage: string) => {
            if (errorMessage.includes("NotFoundException")) {
              setError("Nenhum código de barras detectado.");
            } else {
              setError(errorMessage);
            }
          }
        )
        .catch((error) => {
          console.error("Error starting camera:", error);
          setError("Erro ao iniciar a câmera.");
        });
    }
  }, [applyData, stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setError(null);
        const decodedText = await decodeBarcodeFromImage(reader.result);
        if (decodedText) {
          applyData("barcode", decodedText);
          onClose();
        } else {
          setError("Nenhum código de barras detectado.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeBarcodeFromImage = async (
    imageData: string | ArrayBuffer | null
  ) => {
    if (!imageData) return null;

    const codeReader = new BrowserMultiFormatReader();
    try {
      const result = await codeReader.decodeFromImageUrl(imageData as string);
      return result?.getText() || null;
    } catch {
      setError("Erro ao decodificar o código de barras da imagem.");
      return null;
    }
  };

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
          <div ref={scannerRef} id="scanner-container" className="absolute z-10 top-0 left-0 min-w-full min-h-full" />
          <NoCameraFill className="text-[8rem] text-[#b1b1b1] dark:text-[#525252] select-none" />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </ModalBody>
      <ModalFooter className="flex justify-between items-center">
        <Input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          id="file-input"
        />
        <Button
          color="default"
          variant="flat"
          onPress={() => document.getElementById("file-input")?.click()}
        >
          Enviar imagem
        </Button>
        <Button color="default" variant="flat" onPress={onClose}>
          Sair
        </Button>
      </ModalFooter>
    </>
  );
};

export default BarcodeScanner;
