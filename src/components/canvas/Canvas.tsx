import { TransformComponent } from 'react-zoom-pan-pinch'
import { CanvasLayer } from './CanvasLayer'
import { useCanvasContext } from './CanvasStateProvider'

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
 */
export const Canvas = ({ className }: CanvasProps) => {
  const context = useCanvasContext()
  const { transformation, artwork, size } = context.getContext()

  return (
    <div className={className} style={size}>
      <div className='w-full h-full flex'>
        <div className='w-full flex justify-center grow '>
          <TransformComponent contentStyle={{ ...transformation.size }} wrapperStyle={{ ...transformation.size }}>
            {
              transformation.layer.layers.map((v, i) => {
                return <CanvasLayer key={'l' + i} opacity={v.transition.progress}>{artwork.layer[i].inner}</CanvasLayer>
              })
            }
          </TransformComponent>
        </div>
      </div>
    </div>
  )
}
