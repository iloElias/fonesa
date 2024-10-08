"use client";
import { cn } from "@/lib/utils";
import CountryMap from "../functional/country-map";
import Generics from "./generics";
import { Input, Tab, Tabs } from "@nextui-org/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { MapContext } from "@/pages";
import FonesaIcons from "./fonesa-icons";
import Image from "next/image";
<Generics.Button
  id="goto"
  variant="solid"
  color="primary"
  className="w-[324px] h-12"
>
  Acessar Manual
</Generics.Button>;

export interface StateActions {
  key: string;
  name: string;
  description: string;
  icon: string;
  component: () => ReactElement;
}

const ComponentWrapper = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 justify-between items-center w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ComponentHeaderProps {
  title: string;
  subTitle: string;
  flagUrl?: string | null;
}

const ComponentHeader = ({
  title,
  subTitle,
  flagUrl,
}: ComponentHeaderProps) => {
  return (
    <div className="flex flex-row font-[inter] justify-between w-full">
      <div
        className={cn(
          "flex flex-1 flex-col items-start gap-2 max-w-full",
          flagUrl && "max-w-[calc(100%-90px)]"
        )}
      >
        <strong className="max-h-min max-w-full text-lg truncate" title={title}>
          {title}
        </strong>
        <p className="max-h-min max-w-full text-sm truncate" title={subTitle}>{subTitle}</p>
      </div>
      {flagUrl && (
        <Image
          src={flagUrl}
          alt="Flag"
          className="w-20 h-14 rounded-sm object-cover"
          height={56}
          width={140}
        />
      )}
    </div>
  );
};

const Validate = () => {
  return (
    <ComponentWrapper className="p-4 gap-4">
      <div className="flex flex-col gap-4 w-full">
        <ComponentHeader
          title="Digite código de barras abaixo"
          subTitle="Clique com o cursor no botão abaixo para validar os documentos"
        />
        <Generics.Divisor direction="horizontal" />
      </div>
      <div className="flex-1 w-full">
        <Input
          size="md"
          classNames={{
            inputWrapper: cn(
              "inline-flex transition-colors duration-[50ms] m-1 mx-0 items-center justify-between flex-row-reverse cursor-pointer rounded-lg gap-2 p-2 px-2 max-w-full min-w-full bg-[#fafafa] hover:bg-[#f1f1f1] dark:bg-[#212121] dark:hover:bg-[#282828] border-[#e1e1e1] dark:border-[#2e2e2e] border-2 data-[selected=true]:border-[#026fed] dark:data-[selected=true]:border-[#026fed] data-[selected=true]:bg-[#026fed]/10"
            ),
          }}
          type="email"
          placeholder="Pesquisar por..."
          labelPlacement="outside"
          startContent={
            <span className="material-symbols-rounded">search</span>
          }
        />
      </div>
    </ComponentWrapper>
  );
};

const Manual = () => {
  const [storedTab, setStoredTab] = useLocalStorage(
    "manual-state",
    "documents"
  );
  const [selectedTab, setSelectedTab] = useState<string>(storedTab);

  useEffect(() => {
    setStoredTab(selectedTab);
  }, [selectedTab, setStoredTab]);

  return (
    <ComponentWrapper className="p-4">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col items-start font-[inter] gap-2 w-full">
          <strong className="text-lg">Manuais</strong>
        </div>
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b-2  border-divider",
            cursor: "w-full bg-[#5a7dfc] h-0.5",
            tab: "max-w-fit px-0 pt-1 h-7",
            tabContent: "group-data-[selected=true]:text-[#5a7dfc]",
          }}
        >
          <Tab
            key="documents"
            title={
              <div className="flex items-center space-x-2">
                <span>Documentos</span>
              </div>
            }
          />
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
              </div>
            }
          />
        </Tabs>
      </div>
      {selectedTab === "documents" ? (
        <div className="flex-1 w-full">documentos</div>
      ) : (
        <div className="flex-1 w-full">videos</div>
      )}
    </ComponentWrapper>
  );
};

const Contacts = () => {
  const { selectedState, handleClick } = useContext(MapContext);

  return (
    <ComponentWrapper>
      <div className="flex flex-col gap-4 w-full p-4 pb-0">
        <ComponentHeader
          title={
            selectedState ? selectedState.name : "Selecione o Estado Desejado"
          }
          subTitle={
            selectedState
              ? `${selectedState.sysShortName} - ${selectedState.sysName}`
              : "Clique com o cursor no estado desejado"
          }
          flagUrl={selectedState && selectedState.flagUrl}
        />
        <Generics.Divisor direction="horizontal" />
      </div>
      <div className="relative flex-1 w-full overflow-hidden">
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full flex-1",
            "transition-opacity duration-150",
            selectedState
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <CountryMap />
        </div>
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full flex-1 flex flex-col justify-between items-center gap-4 p-4",
            "transition-opacity duration-150",
            selectedState
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <strong className="text-center">
            Contatos das Agências Estaduais
          </strong>
          <p className="text-center">
            Precisa falar com uma agência do Estado? Encontre aqui os números de
            telefone de todas as agências estaduais para atendimento direto.
            Escolha o setor desejado e entre em contato!
          </p>
          <FonesaIcons.OldTelephone />
          <div className="flex gap-4 w-full">
            <Generics.Button
              variant="solid"
              color="default"
              className="flex-1 h-12"
              onClick={() => {
                handleClick(null);
              }}
            >
              Voltar
            </Generics.Button>
            <Generics.Button
              variant="solid"
              color="primary"
              className="flex-1 h-12"
            >
              Continuar
            </Generics.Button>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

const Transparency = () => {
  const { selectedState, handleClick } = useContext(MapContext);

  return (
    <ComponentWrapper>
      <div className="flex flex-col gap-4 w-full p-4 pb-0">
        <ComponentHeader
          title={
            selectedState ? selectedState.name : "Selecione o Estado Desejado"
          }
          subTitle={
            selectedState
              ? `${selectedState.sysShortName} - ${selectedState.sysName}`
              : "Clique com o cursor no estado desejado"
          }
          flagUrl={selectedState && selectedState.flagUrl}
        />
        <Generics.Divisor direction="horizontal" />
      </div>
      <div className="relative flex-1 w-full overflow-hidden">
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full flex-1",
            "transition-opacity duration-150",
            selectedState
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          )}
        >
          <CountryMap />
        </div>
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full flex-1 flex flex-col justify-between items-center gap-4 p-4",
            "transition-opacity duration-150",
            selectedState
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <strong className="text-center">Acesso à Transparência</strong>
          <p className="text-center">
            Comprometidos com a clareza e responsabilidade, oferecemos acesso
            completo às informações financeiras, contratuais e administrativas.
            Clique abaixo para consultar dados abertos e relatórios de
            transparência.
          </p>
          <FonesaIcons.InfoToken />
          <div className="flex gap-4 w-full">
            <Generics.Button
              variant="solid"
              color="default"
              className="flex-1 h-12"
              onClick={() => {
                handleClick(null);
              }}
            >
              Voltar
            </Generics.Button>
            <Generics.Button
              variant="solid"
              color="primary"
              className="flex-1 h-12"
            >
              Continuar
            </Generics.Button>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export const stateActions: StateActions[] = [
  {
    key: "validate",
    name: "Validação",
    description: "Validação de documentos emitidos pelo estado",
    icon: "check_circle",
    component: () => <Validate />,
  },
  {
    key: "manual",
    name: "Manual",
    description: "Manuais de criação de documentos",
    icon: "import_contacts",
    component: () => <Manual />,
  },
  {
    key: "contacts",
    name: "Telefones",
    description: "Consultar telefones de agências",
    icon: "call",
    component: () => <Contacts />,
  },
  {
    key: "transparency",
    name: "Transparência",
    description: "Portal da transparência do estado",
    icon: "info",
    component: () => <Transparency />,
  },
];
