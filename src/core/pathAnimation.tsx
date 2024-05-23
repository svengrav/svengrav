
/**
 * Interfaces
 */

import { CSSProperties } from "react"
import { assert } from "../utils/helper"

//#region 
interface Point {
  x: number,
  y: number
}

interface RoutePoint extends Point {
  i: number
}

interface RouteGap {
  position: number
  size: number
}

interface PathGap {
  id: string;
  start: number;
  end: number;
}

interface PathPartTip {
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
  tip?: PathPartTip
}

interface PathEvent {
  position: number,
  point: Point
}

interface PathEventTrigger {
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
  gaps: PathGap[],
  points: RoutePoint[],
  parts: PathPart[]
}
//#endregion

export const slicePath = (id: string, routePoints: RoutePoint[], gaps: RouteGap[] | RouteGap) => {
  if (!Array.isArray(gaps)) {
    gaps = [gaps];
  }

  var startPoint = 1;
  var parts = gaps.map((gap, i) => {
    const part = ({
      id: `${id}-p-${i + 1}`,
      start: startPoint,
      end: gap.position,
    });
    startPoint = gap.position + gap.size;    
    return part;
  })
  
  startPoint = gaps.slice(-1)[0].position + gaps.slice(-1)[0].size
  var lastPart = {
    id: `${id}-p-${gaps.length + 1}`,
    start: startPoint,
    end: routePoints.length
  }
  return [...parts, lastPart];
}

export const slicePathByPart = (id: string, routePoints: RoutePoint[], slice: { parts: number, size: number }) => {
  const sliceLength = Math.ceil(routePoints.length / slice.parts)
  var startPoint = sliceLength;

  const gaps = Array.from({ length: slice.parts - 1 }, (_, i) => i ).map(i => {
    const gap = {
      position: startPoint,
      size: slice.size
    }
    startPoint += sliceLength
    return gap;
  })
  return slicePath(id, routePoints, gaps)
}


export const calcPathParts = ({ parts, points, offset,} : { parts: PathPart[], points: RoutePoint[], offset: 1.0 | -1.0,  }, position: number) : PathPart[] => {
  assert(1 <= position && position <= points.length, `Position has to be between 1 - ${points.length}, position is: ${position}`)

  const newParts = parts.map(part => {

    var endOfPart = part.end;
    if(part.start <= position && position <= part.end)
      endOfPart = position;

    if(part.start >= position)
      endOfPart = part.start

    part.position = endOfPart;
    part.tip = undefined;

    // if part has an size, then an tip is added
    if(part.start < endOfPart)  {
      part.tip = calcTipState({id: `${part.id}-tip`, points: points, position: part.position, offset: offset })
    } 

    var d = "M" + points.slice(part.start - 1, part.position).map((p: { i: number; x: any; y: any; }) => ` ${p.x} ${p.y}`).join('')
    part.attributes = []
    part.attributes.push(["d", d])

    return part;
  })

  return newParts;
}

const calcTipState = ({ id, position, points, offset} : { id: string, position: number, points: RoutePoint[], offset: 1.0 | -1.0 }): PathPartTip => {
  const scale = 1;

  const point = points[position -1]
  const prevPoint = points[position -2]
  const rotation = calcTipRotation(point, prevPoint, offset === 1);
  const calc = (value: number) => value / Number(scale);
  const transform = `translate(${calc(point.x)}, ${calc(point.y)}) rotate(${rotation} 0 0)`;
  return {
    id: id,
    position: position,
    attributes: [["transform", transform ]]
  }
}

const calcTipRotation = (startPoint: Point, directionPoint: Point, reverse: boolean = false) => {
  const dy = reverse ? directionPoint.y - startPoint.y : startPoint.y - directionPoint.y;
  const dx = reverse ? directionPoint.x - startPoint.x : startPoint.x - directionPoint.x;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const camelToKebabCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
};

const toStyleString = (style: CSSProperties): string =>
  Object.entries(style)
    .map(([key, value]) => `${camelToKebabCase(key)}: ${value}`)
    .join("; ");


export const createPath2 = ({ id, attributes, style = {} }: PathPart & { style?: CSSProperties}) => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("id", id);
  path.setAttribute("style", toStyleString(style))
  attributes?.forEach(a => {
    path.setAttribute(a[0], a[1])
  })

  return path;
}


export const createTip2 = ({ id, attributes, style = {}, type = "circle" }: PathPartTip & { style?: CSSProperties, type?: "circle" | "arrow" | "none" }) => {
  var tip: SVGPolygonElement | SVGCircleElement;

  tip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  tip.setAttribute("r", "5");
  if (type === "arrow") {
    tip = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    tip.setAttribute("points", `0,0 ${20 * 0.5},${-10 * 0.5}, ${20 * 0.5}, ${10 * 0.5}`);
  }

  tip.setAttribute("id", id);
  tip.setAttribute("style", toStyleString(style))
  attributes?.forEach(a => {
    tip.setAttribute(a[0], a[1])
  })

  return tip;
}

type TipProps = (PathPartTip & { style?: CSSProperties, type?: "circle" | "arrow" | "none" }) | undefined
type PathProps = PathPart & { style?: CSSProperties }
type SetPathPartSVGProps = {  pathProps: PathProps, tipProps?: TipProps, svg: SVGElement }
export const setPathPartSVG = ({ svg, pathProps, tipProps } : SetPathPartSVGProps) => {

  var path = svg.querySelector(`#${pathProps.id}`);
  var tip = svg.querySelector(`#${pathProps.id}-tip`);

  if(!path) {
    path = createPath2(pathProps);
    svg.appendChild(path);
  } else {
    pathProps.attributes?.forEach(a => {
      path!.setAttribute(a[0], a[1])
    })
  }

  if(!tip && tipProps) {
    tip = createTip2(tipProps)
    svg.appendChild(tip);
  } else if(tipProps) {
    tipProps!.attributes?.forEach(a => {
      tip!.setAttribute(a[0], a[1])
    })
  } else if(tip) {
    svg.removeChild(tip!)
  }
}

export const calcNewPosition = (state: PathState, distance: number) : PathState => { 
  var newPosition = Math.max(1, Math.min(state.position + (distance * state.offset), state.length));

  state.events?.filter(event => {
    if (newPosition > state.position) {
      return state.position < event.position && event.position <= newPosition;
    } else if (newPosition < state.position) {
      return newPosition <= event.position && event.position < state.position;
    }
    return false;
  }).forEach(event => {
      const point = getPathPoint(state);
      event.onTrigger({ position: state.position, point: point});
  })
  
  return {
    ...state, 
    position: newPosition,
    parts: calcPathParts({ parts: state.gaps, points: state.points, offset: state.offset}, newPosition)
  }
}

const getPathPoint = ({ position, points } : { position: number, points: RoutePoint[]}) => points.find(p => p.i === position)!;