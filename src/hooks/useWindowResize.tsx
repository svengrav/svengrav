import { useEffect, useState } from "react";

interface Window {
  width: number;
  height: number;
}

/**
 * Hook to get the window size state after resize.
 * @returns the window size
 */
export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<Window>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);

  return [windowSize];
};
