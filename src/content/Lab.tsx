import Page from "../components/Page";
import { CSSProperties, useEffect, useRef, useState, } from "react";
import { PageDescription } from "../core/Page";
import { date, assert } from "../utils/helper";
import { start } from "repl";
import { PathState, calcNewPosition, calcPathParts, createPath2, createTip2, setPathPartSVG, slicePathByPart } from "../core/pathAnimation";

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
interface RouteElement {
  id: string,
  startPoint: Point,
  style?: CSSProperties,
  routePoints: RoutePoint[]
}

interface Path extends RouteElement {
  basePath: SVGPathElement;
}


interface Point {
  x: number,
  y: number
}

interface RoutePoint extends Point {
  i: number
}

interface RouteTip {
  id: string
  startPoint: Point
  alignPoint?: Point
  type: RouteTipOptions
  style?: CSSProperties
}
//#endregion

//#region create svg elements
const createTip = ({ id, startPoint, alignPoint = { x: 0, y: 0 }, type, style = {} }: RouteTip) => {
  var tip: SVGPolygonElement | SVGCircleElement;
  if (type === "circle") {
    tip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    tip.setAttribute("r", "5");
  }

  if (type === "arrow") {
    tip = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    tip.setAttribute("points", "0,0 20,-10 20,10");
  }

  const angle = calcRotation(startPoint, alignPoint, false);
  const scale = (value: number) => value / Number(style.scale ? style.scale : 1);
  const transform = `translate(${scale(startPoint.x)}, ${scale(startPoint.y)}) rotate(${angle} 0 0)`;

  tip!.setAttribute("id", id);
  tip!.setAttribute("style", toStyleString(style))
  tip!.setAttribute("transform", transform);

  return tip!;
}

const createPath = ({ id, startPoint, routePoints, style = {}, basePath }: Path) => {
  const path = basePath.cloneNode() as SVGPathElement;
  path.id = id;
  path.setAttribute("d", `M ${startPoint.x} ${startPoint.y} `)
  path.setAttribute("style", toStyleString(style))
  const position = routePoints.findIndex(v => v.x === startPoint.x && v.y === startPoint.y)
  movePathTo(position, path, routePoints)
  return path;
}

const movePathTo = (position: number, path: SVGElement, routePoints: RoutePoint[]) => {
  var d = "M" + routePoints.slice(0, position + 1).map((p: { i: number; x: any; y: any; }) => ` ${p.x} ${p.y}`).join('')
  assert((/M\s?\d+(\.\d+)?\s\d+(\.\d+)?(\s\d+(\.\d+)?\s\d+(\.\d+)?)*/).test(d), `Value ${d} is not a valid dimension attribute.`)
  path.setAttribute("d", d)
}

const moveTipTo = (tip: SVGElement, position: number, routePoints: RoutePoint[], reverse = false) => {
  if (position >= routePoints.length - 1)
    return;

  const point = getPoint(position, routePoints);
  const nextPoint = getPoint(position + 1, routePoints);
  const rotation = calcRotation(point, nextPoint, reverse);
  const calc = (value: number) => value / Number(tip.style.scale ? tip.style.scale : 1);
  const transform = `translate(${calc(point.x)}, ${calc(point.y)}) rotate(${rotation} 0 0)`;
  tip.setAttribute("transform", transform);
}

const getPoint = (position: number, routePoints: RoutePoint[]) => {
  assert(position >= 0 && position < routePoints.length,
    "Position has to be greater then 0 and in the range of the route.current.")
  return routePoints[position]
}

const getSVG = (id: string) => {
  return (document).querySelector(`#${id}`) as SVGElement;
}

const camelToKebabCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

const toStyleString = (style: CSSProperties): string =>
  Object.entries(style)
    .map(([key, value]) => `${camelToKebabCase(key)}: ${value}`)
    .join("; ");

const isInRange = (start: number, end: number, position: number, reverse: boolean = false): boolean => {
  return reverse ? (end < position && position < start) : (start < position && position < end);
};

const calcRotation = (startPoint: Point, directionPoint: Point, reverse: boolean = false) => {
  const dy = reverse ? directionPoint.y - startPoint.y : startPoint.y - directionPoint.y;
  const dx = reverse ? directionPoint.x - startPoint.x : startPoint.x - directionPoint.x;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
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

interface RouteState {
  position: number,
  point: Point,
  length: number,
  initialized?: boolean,
  running?: boolean
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
    animationFrameId: 0,
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

    routeRef.current.running = true
    if (reverse) {
      routeRef.current.offset = reverse ? routeRef.current.offset * -1 as -1 | 1 : 1.0;
    }

    const pointsPerSecond = calcPointsPerSecond(speed, routeRef.current.length, routeRef.current.points.length)
    var lastFrameTime = performance.now();

    const svg = getSVG(svgId) as SVGSVGElement;

    const animate = (timeStamp: number) => {

      const deltaTime = timeStamp - lastFrameTime;
      const fpsInterval = 1000 / 60;

      if (deltaTime >= fpsInterval) {
        lastFrameTime = timeStamp;

        routeRef.current = calcNewPosition(routeRef.current, pointsPerSecond)
        routeRef.current.parts.forEach(part => {
          setPathPartSVG({ svg: svg, pathProps: { ...part, style: routeStyle }, tipProps: part.tip ? { ...part.tip, style: tipStyle, type: tip } : undefined })
        })
        if(onRouteStateChange)
          onRouteStateChange(routeRef.current)

      }

      animationRef.current.animationFrameId = requestAnimationFrame(animate);
    }
    animationRef.current.animationFrameId = requestAnimationFrame(animate);
  }

  const stopAnimation = () => {
    cancelAnimationFrame(animationRef.current.animationFrameId);
    animationRef.current.animationFrameId = 0
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
    speed: 10000,
    events: [
      {
        onTrigger: (e) => { console.log(e) },
        position: 500,
      },
      {
        onTrigger: (e) => { console.log(e) },
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
      <div className="w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full border-2 border-gray-800  bg-emerald-600 relative" >
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

