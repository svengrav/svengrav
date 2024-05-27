import { CSSProperties } from "react"
import { assert } from "../utils/helper"

//#region 
export interface PathEventTrigger {
  position: number;
  onTrigger: (e: PathEvent) => void;
}

export interface PathState {
  id: string
  offset: -1 | 1
  position: number,
  running: boolean,
  initialized: boolean,
  length: number,
  events?: PathEventTrigger[]
  latestEvent?: number,
  gaps: PathGap[],
  points: Point[],
  parts: PathPart[]
}

export interface PathGap {
  id: number;
  start: number;
  end: number;
}

interface Point {
  x: number,
  y: number,
  i: number
}

interface PathTip {
  id: string,
  position: number,
  attributes: [string, string][]
}

interface PathPart {
  id: string,
  start: number,
  end: number,
  position?: number,
  attributes?: [string, string][]
  tip?: PathTip
}

interface PathEvent {
  position: number,
  point: Point
}

//#endregion

/**
 * Slices the path in parts by the given gaps 
 * and returns the parts as array.
 * @param id 
 * @param routePoints 
 * @param gaps 
 * @returns 
 */
export const slicePath = (id: string, routePoints: Point[], gaps: PathGap[] | PathGap) => {
  if (!Array.isArray(gaps)) {
    gaps = [gaps];
  }

  if(gaps.length === 0)
    return [];
  
  var partStart = 1;
  var parts = gaps.map((gap, i) => {
    const part = ({
      id: `${id}-p-${i + 1}`,
      start: partStart,
      end: gap.start,
    });
    partStart = gap.end;
    return part;
  })

  partStart = gaps.slice(-1)[0].end
  var lastPart = {
    id: `${id}-p-${gaps.length + 1}`,
    start: partStart,
    end: routePoints.length
  }
  return [...parts, lastPart];
}

/**
 * Slices the path equal sized by the given number of parts.
 * @param id 
 * @param routePoints 
 * @param slice 
 * @returns 
 */
export const slicePathByPart = (id: string, routePoints: Point[], slice: { parts: number, size: number }) => {
  const sliceLength = Math.ceil(routePoints.length / slice.parts)
  var startPoint = sliceLength;

  const gaps = Array.from({ length: slice.parts - 1 }, (_, i) => i).map(i => {
    const gap = {
      id: i + 1,
      start: startPoint,
      end: startPoint + slice.size
    }
    startPoint += sliceLength
    return gap;
  })
  return slicePath(id, routePoints, gaps)
}

type PathPartsProps = { parts: PathPart[], points: Point[], offset: 1.0 | -1.0 };
/**
 * Calculate the size of a part based on position and returns 
 * the parts with the dimension attributes.
 * @param param0 
 * @param position 
 * @returns 
 */
export const calcPathPartSize = ({ parts, points, offset }: PathPartsProps, position: number): PathPart[] => {
  assert(1 <= position && position <= points.length, `Position has to be between 1 - ${points.length}, position is: ${position}`)

  const newParts = parts.map(part => {

    var endOfPart = part.end;
    if (part.start <= position && position <= part.end)
      endOfPart = position;

    if (part.start >= position)
      endOfPart = part.start

    part.position = endOfPart;
    part.tip = undefined;

    // if part has an size, then an tip is added
    if (part.start < endOfPart) {
      part.tip = getTipState({ id: `${part.id}-tip`, points: points, position: part.position, offset: offset })
    }

    var d = "M" + points.slice(part.start - 1, part.position).map((p: { i: number; x: any; y: any; }) => 
        ` ${p.x} ${p.y}`).join('')

    part.attributes = []
    part.attributes.push(["d", d])

    return part;
  })

  return newParts;
}

const getTipState = ({ id, position, points, offset }: { id: string, position: number, points: Point[], offset: 1.0 | -1.0 }): PathTip => {
  const point = points[position - 1]
  const prevPoint = points[position - 2]
  const rotation = calcTipRotation(point, prevPoint, offset === 1);
  const calc = (value: number) => value * Number(1);
  const transform = `translate(${calc(point.x)}, ${calc(point.y)}) rotate(${rotation} 0 0)`;
  return {
    id: id,
    position: position,
    attributes: [["transform", transform]]
  }
}

const calcTipRotation = (startPoint: Point, directionPoint: Point, reverse: boolean = false) => {
  const dy = reverse ? directionPoint.y - startPoint.y : startPoint.y - directionPoint.y;
  const dx = reverse ? directionPoint.x - startPoint.x : startPoint.x - directionPoint.x;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const camelToKebabCase = (str: string): string =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

const cssToString = (style: CSSProperties): string =>
  Object.entries(style)
    .map(([key, value]) => `${camelToKebabCase(key)}: ${value}`)
    .join("; ");

/**
 * Creates an SVG path element.
 * @param param0 
 * @returns 
 */
const newSVGPath = ({ id, attributes, style = {} }: PathPart & { style?: CSSProperties }) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("id", id);
  path.setAttribute("style", cssToString(style))
  attributes?.forEach(a => {
    path.setAttribute(a[0], a[1])
  })

  return path;
}

/**
 * Creates an SVG tip element.
 * @param param0 
 * @returns 
 */
const newSVGTip = ({ id, attributes, style = {}, type = "circle" }: PathTip & { style?: CSSProperties, type?: "circle" | "arrow" | "none" }) => {
  var tip: SVGPolygonElement | SVGCircleElement;
  const scale = style.scale ? Number(style.scale) : 1
  tip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  tip.setAttribute("r", "5");
  if (type === "arrow") {
    tip = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    tip.setAttribute("points", `0,0 ${10 * scale},${-5 * scale}, ${10 * scale}, ${5 * scale}`);
  }

  tip.setAttribute("id", id);
  tip.setAttribute("style", cssToString(style))
  tip.style.scale = "1";
  attributes?.forEach(a => {
    tip.setAttribute(a[0], a[1])
  })

  return tip;
}

type TipProps = (PathTip & { style?: CSSProperties, type?: "circle" | "arrow" | "none" }) | undefined
type PathProps = PathPart & { style?: CSSProperties }
type SetPathPartSVGProps = { partProps: PathProps, tipProps?: TipProps, svg: SVGElement }
export const setPathPartSVG = ({ svg, partProps: pathProps, tipProps }: SetPathPartSVGProps) => {

  var path = svg.querySelector(`#${pathProps.id}`);
  var tip = svg.querySelector(`#${pathProps.id}-tip`);

  if (!path) {
    path = newSVGPath(pathProps);
    svg.appendChild(path);
  } else {
    pathProps.attributes?.forEach(a => {
      path!.setAttribute(a[0], a[1])
    })
  }

  if (!tip && tipProps) {
    tip = newSVGTip(tipProps)
    svg.appendChild(tip);
  } else if (tipProps) {
    tipProps!.attributes?.forEach(a => {
      tip!.setAttribute(a[0], a[1])
    })
  } else if (tip) {
    svg.removeChild(tip!)
  }
}
/**
 * 
 * @param position Event position.
 * @param prevPosition Position before set action.
 * @param nextPosition Position after set action.
 * @param offset Offset to determine the direction.
 * @returns True if event trigger is in range.
 */
const eventTriggerInRange = (position: number, prevPosition: number, nextPosition: number, offset: number) => {
  if (prevPosition < position && position <= nextPosition && offset === 1.0) {
    return true;
  }
  if (prevPosition >= position && position > nextPosition && offset === -1.0) {
    return true;
  }
}

export const setPathPosition = (state: PathState, distance: number, reverse?: boolean): PathState => {
  var prevPosition = state.position;
  var offset = reverse ? state.offset * -1 as -1 | 1 : state.offset;
  var nextPosition = Math.max(1, Math.min(state.position + (distance * offset), state.length));
  var isRunning = nextPosition < state.length && nextPosition > 1;

  var latestEvent = state.latestEvent;
  var events = state.events?.map((e, i) => ({ ...e, index: i }))
  events?.filter((event) => eventTriggerInRange(event.position, prevPosition, nextPosition, offset) && latestEvent !== event.index).forEach((event, i) => {
    const point = getPathPoint(state);
    latestEvent = event.index
    event.onTrigger({ position: nextPosition, point: point });
  })

  return {
    ...state,
    position: nextPosition,
    running: isRunning,
    offset: offset,
    latestEvent: latestEvent,
    parts: calcPathPartSize({ parts: state.parts, points: state.points, offset: state.offset }, nextPosition)
  }
}

const newEventSVG = (id: string, point: Point) => {
  const scale = 1;

  const calc = (value: number) => value / Number(scale);
  const transform = `translate(${calc(point.x)}, ${calc(point.y)}) `;
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("transform", transform);
  circle.setAttribute("id",id)
  return circle;
}

const getPathPoint = ({ position, points }: { position: number, points: Point[] }) => points.find(p => p.i === position)!;