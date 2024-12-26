import {
  ArrowsPointingInIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon
} from '@heroicons/react/24/solid'
import { useControls } from 'react-zoom-pan-pinch'

export const CanvasZoomControl = () => {
  const { zoomIn, zoomOut } = useControls()

  return (
    <div className='mt-2 m-auto w-full flex justify-center text-white' id='canvas-zoom-control'>
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
