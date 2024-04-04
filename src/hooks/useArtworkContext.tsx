import { Artwork } from "../core/Artwork";
import { CanvasLayerState, CanvasScaleState, CanvasSizeState } from "../components/Canvas";
import calcArtworkSize, { calcArtworkScale, calcArtworkShrinkByScale, calcLayerStateByIndex, sizeIsEqual } from "../core/ArtworkHandlers";
import { useState } from "react";
import { useWindowResize } from "./useWindowResize";


export interface ArtworkContext {
  artwork: Artwork;
  canvasSize: { width: number, height: number },
  canvasMaxScale: number;
  canvasScale: number;
  canvasShrink: number;
  canvasPosition: { x: number, y: number}
  layerIndex: number;
  layerPercentage: number;
}


/**
 * Hook to get the artwork context based on artwork and canvas size.
 */
export const useArtworkContext = (artwork: Artwork) => {
  const [window] = useWindowResize();
  const [context, setContext] = useState<ArtworkContext>({
    artwork: artwork,
    canvasSize: {width: window.width, height: window.height},
    canvasScale: 1,
    canvasShrink: 1,
    canvasMaxScale: 1,
    canvasPosition: {x: 0, y:0},
    layerIndex: artwork.defaultIndex,
    layerPercentage: calcLayerStateByIndex(artwork.defaultIndex, artwork.layer.length).layerPercentage,
  })

  const setCanvasSize = (size: CanvasSizeState) => {
    var newSize = calcArtworkSize(context.artwork.size, size.canvasSize).size;
    if(!sizeIsEqual(newSize, context.canvasSize)) {
      setContext({...context, 
        canvasMaxScale: calcArtworkScale(artwork.size, newSize), 
        canvasShrink: calcArtworkShrinkByScale(calcArtworkScale(artwork.size, newSize)),
        ...{ artworkSize: newSize }, 
        ...{ canvasSize: newSize } })
    }
  }

  const setCanvasLayer = (size: CanvasLayerState) => {
    setContext({...context, ...size })
  }

  const setCanvasScale = (size: CanvasScaleState) => {
    setContext({...context, ...size })
  }

  return { 
    state: context, 
    setCanvasSize, 
    setCanvasLayer, 
    setCanvasScale 
  }
}
