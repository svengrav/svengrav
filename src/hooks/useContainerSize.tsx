import { MutableRefObject, useEffect, useState } from 'react'
import { useWindowResize } from './useWindowResize'

interface Size {
  height: number
  width: number
}

/**
 * Hook to get the container size state after resize.
 * @returns the container size
 */
export const useContainerSize = (ref: MutableRefObject<any>): [window: Size, container: Size | undefined] => {
  const {windowSize: window} = useWindowResize()
  const [size, setSize] = useState<Size | undefined>()

  useEffect(() => {
    if (!ref.current) { return }

    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight
      })
    })
    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect() // clean up
  }, [window.width, window.height, ref])

  return [window, size]
}
