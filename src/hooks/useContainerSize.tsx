import { MutableRefObject, useEffect, useState } from 'react'
import { Size } from '@core/geometry'

interface ContainerSize {
  size: Size | undefined
}

/**
 * Custom hook that returns the size of a container element.
 *
 * @param ref - A mutable reference object pointing to the container element.
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
