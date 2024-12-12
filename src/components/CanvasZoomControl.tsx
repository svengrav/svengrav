import {
  ArrowsPointingInIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/solid'
import { useControls, useTransformContext } from 'react-zoom-pan-pinch'
import { useCanvasContext } from './CanvasWrapper'

export const CanvasZoomControl = () => {
  const { zoomIn, zoomOut } = useControls()
  const transformationContext = useTransformContext()
  const canvasContext = useCanvasContext()

  transformationContext.onChange(() => {
    const transformation = transformationContext.getContext().state
    canvasContext.setPosition({
      position: {
        x: transformation.positionX,
        y: transformation.positionY
      },
      scale: transformation.scale
    })
  })

  console.log(canvasContext.state.transformed.position.x, canvasContext.state.transformed.position.y)
  return (
    <div className='mt-2 m-auto w-full flex justify-center text-white'>
      <button onClick={() => zoomOut()}>
        <MagnifyingGlassMinusIcon className='h-6 w-6 m-1 hover:fill-gray-300' />
      </button>
      <button onClick={() => zoomOut(10)} >
        <ArrowsPointingInIcon className='h-6 w-6 m-1 hover:fill-gray-300' />
      </button>
      <button onClick={() => zoomIn()}>
        <MagnifyingGlassPlusIcon className='h-6 w-6 m-1 hover:fill-gray-300' />
      </button>
    </div>
  )
}
