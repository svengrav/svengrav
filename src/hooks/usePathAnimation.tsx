import { CSSProperties, useEffect, useRef } from "react";
import { assert } from "../utils/helper";
import { PathEventTrigger, PathGap, PathState, calcPathPartSize, setPathPartSVG, setPathPosition, slicePath } from "../core/pathAnimation";

const getSVG = (id: string) => {
  return (document).querySelector(`#${id}`) as SVGElement;
}

const getPathPointsFromBasePath = (baseRoutePath: SVGPathElement) => {
  const totalLength = Math.ceil(baseRoutePath.getTotalLength());
  var range = Array.from({ length: totalLength }, (_, i) => i);
  return range.map((i) => ({
    i: i,
    x: baseRoutePath.getPointAtLength(i).x,
    y: baseRoutePath.getPointAtLength(i).y
  }))
}

interface RoutePathActions {
  stopAnimation: () => void;
  startAnimation: (reverse?: boolean) => void;
}

type RouteTipOptions = "arrow" | "circle" | "none";

interface RoutePathOptions {
  position?: number
  reverse?: boolean | undefined
  speed?: number
  tip?: RouteTipOptions
  pathStyle?: CSSProperties
  tipStyle?: CSSProperties
  events?: PathEventTrigger[] | undefined
  gaps?: PathGap[] | undefined
  onRouteStateChange?: (state: PathState) => void
}

export const usePathAnimation = (
  svgId: string,
  pathId: string,
  options: RoutePathOptions = {
    tip: "arrow",
    events: []
  }): RoutePathActions => {
  const { 
    tip, 
    reverse: startReverse,
    position = 1, 
    pathStyle ={
      fill: "none",
      strokeWidth: 2,
      stroke: "white",
      strokeDasharray: "10",
    }, 
    tipStyle = {
      fill: "white",
      scale: 1,
    }, 
    onRouteStateChange, 
    speed = 1, 
    events = [],
    gaps = []
  } = options;

  assert(!pathId.startsWith("#"), "Remove the # from pathId")

  const stateId = `${pathId}-route`;

  var pathStateRef = useRef<PathState>({
    id: stateId,
    offset: 1.0,
    position: 0,
    running: false,
    initialized: false,
    length: 0,
    gaps: [],
    events: [],
    points: [],
    parts: []
  });

  var animationRef = useRef({
    frames: [0]
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { init() }, [])

  const init = () => {
    const svg = getSVG(svgId) as SVGSVGElement;

    if (!svg) return;

    var basePath = getSVG(pathId) as SVGPathElement;

    const pathPoints = getPathPointsFromBasePath(basePath);
    const pathGaps = slicePath(stateId, pathPoints, gaps)
    const pathParts = calcPathPartSize({ parts: pathGaps, points: pathPoints, offset: startReverse ? -1 : 1 }, position ? position : 0)

    pathStateRef.current = {
      ...pathStateRef.current,
      length: pathPoints.length,
      initialized: true,
      position: position ? position : 0,
      events: events,
      points: pathPoints,
      parts: pathParts,
    }

    pathStateRef.current.parts.forEach(part => {
      setPathPartSVG({ 
        svg: svg, 
        partProps: { ...part, style: pathStyle }, 
        tipProps: (part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined) })
    })
  }

  const startAnimation = (reverse: boolean | undefined = startReverse) => {
    if (!pathStateRef.current.initialized)
      init();

    if (pathStateRef.current.running)
      stopAnimation()

    let lastFrameTime = performance.now();
    let second = performance.now();
    const fpsInterval = 1000 / 60;
    var iterationen = 1;

    const svg = getSVG(svgId) as SVGSVGElement;

    const pointsPerFrame = speed >= 1 ? 1 * speed : 1
    var slowDown = 1 * speed;
    pathStateRef.current = setPathPosition(pathStateRef.current, pointsPerFrame, reverse)

    const animate = () => {
      const now = performance.now();
      const deltaTime = now - lastFrameTime;
      const deltaSecond = now - second;
      
      if(!pathStateRef.current.running) {
        stopAnimation()
        return;
      }

      slowDown += (1 * speed)
      if (deltaTime >= fpsInterval && slowDown >= 1) {
        slowDown = 0;
        if (deltaSecond >= 1000) {
          second = now;
          console.log((iterationen ++), String(pathStateRef.current.position));
        }
        pathStateRef.current = setPathPosition(pathStateRef.current, pointsPerFrame)
        pathStateRef.current.parts.forEach(part => {
          setPathPartSVG({ svg: svg, partProps: { ...part, style: pathStyle }, tipProps: part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined })
        })
        if(onRouteStateChange)
          onRouteStateChange(pathStateRef.current)

        lastFrameTime = now - (deltaTime % fpsInterval);
      }

      animationRef.current.frames.push(requestAnimationFrame(animate));
    }
    animationRef.current.frames.push(requestAnimationFrame(animate));
  }

  const stopAnimation = () => {
    animationRef.current.frames.forEach(id => cancelAnimationFrame(id))
    pathStateRef.current.running = false;
  }

  return { stopAnimation, startAnimation }
}
