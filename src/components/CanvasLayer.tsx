
interface CanvasLayerProps {
  opacity: number,
  children: any
}

export function CanvasLayer({ children, opacity }: CanvasLayerProps) {
  const isVisible = (opacity: number) =>  opacity < 0.05 ? "none" : "block";
  return (
    <div className="absolute h-full w-full" style={{ opacity: opacity,  display: isVisible(opacity) }}>
      {children}
    </div>
  )
}
