import { Artwork, ArtworkLayer } from '@components/artwork/Artwork';
import { calcArtworkSize as calcArtworkState, calcCanvasPosition, sizeIsEqual } from '@components/artwork/artworkCalculation';
import { useEffect, useState } from 'react';
import { useWindowResize } from './useWindowResize';
import { calculateLayerStateByIndex } from '@components/artwork/artworkLayerCalculation';
import { Position, Size } from '@core/geometry';

type OverflowOptions = 'fit' | 'contain';

///#region private types

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
//#endregion

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
  setSize: ({ width, height }: { width: number, height: number }) => void
  setPosition: ({ position, scale }: { position: { x: number, y: number }, scale: number }) => void
  setScale: ({ scale }: { scale: number }) => void
  setLayer: ({ index, percentage }: { index: number, percentage: number }) => void
}

/**
 * Calculate initial state for the artwork context.
 */
const calcInitialState = (artwork: Artwork, canvasSize: Size): ArtworkState => {
  const transformation = calcArtworkState(artwork.size, canvasSize, 'fit');
  const canvasPosition = calcCanvasPosition(transformation.size, canvasSize, 'center');
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
      percentage: calculateLayerStateByIndex(artwork.layer.length, artwork.defaultIndex).progress,
      values: artwork.layer
    },
    canvas: {
      size: canvasSize
    }
  };
};

/**
 * Hook to get the artwork context based on artwork and canvas size.
 */
export const useArtworkContext = (artwork: Artwork, options?: ArtworkContextOptions): ArtworkContext => {
  const artworkConst = artwork;
  const canvasSize = options?.canvasSize ?? { width: 0, height: 0 };
  const {windowSize: window} = useWindowResize();
  const [context, setContext] = useState<ArtworkState>(calcInitialState(artwork, canvasSize));

  useEffect(() => {
    setSize(canvasSize);
  }, [canvasSize, window]);

  const setSize = (size: Size) => {
    const transformation = calcArtworkState(artworkConst.size, size, context.transformed.overflow);
    const canvasPosition = calcCanvasPosition(transformation.size, size, 'center');
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
      });
    }
  };

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
    });
  };

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
    });
  };

  const setLayer = ({ index, percentage }: { index: number, percentage: number }) => {
    setContext({
      ...context,
      layer: {
        ...context.layer,
        index,
        percentage
      }
    });
  };

  return {
    state: context,
    setSize,
    setScale,
    setPosition,
    setLayer
  };
};
