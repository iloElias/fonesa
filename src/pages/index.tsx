"use client";
import { mapPaths, StateMap } from "@/lib/map";
import { NavLinks, NavLinksMobile } from "@components/nav-links";
import Header from "@components/header";
import { createContext, useState } from "react";
import Generics from "@components/ui/generics";
import { stateActions } from "@components/ui/index-actions";
import { RadioGroup, Spinner } from "@nextui-org/react";
import Footer from "@components/footer";
import { useLocalStorage } from "usehooks-ts";
import FonesaIcons from "@components/ui/fonesa-icons";
import dynamic from "next/dynamic";

const ThemeButton = dynamic(() => import("@components/ui/theme-button"), {
  ssr: false,
  loading: () => (
    <Generics.Button
      className="min-w-8 px-2 aspect-square dark:text-slate-100"
      aria-label="Trocar para tema claro ou escuro"
      color="default"
      disabled
    >
      <Spinner size="md" color="primary"/>
    </Generics.Button>
  ),
});

interface MapContextType {
  States: StateMap[] | null;
  selectedState: StateMap | null;
  handleClick: (uf: StateMap | null) => void;
  setSelectedStateRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<SVGGElement | null> | null>
  >;
  selectedStateRef: React.MutableRefObject<SVGGElement | null> | null;
}

export const MapContext = createContext<MapContextType>({
  States: null,
  selectedState: null,
  handleClick: () => {},
  setSelectedStateRef: () => {},
  selectedStateRef: null,
});

export default function Index() {
  const [States] = useState<StateMap[] | null>(mapPaths);
  const [storedState, setStoredState] = useLocalStorage<string | null>(
    "selected-state",
    null
  );
  const [selectedState, setSelectedState] = useState<StateMap | null>(
    States ? States.find((state) => state.uf === storedState) ?? null : null
  );
  const [selectedStateRef, setSelectedStateRef] =
    useState<React.MutableRefObject<SVGGElement | null> | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>("validate");

  const handleClick = (uf: StateMap | null) => {
    setSelectedState(uf === selectedState ? null : uf);
    setStoredState(uf ? uf.uf : null);
    if (!uf) {
      setSelectedStateRef(null);
    }
  };

  return (
    <MapContext.Provider
      value={{
        States,
        selectedState,
        handleClick,
        setSelectedStateRef,
        selectedStateRef,
      }}
    >
      <div className="flex flex-col transition-background duration-[50ms] bg-[#f2f2f2] dark:bg-[#191919] max-w-[100svw] min-h-dvh">
        <Header
          last={
            <>
              <ThemeButton />
              <NavLinksMobile />
            </>
          }
        >
          <NavLinks />
        </Header>
        <div className="flex flex-col items-center bg-[#212121] max-w-[100svw] overflow-hidden">
          <div className="relative container flex flex-col items-center mt-8">
            <FonesaIcons.Banner className="min-w-[56rem]" />
            <div className="absolute top-14 left-0 sm:top-36 max-w-[40rem] flex flex-col items-start gap-8 m-4 font-[inter] text-[#fafafa] rounded-md">
              <h2 className="font-bold text-6xl">
                Bem-vindo a <span className="text-[#5b7dfb]">PGA 2</span>
              </h2>
              <p>
                Sua plataforma confiável para validação de guias de trânsito de
                animais, vegetais e outros produtos agropecuários. Aqui, você
                encontra um serviço ágil e seguro para verificar e acompanhar a
                regularidade das suas guias, garantindo conformidade com as
                normas vigentes e facilitando o transporte seguro e legalizado.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-4 row sm:p-0 sm:pt-0 h-dvh w-full">
          <div className="relative container mx-auto flex flex-1 flex-col sm:flex-row gap-[30px] p-[60px] px-0 h-full w-full sm:rounded-lg">
            <Generics.Div
              id="options"
              className="flex flex-1 flex-col overflow-auto p-4 gap-4 sm:h-[calc(100vh-8rem)] sm:max-h-[52rem]"
            >
              <div className="flex w-full">
                <div className="flex flex-col items-start font-[inter] gap-2 w-full">
                  <strong className="text-lg">Selecione um filtro</strong>
                  <p className="text-sm">
                    Clique com o cursor no filtro desejado
                  </p>
                </div>
              </div>
              <Generics.Divisor direction="horizontal" />
              <div className="w-full">
                <RadioGroup
                  aria-label="Ações estado"
                  color="primary"
                  value={selectedAction}
                  onValueChange={setSelectedAction}
                >
                  {stateActions.map((action, index) => (
                    <Generics.Radio
                      key={index}
                      value={action.key}
                      color="primary"
                      startContent={action.icon}
                    >
                      <p>{action.name}</p>
                    </Generics.Radio>
                  ))}
                </RadioGroup>
              </div>
            </Generics.Div>
            <Generics.Div
              id="map"
              className="flex flex-col flex-1 overflow-auto min-h-[30rem] max-h-[10rem] sm:min-h-[auto] sm:max-h-[52rem] sm:h-[calc(100vh-8rem)]"
            >
              {stateActions.find((a) => a.key === selectedAction)?.component()}
            </Generics.Div>
          </div>
        </div>
        <Footer />
      </div>
    </MapContext.Provider>
  );
}
