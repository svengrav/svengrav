import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { calcLayerStateByIndex, calcLayerStateByValue, calcLayerStateByBoundary } from "../core/ArtworkHandlers";
import { useTransformContext } from "react-zoom-pan-pinch";
import classNames from "classnames";

interface CanvasLayerControlProps {
  layerIndex: number,
  layerLength: number,
  layerPercentage: number,
  onChange: (state: { layerPercentage: number, layerIndex: number }) => void;
}

export function CanvasLayerControl({ layerIndex, layerLength, layerPercentage, onChange }: CanvasLayerControlProps) {
  const context = useTransformContext();

  if (context.isPanning) {
    var curPosX = context.getContext().state.positionX;
    var maxPosX = context.getContext().instance.bounds?.maxPositionX;
    var minPosX = context.getContext().instance.bounds?.minPositionX;
    var layerState = calcLayerStateByBoundary(layerPercentage, layerLength, curPosX, minPosX!, maxPosX!);
    setTimeout(() => {
      onChange({
        layerIndex: layerState.layerIndex,
        layerPercentage: layerState.layerPercentage
      })
    }, 1);
  }

  const onInputChangeByValue = (value: any) => {
    var state = calcLayerStateByValue(parseInt(value), layerLength);
    console.log(state)
    onChange(state)
  };

  const onInputChangeByLayer = (layer: number) => {
    var state = calcLayerStateByIndex(layer, layerLength)
    onChange(state)
  };

  return (
    <div className="mt-3 flex flex-col items-center">
      <ControlSlider percentage={layerPercentage} onChange={onInputChangeByValue} />
      <ControlTicks  index={layerIndex} onChange={onInputChangeByLayer} length={layerLength} />
    </div>
  )
}

const ControlTicks = ({length, index, onChange}: { length: number, index: number, onChange: any}) => {
  return (
    <div className="w-min flex justify-around m-auto p-2 mt-3">
    {
      Array.from(Array(length)).map((_, current) => {
        const layerIndex = current + 1;
        return (
          <div key={current} className="relative mx-4" onClick={() => onChange(layerIndex)}>
            <div className="absolute left-8 text-xs text-gray-400">
              {layerIndex}
            </div>
            {
              index <= current ?
                <PlusIcon className="h-6 w-6 hover:border cursor-pointer text-white" /> :
                <XMarkIcon className="h-6 w-6 hover:bg-gray-400 bg-white text-black cursor-pointer" />
            }
          </div>
        )
      })
    }
  </div>
  )
}

const ControlSlider = ({percentage, onChange} : { percentage: number, onChange: any})  => {
  const width = 300;

  return (
    <div className="w-min relative flex" style={{ width: width }}>
        <div className="absolute h-1 bg-gradient-to-r bg-gray-300"  
          style={{ 
            width: width / 100 * percentage 
        }} />
        <input type="range"
          onChange={(e) => onChange(e.currentTarget.value)}
          value={percentage}
          style={{ width: width }}
          className={classNames(
            "absolute",
            "bg-none outline-none",
            "bg-white/20",
            "[&::-webkit-slider-thumb]:bg-white",
            "[&::-webkit-slider-runnable-track]:h-1",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:-mt-1",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:h-3",
            "[&::-webkit-slider-thumb]:w-3",
            "h-1",
            "cursor-pointer",
            "appearance-none",
            "rounded-md",
            "bg-gray-200",
          )} />
    </div>
  )
}