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
  const { state } = context
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null)
  const transformed = state.transformed

  // Reset transform if wrapper rerenders (ex: window size changed)
  useEffect(() => {
    transformRef.current?.resetTransform();
  }, [size])

  return (
    <CanvasContext.Provider value={context}>
      <TransformWrapper
      limitToBounds={true}
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
