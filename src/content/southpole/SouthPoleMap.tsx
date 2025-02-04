import { CSSProperties, startTransition, useEffect, useMemo, useRef, useState } from 'react'
import Scalable from '@components/base/Scalable'
import { RouteAnimationContext, usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'
import { SVGController } from '@core/svgUtils'
import { southPoleIds } from './SouthPoleMapId'
import { c } from 'vite/dist/node/types.d-aGj9QkWt'

const SOUTHPOLE_SVG = 'https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole.svg'
const SVG_ID = 'svg-base'
const { id: mapIds, generators } = southPoleIds

const colors = {
  primary: '#f43f5e',
  secondary: '#1997ff',
  tertiary: '#1dcaff',
  light: '#f1f1f1',
  dark: '#333',
  clear: 'rgba(0,0,0,0)'
}

export interface SouthPoleMapController {
  setVisibility?: (id: string, visible: boolean) => void
  onClick?: (id: string) => void
  startAnimation?: (id: string) => void
}

/**
 * SouthPoleRoutes component renders a scalable SVG map with animated expedition routes.
 *
 * @param {Object} props - The component props.
 * @param {Expedition[]} props.expedition - An array of expedition objects containing route information.
 *
 * @returns {JSX.Element} A scalable SVG map with animated expedition routes.
 */

export const SouthPoleMap = ({ expedition, controller: mapController }: { expedition: Expedition[], controller: SouthPoleMapController }) => {
  const baseRef = useRef<HTMLDivElement>(null)
  const didRunRef = useRef<boolean>(false)
  const expeditionAnimations: RouteAnimationContext[] = []
  const raceState = useRef({ amundsenVisible: false, scottVisible: false })

  const antarticCircleAnimation = usePathAnimation("antarticCircleId", SVG_ID, mapIds.antarticCirclePath, {
    pathStyle: {
      stroke: '#1dcaff',
      strokeWidth: 5,
      strokeDasharray: '20 10',
      fill: 'none'
    },
    tipStyle: {
      fill: '#1dcaff'
    },
    speed: 20
  })

  expedition.forEach((expedition) => {
    expeditionAnimations.push(usePathAnimation(expedition.id, mapIds.routes, generators.getRouteId(expedition.id), {
      pathStyle: {
        stroke: colors.primary,
        strokeWidth: 4,
      },
      tipStyle: {
        fill: colors.primary
      }
    }))
  })

  const configureSouthPoleMap = () => createSouthPoleMap().then((svgController) => {
    let activeExpeditionID = ''
    raceState.current = { amundsenVisible: false, scottVisible: false }
    svgController.base.style.opacity = '0'
    svgController.base.style.transition = 'opacity 2s ease'
    baseRef.current?.replaceChildren(svgController.base)

    //#region setup map controller
    mapController.setVisibility = (id: string, visible: boolean) => {
      toggleRaceStyle(false)

      if (visible) {
        activeExpeditionID = id
        svgController?.applyStyle(`${id}_circle`, { stroke: colors.primary })
        svgController?.applyStyle(`${id}_label`, { fill: colors.primary })
      } else {
        svgController?.applyStyle(`${id}_circle`, { stroke: colors.secondary })
        svgController?.applyStyle(`${id}_label`, { fill: colors.light })
      }
    }

    mapController.startAnimation = (id: string) => {
      const expedition = expeditionAnimations.find((expedition) => expedition.id === id)
      if (expedition) expedition.startAnimation()
    }
    //#endregion

    //#region setup elements
    const applyRaceActiveStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: colors.primary })
      svgController.applyStyle(generators.getRacePathId(id), { stroke: colors.primary })
      svgController.applyStyle(generators.getRaceStartId(id), { fill: colors.primary })
    }

    const applyRaceDefaultStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: colors.light })
      svgController.applyStyle(generators.getRacePathId(id), { stroke: colors.dark })
      svgController.applyStyle(generators.getRaceStartId(id), { fill: colors.dark })
    }

    const toggleRaceStyle = (visible: boolean) => {
      svgController.fade(mapIds.routes, !visible)

      svgController.fade(mapIds.raceScottEvansDiedPointer, visible)
      svgController.fade(mapIds.raceAmundsenRoutePath, visible)
      svgController.fade(mapIds.raceScottRoutePath, visible)
      svgController.fade(mapIds.raceAmundsenRouteStart, visible)
      svgController.fade(mapIds.raceScottRouteStart, visible)

      svgController.fade(mapIds.raceScottEvansDied, visible)
      svgController.fade(mapIds.raceScottEvansDiedPointer, visible)
      svgController.fade(mapIds.raceScottEvansDiedLabel, visible)

      svgController.fade(mapIds.raceScottDied, visible)
      svgController.fade(mapIds.raceScottDiedPointer, visible)
      svgController.fade(mapIds.raceScottDiedLabel, visible)

      svgController.fade(mapIds.raceScottOatesDied, visible)
      svgController.fade(mapIds.raceScottOatesDiedPointer, visible)
      svgController.fade(mapIds.raceScottOatesDiedLabel, visible)
    }
    //#endregion

    svgController.getElement(mapIds.raceScottIconFlagFrame).onclick = () => {
      if (raceState.current.scottVisible) {
        raceState.current = { amundsenVisible: false, scottVisible: false }
        applyRaceDefaultStyle(mapIds.scott)
        toggleRaceStyle(raceState.current.scottVisible || raceState.current.amundsenVisible)
      } else {
        raceState.current = { amundsenVisible: false, scottVisible: true }
        toggleRaceStyle(true)
        applyRaceDefaultStyle(mapIds.amundsen)
        applyRaceActiveStyle(mapIds.scott)
      }
    }

    svgController.getElement(mapIds.raceAmundsenIconFlagFrame).onclick = () => {
      if (raceState.current.amundsenVisible) {
        raceState.current = { amundsenVisible: false, scottVisible: false }
        toggleRaceStyle(raceState.current.scottVisible || raceState.current.amundsenVisible)
        applyRaceDefaultStyle(mapIds.amundsen)
      } else {
        raceState.current = { amundsenVisible: true, scottVisible: false }
        toggleRaceStyle(true)
        applyRaceActiveStyle(mapIds.amundsen)
        applyRaceDefaultStyle(mapIds.scott)
      }
    }

    svgController.addOnHover(mapIds.raceAmundsenIconFlagFrame, {
      onEnter: () => { svgController.applyStyle(mapIds.raceAmundsenIconFlag, { fill: colors.primary }) },
      onLeave: () => { !raceState.current.amundsenVisible && svgController.applyStyle(mapIds.raceAmundsenIconFlag, { fill: colors.light }) }
    })
    svgController.addOnHover(mapIds.raceScottIconFlagFrame, {
      onEnter: () => { svgController.applyStyle(mapIds.raceScottIconFlag, { fill: colors.primary }) },
      onLeave: () => { !raceState.current.scottVisible && svgController.applyStyle(mapIds.raceScottIconFlag, { fill: colors.light }) }
    })

    //#region setup expedition routes
    expedition.forEach((expedition) => {
      const routeBoxId = generators.getRouteBoxId(expedition.id)
      const routeCircleId = generators.getRouteCircleId(expedition.id)
      const routeLabelId = generators.getRouteLabelId(expedition.id)
      const routeStartId = generators.getRouteStartId(expedition.id)

      const routeLabelStyle = { fill: colors.light, }
      const routeCircleStyle = { stroke: colors.secondary, strokeWidth: 3, fill: colors.clear }
      const routeStartStyle = { fill: colors.dark, strokeWidth: 4 }
      const routeBoxStyle = { fill: colors.clear, cursor: 'pointer' }

      svgController.applyStyle(routeLabelId, routeLabelStyle)
      svgController.applyStyle(routeCircleId, routeCircleStyle)
      svgController.applyStyle(routeStartId, routeStartStyle)
      svgController.applyStyle(routeBoxId, routeBoxStyle)

      svgController.getElement(routeBoxId).onclick = () => mapController.onClick && mapController.onClick(expedition.id)

      svgController.addOnHover(routeBoxId, {
        onEnter: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: colors.primary, transition: 'fill 0.3s ease-in-out' }) },
        onLeave: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: colors.light, transition: 'fill 0.5s ease-in-out' }) }
      })

    })
    //#endregion
    return svgController
  }).then((svgController: SVGController) => {
    antarticCircleAnimation.startAnimation()
    expeditionAnimations.forEach((expedition) => {
      expedition.startAnimation()
    })
    svgController.base.style.opacity = '1'
  })

  useEffect(() => {
    if(didRunRef.current) return; 
    didRunRef.current = true
    configureSouthPoleMap()
  }, [])

  return (
    <Scalable width={3400} height={2600}>
      <div ref={baseRef}></div>
    </Scalable>
  )
}
export default SouthPoleMap
//#region privates  

const createSouthPoleMap = async () => {
  return await SVGController.createFromUrl(SOUTHPOLE_SVG, SVG_ID, Object.values(mapIds))
    .then((controller) => {
      addWaves(controller.base.getElementById('frame') as SVGSVGElement)
      controller.applyStyle(mapIds.captionTitle, { fill: colors.light })
      controller.applyStyle(mapIds.captionDescription, { fill: colors.light })

      controller.applyStyle(mapIds.frame, { fill: colors.clear })
      controller.applyStyle(mapIds.antarticSurface, { stroke: colors.dark, fill: 'none', strokeWidth: '1' })
      controller.applyStyle(mapIds.antarticIceSurface, { stroke: colors.dark, fill: 'none', strokeWidth: '1' })

      controller.applyStyle(mapIds.elementsItemsTextDeg0, { fill: colors.light })
      controller.applyStyle(mapIds.elementsItemsTextDeg90, { fill: colors.light })
      controller.applyStyle(mapIds.elementsItemsText2600, { fill: colors.dark })
      controller.applyStyle(mapIds.elementsItemsTextPole, { fill: colors.dark })

      controller.applyStyle(mapIds.routes, { transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out', opacity: 1, visibility: 'visible' })

      controller.applyStyle(mapIds.raceAmundsenIconFlag, { fill: colors.light })
      controller.applyStyle(mapIds.raceAmundsenIconFlagFrame, { stroke: colors.light, strokeWidth: 2, cursor: 'pointer', fill: colors.clear })
      controller.applyStyle(mapIds.raceAmundsenIconText, { fill: colors.light, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceAmundsenLabelPointer, { stroke: colors.dark, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceAmundsenLabel, { fill: colors.dark, strokeWidth: 2 })

      controller.applyStyle(mapIds.raceScottEvansDied, { stroke: colors.dark, strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottEvansDiedPointer, { stroke: colors.dark, strokeWidth: 2, display: 'none' })
      controller.applyStyle(mapIds.raceScottEvansDiedLabel, { fill: colors.dark, display: 'none' })

      controller.applyStyle(mapIds.raceScottDied, { stroke: colors.dark, strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottDiedPointer, { stroke: colors.dark, strokeWidth: 2, display: 'none' })
      controller.applyStyle(mapIds.raceScottDiedLabel, { fill: colors.dark, display: 'none' })

      controller.applyStyle(mapIds.raceScottOatesDied, { stroke: colors.dark, strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottOatesDiedPointer, { stroke: colors.dark, strokeWidth: 2, display: 'none' })
      controller.applyStyle(mapIds.raceScottOatesDiedLabel, { fill: colors.dark, display: 'none' })

      controller.applyStyle(mapIds.raceScottLabel, { fill: colors.dark, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceScottLabelPointer, { stroke: colors.dark, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceScottRoutePath, { stroke: '#7a7a7a', strokeWidth: 5, display: 'none' })
      controller.applyStyle(mapIds.raceAmundsenRoutePath, { stroke: '#7a7a7a', strokeWidth: 5, display: 'none' })
      controller.applyStyle(mapIds.raceAmundsenRouteStart, { fill: '#7a7a7a', display: 'none' })
      controller.applyStyle(mapIds.raceScottRouteStart, { fill: '#7a7a7a', display: 'none' })

      controller.applyStyle(mapIds.raceScottIconFlag, { fill: colors.light })
      controller.applyStyle(mapIds.raceScottIconFlagFrame, { stroke: colors.light, strokeWidth: 2, cursor: 'pointer', fill: colors.clear })
      controller.applyStyle(mapIds.raceScottIconText, { fill: colors.light, strokeWidth: 2 })

      controller.applyStyle(mapIds.elementsCircleText, { fill: colors.light })
      controller.applyStyle(mapIds.elementsTextWeddellSea, { fill: colors.light })
      controller.applyStyle(mapIds.elementsTextRossIce, { fill: colors.dark })
      controller.applyStyle(mapIds.elementsTextRossSea, { fill: colors.light })

      controller.applyStyle(mapIds.elementsMountVinsonIcon, { fill: colors.dark })
      controller.applyStyle(mapIds.elementsMountVinsonLabel, { fill: colors.dark })
      controller.applyStyle(mapIds.elementsMountErebusIcon, { fill: colors.dark })
      controller.applyStyle(mapIds.elementsMountVinsonIcon, { fill: colors.dark })


      return controller
    }).catch((error) => {
      throw (`Error loading SVG: ${error}`)
    })
}

const wavePoints = [
  { x: 2046.96, y: 73.51 }, { x: 923.86, y: 1694.37 }, { x: 395.48, y: 2075.09 }, { x: 518.92, y: 2001.05 },
  { x: 2956.71, y: 2068.2 }, { x: 466.5, y: 506.9 }, { x: 112.88, y: 2300.64 }, { x: 843.71, y: 2511.54 },
  { x: 164.32, y: 1403.58 }, { x: 177.0, y: 2168.58 }, { x: 296.4, y: 183.53 }, { x: 1319.48, y: 2527.97 },
  { x: 2859.93, y: 732.6 }, { x: 2773.68, y: 2014.29 }, { x: 781.55, y: 850.03 }, { x: 2569.01, y: 2063.38 },
  { x: 1747.86, y: 2331.57 }, { x: 2630.64, y: 1643.52 }, { x: 2968.57, y: 2167.8 }, { x: 285.23, y: 1038.25 },
  { x: 950.97, y: 330.52 }, { x: 2319.3, y: 1982.64 }, { x: 646.08, y: 1976.6 }, { x: 2403.54, y: 2046.06 },
  { x: 1192.1, y: 129.28 }, { x: 2934.84, y: 690.07 }, { x: 556.6, y: 2229.77 }, { x: 3170.89, y: 1842.51 },
  { x: 2395.36, y: 430.9 }, { x: 2183.01, y: 209.78 }, { x: 1099.58, y: 1754.74 }, { x: 134.16, y: 180.14 },
  { x: 1079.87, y: 33.9 }, { x: 760.19, y: 522.88 }, { x: 481.01, y: 911.94 }, { x: 472.21, y: 730.45 },
  { x: 3075.6, y: 2467.79 }, { x: 2052.91, y: 2456.88 }, { x: 2963.57, y: 744.45 }, { x: 615.07, y: 2348.3 },
  { x: 837.51, y: 1992.01 }, { x: 356.41, y: 1265.63 }, { x: 332.17, y: 1916.6 }, { x: 2593.28, y: 1478.1 },
  { x: 2513.15, y: 1860.79 }, { x: 196.73, y: 2394.2 }, { x: 436.17, y: 2558.25 }, { x: 1332.77, y: 80.85 },
  { x: 2812.34, y: 1190.96 }, { x: 490.78, y: 2106.18 }, { x: 367.18, y: 1931.31 }, { x: 2922.51, y: 184.28 },
  { x: 2824.98, y: 1380.24 }, { x: 1922.33, y: 2271.43 }, { x: 408.72, y: 2254.02 }, { x: 2495.19, y: 2248.36 },
  { x: 453.65, y: 2527.17 }, { x: 2788.91, y: 2567.69 }, { x: 334.21, y: 134.01 }, { x: 192.61, y: 355.34 },
  { x: 3054.83, y: 2502.23 }, { x: 453.83, y: 847.04 }, { x: 3063.47, y: 976.67 }, { x: 2539.86, y: 1784.7 },
  { x: 666.14, y: 2485.2 }, { x: 2787.05, y: 2479.22 }, { x: 3146.2, y: 2584.41 }, { x: 3019.73, y: 754.9 },
  { x: 654.49, y: 731.49 }, { x: 1394.99, y: 2370.74 }, { x: 3062.84, y: 2517.43 }, { x: 3154.43, y: 2360.2 },
  { x: 2290.48, y: 2157.19 }, { x: 2791.19, y: 58.58 }, { x: 3075.76, y: 644.72 }, { x: 468.41, y: 1040.67 },
  { x: 1118.99, y: 1978.32 }, { x: 112.89, y: 2587.82 }, { x: 2958.49, y: 2030.85 }, { x: 2804.38, y: 1629.85 },
  { x: 3089.89, y: 630.13 }, { x: 2975.77, y: 2512.9 }, { x: 783.92, y: 1407.02 }, { x: 2512.91, y: 2367.99 }
]


const addWaves = (svg: SVGSVGElement) => {
  const svgNS = "http://www.w3.org/2000/svg"
  const lines: SVGElement[] = []

  wavePoints.forEach(({ x, y }) => { 
    const line = document.createElementNS(svgNS, "line")
    const length = 20 + Math.random() * 40 // Zufällige Länge der Linie
    line.setAttribute("x1", x.toString())
    line.setAttribute("y1", y.toString())
    line.setAttribute("x2", (x + length).toString())
    line.setAttribute("y2", (y + Math.random() * 20 - 10).toString()) // Zufällige Höhe
    line.setAttribute("stroke", "rgba(37, 149, 194, 1)") // Blaue Linien
    line.setAttribute("stroke-width", "" + Math.floor(Math.random() * 6))
    line.setAttribute("opacity", "0") // Startet unsichtbar
    line.style.transition = "opacity 1s ease-in-out, transform 3s linear"
    line.style.transform = "translateX(0px)"
    svg.appendChild(line)
    lines.push(line)
  })

  setInterval(() => {
    for (let i = 0; i < 40; i++) {
      const pointIndex = Math.floor(Math.random() * 84)
      const line = lines[pointIndex]
      setTimeout(() => {
        line.setAttribute("opacity", "1")
        line.style.transform = `translateX(${Math.random() * 100}px)`
      }, Math.random() * 500)
      setTimeout(() => {
        line.setAttribute("opacity", "0")
        setTimeout(() => {
          line.style.transform = "translateX(0px)"
        }, 1000)
      }, 2000 + Math.random() * 3000)
    }
  }, 1000)
}
