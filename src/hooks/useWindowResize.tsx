import { useEffect, useState } from 'react'

interface Window {
  width: number
  height: number
}

export const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isResizing, setIsResizing] = useState(false); // Zustand für Resizing

  useEffect(() => {
    let resizeTimer: number | null = null; // Timer für Debounce

    const handleResize = () => {
      setIsResizing(true); // Beim Start des Resizes auf true setzen
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer); // Vorherigen Timer abbrechen
      }

      resizeTimer = window.setTimeout(() => {
        setIsResizing(false); // Nach Abschluss des Resizing auf false setzen
      }, 200); // Debounce-Zeit
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer); // Cleanup des Timers
      }
    };
  }, []);

  return {
    window: windowSize,
    isResizing,
  }
};