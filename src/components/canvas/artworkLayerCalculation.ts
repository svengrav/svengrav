
/**
 * Rundet eine Zahl auf die gewünschte Anzahl von Dezimalstellen.
 * @param {number} value - Die zu rundende Zahl.
 * @param {number} decimals - Anzahl der Dezimalstellen.
 * @returns {number} - Gerundete Zahl.
 */
const roundTo = (value: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Represents the state of a layer in the artwork calculation process.
 *
 * @property {number} progress - The overall progress of the layer.
 * @property {number} active - The index of the currently active layer.
 * @property {Array} layers - An array of layer objects, each containing an index and a transition object.
 * @property {number} layers[].index - The index of the layer.
 * @property {Object} layers[].transition - The transition details of the layer.
 * @property {number} layers[].transition.start - The start value of the transition.
 * @property {number} layers[].transition.end - The end value of the transition.
 * @property {number} layers[].transition.progress - The progress of the transition.
 */
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
 * Calculates the properties of a single layer based on its index.
 * @param {number} totalLayers - The total number of layers.
 * @param {number} layerIndex - The index of the layer to calculate.
 * @param {number} currentState - The current state (1–100).
 * @returns {object} - An object with the properties of the layer.
 */
export const calculateSingleLayerState = (totalLayers: number, layerIndex: number, currentState: number) => {
  const layerSize = totalLayers > 1 ? roundTo(100 / (totalLayers - 1), 2) : 100; // Size of each layer
  const start = layerIndex === 0 ? 0 : roundTo((layerIndex - 1) * layerSize, 2);
  const end = layerIndex === 0 ? 0 : roundTo(layerIndex * layerSize, 2);

  const isLayerZeroAndCurrent = currentState === 0 && layerIndex === 0;
  const isCurrentLayer = (currentState > start && currentState <= end) || isLayerZeroAndCurrent;
  const isLayerVisible = (currentState > end) || isLayerZeroAndCurrent;
  const relativeState = isLayerVisible ? 1 : isCurrentLayer ? roundTo((currentState - start) / (end - start), 2) : 0;

  return {
    index: layerIndex + 1,
    transition: {
      start,
      end,
      progress: relativeState
    }
  };
};

/**
 * Calculates the properties of a layer based on its index.
 * @param {number} totalLayers - The total number of layers.
 * @param {number} activeLayer - The index of the active layer.
 * @returns {LayerState} - An object with the properties of the layer.
 */
export const calculateLayerStateByIndex = (totalLayers: number, activeLayer: number): LayerState => {
  if(totalLayers === 1) {
    return calculateAllLayerStates(1, 100);
  }

  const currentState = 100 / (totalLayers -1) * (activeLayer -1);
  return calculateAllLayerStates(totalLayers, currentState);
};
