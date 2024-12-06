import { assert } from '../utils/helper'

/**
 * Rundet eine Zahl auf die gewünschte Anzahl von Dezimalstellen.
 * @param {number} value - Die zu rundende Zahl.
 * @param {number} decimals - Anzahl der Dezimalstellen.
 * @returns {number} - Gerundete Zahl.
 */
const roundTo = (value: number, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export interface LayerState2 {
  progress: number;
  active: number;
  layers: Array<{
    index: number;
    transition: {
      start: number;
      end: number;
      progress: number;
    };
  }>;
}

/**
 * Calculates all layers and their states.
 * @param {number} totalLayers - Total number of layers.
 * @param {number} currentState - The current state (1–100).
 * @returns {LayerState2} - A list of all layers with their properties.
 */
export const calculateAllLayerStates = (totalLayers: number, currentState: number): LayerState2 => {
  const layerState : LayerState2 ={
    progress: currentState,
    active: 0,
    layers: []
  };
  const layerSize = totalLayers > 1 ? roundTo(100 / (totalLayers - 1), 2) : 100; // Size of each layer

  for (let i = 0; i < totalLayers; i++) {
    // Calculate the start and end points of each layer
    const start = i === 0 ? 0 : roundTo((i - 1) * layerSize, 2);
    const end = i === 0 ? 0 : roundTo(i * layerSize, 2);

    // Check if this is the first layer and the current state is 0.
    const isLayerZeroAndCurrent = currentState === 0 && i === 0;

    // Check if this layer is the current layer
    const isCurrentLayer = (currentState > start && currentState <= end) || isLayerZeroAndCurrent;

    // Check if this layer is visible
    const isLayerVisible = (currentState > end) || isLayerZeroAndCurrent;

    // Calculate the relative state within the layer. If it is already an visible layer it is 1, 
    // if it is the current layer it is the relative state, otherwise 0
    const relativeState = isLayerVisible ? 1: isCurrentLayer ? 
      roundTo((currentState - start) / (end - start), 2): 0;

    if(isCurrentLayer) {
      layerState.active = i + 1;
    }

    // Add the layer object to the list
    layerState.layers.push({
      index: i + 1,
      transition: {
        start,
        end,
        progress: relativeState
      }
    });
  }

  return layerState;
};

/**
 * Calculates the properties of a layer based on its index.
 * @param {number} totalLayers - The total number of layers.
 * @param {number} activeLayer - The index of the active layer.
 * @returns {LayerState2} - An object with the properties of the layer.
 */
export const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState2 => {
  const currentState = 100 / (totalLayers -1) * (activeLayer -1);
  return calculateAllLayerStates(totalLayers, currentState);
};


interface Size {
  width: number
  height: number
}

export function sizeIsEqual (a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height
}

export function calcArtworkShrinkBySize (
  artworkSize: Size,
  canvasSize: Size
): number {
  return isLandscape(artworkSize)
    ? canvasSize.width / artworkSize.width
    : canvasSize.height / artworkSize.height
}

export function calcArtworkShrinkByScale (scale: number): number {
  return scale ** -1
}

export function calcArtworkRatio (
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

export function calcArtworkSize (
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
    maxScale: Math.min(ratio.widthRatio, ratio.heightRatio) ** -1,
    minScale: Math.min(
      transformedRatio.widthRatio,
      transformedRatio.heightRatio
    ),
    current: 1
  }

  return { size: currentSize, scale }
}

export function isLandscape ({ width, height }: Size): boolean {
  return width >= height
}

interface LayerState {
  layerPercentage: number
  layerIndex: number
  gapLength: number
  gapSize: number
  gapStart: number
  gapEnd: number
  gapPercentage: number
}

export function calcLayerStateByValue (
  value: number,
  length: number
): LayerState {
  let gapCount = 0
  let gapSize = 0
  let layer = 1

  if (length > 1) {
    gapCount = length - 1
    gapSize = 100 / gapCount
  }

  if (value !== 0 && length > 1) {
    layer = Math.ceil(value / gapSize) + 1
  }

  if (length === 1) {
    value = 100
  }

  return calcLayerState(layer, length, value)
}

export function calcLayerStateByIndex (
  index: number,
  length: number
): LayerState {
  let gapCount = 0
  let gapSize = 0
  let gap = 0
  let value = 100

  if (length > 1) {
    gapCount = length - 1
    gapSize = 100 / gapCount
    gap = index - 1
    value = gapSize * gap
  }

  return calcLayerState(index, length, value)
}

export function calcLayerOpacity (
  layer: number,
  index: number,
  percantage: number
): number {
  if (index + 1 === 1) return 1

  return layer === index + 1 ? percantage / 100 : layer > index + 1 ? 1 : 0
}

function calcLayerState (
  layer: number,
  layersCount: number,
  value: number
): LayerState {
  assert(
    value >= 0 && value <= 100,
    `Value has to be between 0 and 100. Is: ${value}`
  )
  assert(layersCount > 0, 'Number of parts has to be > 0')
  assert(
    layer > 0 && layer <= layersCount,
    'Part has to be in range of number of parts.'
  )

  const gap = layer - 1
  let gapCount = 0
  let gapSize = 0
  let gapStart = 0
  let gapEnd = 0
  let gapPercentage = 100

  if (layersCount > 1) {
    gapCount = layersCount - 1
    gapSize = 100 / gapCount
    gapEnd = gapSize * gap
    gapStart = gapEnd - gapSize > 0 ? gapEnd - gapSize : 0
    gapPercentage = ((value - gapStart) / gapSize) * 100
  }

  if (gap === 0) {
    gapPercentage = 0
  }

  return {
    layerPercentage: value,
    layerIndex: layer,
    gapLength: layersCount - 1,
    gapSize,
    gapEnd,
    gapPercentage,
    gapStart
  }
}

export function calcLayerStateByBoundary (
  value: number,
  numberOfParts: number,
  position: number,
  minX: number,
  maxX: number
): LayerState {
  const state = calcLayerStateByValue(value, numberOfParts)

  if (position < minX && state.layerPercentage >= 1) {
    state.layerPercentage -= 1
  }

  if (position > maxX && state.layerPercentage < 99) {
    state.layerPercentage += 1
  }
  return state
}

export const calcCanvasPosition = (
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
