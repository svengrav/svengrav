import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  calcLayerStateByIndex,
  calcLayerStateByValue,
  calcLayerStateByBoundary,
} from "../core/artworkCalculation";
import { useTransformContext } from "react-zoom-pan-pinch";
import classNames from "classnames";
import { useCanvasContext } from "./CanvasWrapper";

export function CanvasLayerControl() {
  const transformationContext = useTransformContext();
  const { state, setLayer } = useCanvasContext();

  if (transformationContext.isPanning) {
    var curPosX = transformationContext.getContext().state.positionX;
    var maxPosX = transformationContext.getContext().instance.bounds?.maxPositionX;
    var minPosX = transformationContext.getContext().instance.bounds?.minPositionX;
    
    var layerState = calcLayerStateByBoundary(
      state.layer.percentage,
      state.layer.length,
      curPosX,
      minPosX!,
      maxPosX!
    );

    setTimeout(() => {
      setLayer({
        index: layerState.layerIndex,
        percentage: layerState.layerPercentage,
      });
    }, 1);
  }

  const onInputChangeByValue = (value: number) => {
    var newState = calcLayerStateByValue(value, state.layer.length);
    setLayer({
      index: newState.layerIndex,
      percentage: newState.layerPercentage,
    });
  };

  const onInputChangeByLayer = (layer: number) => {
    var newState = calcLayerStateByIndex(layer, state.layer.length);
    setLayer({
      index: newState.layerIndex,
      percentage: newState.layerPercentage,
    });
  };

  return (
    <div className="mt-3 flex flex-col items-center">
      <ControlSlider
        percentage={state.layer.percentage}
        onChange={onInputChangeByValue}
        disabled={state.layer.length <= 1}
      />
      <ControlTicks
        index={state.layer.index}
        onChange={onInputChangeByLayer}
        length={state.layer.length}
      />
    </div>
  );
}

const ControlTicks = ({
  length,
  index,
  onChange,
}: {
  length: number;
  index: number;
  onChange: any;
}) => {
  return (
    <div className="w-min flex justify-around m-auto p-2 mt-3">
      {Array.from(Array(length)).map((_, current) => {
        const layerIndex = current + 1;
        return (
          <div
            key={current}
            className="relative mx-4"
            onClick={() => onChange(layerIndex)}
          >
            <div className="absolute left-7 -top-1 text-xs text-gray-400">
              {layerIndex}
            </div>
            {index <= current ? (
              <PlusIcon className="h-5 w-5 hover:border cursor-pointer text-white" />
            ) : (
              <XMarkIcon className="h-5 w-5 hover:bg-gray-400 bg-white text-black cursor-pointer" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const ControlSlider = ({
  percentage,
  onChange,
  disabled,
}: {
  percentage: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}) => {
  const absoluteWidth = 300;
  const relativeWidth = (absoluteWidth / 100) * percentage;

  return (
    <div className="w-min relative flex" style={{ width: absoluteWidth }}>
      <div
        className="absolute h-1 bg-gradient-to-r bg-gray-300"
        style={{ width: relativeWidth }}
      />
      <input
        type="range"
        disabled={disabled}
        onChange={(e) => onChange(parseInt(e.currentTarget.value))}
        value={percentage}
        style={{ width: absoluteWidth }}
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
          "bg-gray-200"
        )}
      />
    </div>
  );
};
