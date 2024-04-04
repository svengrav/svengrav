import Page from "../components/Page";
import { CSSProperties, useEffect, useRef, useState, } from "react";
import { PageDescription } from "../core/Page";
import { date, assert } from "../utils/helper";

interface RouteElement {
  id: string,
  position: Point,
  style?: CSSProperties
}

interface Circle extends RouteElement {
  radius?: number,
}

interface Path extends RouteElement {
  basePath: SVGPathElement;
}

interface Polygon extends RouteElement {
  tip: Point
}

interface Point {
  x: number,
  y: number
}

interface RoutePoint extends Point {
  i: number
}

const createPath = ({ id, position, style = {}, basePath }: Path) => {
  const path = basePath.cloneNode() as SVGPathElement;
  path.id = id;
  path.setAttribute("d", `M ${position.x} ${position.y} `)
  path.setAttribute("style", toStyleString(style))
  return path;
}

const createCircle = ({ id, position, radius: r = 5, style = {} }: Circle) => {
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("id", id);
  circle.setAttribute("cx", (position.x / 0.5).toString());
  circle.setAttribute("cy", (position.y / 0.5).toString());
  circle.setAttribute("r", r.toString());
  circle.setAttribute("style", toStyleString(style))
  return circle;
}

const createPolygon = ({ id, position, style = {}, tip }: Polygon) => {
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("id", id);
  polygon.setAttribute("points", "0,0 20,-10 20,10");
  polygon.setAttribute("style", toStyleString(style))

  const angle = calcRotation(false, tip, position);
  const calc = (value: number) => value / Number(polygon.style.scale);
  const transform = `translate(${calc(position.x)}, ${calc(position.y)}) rotate(${angle} 0 0)`;
  polygon.setAttribute("transform", transform);

  return polygon;
}

const camelToKebabCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

const toStyleString = (style: CSSProperties): string =>
  Object.entries(style)
    .map(([key, value]) => `${camelToKebabCase(key)}: ${value}`)
    .join("; ");


function calcRotation(reverse: boolean, tip: Point, position: Point) {
  const dy = reverse ? tip.y - position.y : position.y - tip.y;
  const dx = reverse ? tip.x - position.x : position.x - tip.x;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

interface RoutePathContext {
  stopAnimation: () => void;
  startAnimation: (reverse?: boolean) => void;
  moveTo: (position: number, reverse: boolean) => void;
}

interface RoutePathOptions {
  position?: number
  reverse?: boolean
  speed?: number
  tip: "arrow" | "circle" | "none"
  routeStyle?: CSSProperties
  tipStyle?: CSSProperties
  onRouteStateChange?: (state: RouteState) => void
}

interface RouteState {
  position: number,
  point: Point,
  length: number,
  initialized?: boolean,
  running?: boolean
}

interface RouteContext {
  position: number,
  routePoints: RoutePoint[],
  animationFrameId: number,
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
    speed: 1000
  }): RoutePathContext => {
  const {
    tip,
    reverse: startReverse,
    position,
    routeStyle,
    tipStyle,
    onRouteStateChange,
    speed = 1000
  } = options;

  assert(!pathId.startsWith("#"), "Remove the # from pathId")
  const routePathId = `${pathId}-route`;
  const circleId = `${pathId}-circle`;
  const polygonId = `${pathId}-poly`;

  var routeRef = useRef<RouteContext>({
    position: 0,
    animationFrameId: 0,
    routePoints: []
  });

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectElement = (id: string) => {
    assert(document.querySelector("#" + svgId) as SVGSVGElement != null, "SVG is null")
    return (document.querySelector("#" + svgId) as SVGSVGElement).querySelector(`#${id}`)!;
  }

  const init = () => {
    const svg = document.querySelector("#" + svgId) as SVGSVGElement;

    if (!svg) return;

    var baseRoutePath = selectElement(pathId) as SVGPathElement;
    var routePath = selectElement(routePathId) as SVGPathElement;

    if (routePath) return;


    // create init route state
    const totalLength = Math.ceil(baseRoutePath.getTotalLength());
    var range = Array.from({ length: totalLength }, (_, i) => i);
    const routeState: RouteContext = {
      position: position ? position : 0,
      animationFrameId: 0,
      initialized: true,
      routePoints: range.map((i) => ({
        i: i,
        x: baseRoutePath.getPointAtLength(i).x,
        y: baseRoutePath.getPointAtLength(i).y
      }))
    }
    routeRef.current = routeState;

    routePath = createPath({
      id: routePathId,
      position: routeState.routePoints[routeState.position],
      style: routeStyle,
      basePath: baseRoutePath,
    });
    svg.appendChild(routePath);
    movePathTo(routeState.position, routePath, routeState.routePoints)

    if (tip === "circle") {
      svg.appendChild(createCircle({
        id: circleId,
        position: { x: 0, y: 0 },
        style: tipStyle,
      }))
      moveCircleTo(routeState.position)
    }

    if (tip === "arrow")
      svg.appendChild(createPolygon({
        id: polygonId,
        position: routeState.routePoints[routeState.position],
        style: tipStyle,
        tip: routeState.routePoints[routeState.position + 1]
      }))
  }

  const startAnimation = (reverse: boolean | undefined = startReverse) => {
    if (!routeRef.current.initialized)
      init();

    if (routeRef.current.running)
      stopAnimation()

    routeRef.current.running = true

    const path = reverse ? routeRef.current.routePoints.slice(0, routeRef.current.position).reverse() :
      routeRef.current.routePoints.slice(routeRef.current.position );

    const relativeSpeed =  (path.length / routeRef.current.routePoints.length) * speed;
    const pointsPerSecond = Math.ceil((path.length / relativeSpeed) * 50)

    let frameIndex = 0;
    let lastFrameTime = performance.now();
    let logTime = performance.now();

    const animate = (timeStamp: number) => {

      const deltaTime = timeStamp - lastFrameTime;
      const elapsedTime = performance.now() - logTime;

      if(elapsedTime >= 480) {
        console.log(`Elapsed: ${elapsedTime}ms, FrameIndex: ${frameIndex}, PointsPerSecond: ${pointsPerSecond}`);
        logTime = timeStamp
      }

      if (deltaTime >= 1000 / 60) {
        lastFrameTime = timeStamp;

        if(frameIndex + pointsPerSecond > path.length) {
          frameIndex += path.length - frameIndex - 1
          moveTo(path[path.length -1].i, reverse);
          stopAnimation();
          return;
        } else {
          frameIndex = Math.min(frameIndex + pointsPerSecond, path.length - 1);
          moveTo(path[frameIndex -1].i, reverse);
        }
      }
      routeRef.current.animationFrameId = requestAnimationFrame(animate);
    }
    routeRef.current.animationFrameId = requestAnimationFrame(animate);
  }

  const stopAnimation = () => {
    cancelAnimationFrame(routeRef.current.animationFrameId);
    routeRef.current.animationFrameId = 0
    routeRef.current.running = false;
  }

  const getPoint = (position: number) => {
    assert(position >= 0 && position < routeRef.current.routePoints.length,
      "Position has to be greater then 0 and in the range of the route.current.")
    return {
      x: routeRef.current.routePoints[position].x,
      y: routeRef.current.routePoints[position].y
    }
  }

  const moveTo = (position: number, reverse = false) => {
    const routePath = selectElement(routePathId) as SVGPathElement;

    // cant move out of route range
    if (position >= routeRef.current.routePoints.length && !reverse)
      console.error("MoveTo Position is out of range!")

    routeRef.current.position = position;
    // set new path dimension
    movePathTo(position, routePath, routeRef.current.routePoints)

    if (tip === "arrow")
      moveArrowTo(position, reverse);

    if (tip === "circle")
      moveCircleTo(position)

    if (onRouteStateChange)
      onRouteStateChange({ ...routeRef.current, point: getPoint(routeRef.current.position), length: routeRef.current.routePoints.length });
  }

  const movePathTo = (position: number, path: SVGPathElement, routePoints: RoutePoint[]) => {
    var d = "M" + routePoints.slice(0, position + 1 ).map((p: { i: number; x: any; y: any; }) => ` ${p.x} ${p.y}`).join('')
    assert((/M\s?\d+(\.\d+)?\s\d+(\.\d+)?(\s\d+(\.\d+)?\s\d+(\.\d+)?)*/).test(d), `Value ${d} is not a valid dimension attribute.`)
    path.setAttribute("d", d)
  }

  const moveCircleTo = (position: number) => {
    const circle = selectElement(circleId) as SVGCircleElement;
    const point = getPoint(position);
    const calc = (value: number) => value / Number(circle.style.scale);
    const transform = `translate(${calc(point.x)}, ${calc(point.y)})`;
    circle.setAttribute("transform", transform);
  }

  const moveArrowTo = (position: number, reverse = false) => {
    const arrow = selectElement(polygonId) as SVGPolygonElement;
    // rotate tip 
    const point = getPoint(position);
    const nextPoint = getPoint(position + 1);
    const rotation = calcRotation(reverse, nextPoint, point);
    const calc = (value: number) => value / Number(arrow.style.scale);
    const transform = `translate(${calc(point.x)}, ${calc(point.y)}) rotate(${rotation} 0 0)`;
    arrow.setAttribute("transform", transform);
  }

  return { stopAnimation, startAnimation, moveTo }
}

const Lab = () => {
  const [state, setState] = useState<RouteState>();
  const { stopAnimation, startAnimation, moveTo } = useRoutePath("testId", "route1", {
    tip: "circle",
    position: 100,
    reverse: false,
    speed: 10000,
    routeStyle: {
      fill: "none",
      strokeWidth: 2,
      stroke: "white",
      strokeDasharray: "10",
    },
    tipStyle: {
      fill: "white",
      scale: 0.5
    },
    onRouteStateChange: (state) => {
      setState(state)
    }
  })

  const buttonStyle = "text-white uppercase p-2 border rounded-sm border-gray-500 hover:border-emerald-500 ml-8 first:ml-0"
  const routePosition = state ? state.position + 1 : 100;
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

