import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
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
  primary: '#f81b5d',
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
  const didRunRef  = useRef<boolean>(false)
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
    svgController.base.style.opacity = '0';
    svgController.base.style.transition = 'opacity 2s ease';
    baseRef.current?.replaceChildren(svgController.base)

    //#region setup map controller
    mapController.setVisibility = (id: string, visible: boolean) => {
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
      if(expedition) expedition.startAnimation()
    }
    //#endregion

    //#region setup elements
    const applyRaceActiveStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: colors.primary})
      svgController.applyStyle(generators.getRacePathId(id), { stroke: colors.primary})
      svgController.applyStyle(generators.getRaceStartId(id), { fill: colors.primary})
    }

    const applyRaceDefaultStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: colors.light})
      svgController.applyStyle(generators.getRacePathId(id), { stroke: colors.dark})
      svgController.applyStyle(generators.getRaceStartId(id), { fill: colors.dark})
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
      if(raceState.current.scottVisible) {
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
      if(raceState.current.amundsenVisible) {
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
      const routeStartStyle = { fill: colors.dark, strokeWidth: 4}
      const routeBoxStyle = { fill: colors.clear, cursor: 'pointer' }

      svgController.applyStyle(routeLabelId, routeLabelStyle)
      svgController.applyStyle(routeCircleId, routeCircleStyle)
      svgController.applyStyle(routeStartId, routeStartStyle)
      svgController.applyStyle(routeBoxId, routeBoxStyle)

      svgController.getElement(routeBoxId).onclick = () => mapController.onClick && mapController.onClick(expedition.id)

      svgController.addOnHover(routeBoxId, {
        onEnter: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: colors.primary, transition: 'fill 0.3s ease-in-out' }) },
        onLeave: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: colors.light, transition: 'fill 0.5s ease-in-out'}) }
      })

    })
    //#endregion

    return svgController;
  }).then((svgController: SVGController) => {
    antarticCircleAnimation.startAnimation()
    expeditionAnimations.forEach((expedition) => {
      expedition.startAnimation()
    })
    svgController.base.style.opacity = '1';
  })

  useEffect(() => {
    // if(didRunRef.current) return; 
    // didRunRef.current = true
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
      controller.applyStyle(mapIds.raceAmundsenLabelPointer, { stroke:colors.dark, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceAmundsenLabel, { fill:colors.dark, strokeWidth: 2 })

      controller.applyStyle(mapIds.raceScottEvansDied, { stroke:colors.dark, strokeWidth: 4, display: 'none'})
      controller.applyStyle(mapIds.raceScottEvansDiedPointer, { stroke:colors.dark, strokeWidth: 2, display: 'none' })
      controller.applyStyle(mapIds.raceScottEvansDiedLabel, { fill:colors.dark, display: 'none'})

      controller.applyStyle(mapIds.raceScottDied, { stroke:colors.dark, strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottDiedPointer, { stroke:colors.dark, strokeWidth: 2, display: 'none'})
      controller.applyStyle(mapIds.raceScottDiedLabel, { fill:colors.dark, display: 'none' })

      controller.applyStyle(mapIds.raceScottOatesDied, { stroke:colors.dark, strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottOatesDiedPointer, { stroke:colors.dark, strokeWidth: 2, display: 'none'})
      controller.applyStyle(mapIds.raceScottOatesDiedLabel, { fill:colors.dark, display: 'none'})
      
      controller.applyStyle(mapIds.raceScottLabel, { fill:colors.dark, strokeWidth: 2 })
      controller.applyStyle(mapIds.raceScottLabelPointer, { stroke:colors.dark, strokeWidth: 2 })
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

//#endregion
