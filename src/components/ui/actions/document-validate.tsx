import { useDebounce } from "@/lib/fonesa";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ComponentWrapper } from "./action-container-wrapper";
import ComponentHeader from "../container-header";
import Generics from "../generics";
import { mapPaths } from "@/lib/map";
import { Document, Documents } from "@/lib/document";
import { Camera } from "react-camera-pro";
import { isEmpty } from "@/lib/utils";
import { stat } from "fs";

export const Validate = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [inputData, setInputData] = useState<Record<string, string>>({});
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (selectedDocument) {
      selectedDocument.fields.forEach(item => {
        setInputData((prev) => ({ ...prev, [item.id]: '' }));
      });
    }
  }, [selectedDocument]);

  const applyData = useDebounce((key: string, value: string) => {
    setInputData((prev) => ({ ...prev, [key]: value }));

    setInputErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }, 250);

  const redirect = () => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    for (const key in inputData) {
      if (isEmpty(inputData[key])) {
        newErrors[key] = "Campo é obrigatório";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setInputErrors(newErrors);
      return;
    }

    if (selectedState) {
      const stateInfo = mapPaths.find((item) => item.uf === selectedState);
      if (stateInfo?.hasSig) {
        const queryParams = new URLSearchParams();
        switch (selectedDocument?.type) {
          case 'gta':
            queryParams.append('numero', inputData['number'].replace(/\D/g, ''));
            queryParams.append('serie', inputData['serie'].toUpperCase());
            queryParams.append('documento', inputData['document'].replace(/\D/g, ''));
            break;
          case 'ptv':
            queryParams.append('numero', inputData['number'].replace(/\D/g, ''));
            break;
          default:
            break;
        }
        const redirectUrl = `${stateInfo.prodUrl}sem-login/validar-gta/visualizar?${queryParams.toString()}`;
        window.open(redirectUrl, '_blank');
      }
    }
  };

  return (
    <ComponentWrapper className="p-4 gap-4">
      <Modal
        classNames={{
          header: "border-b-[1px] border-[#e0e0e0] dark:border-[#2e2e2e]",
        }}
        backdrop="blur"
        placement="top"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#212121] dark:text-[#fafafa]">
                <h2>Aponte para o código de barras</h2>
                <p className="text-sm font-normal">Ababa teste</p>
              </ModalHeader>
              <ModalBody>
                <div
                  id="scanner-container"
                  className="relative grid content-center overflow-hidden w-full h-64 mt-2 rounded-md bg-[#d6d6d6] dark:bg-[#212121]"
                >
                  <Camera
                    facingMode="environment"
                    errorMessages={{
                      noCameraAccessible: "",
                      permissionDenied: "",
                    }}
                  />
                  <span className="material-symbols-rounded text-center text-[8rem] text-[#b1b1b1] dark:text-[#525252] select-none">
                    no_photography
                  </span>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat">
                  Buscar
                </Button>
                <Button color="default" variant="flat" onPress={onClose}>
                  Sair
                </Button>
              </ModalFooter>
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
              applyData("state", key as string);
            }}
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
            isDisabled={!selectedState}
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
          <div className="flex flex-row gap-4">
            {selectedDocument.fields.map((field) => (
              <Input
                key={field.id}
                className="flex-1"
                size="md"
                variant="faded"
                classNames={{
                  base: "relative",
                  helperWrapper: "absolute -bottom-[20px] left-0",
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  applyData(field.id, value);
                }}
                type={field.type}
                label={field.label}
                isDisabled={!selectedState}
                isRequired
                isInvalid={!!inputErrors[field.id]}
                errorMessage={inputErrors[field.id]}
              />
            ))}
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
