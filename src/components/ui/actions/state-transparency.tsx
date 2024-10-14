import { MapContext } from "@/pages";
import { useContext } from "react";
import { ComponentWrapper } from "./action-container-wrapper";
import ComponentHeader from "../container-header";
import Generics from "../generics";
import CountryMap from "@components/ui/country-map";
import { cn } from "@/lib/utils";
import FonesaIcons from "../fonesa-icons";

export const Transparency = () => {
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
