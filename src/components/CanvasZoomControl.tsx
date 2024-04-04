import { ArrowsPointingInIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";
import { useControls, useTransformContext } from "react-zoom-pan-pinch";

interface CanvasZoomControlProps {
  onChange?: (v: CanvasZoom) => void;
}

interface CanvasZoom {
  scale: number;
  position: {
    x: number;
    y: number;
  };
}

export function CanvasZoomControl({ onChange }: CanvasZoomControlProps) {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const context = useTransformContext();

  const pushContext = () => {
    const canvasState = context.getContext().state;
    if (onChange)
      onChange({
        scale: canvasState.scale,
        position: {
          x: canvasState.positionX,
          y: canvasState.positionY
        }
      });
  }

  context.onChange(() => pushContext());

  return (
    <div>
      <div className="mt-2 m-auto w-full flex justify-center text-white">
        <button onClick={() => zoomOut()} ><MagnifyingGlassMinusIcon className="h-6 w-6 m-1 hover:fill-gray-300" /></button>
        <button onClick={() => resetTransform()} ><ArrowsPointingInIcon className="h-6 w-6 m-1 hover:fill-gray-300" /></button>
        <button onClick={() => zoomIn()} ><MagnifyingGlassPlusIcon className="h-6 w-6 m-1 hover:fill-gray-300" /></button>
      </div>
    </div>
  )
}
