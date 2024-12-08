interface CanvasLayerProps {
  opacity: number
  children: any
}

/**
 * CanvasLayer component that wraps its children with a div element.
 * The div element's opacity and display properties are controlled by the component's props.
 *
 * @param {CanvasLayerProps} props - The properties for the CanvasLayer component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the CanvasLayer.
 * @param {number} props.opacity - The opacity level for the CanvasLayer. If the opacity is less than 0.05, the display property will be set to 'none'.
 *
 * @returns {JSX.Element} The rendered CanvasLayer component.
 */
export function CanvasLayer ({ children, opacity }: CanvasLayerProps): JSX.Element {
  const isVisible = (opacity: number) => (opacity < 0.05 ? 'none' : 'block')

  return (
    <div
      className='absolute h-full w-full'
      style={{ opacity, display: isVisible(opacity) }}
    >
      {children}
    </div>
  )
}
