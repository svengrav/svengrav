interface SidepanelProps {
  show?: boolean;
  children?: any;
  width?: number;
  full?: boolean;
}

/**
 * Navigation
 * @param Navigation props
 * @returns
 */
export default function Sidepanel({
  children,
  show = false,
  width,
  full,
}: SidepanelProps) {
  var actualWidth = full ? window.screen.width : width ? width : 400;

  return (
    <div className="w-min">
      <div
        className="absolute transition-all top-0 right-0 h-full z-20 "
        style={{
          transformOrigin: "top right",
          transform: `translate(${show ? 0 : actualWidth}px)`,
          width: actualWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}
