import { TransformComponent } from 'react-zoom-pan-pinch'
import { calculateSingleLayerState } from '@components/artwork/artworkLayerCalculation'

import { CanvasLayer } from './CanvasLayer'
import { useCanvasContext } from './CanvasWrapper'

// https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-props--page

/**
 * Props for the Canvas component.
 * 
 * @property {string} [className] - Optional CSS class name to apply to the canvas.
 */
type CanvasProps = {
  className?: string
}

/**
 * Canvas component that renders a canvas with layers and transformations.
 *
 * @param {CanvasProps} props - The properties for the Canvas component.
 * @param {string} props.className - The CSS class name to apply to the canvas container.
 *
 * @returns {JSX.Element} The rendered Canvas component.
 */
export const Canvas = ({ className }: CanvasProps) => {
  const { state } = useCanvasContext()
  const { canvas, transformed, layer } = state

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
