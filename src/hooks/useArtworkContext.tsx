import { Artwork, ArtworkLayer } from "../core/Artwork";
import { calcArtworkSize as calcArtworkState, calcCanvasPosition, calcLayerStateByIndex, sizeIsEqual } from "../core/artworkCalculation";
import { useEffect, useState } from "react";
import { useWindowResize } from "./useWindowResize";

type OverflowOptions = "fit" | "contain"
type Position = { x: number, y: number }
type Size = { width: number, height: number }

export interface ArtworkState {
  artwork: {
    size: Size
  }
  canvas: {
    size: Size
  }
  transformed: ArtworkTransformation
  layer: {
    length: number,
    index: number,
    percentage: number,
    values: ArtworkLayer[]
  }
}

export interface ArtworkContext {
  state: ArtworkState
  set: (transformation: ArtworkTransformation) => void;
  setSize: ({ width, height }: { width: number, height: number }) => void
  setPosition: ({ position, scale }: { position: { x: number, y: number }, scale: number }) => void;
  setScale: ({ scale }: { scale: number }) => void
  setLayer: ({ index, percentage }: { index: number, percentage: number }) => void
}

interface ArtworkTransformation {
  overflow: OverflowOptions;
  size: Size;
  scale: {
    current: number;
    minScale: number;
    maxScale: number;
  };
  position: Position;
}

interface ArtworkContextOptions {
  overflow?: OverflowOptions
  canvasSize?: Size
}

const calcInitialState = (artwork: Artwork, canvasSize: Size): ArtworkState => {
  var transformation = calcArtworkState(artwork.size, canvasSize, "fit");
  var canvasPosition = calcCanvasPosition(transformation.size, canvasSize, "center")

  return {
    artwork: artwork,
    transformed: {
      ...transformation,
      overflow: "fit",
      position: canvasPosition
    },
    layer: {
      length: artwork.layer.length,
      index: artwork.defaultIndex,
      percentage: calcLayerStateByIndex(artwork.defaultIndex, artwork.layer.length).layerPercentage,
      values: artwork.layer
    },
    canvas: {
      size: canvasSize
    }
  }

}

/**
 * Hook to get the artwork context based on artwork and canvas size.
 */
export const useArtworkContext = (artwork: Artwork, options?: ArtworkContextOptions): ArtworkContext => {
  const artworkConst = artwork;
  const canvasSize = options?.canvasSize ? options?.canvasSize : { width: 0, height: 0 }
  const [context, setContext] = useState<ArtworkState>(calcInitialState(artwork, {width: 0, height: 0}))

  useEffect(() => {
    setSize(canvasSize)
  }, [canvasSize])
  
  const setSize = (size: Size) => {
    console.log("Set Position")
    var transformation = calcArtworkState(artworkConst.size, size, context.transformed.overflow);
    var canvasPosition = calcCanvasPosition(transformation.size, size, "center")
    if (!sizeIsEqual(size, context.canvas.size)) {
      setContext({
        ...context,
        canvas: {
          ...context.canvas,
          size: size
        },
        transformed: {
          ...context.transformed,
          position: canvasPosition,
          scale: transformation.scale,
          size: transformation.size
        }
      })
    }
  }

  const setScale = ({ scale }: { scale: number }) => {
    setContext({
      ...context, transformed: {
        ...context.transformed,
        scale: {
          ...context.transformed.scale,
          current: scale
        }
      }
    })
  }

  const setPosition = ({ position, scale }: { position: { x: number, y: number }, scale: number }) => {
    setContext({
      ...context,
      transformed: {
        ...context.transformed,
        position: position,
        scale: {
          ...context.transformed.scale,
          current: scale
        }
      }
    })
  }

  const setLayer = ({ index, percentage }: { index: number, percentage: number }) => {
    setContext({
      ...context, layer: {
        ...context.layer,
        index: index,
        percentage: percentage
      }
    })
  }

  const set = (transformation: ArtworkTransformation) => {
  }

  return {
    state: context,
    set,
    setSize,
    setScale,
    setPosition,
    setLayer
  }
}
