import { Spinner, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ComponentWrapper } from "./action-container-wrapper";

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

export const Manual = () => {
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
