import { ReactZoomPanPinchContentRef, ReactZoomPanPinchRef, TransformWrapper } from 'react-zoom-pan-pinch'
import { ArtworkContext, useArtworkContext } from '../hooks/useArtworkContext'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { Artwork } from '../core/Artwork'
import {Size } from '../core/BaseType'
import { calcLayerStateByBoundary } from '../core/artworkCalculation'

const CanvasContext = createContext<ArtworkContext | undefined>(undefined)

interface CanwasWrapperProps {
  children: any
  artwork: Artwork
  size: Size
}

export const CanvasWrapper = ({
  children,
  artwork,
  size
}: CanwasWrapperProps) => {
  const context = useArtworkContext(artwork, { canvasSize: size })
  const { state, setLayer } = context
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null)
  const transformed = state.transformed

  // Memoize the onPanning function to avoid it being recreated on every render
  const onPanning = useCallback((ref: ReactZoomPanPinchRef, event: TouchEvent | MouseEvent) => {
    const bounds = ref.instance.bounds;

    if (!bounds) {
      console.warn("Bounds are undefined, skipping panning calculation.");
      return;
    }

    const { maxPositionX, minPositionX } = bounds;

    if (minPositionX === undefined || maxPositionX === undefined) {
      console.warn("Boundary values are undefined, skipping layer state calculation.");
      return;
    }

    const curPosX = ref.state.positionX;

    const layerState = calcLayerStateByBoundary(
      state.layer.percentage,
      state.layer.length,
      curPosX,
      minPositionX,
      maxPositionX
    );

    console.log("Layer State:", layerState);

    if (
      layerState.layerIndex !== state.layer.index ||
      layerState.layerPercentage !== state.layer.percentage
    ) {
      setLayer({
        index: layerState.layerIndex,
        percentage: layerState.layerPercentage
      });1
    }
  }, [state.layer.percentage, state.layer.length, setLayer]); // Dependencies to recalculate the function if state changes


  
  // Reset transform if wrapper rerenders (ex: window size changed)
  useEffect(() => {
    transformRef.current?.resetTransform();
  }, [size])

  return (
    <CanvasContext.Provider value={context}>
      <TransformWrapper
        onPanning={onPanning}
        centerOnInit
        maxScale={transformed.scale.maxScale}
        minScale={transformed.scale.minScale}
        initialScale={transformed.scale.current}
        initialPositionX={transformed.position.x}
        initialPositionY={transformed.position.y}
        ref={transformRef}
      >
        {children}
      </TransformWrapper>
    </CanvasContext.Provider>
  )
}

export const useCanvasContext = () => {
  const context = useContext(CanvasContext)
  if (context == null) {
    throw new Error('useCanvasContext must be used within a CanvasProvider')
  }
  return context
}
