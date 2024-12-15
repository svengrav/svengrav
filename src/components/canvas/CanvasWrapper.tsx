import { ReactZoomPanPinchContentRef, TransformWrapper } from 'react-zoom-pan-pinch'
import { createContext, useEffect, useRef } from 'react'
import { CanvasContext } from './canvasTransformation'
import { useCanvasContext } from './CanvasStateProvider'

const Canvas= createContext<CanvasContext | undefined>(undefined)

interface CanvasWrapperProps {
  children: React.ReactNode
}

export const CanvasWrapper = ({
  children,
}: CanvasWrapperProps) => {

  const context = useCanvasContext()
  
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null)
  const transformed = context.getTransformation()

  // Reset transform if wrapper rerenders (ex: window size changed)
  useEffect(() => {
    transformRef.current?.resetTransform();
  }, [])

  return (
    <TransformWrapper
      doubleClick={{ disabled: true }}
      limitToBounds={true}
      centerOnInit
      maxScale={transformed.scale.max}
      minScale={transformed.scale.min}
      initialScale={transformed.scale.current}
      initialPositionX={transformed.position.x}
      initialPositionY={transformed.position.y}
      ref={transformRef}
    >
      {children}
    </TransformWrapper>
  )
}