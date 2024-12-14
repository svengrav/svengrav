/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param decimals - The number of decimal places to round to. Defaults to 2.
 * @returns The rounded number.
 */
const roundTo = (value: number, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

export interface LayerState {
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
 * @returns {LayerState} - A list of all layers with their properties.
 */
export const calculateAllLayerStates = (totalLayers: number, currentState: number): LayerState => {
  const layerState : LayerState ={
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
 * @returns {LayerState} - An object with the properties of the layer.
 */
export const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState => {
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
