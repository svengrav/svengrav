import Page from "../components/Page";
import { CSSProperties, useEffect, useRef, useState, } from "react";
import { PageDescription } from "../core/Page";
import { date, assert } from "../utils/helper";
import { PathState, calcNewPosition as setPathPosition, calcPathParts, setPathPartSVG, slicePathByPart } from "../core/pathAnimation";

//#region events interfaces
interface RouteEventTrigger {
  position: number;
  onTrigger: (e: RouteEvent) => void;
  stop?: boolean | undefined;
  reverse?: boolean | undefined;
}

interface RouteEvent {
  position: number,
  point: Point
}
//#endregion

//#region svg elements interfaces

interface Point {
  x: number,
  y: number
}

interface RoutePoint extends Point {
  i: number
}



const getSVG = (id: string) => {
  return (document).querySelector(`#${id}`) as SVGElement;
}


const getRoutePointsFromBase = (baseRoutePath: SVGPathElement) => {
  const totalLength = Math.ceil(baseRoutePath.getTotalLength());
  var range = Array.from({ length: totalLength }, (_, i) => i);
  return range.map((i) => ({
    i: i,
    x: baseRoutePath.getPointAtLength(i).x,
    y: baseRoutePath.getPointAtLength(i).y
  }))
}
// #endregion 

const calcPointsPerSecond = (speed: number, pointsLength: number, absolutePointsLength: number) => {
  const relativeSpeed = (pointsLength / absolutePointsLength) * speed;
  const pointsPerSecond = Math.ceil((pointsLength / relativeSpeed) * 50)
  return pointsPerSecond
}


interface RouteGap {
  position: number
  size: number
}

interface RoutePathActions {
  stopAnimation: () => void;
  startAnimation: (reverse?: boolean) => void;
  // moveTo: (position: number, reverse: boolean) => void;
}

type RouteTipOptions = "arrow" | "circle" | "none";

interface RoutePathOptions {
  position?: number
  reverse?: boolean | undefined
  speed: number
  tip: RouteTipOptions
  routeStyle?: CSSProperties
  tipStyle?: CSSProperties
  onRouteStateChange?: (state: PathState) => void
  events?: RouteEventTrigger[] | undefined
  gaps?: RouteGap[] | undefined
}

const useRoutePath = (
  svgId: string,
  pathId: string,
  options: RoutePathOptions = {
    tip: "arrow",
    routeStyle: {},
    tipStyle: {},
    speed: 1000,
    events: []
  }): RoutePathActions => {
  const { tip, reverse: startReverse, position, routeStyle, tipStyle, onRouteStateChange, speed, events } = options;

  assert(!pathId.startsWith("#"), "Remove the # from pathId")

  const routePathId = `${pathId}-route`;

  var routeRef = useRef<PathState>({
    id: routePathId,
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
    animationFrameId: [0]
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { init() }, [])

  const init = () => {
    const svg = getSVG(svgId) as SVGSVGElement;

    if (!svg) return;

    var baseRoutePath = getSVG(pathId) as SVGPathElement;

    const points = getRoutePointsFromBase(baseRoutePath);
    const gaps = slicePathByPart(routePathId, points, { parts: 5, size: 50 })
    const parts = calcPathParts({ parts: gaps, points: points, offset: startReverse ? -1 : 1 }, position ? position : 0)

    routeRef.current = {
      ...routeRef.current,
      length: points.length,
      initialized: true,
      position: position ? position : 0,
      events: events,
      points: points,
      parts: parts,
      gaps: gaps,
    }

    routeRef.current.parts.forEach(part => {
      setPathPartSVG({ svg: svg, pathProps: { ...part, style: routeStyle }, tipProps: part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined })
    })
  }

  const startAnimation = (reverse: boolean | undefined = startReverse) => {
    if (!routeRef.current.initialized)
      init();

    if (routeRef.current.running)
      stopAnimation()

    const svg = getSVG(svgId) as SVGSVGElement;
    const pointsPerSecond = calcPointsPerSecond(speed, routeRef.current.length, routeRef.current.points.length)
    var lastFrameTime = performance.now();
    
    routeRef.current = setPathPosition(routeRef.current, pointsPerSecond, reverse)

    const animate = (timeStamp: number) => {
      const deltaTime = timeStamp - lastFrameTime
      const fpsInterval = 1000 / 60;

      if (deltaTime >= fpsInterval) {
        lastFrameTime = timeStamp;

        routeRef.current = setPathPosition(routeRef.current, pointsPerSecond)

        routeRef.current.parts.forEach(part => {
          setPathPartSVG({ svg: svg, pathProps: { ...part, style: routeStyle }, tipProps: part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined })
        })
        if(onRouteStateChange)
          onRouteStateChange(routeRef.current)
      }

      if(!routeRef.current.running) 
        stopAnimation()
      else 
        animationRef.current.animationFrameId.push( requestAnimationFrame(animate));

    }
    animationRef.current.animationFrameId.push( requestAnimationFrame(animate));
  }

  const stopAnimation = () => {
    animationRef.current.animationFrameId.forEach(frame => cancelAnimationFrame(frame))
    animationRef.current.animationFrameId.splice(0)
    routeRef.current.running = false;
  }

  return { stopAnimation, startAnimation }
}

const Lab = () => {
  const [state, setState] = useState<PathState>();
  const { stopAnimation, startAnimation } = useRoutePath("testId", "route1", {
    tip: "arrow",
    position: 600,
    reverse: false,
    speed: 50000,
    events: [
      {
        onTrigger: (e) => { startAnimation(true) },
        position: 500,
      },
      {
        onTrigger: (e) => { startAnimation(true) },
        stop: true,
        position: 1000,
      }
    ],
    routeStyle: {
      fill: "none",
      strokeWidth: 2,
      stroke: "white",
      strokeDasharray: "10",
    },
    tipStyle: {
      fill: "white",
      scale: 1
    },
    onRouteStateChange: (state) => {
      setState(state)
    }
  })

  const buttonStyle = "text-white uppercase p-2 border rounded-sm border-gray-500 hover:border-emerald-500 ml-8 first:ml-0"
  const routePosition = state ? state.position : 100;
  return (
    <div className="flex min-h-[calc(100vh_-_48px)] w-full items-center justify-center flex-col">
      <div className="w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden border-2 border-gray-800  bg-emerald-600 relative" >
        <div className=" text-white w-full text-center mt-10 lg:mt-28"> {routePosition} {state?.length ? "/ " + state.length : ""} </div>
        <svg id="testId" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className=" top-0 left-0 absolute w-[300px] h-[300px] lg:w-[600px] lg:h-[600px]">
          <path id="route1" d="M47.24,152.35l121.61,307.57,81.16-292.15,149.92,250.01c46.08-41.2,75.08-101.1,75.08-167.78,0-124.26-100.74-225-225-225" style={{
            fill: "none",
            strokeWidth: 2,
            stroke: "rgb(16 185 129 / var(--tw-bg-opacity))",
            strokeDasharray: "0",
            strokeDashoffset: "200"
          }} />
        </svg>

      </div>
      <div className="flex w-min justify-between py-4">
        <button onClick={() => startAnimation()} className={buttonStyle}>Start</button>
        <button onClick={() => stopAnimation()} className={buttonStyle}> Stop</button>
        <button onClick={() => startAnimation(true)} className={buttonStyle}>Reverse</button>
      </div>
    </div>
  )
}


export const routeLabPage: PageDescription = {
  title: "Sven's Lab",
  id: "lab",
  description: "Sample lab to test my route.",
  hidden: true,
  date: date(5, 5, 2024),
  tags: ["art"],
  thumbnail: <></>,
  element: <Page><Lab /></Page>
}

