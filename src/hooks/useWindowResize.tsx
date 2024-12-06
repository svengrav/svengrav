import { useEffect, useState } from 'react'

/**
 * Custom hook that tracks the window size and whether the window is currently being resized.
 *
 * @returns {Object} An object containing:
 * - `window`: An object with the current `width` and `height` of the window.
 * - `isResizing`: A boolean indicating whether the window is currently being resized.
 *
 * This hook sets up an event listener for the window resize event and updates the state with the new window size.
 * It also uses a debounce mechanism to set the `isResizing` state to `false` after a short delay once resizing stops.
 *
 * The debounce delay is set to 200 milliseconds.
 *
 * @example
 * const { window, isResizing } = useWindowResize();
 * console.log(window.width, window.height, isResizing);
 */
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isResizing, setIsResizing] = useState(false); // State for resizing

  useEffect(() => {
    let resizeTimer: number | null = null; // Timer for debouncing

    const handleResize = () => {
      setIsResizing(true); 
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer);
      }

      resizeTimer = window.setTimeout(() => {
        setIsResizing(false); 
      }, 200); 
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer); 
      }
    };
  }, []);

  return {
    window: windowSize,
    isResizing,
  }
};