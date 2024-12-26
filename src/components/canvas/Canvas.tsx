import { TransformComponent } from 'react-zoom-pan-pinch'
import { CanvasStateProvider, useCanvasContext } from './CanvasStateProvider'
import { CanvasNavigator } from './CanvasNavigator'
import { CanvasZoomControl } from './CanvasZoomControl'
import { CanvasLayerControl } from './CanvasLayerControl'
import { Artwork } from '@components/artwork/Artwork'
import { useEffect, useRef } from 'react'

// https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-props--page

let count = 0;


/**
 * Canvas component that provides a context for managing the state of the canvas,
 * including navigation, view, zoom control, and layer control.
 *
 * @param {Object} props - The properties object.
 * @param {Artwork} props.artwork - The artwork object to be displayed on the canvas.
 *
 */
export const Canvas = ({ artwork }: { artwork: Artwork}) => { 
  return (
    <CanvasStateProvider artwork={artwork} size={{ height: window.innerHeight - 150, width: window.innerWidth }}>
      <CanvasNavigator />
      <CanvasView className="m-auto" />
      <CanvasZoomControl />
      <CanvasLayerControl />
    </CanvasStateProvider>
  )
}

/**
 * Canvas component that renders a canvas with layers and transformations.
 *
 * @param {CanvasViewProps} props - The properties for the Canvas component.
 * @param {string} props.className - The CSS class name to apply to the canvas container.
 *
 */
export const CanvasView = ({ className }: { className?: string }) => {
  const context = useCanvasContext()
  const { transformation, artwork, size } = context.getContext()
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div className={className} style={size} ref={canvasRef}>
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
