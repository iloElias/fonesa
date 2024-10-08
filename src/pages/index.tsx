"use client";
import { mapPaths, StateMap } from "@/components/functional/map";
import { NavLinks, NavLinksMobile } from "@/components/functional/nav-links";
import ThemeButton from "@/components/functional/theme-button";
import Header from "@/components/header";
import { createContext, useState } from "react";
import Generics from "@/components/ui/generics";
import { stateActions } from "@/components/ui/index-actions";
import { RadioGroup } from "@nextui-org/react";
import Footer from "@/components/footer";
import { useLocalStorage } from "usehooks-ts";

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
      <div className="transition-background duration-[50ms] bg-neutral-100 dark:bg-zinc-800 w-lvw min-h-dvh">
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
        <div className="flex flex-1 justify-center gap-4 row sm:p-0 sm:pt-0 h-dvh w-full max-h-[54rem]">
          <div className="relative container mx-auto flex flex-col-reverse sm:flex-row gap-4 p-4 px-0 pt-[84px] h-full w-full sm:rounded-lg">
            <Generics.Div
              id="options"
              className="flex flex-1 flex-col overflow-auto p-4 gap-4"
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
              className="flex flex-col flex-1 overflow-hidden"
            >
              {stateActions.find((a) => a.key === selectedAction)?.component()}
            </Generics.Div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </MapContext.Provider>
  );
}
