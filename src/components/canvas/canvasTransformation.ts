/**
 * Module: canvasTransformation
 * This module provides utility functions to manage and transform a canvas state.
 * It handles resizing, layer transformations, positioning, and scaling.
 */

import { Artwork } from '@components/artwork/Artwork'
import { Position, Size } from '@core/geometry'

//#region Types
interface LayerState {
  progress: number
  index: number
  layers: Array<{
    index: number
    transition: {
      start: number
      end: number
      progress: number
    }
  }>
}

interface Transformation {
  overflow: OverflowOptions
  size: Size
  position: Position
  scale: {
    current: number
    min: number
    max: number
  }
  layer: LayerState
}

type OverflowOptions = 'fit' | 'contain'

export interface CanvasState {
  artwork: Artwork
  size: Size
  transformation: Transformation
}

export interface CanvasContext {
  getContext: () => CanvasState
  getTransformation: () => Transformation
  resize: ({ width, height }: { width: number, height: number }) => void
  setView: ({ position, scale }: { position: { x: number, y: number }, scale: number }) => void
  setLayer: ({ progress, index }: { progress?: number, index?: number }) => void
}
//#endregion

//#region Utility Functions
const roundTo = (value: number, decimals = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

export function sizeIsEqual(a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height
}

function isLandscape({ width, height }: Size): boolean {
  return width >= height
}
//#endregion

//#region Calculation Functions
const calculateAllLayerStates = (totalLayers: number, currentState: number): LayerState => {
  const layerState: LayerState = {
    progress: currentState,
    index: 0,
    layers: []
  }
  const layerSize = totalLayers > 1 ? roundTo(100 / (totalLayers - 1), 2) : 100

  for (let i = 0; i < totalLayers; i++) {
    const start = i === 0 ? 0 : roundTo((i - 1) * layerSize, 2)
    const end = i === 0 ? 0 : roundTo(i * layerSize, 2)
    const isLayerZeroAndCurrent = currentState === 0 && i === 0
    const isCurrentLayer = (currentState > start && currentState <= end) || isLayerZeroAndCurrent
    const isLayerVisible = (currentState > end) || isLayerZeroAndCurrent
    const relativeState = isLayerVisible ? 1 : isCurrentLayer ? roundTo((currentState - start) / (end - start), 2) : 0

    if (isCurrentLayer) {
      layerState.index = i + 1
    }

    layerState.layers.push({
      index: i + 1,
      transition: {
        start,
        end,
        progress: relativeState
      }
    })
  }

  return layerState
}

const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState => {
  const currentState = 100 / (totalLayers - 1) * (activeLayer - 1)
  return calculateAllLayerStates(totalLayers, currentState)
}

function calcArtworkShrinkBySize(artworkSize: Size, canvasSize: Size): number {
  return isLandscape(artworkSize) ? canvasSize.width / artworkSize.width : canvasSize.height / artworkSize.height
}

function calcArtworkShrinkByScale(scale: number): number {
  return scale ** -1
}

function calcArtworkRatio(artworkSize: Size, canvasSize: Size): { widthRatio: number, heightRatio: number } {
  const widthRatio = canvasSize.width / artworkSize.width
  const heightRatio = canvasSize.height / artworkSize.height
  return {
    widthRatio: Math.min(1, widthRatio),
    heightRatio: Math.min(1, heightRatio)
  }
}

function calcArtworkSize(artworkSize: Size, canvasSize: Size, canvasOverflow: 'fit' | 'contain' = 'fit') {
  const ratio = calcArtworkRatio(artworkSize, canvasSize)
  let finalShrink: number

  if (canvasOverflow === 'fit') {
    finalShrink = ratio.heightRatio
  } else {
    finalShrink = Math.min(ratio.widthRatio, ratio.heightRatio)
  }

  const currentSize: Size = {
    width: artworkSize.width * finalShrink,
    height: artworkSize.height * finalShrink
  }

  const transformedRatio = calcArtworkRatio(currentSize, canvasSize)

  const scale = {
    max: Math.min(ratio.widthRatio, ratio.heightRatio) ** -1,
    min: Math.min(transformedRatio.widthRatio, transformedRatio.heightRatio),
    current: 1
  }

  return { size: currentSize, scale }
}

const calcCanvasPosition = (artworkSize: Size, canvasSize: Size, position: 'center' | 'top-left' = 'top-left') => {
  switch (position) {
    case 'center':
      return {
        x: (canvasSize.width - artworkSize.width) / 2,
        y: (canvasSize.height - artworkSize.height) / 2
      }
    default:
      return {
        x: 0,
        y: 0
      }
  }
}
//#endregion

//#region Context Functions
const initialize = (artwork: Artwork, canvasSize: Size): CanvasState => {
  const { size: newSize, scale } = calcArtworkSize(artwork.size, canvasSize)
  return {
    artwork: artwork,
    size: canvasSize,
    transformation: {
      overflow: 'fit',
      size: newSize,
      position: calcCanvasPosition(newSize, canvasSize, 'center'),
      scale: scale,
      layer: calculateLayerStateByIndex(artwork.layer.length, artwork.defaultIndex)
    }
  }
}

const resize = (context: CanvasState, size: Size): CanvasState => {
  const { size: newSize, scale } = calcArtworkSize(context.artwork.size, size)
  return {
    ...context,
    size: size,
    transformation: {
      ...context.transformation,
      size: newSize,
      scale: scale
    }
  }
}

const setLayer = (
  context: CanvasState,
  input: { progress: number; index?: never } | { index: number; progress?: never }
): CanvasState => {
  let layerState: LayerState;

  if ('progress' in input) {
    layerState = calculateAllLayerStates(context.artwork.layer.length, input.progress!);
  } else if ('index' in input) {
    layerState = calculateLayerStateByIndex(context.artwork.layer.length, input.index!);
  } else {
    throw new Error('Invalid input: Provide either progress or index.');
  }

  return {
    ...context,
    transformation: {
      ...context.transformation,
      layer: layerState
    }
  };
};


const setView = (context: CanvasState, currentPosition: Position, currentScale: number): CanvasState => {
  return {
    ...context,
    transformation: {
      ...context.transformation,
      position: currentPosition,
      scale: {
        ...context.transformation.scale,
        current: currentScale
      }
    }
  }
}
//#endregion

export const canvasTransformation = {
  initialize,
  resize,
  setLayer,
  setView,
}

export default canvasTransformation