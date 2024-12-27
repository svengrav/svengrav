import { ReactZoomPanPinchContentRef, TransformWrapper, useTransformContext } from 'react-zoom-pan-pinch'
import { useEffect, useRef } from 'react'
import { useCanvasContext } from './CanvasStateProvider'

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
    transformRef.current?.resetTransform()
    transformRef.current?.instance.onChange((zoomPan) => {

      const { positionX, positionY, scale } = zoomPan.state;
      const { x, y } = transformed.position
      
      // Check if position or scale has changed by more than 5 units
      const positionChanged = Math.abs(positionX - x) > 5 || Math.abs(positionY - y) > 5
      const scaleChanged = Math.abs(scale - transformed.scale.current) > 0.05

      if(!positionChanged && !scaleChanged) return;

      context.setView({
        position: {
          x: zoomPan.state.positionX,
          y: zoomPan.state.positionY
        },
        scale: zoomPan.state.scale
      })
    })
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