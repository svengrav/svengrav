import { TransformComponent } from 'react-zoom-pan-pinch'
import { calcLayerOpacity } from '../core/artworkCalculation'
import { CanvasLayer } from './CanvasLayer'
import { useCanvasContext } from './CanvasWrapper'

// https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-props--page
export const Canvas = ({ className }: { className?: string }) => {
  const { canvas, transformed, layer } = useCanvasContext().state
  return (
    <div className={className} style={canvas.size}>
      <div className='w-full h-full flex'>
        <div className='w-full flex justify-center grow '>
          <TransformComponent contentStyle={{ ...transformed.size }} wrapperStyle={{ ...canvas.size }}>
            {
                layer.values.map((v, i) => {
                  const opacity = calcLayerOpacity(layer.index, i, layer.percentage)
                  return <CanvasLayer key={'l' + i} opacity={opacity}>{v.inner}</CanvasLayer>
                })
              }
          </TransformComponent>
        </div>
      </div>
    </div>
  )
}
