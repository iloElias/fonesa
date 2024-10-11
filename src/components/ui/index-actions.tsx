"use client";
import { cn } from "@/lib/utils";
import CountryMap from "../functional/country-map";
import Generics from "./generics";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { MapContext } from "@/pages";
import FonesaIcons from "./fonesa-icons";
import Link from "next/link";
import ComponentHeader from "./container-header";
import { useDebounce } from "@/lib/fonesa";
import { mapPaths } from "../functional/map";
import Image from "next/image";

export interface StateActions {
  key: string;
  name: string;
  description: string;
  icon: string;
  component: () => ReactElement;
}

interface Page {
  id: string;
  path: string;
  title: string;
  isFolder: boolean;
  pageId: string;
  parent: string;
  locale: string;
  __typename: string;
}

const ComponentWrapper = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative flex flex-col flex-1 justify-between items-center w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface RenderManualsProps {
  data: Page[] | null;
  type: string;
}

const RenderManuals = ({ data, type = "document" }: RenderManualsProps) => {
  if (data === null) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Spinner />
        <p>Carregando...</p>
      </div>
    );
  }
  if (data.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        {/* <FonesaIcons.NoData /> */}
        <p>Nenhum documento encontrado</p>
      </div>
    );
  }

  return data.map((item, index) => (
    <Link
      key={index}
      href={`https://wiki.agrodefesa.go.gov.br/${item.locale}/${item.path}`}
      className="group flex flex-row gap-4 w-full p-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="material-symbols-rounded">
        {type === "document" ? "draft" : "smart_display"}
      </span>
      <p
        title={item.title}
        className="group-hover:underline truncate flex-1 max-w-[calc(100% - 14px)]"
      >
        {item.title}
      </p>
      <span className="material-symbols-rounded">open_in_new</span>
    </Link>
  ));
};

const Validate = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const debounce = useDebounce((value: string) => {
    if (!value) {
      return;
    }
    console.log(value);
  }, 500);

  return (
    <ComponentWrapper className="p-4 gap-4">
      <div className="flex flex-col gap-4 w-full">
        <ComponentHeader
          title="Digite código de barras abaixo"
          subTitle="Clique com o cursor no botão abaixo para validar os documentos"
        />
        <Generics.Divisor direction="horizontal" />
      </div>
      <div className="flex-1 flex flex-col gap-4 w-full">
        <Autocomplete
          onSelectionChange={(key) => setSelectedState()}
          size="md"
          variant="flat"
          label="Selecione o estado"
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
        {selectedState && (
          <Input
            size="md"
            variant="flat"
            onChange={(e) => {
              debounce(e.target.value);
            }}
            type="email"
            label="Pesquisar por..."
          />
        )}
      </div>
    </ComponentWrapper>
  );
};

const Manual = () => {
  const [storedTab, setStoredTab] = useLocalStorage("manual-state", "document");
  const [selectedTab, setSelectedTab] = useState<string>(storedTab);

  const [data, setData] = useState<Page[] | null>(null);

  useEffect(() => {
    setStoredTab(selectedTab);

    if (selectedTab === "document") {
      fetch("/api/graphql", {
        // https://wiki.agrodefesa.go.gov.br/graphql
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            operationName: null,
            variables: {
              path: "home",
              locale: "pt-br",
            },
            extensions: {},
            query: `query ($path: String, $locale: String!) { pages { tree(path: $path, mode: ALL, locale: $locale, includeAncestors: true) { id path title isFolder pageId parent locale __typename } __typename } }`,
          },
        ]),
      })
        .then((response) => response.json())
        .then((data) => setData(data[0].data.pages.tree))
        .catch(() => setData([]));
    }
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
            key="document"
            title={
              <div className="flex items-center space-x-2">
                <span>Documentos</span>
              </div>
            }
            pt-2
            gap-2
          />
          {/* <Tab
            disabled={true}
            
            key="video"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
              </div>
            }
          /> */}
        </Tabs>
      </div>
      <div className="flex w-full overflow-auto max-h-[calc(100% - 174px)] pt-2 gap-2 flex-1 flex-col items-start">
        <RenderManuals data={data} type={selectedTab} />
      </div>
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
              color="default"
              className="flex-1 h-12"
              onClick={() => {
                handleClick(null);
              }}
            >
              Voltar
            </Generics.Button>
            <Generics.Button className="flex-1 h-12">Continuar</Generics.Button>
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
              color="default"
              className="flex-1 h-12"
              onClick={() => {
                handleClick(null);
              }}
            >
              Voltar
            </Generics.Button>
            <Generics.Button className="flex-1 h-12">Continuar</Generics.Button>
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
