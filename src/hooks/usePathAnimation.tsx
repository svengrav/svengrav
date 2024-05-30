import { CSSProperties, useEffect, useRef } from "react";
import { assert } from "../utils/helper";
import { PathEvent, PathEventTrigger, PathGap, PathState, calcPathPartSize, setPathPartSVG, setPathPosition, slicePath } from "../core/pathAnimation";

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

export interface PathEventProps {
  position: number;
  onTrigger: (e: PathEvent) => void;
}

interface RoutePathOptions {
  position?: number
  reverse?: boolean | undefined
  speed?: number
  tip?: RouteTipOptions
  pathStyle?: CSSProperties
  tipStyle?: CSSProperties
  events?: PathEventProps[] | undefined
  gaps?: PathGap[] | undefined
  onRouteStateChange?: (state: PathState) => void
}

interface Animation {
  id: number,
  frames: number[]
  state: 'ready' | 'running' | 'finished'

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
    pathStyle = {
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
    speed = 6,
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

  var animationStateRef = useRef<Animation[]>([])

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
      events: events?.map((e, i) => ({ ...e, i: i, state: 'initial' }) as PathEventTrigger),
      points: pathPoints,
      parts: pathParts,
    }

    pathStateRef.current.parts.forEach(part => {
      setPathPartSVG({
        svg: svg,
        partProps: { ...part, style: pathStyle },
        tipProps: (part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined)
      })
    })
  }

  const start = () => {
    
  }

  const getAnimationState  = (id: number) => {
    return animationStateRef.current.find(a => a.id === id)!
  }

  const startAnimation = (reverse: boolean | undefined = startReverse) => {
    var animationId = animationStateRef.current.length + 1;
    animationStateRef.current.push({
      id: animationId,
      state: 'ready',
      frames: []
    })

    stopAnimation()
    getAnimationState(animationId).state = "running";

    pathStateRef.current.running = true;

    let lastFrameTime = performance.now();
    const fpsInterval = 1000 / 60;

    const svg = getSVG(svgId) as SVGSVGElement;
    
    const pointsPerFrame = speed >= 1 ? 1 * speed : 1
    let slowDown = 1 * speed;
    pathStateRef.current = setPathPosition(pathStateRef.current, pointsPerFrame, reverse)

    const animate = () => {

      const now = performance.now();
      const deltaTime = now - lastFrameTime;

      if (!pathStateRef.current.running) {
        stopAnimation()
        return;
      }

      slowDown += (1 * speed)
      if (deltaTime >= fpsInterval && slowDown >= 1) {
      
        slowDown = 0;
        pathStateRef.current = setPathPosition(pathStateRef.current, pointsPerFrame)
        pathStateRef.current.parts.forEach(part => {
          setPathPartSVG({ svg: svg, partProps: { ...part, style: pathStyle }, tipProps: part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined })
        })

        pathStateRef.current.events?.filter((e) => e.state === 'ready').forEach(e => {
          e.state = "fired";
          e.onTrigger({ point: {i: 1, x: 0, y: 0}, position: e.position})
        })

        lastFrameTime = now - (deltaTime % fpsInterval);

        if (onRouteStateChange)
          onRouteStateChange(pathStateRef.current)
      }
      if(getAnimationState(animationId).state === "running") {
        getAnimationState(animationId).frames.push(requestAnimationFrame(animate));
      }
    }
    if(getAnimationState(animationId).state === "running")
      getAnimationState(animationId).frames.push(requestAnimationFrame(animate));
  }

  const stopAnimation = () => {
    animationStateRef.current.forEach(a => {
      a.state = "finished"
      a.frames.forEach(f => cancelAnimationFrame(f))
    })
    pathStateRef.current.running = false
    if (animationRef.current.frames) {
      animationRef.current.frames.forEach(frame => cancelAnimationFrame(frame));
      animationRef.current.frames = [];
    }
  }

  return { stopAnimation, startAnimation }
}
