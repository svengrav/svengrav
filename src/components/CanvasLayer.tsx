interface CanvasLayerProps {
  opacity: number
  children: any
}

/**
 * CanvasLayer component that wraps its children with a div element.
 * The div's opacity and display properties are controlled by the `opacity` prop.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the div.
 * @param {number} props.opacity - The opacity value for the div. If the opacity is less than 0.05, the div will not be displayed.
 *
 * @returns {JSX.Element} The rendered CanvasLayer component.
 */
export const CanvasLayer = ({ children, opacity }: CanvasLayerProps) => {
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
