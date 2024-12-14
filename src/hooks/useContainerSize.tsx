import { MutableRefObject, useEffect, useState } from 'react'
import { Size } from '@core/geometry'

interface ContainerSize {
  size: Size | undefined
}

/**
 * Custom hook that returns the size of the window and the size of a container element.
 *
 * @param ref - A mutable reference object pointing to the container element.
 * @returns A tuple containing the window size and the container size.
 *
 * The window size is an object with `width` and `height` properties.
 * The container size is an object with `width` and `height` properties or `undefined` if the container is not available.
 *
 * @example
 * const ref = useRef(null);
 * const [windowSize, containerSize] = useContainerSize(ref);
 *
 * useEffect(() => {
 *   console.log('Window size:', windowSize);
 *   console.log('Container size:', containerSize);
 * }, [windowSize, containerSize]);
 */
export const useContainerSize = (ref: MutableRefObject<any>): ContainerSize => {
  const [size, setSize] = useState<Size | undefined>()

  useEffect(() => {
    if (!ref.current) { return }

    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: ref.current?.offsetWidth,
        height: ref.current?.offsetHeight
      })
    })

    // Trigger the observer initially to set the size
    resizeObserver.observe(ref.current)

    return () => resizeObserver.disconnect() 
  }, [ref])

  return { size }
}
