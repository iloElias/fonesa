"use client";
import { StateMap } from "@api/map";
import { useEffect, useState } from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
import Generics from "../ui/generics";
import { Button } from "@radix-ui/themes";
import { MinusIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import HtmlTooltip from "../ui/html-tooltip";
import { cn, isMobile } from "@/lib/utils";

interface StatePathProps {
  state: StateMap;
  index: number;
  selectedState: null | StateMap;
  handleMouseEnter: CallableFunction;
  handleClick: CallableFunction;
}

function StatePath({
  state,
  index,
  selectedState,
  handleMouseEnter,
  handleClick,
}: StatePathProps) {
  const styles = () => {
    if (isMobile()) {
      return "fill-gray-100 stroke-gray-300 dark:fill-gray-500 dark:stroke-gray-300";
    }
    return "fill-gray-100 stroke-gray-300 hover:fill-gray-300 hover:stroke-gray-400 dark:fill-gray-500 dark:stroke-gray-300 dark:hover:fill-gray-600 dark:hover:stroke-gray-700";
  };

  return (
    <g
      key={index}
      id={state.uf}
      className={cn(
        selectedState?.uf === state.uf ? "selected-state" : "state-container"
      )}
      onMouseLeave={() => handleMouseEnter(null)}
      onMouseEnter={() => handleMouseEnter(index)}
      onClick={(e) => {
        e.stopPropagation();
        handleClick(state);
      }}
    >
      <HtmlTooltip title={<p>Informação do estado.</p>}>
        <path
          id={`BR-${state.uf}`}
          className={cn(
            "state-path stroke-[2px]",
            selectedState?.uf === state.uf
              ? "fill-blue-300 stroke-blue-500 dark:fill-sky-800 dark:stroke-blue-600"
              : styles()
          )}
          d={state.mapPath}
        />
      </HtmlTooltip>
      <path
        id={`UF-${state.uf}`}
        className="fill-neutral-900 state-uf w-[2dvh] h-[2dvh] pointer-events-none dark:fill-neutral-100"
        d={state.labelPath}
      />
      <path
        className={`stroke-[2px] fill-red-500 stroke-red-600 ${
          state.uf === selectedState?.uf ? "visible" : "hidden"
        }`}
        fillRule="evenodd"
        clipRule="evenodd"
        d={state.markerPath}
        fill="#2A58FB"
      />
    </g>
  );
}

export default function CountryMap() {
  const [States, setStates] = useState<StateMap[] | null>(null);
  const [selectedState, setSelectedState] = useState<StateMap | null>(null);

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
      });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (States && !isMobile()) {
      const newStates = [...States];
      const [hoveredState] = newStates.splice(index, 1);

      newStates.push(hoveredState);
      setStates(newStates);

      if (selectedState) {
        const selectedIndex = newStates.findIndex(
          (state) => state.uf === selectedState?.uf
        );
        const [newSelectedState] = newStates.splice(selectedIndex, 1);
        newStates.push(newSelectedState);
      }
    }
  };

  const handleClick = (uf: StateMap | null) => {
    setSelectedState(uf === selectedState ? null : uf);

    if (uf && States) {
      const newStates = [...States];
      const clickedIndex = newStates.findIndex((state) => state.uf === uf.uf);
      const [clickedState] = newStates.splice(clickedIndex, 1);
      newStates.push(clickedState);
      setStates(newStates);
    }
  };

  const MapControls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="absolute z-10 top-2 right-2">
        <Generics.ButtonGroup variant="vertical">
          <Button
            color="gray"
            variant="solid"
            onClick={() => zoomIn()}
            highContrast
          >
            <PlusIcon />
          </Button>
          <Button
            color="gray"
            variant="solid"
            onClick={() => resetTransform()}
            highContrast
          >
            <ReloadIcon />
          </Button>
          <Button
            color="gray"
            variant="solid"
            onClick={() => zoomOut()}
            highContrast
          >
            <MinusIcon />
          </Button>
        </Generics.ButtonGroup>
      </div>
    );
  };

  return (
    <TransformWrapper doubleClick={{ disabled: true }} initialScale={1}>
      <div
        className="relative flex-grow"
        onClick={() => {
          handleClick(null);
        }}
      >
        <MapControls />
        <TransformComponent>
          <div
            className="country-map-container p-8 pb-16 w-[calc(100dvw-4rem)] h-[calc(100vh-6rem)]"

          >
            <svg
              className="h-full w-full"
              viewBox="0 0 810 845"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="brazil-map" clipPath="url(#clip0_201_90)">
                {States?.map((state, index) => (
                  <StatePath
                    key={index}
                    state={state}
                    index={index}
                    selectedState={selectedState}
                    handleMouseEnter={handleMouseEnter}
                    handleClick={handleClick}
                  />
                ))}
              </g>
              <defs>
                <clipPath id="clip0_201_90">
                  <rect width="809.299" height="844.39" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </TransformComponent>
      </div>
    </TransformWrapper>
  );
}
