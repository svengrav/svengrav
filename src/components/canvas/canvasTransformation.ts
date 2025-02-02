/**
 * Module: canvasTransformation
 * This module provides utility functions to manage and transform a canvas state.
 * It handles resizing, layer transformations, positioning, and scaling.
 */

import { Artwork, ArtworkLayer } from "@components/artwork/Artwork";
import { guard } from "@core/assert";
import { Position, Size } from "@core/geometry";

//#region Types
interface LayerState {
  progress: number;
  index: number;
  layers: Array<{
    index: number;
    transition: {
      start: number;
      end: number;
      progress: number;
    };
  }>;
}

interface Transformation {
  overflow: OverflowOptions;
  size: Size;
  position: Position;
  scale: {
    current: number;
    min: number;
    max: number;
  };
  layer: LayerState;
}

type OverflowOptions = "fit" | "contain";

export interface CanvasProviderState {
  size: Size;
  transformation: Transformation;
}

export interface CanvasState {
  artwork: Artwork;
  size: Size;
  transformation: Transformation;
}

export type CanvasLayer = {
  index: number;
  transition: {
    start: number;
    end: number;
    progress: number;
  };
} & ArtworkLayer;

export interface CanvasContext {
  getContext: () => CanvasState;
  getTransformation: () => Transformation;
  getLayer: (index: number) => CanvasLayer;
  resize: ({ width, height }: { width: number; height: number }) => void;
  setView: ({ position, scale }: { position: { x: number; y: number }; scale: number }) => void;
  setLayer: ({ progress, index }: { progress?: number; index?: number }) => void;
}
//#endregion

//#region Utility Functions
const roundTo = (value: number, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export function sizeIsEqual(a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height;
}

function isLandscape({ width, height }: Size): boolean {
  return width >= height;
}
//#endregion

//#region Calculation Functions
const calculateAllLayerStates = (totalLayers: number, currentState: number): LayerState => {
  if (totalLayers === 1) {
    return {
      progress: 100,
      index: 1,
      layers: [
        {
          index: 1,
          transition: {
            start: 0,
            end: 100,
            progress: 100,
          },
        },
      ],
    };
  }

  const layerState: LayerState = {
    progress: currentState,
    index: 0,
    layers: [],
  };
  const layerSize = totalLayers > 1 ? roundTo(100 / (totalLayers - 1), 2) : 100;

  for (let i = 0; i < totalLayers; i++) {
    const start = i === 0 ? 0 : roundTo((i - 1) * layerSize, 2);
    const end = i === 0 ? 0 : roundTo(i * layerSize, 2);
    const isLayerZeroAndCurrent = currentState === 0 && i === 0;
    const isLastLayer = currentState === 100 && i === totalLayers - 1;
    const isCurrentLayer = (currentState > start && currentState <= end) || isLayerZeroAndCurrent || isLastLayer;
    const isLayerVisible = currentState > end || isLayerZeroAndCurrent;
    const progress = isLayerVisible ? 1 : isCurrentLayer ? roundTo((currentState - start) / (end - start), 2) : 0;

    if (isCurrentLayer) {
      layerState.index = i + 1;
    }

    layerState.layers.push({
      index: i + 1,
      transition: {
        start,
        end,
        progress: progress,
      },
    });
  }

  console.log(layerState)
  guard(!isNaN(layerState.progress), "Progress has to be a number");
  return layerState;
};

const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState => {
  const currentState = (100 / (totalLayers - 1)) * (activeLayer - 1);
  return calculateAllLayerStates(totalLayers, Math.floor(currentState));
};

function calcArtworkRatio(artworkSize: Size, canvasSize: Size): { widthRatio: number; heightRatio: number } {
  const widthRatio = canvasSize.width / artworkSize.width;
  const heightRatio = canvasSize.height / artworkSize.height;
  return {
    widthRatio: Math.min(1, widthRatio),
    heightRatio: Math.min(1, heightRatio),
  };
}

function calcArtworkSize(artworkSize: Size, canvasSize: Size, canvasOverflow: "fit" | "contain" = "fit") {
  const ratio = calcArtworkRatio(artworkSize, canvasSize);
  let finalShrink: number;

  if (canvasOverflow === "fit") {
    finalShrink = ratio.heightRatio;
  } else {
    finalShrink = Math.min(ratio.widthRatio, ratio.heightRatio);
  }

  const currentSize: Size = {
    width: artworkSize.width * finalShrink,
    height: artworkSize.height * finalShrink,
  };

  const transformedRatio = calcArtworkRatio(currentSize, canvasSize);

  const scale = {
    max: Math.min(ratio.widthRatio, ratio.heightRatio) ** -1,
    min: Math.min(transformedRatio.widthRatio, transformedRatio.heightRatio),
    current: 1,
  };

  return { size: currentSize, scale };
}

const calcCanvasPosition = (artworkSize: Size, canvasSize: Size, position: "center" | "top-left" = "top-left") => {
  switch (position) {
    case "center":
      return {
        x: (canvasSize.width - artworkSize.width) / 2,
        y: (canvasSize.height - artworkSize.height) / 2,
      };
    default:
      return {
        x: 0,
        y: 0,
      };
  }
};
//#endregion

//#region Context Functions
const initialize = (artwork: { size: Size; index: number; noOfLayer: number }, canvasSize: Size): CanvasProviderState => {
  const { size: newSize, scale } = calcArtworkSize(artwork.size, canvasSize);
  return {
    size: canvasSize,
    transformation: {
      overflow: "fit",
      size: newSize,
      position: calcCanvasPosition(newSize, canvasSize, "center"),
      scale: scale,
      layer: calculateLayerStateByIndex(artwork.noOfLayer, artwork.index),
    },
  };
};

const resize = (context: CanvasProviderState, artworkSize: Size, canvasSize: Size): CanvasProviderState => {
  const { size: newSize, scale } = calcArtworkSize(artworkSize, canvasSize);
  return {
    ...context,
    size: canvasSize,
    transformation: {
      ...context.transformation,
      size: newSize,
      scale: scale,
    },
  };
};

const setLayer = (
  context: CanvasProviderState,
  noOfLayer: number,
  input: { progress: number; index?: never } | { index: number; progress?: never }
): CanvasProviderState => {
  let layerState: LayerState;

  if ("progress" in input) {
    layerState = calculateAllLayerStates(noOfLayer, input.progress!);
  } else if ("index" in input) {
    layerState = calculateLayerStateByIndex(noOfLayer, input.index!);
  } else {
    throw new Error("Invalid input: Provide either progress or index.");
  }

  return {
    ...context,
    transformation: {
      ...context.transformation,
      layer: layerState,
    },
  };
};

const setView = (context: CanvasProviderState, currentPosition: Position, currentScale: number): CanvasProviderState => {
  return {
    ...context,
    transformation: {
      ...context.transformation,
      position: currentPosition,
      scale: {
        ...context.transformation.scale,
        current: currentScale,
      },
    },
  };
};
//#endregion

export const canvasTransformation = {
  initialize,
  resize,
  setLayer,
  setView,
};

export default canvasTransformation;
