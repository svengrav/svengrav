import { useEffect, useState } from "react"

interface Window {
  height: number,
  width: number
}

/**
 * Hook to get the window size state after resize.
 * @returns the window size
 */
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<Window>({width: 0, height: 0})

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth, 
        height: window.innerHeight
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [windowSize])
  
  return [windowSize]
}
