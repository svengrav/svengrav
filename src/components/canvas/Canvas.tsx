import { TransformComponent } from 'react-zoom-pan-pinch'
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
              transformation.layer.layers.map((layer, i) => {
                return <CanvasLayer key={'l' + i} opacity={layer.transition.progress}>{artwork.layer[i].inner}</CanvasLayer>
              })
            }
          </TransformComponent>
        </div>
      </div>
    </div>
  )
}

/**
 * Props for the CanvasLayer component.
 *
 * @interface CanvasLayerProps
 * @property {number} opacity - The opacity level of the canvas layer.
 * @property {any} children - The child elements to be rendered within the canvas layer.
 */
interface CanvasLayerProps {
  opacity: number
  children: React.ReactNode
}

/**
 * CanvasLayer component that wraps its children with a div element.
 * The div's opacity and display properties are controlled by the `opacity` prop.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the div.
 * @param {number} props.opacity - The opacity value for the div. If the opacity is less than 0.05, the div will not be displayed.
 */
const CanvasLayer = ({ children, opacity }: CanvasLayerProps) => {
  const isVisible = (opacity < 0.05 ? 'none' : 'block')

  return (
    <div
      className='absolute h-full w-full'
      style={{ opacity, display: isVisible }}
    >
      {children}
    </div>
  )
}
