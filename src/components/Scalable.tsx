import { ReactElement, useEffect, useRef, useState } from "react";
import { useContainerSize } from "../hooks/useContainerSize";

interface ScalableProps {
  children: any,
  width: number,
  height: number,
  className?: string
}

/**
 * Scalable is used to scale an element based on a fixed value.
 * @param  
 * @returns 
 */
export default function Scalable({ children, width, height, className = "h-full w-full" }: ScalableProps): ReactElement {
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const ref = useRef<any>();
  const [, size] = useContainerSize(ref);

  useEffect(() => {
    if (size !== undefined) {
      var xFactor = size?.width / width;
      var yFactor = size?.height / height;

      setScale({ x: xFactor, y: yFactor });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size?.height, size?.width])

  return (
    <div ref={ref} className={className}>
      <div style={{
        width: width,
        height: height,
        transform: `scale(${scale.x}, ${scale.y})`,
        transformOrigin: "top left"
      }}>
        {children}
      </div>
    </div>
  )
}
