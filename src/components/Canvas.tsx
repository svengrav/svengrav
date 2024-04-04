import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { CSSProperties, useEffect, useRef } from "react";
import { calcLayerOpacity } from "../core/ArtworkHandlers";
import { CanvasLayer } from "./CanvasLayer";
import { CanvasZoomControl } from "./CanvasZoomControl";
import { CanvasLayerControl } from "./CanvasLayerControl";
import { ArtworkContext } from "../hooks/useArtworkContext";

interface Size {
  width: number, height: number
}

type CanvasProps = {
  artworkState: ArtworkContext,
  zoomControl?: boolean,
  layerControl?: boolean,
  className?: string,
  maxSize?: { width?: number, height?: number }
  style?: CSSProperties | undefined,
  onScaleChange?: (state: CanvasScaleState) => void
  onLayerChange?: (state: CanvasLayerState) => void
  onSizeChange?: (state: CanvasSizeState) => void
}

export interface CanvasLayerState {
  layerPercentage: number,
  layerIndex: number,
}

export interface CanvasScaleState {
  canvasPosition: { x: number, y: number }
  canvasScale: number
}

export interface CanvasSizeState {
  canvasSize: { width: number, height: number }
}

//https://bettertyped.github.io/react-zoom-pan-pinch/?path=/story/docs-props--page
export const Canvas = ({
  artworkState,
  onScaleChange,
  maxSize,
  onLayerChange,
  onSizeChange,
  zoomControl,
  className,
  layerControl
}: CanvasProps) => {
  const artwork = artworkState.artwork;
  const controlRef = useRef<HTMLDivElement>(null);
  console.log(maxSize)

  const calcSizeWithControl = (canvasSize: Size, controlHeight: number | undefined) => ({ width: canvasSize.width, height: canvasSize.height + (controlHeight ? controlHeight : 0) });

  useEffect(() => {
    if (controlRef?.current) {

      var controlHeight = controlRef?.current?.offsetHeight;

      onSizeChange!({
        canvasSize: {
          width: maxSize?.width ? maxSize.width : window.innerWidth,
          height: maxSize?.height ? maxSize.height - controlHeight : window.innerHeight - controlHeight
        }
      })
    }

  }, [])

  const handleZoomChange = (canvas: any) => {
    if (!onScaleChange) return;

    onScaleChange({
      canvasScale: canvas.scale,
      canvasPosition: { x: canvas.position.x, y: canvas.position.y }
    })
  }

  const handleLayerChange = (layer: any) => {
    if (!onLayerChange) return;

    onLayerChange({
      layerPercentage: layer.layerPercentage,
      layerIndex: layer.layerIndex
    })
  }

  return (
    <div className={className} style={calcSizeWithControl(artworkState.canvasSize, controlRef?.current?.offsetHeight)}>
      <TransformWrapper maxScale={artworkState.canvasMaxScale} >
        <div className="w-full h-full flex flex-col ">

          <div className="w-full  flex justify-center grow overflow-hidden ">
            <TransformComponent contentStyle={artworkState.canvasSize}>
              {
                artwork.layer.map((layer, i) => {
                  const opacity = calcLayerOpacity(artworkState.layerIndex, i, artworkState.layerPercentage)
                  return <CanvasLayer key={"l" + i} opacity={opacity}>{layer.inner}</CanvasLayer>
                })
              }
            </TransformComponent>
          </div>

          <div className='w-min m-auto' ref={controlRef}>
            {
              zoomControl ?
                <CanvasZoomControl
                  onChange={handleZoomChange} />
                : <></>
            }
            {
              layerControl ?
                <CanvasLayerControl
                  layerIndex={artworkState.layerIndex}
                  layerLength={artworkState.artwork.layer.length}
                  layerPercentage={artworkState.layerPercentage}
                  onChange={handleLayerChange} />
                : <></>
            }
          </div>
        </div>
      </TransformWrapper>
    </div>
  )
};