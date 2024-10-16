import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { ComponentWrapper } from "./action-container-wrapper";
import ComponentHeader from "../container-header";
import Generics from "../generics";
import { mapPaths } from "@/lib/map";
import { Document, Documents } from "@/lib/document";
// import { Camera } from "react-camera-pro";
import { isEmpty } from "@/lib/utils";
import { X } from "../fonesa-icons";
import { RenderFields } from "../fields-renderer";
import BarcodeScanner from "../barcode-reader";
import { MapContext } from "@/pages";

export const Validate = () => {
  const { selectedState, handleClick } = useContext(MapContext);
  const [selectedStateUf, setSelectedState] = useState<string | null>(
    selectedState?.uf ?? null
  );
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [inputData, setInputData] = useState<Record<string, string>>({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setInputData({});
    selectedDocument?.fields.forEach((element) => {
      setInputData((prev) => ({ ...prev, [element.id]: "" }));
    });
  }, [selectedDocument, selectedStateUf]);

  const applyData = (key: string, value: string) => {
    setInputData((prev) => ({ ...prev, [key]: value }));

    setInputErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const redirect = () => {
    console.log(inputData);

    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    for (const element of selectedDocument?.fields || []) {
      const conditional =
        element.conditional && element.conditional({ state: selectedStateUf });
      const value = inputData[element.id];

      if (!conditional && element.mandatory && isEmpty(value)) {
        newErrors[element.id] = "Campo é obrigatório";
        hasErrors = true;
      } else if (!conditional) {
        const validationError = element.validate ? element.validate(value) : "";
        if (validationError) {
          newErrors[element.id] = validationError;
          hasErrors = true;
        }
      }
    }

    if (hasErrors) {
      setInputErrors(newErrors);
      console.log(newErrors);
      return;
    }

    if (selectedStateUf && selectedDocument) {
      const stateInfo = mapPaths.find((item) => item.uf === selectedStateUf);
      if (stateInfo?.hasSig) {
        const queryParams = new URLSearchParams();
        switch (selectedDocument?.type) {
          case "gta":
            const numero = inputData["barcode"];
            // const serie = inputData["serie"];
            queryParams.append("nu_codigobarra", numero);
            // queryParams.append("serie", serie);
            if (inputData["document"]) {
              queryParams.append(
                "documento",
                inputData["document"].replace(/\D/g, "")
              );
            }
            break;
          case "ptv":
            queryParams.append(
              "numero",
              inputData["number"].replace(/\D/g, "")
            );
            break;
          default:
            break;
        }
        const redirectUrl = `${stateInfo.prodUrl}${
          selectedDocument.path
        }?${queryParams.toString()}`;
        window.open(redirectUrl, "_blank");
      }
    }
  };

  return (
    <ComponentWrapper className="p-4 gap-4">
      <Modal
        classNames={{
          header: "border-b-[1px] border-[#e0e0e0] dark:border-[#2e2e2e]",
          closeButton: "rounded-xl",
        }}
        closeButton={
          <Generics.Button
            color="default"
            variant="bordered"
            size="md"
            className="h-14 text-2xl text-[#fafafa] order-last"
          >
            <X className="text-[#fafafa]" />
          </Generics.Button>
        }
        backdrop="blur"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#212121] dark:text-[#fafafa]">
                <h2>Aponte para o código de barras</h2>
                <p className="text-sm font-normal">
                  O código será escaneado automaticamente
                </p>
              </ModalHeader>
              <BarcodeScanner onClose={onClose} applyData={applyData} />
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 w-full">
        <ComponentHeader
          title="Digite código de barras abaixo"
          subTitle="Clique com o cursor no botão abaixo para validar os documentos"
        />
        <Generics.Divisor direction="horizontal" />
      </div>

      <div className="flex-1 flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4">
          <Autocomplete
            className="flex-1"
            onSelectionChange={(key) => {
              setSelectedState(key as string);
              const state = mapPaths.find((item) => item.uf === key);
              if (state) {
                handleClick(state);
              }
              applyData("state", key as string);
            }}
            inputValue={selectedState?.name}
            size="md"
            variant="faded"
            label="Selecione o estado"
            isRequired
          >
            {mapPaths.map((item) => (
              <AutocompleteItem
                color="default"
                className="text-[#212121] dark:text-[#fafafa]"
                key={item.uf}
                startContent={
                  <Image
                    alt={item.name}
                    src={item.flagUrl}
                    width={24}
                    height={24}
                  />
                }
              >
                {item.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Select
            size="md"
            color="default"
            variant="faded"
            label="Tipo de documento"
            className="flex-1 max-w-xs"
            onChange={(key) => {
              setSelectedDocument(
                Documents.find((doc) => doc.type === key.target.value) || null
              );
              applyData("document_type", key.target.value);
            }}
            isDisabled={!selectedStateUf}
          >
            {Documents.map((doc) => (
              <SelectItem
                className="text-[#212121] dark:text-[#fafafa]"
                key={doc.type}
                value={doc.type}
              >
                {doc.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        {selectedDocument && (
          <div className="flex flex-col gap-4">
            <RenderFields
              fields={selectedDocument?.fields || []}
              maxPerRow={2}
              inputData={inputData}
              inputErrors={inputErrors}
              applyData={applyData}
              openBarcodeScanner={onOpen}
              disabled={!selectedStateUf || !selectedDocument}
              selectedState={selectedStateUf}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 w-full">
        <Button
          type="submit"
          color="primary"
          variant="solid"
          size="md"
          className="w-full"
          onPress={() => {
            redirect();
          }}
        >
          Validar
        </Button>
      </div>
    </ComponentWrapper>
  );
};
