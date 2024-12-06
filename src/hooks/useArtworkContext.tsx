import { Artwork, ArtworkLayer } from '../core/Artwork'
import { calcArtworkSize as calcArtworkState, calcCanvasPosition, calcLayerStateByIndex, calculateLayerStateByIndex, sizeIsEqual } from '../core/artworkCalculation'
import { useEffect, useState } from 'react'
import { useWindowResize } from './useWindowResize'

type OverflowOptions = 'fit' | 'contain'
interface Position { x: number, y: number }
interface Size { width: number, height: number }

export interface ArtworkState {
  artwork: {
    size: Size
  }
  canvas: {
    size: Size
  }
  transformed: ArtworkTransformation
  layer: {
    length: number
    index: number
    percentage: number
    values: ArtworkLayer[]
  }
}

export interface ArtworkContext {
  state: ArtworkState
  set: (transformation: ArtworkTransformation) => void
  setSize: ({ width, height }: { width: number, height: number }) => void
  setPosition: ({ position, scale }: { position: { x: number, y: number }, scale: number }) => void
  setScale: ({ scale }: { scale: number }) => void
  setLayer: ({ index, percentage }: { index: number, percentage: number }) => void
}

interface ArtworkTransformation {
  overflow: OverflowOptions
  size: Size
  scale: {
    current: number
    minScale: number
    maxScale: number
  }
  position: Position
}

interface ArtworkContextOptions {
  overflow?: OverflowOptions
  canvasSize?: Size
}

const calcInitialState = (artwork: Artwork, canvasSize: Size): ArtworkState => {
  const transformation = calcArtworkState(artwork.size, canvasSize, 'fit')
  const canvasPosition = calcCanvasPosition(transformation.size, canvasSize, 'center')
  return {
    artwork,
    transformed: {
      ...transformation,
      overflow: 'fit',
      position: canvasPosition
    },
    layer: {
      length: artwork.layer.length,
      index: artwork.defaultIndex,
      percentage: calculateLayerStateByIndex(artwork.defaultIndex, artwork.layer.length).progress,
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
  const artworkConst = artwork
  const canvasSize = ((options?.canvasSize) != null) ? options?.canvasSize : { width: 0, height: 0 }
  const [window] = useWindowResize()
  const [context, setContext] = useState<ArtworkState>(calcInitialState(artwork, canvasSize))

  useEffect(() => {
    setSize(canvasSize)
  }, [canvasSize, window])

  const setSize = (size: Size) => {
    const transformation = calcArtworkState(artworkConst.size, size, context.transformed.overflow)
    const canvasPosition = calcCanvasPosition(transformation.size, size, 'center')
    if (!sizeIsEqual(size, context.canvas.size)) {
      setContext({
        ...context,
        canvas: {
          ...context.canvas,
          size
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
      ...context,
      transformed: {
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
        position,
        scale: {
          ...context.transformed.scale,
          current: scale
        }
      }
    })
  }

  const setLayer = ({ index, percentage }: { index: number, percentage: number }) => {
    setContext({
      ...context,
      layer: {
        ...context.layer,
        index,
        percentage
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
