import { Artwork } from '@components/artwork/Artwork'
import { useState } from 'react'
import { Position, Size } from '@core/geometry'

//#region Types
/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param decimals - The number of decimal places to round to. Defaults to 2.
 * @returns The rounded number.
 */
const roundTo = (value: number, decimals = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}


/**
 * Calculates all layers and their states.
 * @param {number} totalLayers - Total number of layers.
 * @param {number} currentState - The current state (1–100).
 * @returns {LayerState} - A list of all layers with their properties.
 */
const calculateAllLayerStates = (totalLayers: number, currentState: number): LayerState => {
  const layerState: LayerState = {
    progress: currentState,
    index: 0,
    layers: []
  }
  const layerSize = totalLayers > 1 ? roundTo(100 / (totalLayers - 1), 2) : 100 // Size of each layer

  for (let i = 0; i < totalLayers; i++) {
    // Calculate the start and end points of each layer
    const start = i === 0 ? 0 : roundTo((i - 1) * layerSize, 2)
    const end = i === 0 ? 0 : roundTo(i * layerSize, 2)

    // Check if this is the first layer and the current state is 0.
    const isLayerZeroAndCurrent = currentState === 0 && i === 0

    // Check if this layer is the current layer
    const isCurrentLayer = (currentState > start && currentState <= end) || isLayerZeroAndCurrent

    // Check if this layer is visible
    const isLayerVisible = (currentState > end) || isLayerZeroAndCurrent

    // Calculate the relative state within the layer. If it is already an visible layer it is 1, 
    // if it is the current layer it is the relative state, otherwise 0
    const relativeState = isLayerVisible ? 1 : isCurrentLayer ?
      roundTo((currentState - start) / (end - start), 2) : 0

    if (isCurrentLayer) {
      layerState.index = i + 1
    }

    // Add the layer object to the list
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

/**
 * Calculates the properties of a layer based on its index.
 * @param {number} totalLayers - The total number of layers.
 * @param {number} activeLayer - The index of the active layer.
 * @returns {CanvasLayerState} - An object with the properties of the layer.
 */
const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState => {
  const currentState = 100 / (totalLayers - 1) * (activeLayer - 1)
  return calculateAllLayerStates(totalLayers, currentState)
}

function sizeIsEqual(a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height
}

function calcArtworkShrinkBySize(
  artworkSize: Size,
  canvasSize: Size
): number {
  return isLandscape(artworkSize)
    ? canvasSize.width / artworkSize.width
    : canvasSize.height / artworkSize.height
}

function calcArtworkShrinkByScale(scale: number): number {
  return scale ** -1
}

function calcArtworkRatio(
  artworkSize: Size,
  canvasSize: Size
): { widthRatio: number, heightRatio: number } {
  const widthRatio = canvasSize.width / artworkSize.width
  const heightRatio = canvasSize.height / artworkSize.height
  return {
    widthRatio: Math.min(1, widthRatio),
    heightRatio: Math.min(1, heightRatio)
  }
}

function calcArtworkSize(
  artworkSize: Size,
  canvasSize: Size,
  canvasOverflow: 'fit' | 'contain' = 'fit'
) {
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
    min: Math.min(
      transformedRatio.widthRatio,
      transformedRatio.heightRatio
    ),
    current: 1
  }

  return { size: currentSize, scale }
}

function isLandscape({ width, height }: Size): boolean {
  return width >= height
}

const calcCanvasPosition = (
  artworkSize: Size,
  canvasSize: Size,
  position: 'center' | 'top-left' = 'top-left'
) => {
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

//#endregion

type OverflowOptions = 'fit' | 'contain'

interface CanvasState {
  artwork: Artwork
  size: Size
  transformation: Transformation
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

export interface CanvasContext {
  getContext: () => CanvasState
  getTransformation: () => Transformation
  setArtwork: (canvasSize: Size, artwork: Artwork) => void
  setSize: ({ width, height }: { width: number, height: number }) => void
  setTransformation: ({ position, scale }: { position: { x: number, y: number }, scale: number }) => void
  setLayer: ({ progress, index }: { progress?: number, index?: number }) => void
}

const initContext = (artwork: Artwork, canvasSize: Size): CanvasState => {
  const { size: newSize, scale } = calcArtworkSize(artwork.size, canvasSize)
  return {
    artwork: artwork,
    size: canvasSize,
    transformation: {
      overflow: 'fit',
      size: newSize,
      position: calcCanvasPosition(newSize, canvasSize, 'center'),
      scale: scale,
      layer: calculateLayerStateByIndex(artwork.layer.length, 1)
    }
  }
}

const calcSize = (context: CanvasState, size: Size): CanvasState => {
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

const calcLayerByProgress = (context: CanvasState, progress: number): CanvasState => {
  const layerState = calculateAllLayerStates(context.artwork.layer.length, progress)
  return {
    ...context,
    transformation: {
      ...context.transformation,
      layer: layerState
    }
  }
}

const calcLayerByIndex = (context: CanvasState, index: number): CanvasState => {
  const layerState = calculateLayerStateByIndex(context.artwork.layer.length, index)
  return {
    ...context,
    transformation: {
      ...context.transformation,
      layer: layerState
    }
  }
}


const calcTransformation = (context: CanvasState, currentPosition: Position, currentScale: number): CanvasState => {
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

/**
 * Hook to get the artwork context based on artwork and canvas size.
 */
export const useArtworkContext = (): CanvasContext => {
  const [context, setContextState] = useState<CanvasState | null>(null)
  const CONTEXT_NOT_INITIALIZED = 'Canvas context is not initialized'

  const setArtwork = (canvasSize: Size, artwork: Artwork) => {
    setContextState(initContext(artwork, canvasSize))
  }

  const setSize = (size: Size) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    if (sizeIsEqual(size, context.size)) {
      return
    }

    setContextState(calcSize(context, size))
  }

  const setTransformation = ({ position, scale }: { position: { x: number, y: number }, scale: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    setContextState(calcTransformation(context, position, scale))
  }

  const setLayer = ({ progress, index }: { progress?: number, index?: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    if (progress === undefined && index === undefined) {
      throw new Error('Either progress or index must be provided')
    }

    if (progress !== undefined) {
      setContextState(calcLayerByProgress(context, progress))
    }

    if (index !== undefined) {
      setContextState(calcLayerByIndex(context, index))
    }
  }

  const getContext = () => {
    if (context == null) {
      throw new Error()
    }

    return context
  }

  const getTransformation = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    return context.transformation
  }

  return {
    getTransformation,
    getContext,
    setArtwork,
    setTransformation,
    setSize,
    setLayer
  }
}
