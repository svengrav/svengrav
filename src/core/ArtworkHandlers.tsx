import { assert } from "../utils/helper";

type Size = {
  width: number,
  height: number
}

type ArtworkSize = {
  size: Size,
  shrink: number,
  scale: number
}

export function sizeIsEqual(a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height;
}

export function calcArtworkShrinkBySize(artworkSize: Size, canvasSize: Size) : number {
  return artworkIsLandscape(artworkSize.width, artworkSize.height) ? canvasSize.width / artworkSize.width : canvasSize.height / artworkSize.height;
}

export function calcArtworkShrinkByScale(scale: number) : number {
  return scale **-1;
}

export function calcArtworkScale(artworkSize: Size, canvasSize: Size) : number {
  const widthRatio =  artworkSize.width / canvasSize.width;
  const heightRatio = artworkSize.height / canvasSize.height;

  const artworkIsUnlimited = widthRatio <= 1 && heightRatio <= 1;
  const scale = artworkIsUnlimited ? 1 : widthRatio >= heightRatio ? widthRatio : heightRatio; 
  return scale
}


export default function calcArtworkSize(artwork: Size, boundary: Size): ArtworkSize {
  const scale = calcArtworkScale(artwork, boundary)

  if (artworkIsLandscape(artwork.width, artwork.height)) {
    const width = artwork.width / scale;
    const height = artwork.height / scale;
    const shrink = width / artwork.width;
    return { size: { width: width, height: height }, shrink, scale }
  } else {
    const height = artwork.height / scale;
    const width = artwork.width / scale;
    const shrink = height / artwork.height;
    return { size: { width: width, height: height }, shrink, scale }
  }
}

export function artworkIsLandscape(width: number, height: number): boolean {
  return width >= height;
}

interface LayerState {
  layerPercentage: number,
  layerIndex: number,
  gapLength: number,
  gapSize: number,
  gapStart: number,
  gapEnd: number,
  gapPercentage: number,
}

export function calcLayerStateByValue(value: number, length: number) : LayerState { 
  var gapCount = 0;
  var gapSize = 0;
  var layer = 1;

  if(length > 1) {
    gapCount = length -1;
    gapSize = 100 / gapCount
  }

  if(value !== 0 && length > 1) {
    layer = Math.ceil((value) / gapSize) + 1;
  }

  return calcLayerState(layer, length, value)
}

export function calcLayerStateByIndex(index: number, length: number) : LayerState { 
  var gapCount = 0;
  var gapSize = 0;
  var gap = 0;
  var value = 100;

  if(length > 1) {
     gapCount = length - 1
     gapSize = 100 / gapCount 
     gap = index - 1
     value = (gapSize * gap)
  }

  return calcLayerState(index, length, value)
}

export function calcLayerOpacity(layer: number, index: number, percantage: number) : number {
  if(index + 1 === 1) 
    return 1;

  return (layer === index + 1 ? percantage / 100 : layer > index + 1 ? 1 : 0);
}

function calcLayerState(layer: number, layersCount: number, value: number) : LayerState { 
  assert(value >= 0 && value <= 100, `Value has to be between 0 and 100. Is: ${value}`)
  assert(layersCount > 0, `Number of parts has to be > 0`)
  assert(layer > 0 && layer <= layersCount, `Part has to be in range of number of parts.`)

  var gap = layer - 1;
  var gapCount = 0;
  var gapSize = 0;
  var gapStart = 0;
  var gapEnd = 0
  var gapPercentage = 100;
  
  if(layersCount > 1) { 
    gapCount = (layersCount - 1)
    gapSize = 100 / gapCount
    gapEnd = gapSize * gap
    gapStart = gapEnd - gapSize > 0 ? gapEnd - gapSize : 0
    gapPercentage = (((value) - gapStart) / gapSize) * 100
  }

  if(gap === 0) {
    gapPercentage = 0;
  }

  return {
    layerPercentage: value,
    layerIndex: layer,
    gapLength: layersCount -1,
    gapSize: gapSize ,
    gapEnd: gapEnd,
    gapPercentage: gapPercentage, 
    gapStart: gapStart
  }
}

export function calcLayerStateByBoundary(value: number, numberOfParts: number, position: number, minX: number, maxX: number): LayerState  {
  var state = calcLayerStateByValue(value, numberOfParts)

  if(position < minX && state.layerPercentage >= 1) {
    state.layerPercentage -= 1
  }

  if(position > maxX && state.layerPercentage < 99) {
    state.layerPercentage += 1
  }
  return state
}
