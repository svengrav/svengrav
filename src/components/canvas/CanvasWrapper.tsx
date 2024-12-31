import { TransformWrapper, useTransformComponent } from 'react-zoom-pan-pinch'
import { useCanvasContext } from './CanvasStateProvider'

interface CanvasWrapperProps {
  children: React.ReactNode
}

export const CanvasWrapper = ({
  children,
}: CanvasWrapperProps) => {
  const context = useCanvasContext()
  const transformed = context.getTransformation()

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
    >
      <TransformHook>
        {children}
      </TransformHook>
    </TransformWrapper>
  )
}

const TransformHook = ({ children }: { children: React.ReactNode }) => {
  const context = useCanvasContext()
  const transformed = context.getTransformation()

  useTransformComponent(({ state }) => {
    const { positionX, positionY, scale } = state
    const { x, y } = transformed.position

    const positionChanged = Math.abs(positionX - x) > 5 || Math.abs(positionY - y) > 5
    const scaleChanged = Math.abs(scale - transformed.scale.current) > 0.05

    if (!positionChanged && !scaleChanged) return
    context.setView({
      position: {
        x: state.positionX,
        y: state.positionY
      },
      scale: state.scale
    })
  })
  return <>{children}</>
}