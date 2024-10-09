"use client";
import { StateMap } from "@components/functional/map";
import { useContext, useEffect, useRef, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import Generics from "../ui/generics";

import { cn, isMobile } from "@/lib/utils";
import { MapContext } from "@/pages";
import { useLocalStorage } from "usehooks-ts";
import { Tooltip } from "@nextui-org/react";
import ComponentHeader from "../ui/container-header";

interface StatePathProps {
  state: StateMap;
  index: number;
  functional: boolean;
}

interface MapRendererProps {
  functional: boolean;
  panning?: boolean;
}

interface MapWrapperProps {
  children?: React.ReactNode;
}

function StatePath({ state, index, functional }: StatePathProps) {
  const { selectedState, handleClick, setSelectedStateRef } =
    useContext(MapContext);
  const stateRef = useRef<SVGGElement | null>(null);
  const [storedState] = useLocalStorage<string | null>("selected-state", null);

  useEffect(() => {
    if (state.uf === storedState) {
      setSelectedStateRef(stateRef);
    }
  }, [setSelectedStateRef, state.uf, storedState]);

  return (
    <g
      key={index}
      id={state.uf}
      ref={stateRef}
      className={cn(
        selectedState?.uf === state.uf ? "selected-state" : "state-container",
        "cursor-pointer !transform-none",
        functional ? "pointer-events-auto" : "pointer-events-none"
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (functional && handleClick) {
          handleClick(state);
          if (setSelectedStateRef) {
            setSelectedStateRef(stateRef);
          }
        }
      }}
    >
      <mask id={`path-br-${state.uf}-inside`.toLowerCase()} fill="white">
        <path d={state.mapPath} />
      </mask>
      <Tooltip
        delay={250}
        placement="right"
        classNames={{
          content: "w-34 p-0 text-[#212121] bg-transparent bg-[#ffffff]/95 backdrop-blur-xl border-none",
        }}
        radius="sm"
        content={
          <ComponentHeader
            title={state.name}
            subTitle={state.sysShortName}
            flagUrl={state.flagUrl}
            classNames={{
              wrapper: "p-2 gap-4",
              label: "gap-1 max-w-[calc(100%-40px)]",
              flagUrl: "w-12 h-8",
              title: "text-xs",
              subTitle: "text-xs",
            }}
          />
        }
      >
        <path
          id={`BR-${state.uf}`}
          mask={`url(#path-br-${state.uf}-inside)`.toLowerCase()}
          className={cn(
            "state-path stroke-[3px]",
            selectedState?.uf === state.uf
              ? "fill-[#c8def7] stroke-[#026fed]" //  dark:fill-sky-800 dark:stroke-blue-600
              : "fill-[#fafafa] stroke-gray-300 md:hover:fill-[#d9d9d9] md:hover:stroke-[#ababac] dark:fill-[#e0e0e0] dark:stroke-[#9e9e9e] md:dark:hover:fill-[#c4c4c4] md:dark:hover:stroke-[#828181]",
            "transition-colors duration-[50ms]"
          )}
          d={state.mapPath}
        />
      </Tooltip>
      <path
        id={`UF-${state.uf}`}
        className="fill-neutral-900 state-uf w-[2dvh] h-[2dvh] pointer-events-none" // dark:fill-neutral-100
        d={state.labelPath}
      />
    </g>
  );
}

const MapRenderer = ({ functional, panning }: MapRendererProps) => {
  const { States } = useContext(MapContext);

  return (
    <svg
      className={cn(
        "transition-colors duration-[50ms] w-full h-full map-outline text-[#d2d5db] dark:text-[#9e9e9e]"
      )}
      style={{ clipRule: "evenodd" }}
      viewBox="-50 -50 810 845"
      xmlns="http://www.w3.org/2000/svg"
      clip="ulr(#map-clip-parent)"
    >
      <g>
        {States?.map((state: StateMap, index: number) => (
          <StatePath
            key={index}
            state={state}
            index={index}
            functional={functional && !panning}
          />
        ))}
      </g>
    </svg>
  );
};

const MapWrapper = ({ children }: MapWrapperProps) => {
  const { selectedStateRef, handleClick } = useContext(MapContext);
  const { zoomIn, zoomOut, zoomToElement, centerView } = useControls();
  const [storedState] = useLocalStorage<string | null>("selected-state", null);

  useEffect(() => {
    if (selectedStateRef?.current) {
      zoomToElement(selectedStateRef.current as unknown as HTMLElement, 4, 400);
    }
  }, [selectedStateRef, storedState, zoomToElement]);

  const MapControls = () => {
    return (
      <div className="absolute z-10 top-4 right-4">
        <Generics.ButtonGroup>
          <Generics.Button onClick={() => zoomIn()}>
            <span className="material-symbols-rounded">add</span>
          </Generics.Button>
          <Generics.Button
            onClick={() => {
              centerView(isMobile() ? 2.8 : 2);
            }}
          >
            <span className="material-symbols-rounded">refresh</span>
          </Generics.Button>
          <Generics.Button onClick={() => zoomOut()}>
            <span className="material-symbols-rounded">remove</span>
          </Generics.Button>
        </Generics.ButtonGroup>
      </div>
    );
  };

  return (
    <div className="relative h-full" onClick={() => handleClick(null)}>
      <MapControls />
      {children}
    </div>
  );
};

export default function CountryMap() {
  const [panning, setPanning] = useState(false);

  return (
    <TransformWrapper
      doubleClick={{ disabled: true }}
      initialScale={isMobile() ? 2.8 : 2}
      centerOnInit
      onPanning={() => {
        setPanning(true);
      }}
      onPanningStop={() => {
        setPanning(false);
      }}
    >
      <MapWrapper>
        <TransformComponent wrapperClass="!w-full !h-full">
          <div className="content-center p-8 sm:py-4 sm:pb-16">
            <MapRenderer functional panning={panning} />
          </div>
        </TransformComponent>
      </MapWrapper>
    </TransformWrapper>
  );
}
