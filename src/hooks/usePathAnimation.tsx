import { CSSProperties, useRef } from 'react'
import { guard } from '@core/assert'
import {
  PathEvent,
  PathEventTrigger,
  PathState,
  calcPathPartSize,
  setPathPartSVG,
  setPathPosition,
  slicePath
} from '../core/pathAnimation'

const getSVG = (id: string) => {
  return document.querySelector(`#${id}`) as SVGElement
}

/**
 * Returns an array with all points (index, x, y) along a path.
 * @param path
 * @returns
 */
const getPathPointsFromBasePath = (path: SVGPathElement) =>
  Array.from({ length: Math.ceil(path.getTotalLength()) }, (_, i) => i).map(
    (i) => ({
      i,
      x: path.getPointAtLength(i).x,
      y: path.getPointAtLength(i).y
    })
  )

type PathTipOptions = 'arrow' | 'circle' | 'none'

interface PathEventProps {
  position: number
  onTrigger: (e: PathEvent) => void
}

type PathGapProps =
  | [
    {
      start: number
      end: number
    }
  ]
  | {
    number: number
    size: number
  }
  | []

interface RoutePathOptions {
  initialize?: boolean
  position?: number
  reverse?: boolean
  speed?: number
  tip?: PathTipOptions
  pathStyle?: CSSProperties
  tipStyle?: CSSProperties
  events?: PathEventProps[]
  gaps?: PathGapProps
  onRouteStateChange?: (state: PathState) => void
}

interface RoutePathActions {
  stopAnimation: () => void
  startAnimation: (reverse?: boolean) => void
}

interface PathAnimation {
  id: number
  frames: number[]
  state: 'ready' | 'running' | 'finished'
}

export const usePathAnimation = (
  svgId: string,
  pathId: string,
  options: RoutePathOptions = {
    initialize: false,
    tip: 'arrow',
    events: [],
    gaps: []
  }
): RoutePathActions => {
  const {
    tip,
    reverse: startReverse,
    position = 1,
    pathStyle = {
      fill: 'none',
      strokeWidth: 2,
      stroke: 'white',
      strokeDasharray: '10'
    },
    tipStyle = {
      fill: 'white',
      scale: 1
    },
    onRouteStateChange,
    speed = 6,
    events = [],
    gaps = []
  } = options

  guard(!pathId.startsWith('#'), 'Remove the # from pathId')

  const pathStateRef = useRef<PathState>({
    id: `${pathId}-path`,
    offset: 1.0,
    position: 0,
    length: 0,
    events: [],
    points: [],
    parts: []
  })

  const animationStateRef = useRef<PathAnimation[]>([])

  const init = () => {
    const svg = getSVG(svgId) as SVGSVGElement

    if (!svg) return
    const basePath = getSVG(pathId) as SVGPathElement

    pathStateRef.current = newPathState(
      pathStateRef.current.id,
      basePath,
      gaps,
      events,
      startReverse,
      position
    )
    applyPathState(pathStateRef.current, svg, pathStyle, tipStyle, tip)
  }

  const isEndOfPath = ({
    position,
    length
  }: {
    position: number
    length: number
  }) => position === 1 || position === length

  const animate = (animationState: PathAnimation, onAnimate: () => void) => {
    animationState.state = 'running'
    let lastFrameTime = performance.now()
    const fpsInterval = 1000 / 60
    let slowDown = 1 * speed

    const processFrame = () => {
      const now = performance.now()
      const deltaTime = now - lastFrameTime

      slowDown += 1 * speed
      if (deltaTime >= fpsInterval && slowDown >= 1) {
        slowDown = 0
        onAnimate()
        lastFrameTime = now - (deltaTime % fpsInterval)
      }
      if (animationState.state === 'running') {
        animationState.frames.push(requestAnimationFrame(processFrame))
      }
    }
    animationState.frames.push(requestAnimationFrame(processFrame))
  }

  const startAnimation = (reverse: boolean | undefined = startReverse) => {
    init()
    setAnimationState(animationStateRef.current, 'finished')
    const offset: -1.0 | 1.0 = reverse
      ? ((pathStateRef.current.offset * -1.0) as -1.0 | 1.0)
      : 1.0
    pathStateRef.current.offset = offset
    const animationState = newPathAnimation(animationStateRef.current)

    animate(animationState, () => {
      const pointsPerFrame = speed >= 1 ? offset * speed : offset
      pathStateRef.current = setPathPosition(
        pathStateRef.current,
        pointsPerFrame
      )

      if (isEndOfPath(pathStateRef.current)) stopAnimation()

      applyPathState(
        pathStateRef.current,
        getSVG(svgId),
        pathStyle,
        tipStyle,
        tip
      )

      if (onRouteStateChange != null) onRouteStateChange(pathStateRef.current)
    })
  }

  const stopAnimation = () => {
    setAnimationState(animationStateRef.current, 'finished')
  }

  return { stopAnimation, startAnimation }
}

const applyPathState = (
  state: PathState,
  svg: SVGElement,
  pathStyle?: CSSProperties,
  tipStyle?: CSSProperties,
  tip?: any
) => {
  state.parts.forEach((part) => {
    setPathPartSVG({
      svg,
      partProps: { ...part, style: pathStyle },
      tipProps: (part.tip != null)
        ? { ...part.tip, style: tipStyle, type: tip }
        : undefined
    })
  })

  state.events
    ?.filter((e) => e.state === 'ready')
    .forEach((e) => {
      e.state = 'fired'
      e.onTrigger({
        point: {
          i: e.position,
          x: state.points[e.position].x,
          y: state.points[e.position].y
        },
        position: e.position
      })
    })

  // if (onRouteStateChange)
  //   onRouteStateChange(pathStateRef.current)
}

const newPathState = (
  id: string,
  basePath: SVGPathElement,
  gaps: any,
  events: any[] = [],
  reverse: boolean = false,
  position: number = 0
): PathState => {
  const pathPoints = getPathPointsFromBasePath(basePath)
  const pathGaps = slicePath(id, pathPoints, gaps)
  const pathParts = calcPathPartSize(
    { parts: pathGaps, points: pathPoints, offset: reverse ? -1 : 1 },
    position || 0
  )

  return {
    id,
    offset: reverse ? -1 : (1 as -1 | 1),
    length: pathPoints.length,
    position: position || 0,
    events: events?.map(
      (e, i) => ({ ...e, i, state: 'initial' } as PathEventTrigger)
    ),
    points: pathPoints,
    parts: pathParts
  }
}

const getAnimationState = (animationState: PathAnimation[], id: number) =>
  animationState.find((a) => a.id === id)!

const setAnimationState = (
  animationState: PathAnimation[],
  state: 'running' | 'ready' | 'finished',
  id?: number
) => {
  let animations = []
  if (id) {
    animations = [getAnimationState(animationState, id)]
  } else {
    animations = animationState
  }
  animations.forEach((a) => {
    a.state = state
    if (state === 'finished') {
      animationState
        .flatMap((a) => a.frames)
        .forEach((f) => cancelAnimationFrame(f))
    }
  })
}

const newPathAnimation = (animationState: PathAnimation[]) => {
  animationState.push({
    id: animationState.length + 1,
    state: 'ready',
    frames: []
  })
  return animationState[animationState.length - 1]
}
