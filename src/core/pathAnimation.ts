import { CSSProperties } from 'react'
import { guard } from '@core/assert'

// #region
export interface PathState {
  id: string
  offset: -1 | 1
  position: number
  length: number
  events?: PathEventTrigger[]
  latestEvent?: number
  points: PathPoint[]
  parts: PathPart[]
}

export interface PathGap {
  id: number
  start: number
  end: number
}

interface PathPoint {
  x: number
  y: number
  i: number
}

interface PathTip {
  id: string
  position: number
  attributes: Array<[string, string]>
}

interface PathPart {
  id: string
  start: number
  end: number
  position?: number
  attributes?: Array<[string, string]>
  tip?: PathTip
}

export interface PathEventTrigger {
  i: number
  state: 'initial' | 'ready' | 'fired'
  position: number
  onTrigger: (e: PathEvent) => void
}

export interface PathEvent {
  position: number
  point: PathPoint
}

// #endregion
function isGapBySize (value: any): value is {
  number: number
  size: number
} {
  return 'size' in value && 'number' in value
}

/**
 * Slices the path in parts by the given gaps
 * and returns the parts as array.
 * @param id
 * @param routePoints
 * @param gaps
 * @returns
 */
export const slicePath = (id: string, routePoints: PathPoint[], gaps: Array<{
  start: number
  end: number
}> | {
  number: number
  size: number
}) => {
  let tmpGaps: PathGap[] = []
  if (isGapBySize(gaps)) {
    tmpGaps = slicePathByPart(id, routePoints, { number: gaps.number, size: gaps.size })
  } else {
    tmpGaps = gaps.map((g, i) => ({ start: g.start, end: g.end, id: i + 1 }))
  }

  if (tmpGaps.length === 0) {
    return [({
      id: `${id}-p-${1}`,
      start: 1,
      end: routePoints.length
    })]
  }

  let partStart = 1
  const parts = tmpGaps.map((gap, i) => {
    const part = ({
      id: `${id}-p-${i + 1}`,
      start: partStart,
      end: gap.start
    })
    partStart = gap.end
    return part
  })

  partStart = tmpGaps.slice(-1)[0].end
  const lastPart = {
    id: `${id}-p-${tmpGaps.length + 1}`,
    start: partStart,
    end: routePoints.length
  }
  return [...parts, lastPart]
}

/**
 * Slices the path equal sized by the given number of parts.
 * @param id
 * @param routePoints
 * @param gaps
 * @returns
 */
const slicePathByPart = (id: string, routePoints: PathPoint[], gaps: { number: number, size: number }) => {
  const sliceLength = Math.ceil(routePoints.length / gaps.number)
  let startPoint = sliceLength

  return Array.from({ length: gaps.number - 1 }, (_, i) => i).map(i => {
    const gap = {
      id: i + 1,
      start: startPoint,
      end: startPoint + gaps.size
    }
    startPoint += sliceLength
    return gap
  })
}

interface PathPartsProps { parts: PathPart[], points: PathPoint[], offset: 1.0 | -1.0 }
/**
 * Calculate the size of a part based on position and returns
 * the parts with the dimension attributes.
 * @param param0
 * @param position
 * @returns
 */
export const calcPathPartSize = ({ parts, points, offset }: PathPartsProps, position: number): PathPart[] => {
  guard(position >= 1 && position <= points.length, `Position has to be between 1 - ${points.length}, position is: ${position}`)

  const newParts = parts.map(part => {
    let endOfPart = part.end
    if (part.start <= position && position <= part.end) { endOfPart = position }

    if (part.start >= position) { endOfPart = part.start }

    part.position = endOfPart
    part.tip = undefined

    // if part has an size, then an tip is added
    if (part.start < endOfPart) {
      part.tip = getTipState({ id: `${part.id}-tip`, points, position: part.position, offset })
    }

    const d = 'M' + points.slice(part.start - 1, part.position).map((p: { i: number, x: any, y: any }) =>
      ` ${p.x} ${p.y}`).join('')

    part.attributes = []
    part.attributes.push(['d', d])

    return part
  })

  return newParts
}

const getTipState = ({ id, position, points, offset }: { id: string, position: number, points: PathPoint[], offset: 1.0 | -1.0 }): PathTip => {
  const point = points[position - 1]
  const prevPoint = points[position - 2]
  const rotation = calcTipRotation(point, prevPoint, offset === 1)
  const calc = (value: number) => value * Number(1)
  const transform = `translate(${calc(point.x)}, ${calc(point.y)}) rotate(${rotation} 0 0)`
  return {
    id,
    position,
    attributes: [['transform', transform]]
  }
}

const calcTipRotation = (startPoint: PathPoint, directionPoint: PathPoint, reverse: boolean = false) => {
  const dy = reverse ? directionPoint.y - startPoint.y : startPoint.y - directionPoint.y
  const dx = reverse ? directionPoint.x - startPoint.x : startPoint.x - directionPoint.x
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

const camelToKebabCase = (str: string): string =>
  str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

const cssToString = (style: CSSProperties): string =>
  Object.entries(style)
    .map(([key, value]) => `${camelToKebabCase(key)}: ${value}`)
    .join('; ')

/**
 * Creates an SVG path element.
 * @param param0
 * @returns
 */
const newSVGPath = ({ id, attributes, style = {} }: PathPart & { style?: CSSProperties }) => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  path.setAttribute('id', id)
  path.setAttribute('style', cssToString(style))
  attributes?.forEach(a => {
    path.setAttribute(a[0], a[1])
  })

  return path
}

/**
 * Creates an SVG tip element.
 * @param param0
 * @returns
 */
const newSVGTip = ({ id, attributes, style = {}, type = 'circle' }: PathTip & { style?: CSSProperties, type?: 'circle' | 'arrow' | 'none' }) => {
  let tip: SVGPolygonElement | SVGCircleElement
  const scale = style.scale ? Number(style.scale) : 1
  tip = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  tip.setAttribute('r', '5')
  if (type === 'arrow') {
    tip = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    tip.setAttribute('points', `0,0 ${10 * scale},${-5 * scale}, ${10 * scale}, ${5 * scale}`)
  }

  tip.setAttribute('id', id)
  tip.setAttribute('style', cssToString(style))
  tip.style.scale = '1'
  attributes?.forEach(a => {
    tip.setAttribute(a[0], a[1])
  })

  return tip
}

type TipProps = (PathTip & { style?: CSSProperties, type?: 'circle' | 'arrow' | 'none' }) | undefined
type PathProps = PathPart & { style?: CSSProperties }
interface SetPathPartSVGProps { partProps: PathProps, tipProps?: TipProps, svg: SVGElement }
export const setPathPartSVG = ({ svg, partProps: pathProps, tipProps }: SetPathPartSVGProps) => {
  let path = svg.querySelector(`#${pathProps.id}`)
  let tip = svg.querySelector(`#${pathProps.id}-tip`)

  if (path == null) {
    path = newSVGPath(pathProps)
    svg.appendChild(path)
  } else {
    pathProps.attributes?.forEach(a => {
      path!.setAttribute(a[0], a[1])
    })
  }

  if ((tip == null) && (tipProps != null)) {
    tip = newSVGTip(tipProps)
    svg.appendChild(tip)
  } else if (tipProps != null) {
    tipProps.attributes?.forEach(a => {
      tip!.setAttribute(a[0], a[1])
    })
  } else if (tip != null) {
    svg.removeChild(tip)
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
    return true
  }
  if (prevPosition >= position && position > nextPosition && offset === -1.0) {
    return true
  }
}

export const setPathPosition = (state: PathState, distance: number): PathState => {
  const prevPosition = state.position
  const nextPosition = Math.max(1, Math.min(state.position + distance, state.length))

  // if position equals or is greater than the path length, stop and reverse direction
  if (nextPosition >= state.length || nextPosition <= 1) {
    state.offset = state.offset * -1 as -1 | 1
  }

  const events = state.events

  events?.filter((event) => eventTriggerInRange(event.position, prevPosition, nextPosition, state.offset)).forEach((event) => {
    if (event.state === 'fired') {
      event.state = 'initial'
    } else {
      event.state = 'ready'
    }
  })

  return {
    ...state,
    events,
    position: nextPosition,
    parts: calcPathPartSize({ parts: state.parts, points: state.points, offset: state.offset }, nextPosition)
  }
}
