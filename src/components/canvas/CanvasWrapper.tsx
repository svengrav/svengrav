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
    transformRef.current?.instance.onChange(() => {
      const transformation = transformRef.current!.instance.getContext().state
      context.setView({
        position: {
          x: transformation.positionX,
          y: transformation.positionY
        },
        scale: transformation.scale
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