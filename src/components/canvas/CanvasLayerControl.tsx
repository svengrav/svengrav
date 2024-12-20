import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"
import { useCanvasContext } from "./CanvasWrapper"
import { calculateAllLayerStates, calculateLayerStateByIndex } from "@components/artwork/artworkLayerCalculation"

/**
 * CanvasLayerControl component provides controls for managing canvas layers.
 * It includes a slider for adjusting the layer percentage and tick controls for selecting layers by index.
* @remarks
 * This component uses the `useCanvasContext` hook to access and update the canvas state.
 * It provides two main functionalities:
 * - Adjusting the layer percentage using a slider.
 * - Selecting a layer by index using tick controls.
 */
export const CanvasLayerControl = () => {
  const { state, setLayer } = useCanvasContext()

  // Update the layer state based on the input value
  const onInputChangeByValue = (value: number) => {
    const newState = calculateAllLayerStates(state.layer.length, value)
    setLayer({
      index: newState.active,
      percentage: newState.progress,
    })
  }

  // Update the layer state based on the input layer index
  const onInputChangeByLayer = (layer: number) => {
    const newState = calculateLayerStateByIndex(state.layer.length, layer)
    setLayer({
      index: newState.active,
      percentage: newState.progress,
    })
  }

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
  )
}

// Define the types for the CanvasLayerControl component
const ControlTicks = ({
  length,
  index,
  onChange,
}: {
  length: number
  index: number
  onChange: (layer: number) => void
}) => {
  return (
    <div className="w-min flex justify-around m-auto p-2 mt-3">
      {Array.from(Array(length)).map((_, current) => {
        const layerIndex = current + 1
        return (
          <div key={current} className="relative mx-4" onClick={() => onChange(layerIndex)}>
            <div className="absolute left-7 -top-1 text-xs text-gray-400">{layerIndex}</div>
            {index <= current ? (
              <PlusIcon className="h-5 w-5 hover:border cursor-pointer text-white rounded-sm" />
            ) : (
              <XMarkIcon className="h-5 w-5 hover:bg-gray-400 bg-white text-black cursor-pointer rounded-sm" />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Define the types for the CanvasLayerControl component
const ControlSlider = ({
  percentage,
  onChange,
  disabled,
}: {
  percentage: number
  disabled?: boolean
  onChange: (value: number) => void
}) => {
  const absoluteWidth = 300
  const relativeWidth = (absoluteWidth / 100) * percentage

  return (
    <div className="w-min relative flex" style={{ width: absoluteWidth }}>
      <div className="absolute h-1 bg-gradient-to-r bg-gray-300" style={{ width: relativeWidth }} />
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
          "[&::-webkit-slider-thumb]:-mt-2",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:h-4",
          "[&::-webkit-slider-thumb]:w-4",
          "h-1",
          "cursor-pointer",
          "appearance-none",
          "rounded-md",
          "bg-gray-200"
        )}
      />
    </div>
  )
}
