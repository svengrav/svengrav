import { TransformComponent } from 'react-zoom-pan-pinch'
import { CanvasLayer } from './CanvasLayer'
import { useCanvasContext } from './CanvasWrapper'
import { calculateSingleLayerState } from '../core/artworkLayerCalculation'

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
                  const state = calculateSingleLayerState(layer.length, i, layer.percentage)
                  return <CanvasLayer key={'l' + i} opacity={state.transition.progress}>{v.inner}</CanvasLayer>
                })
              }
          </TransformComponent>
        </div>
      </div>
    </div>
  )
}
