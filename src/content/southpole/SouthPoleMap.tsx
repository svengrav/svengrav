import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import Scalable from '@components/base/Scalable'
import { RouteAnimationContext, usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'
import { SVGController } from '@core/svgUtils'
import { southPoleIds } from './SouthPoleMapId'

const SOUTHPOLE_SVG = "https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole.svg"
const SVG_ID = 'svg-base'
const { id: mapIds, generators } = southPoleIds

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
        stroke: '#ff5052',
        strokeWidth: 4,
      },
      tipStyle: {
        fill: '#ff5052'
        
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
        svgController?.applyStyle(`${id}_circle`, { stroke: '#f81b5d' })
        svgController?.applyStyle(`${id}_label`, { fill: '#f81b5d' })
      } else {
        svgController?.applyStyle(`${id}_circle`, { stroke: '#2b8af7' })
        svgController?.applyStyle(`${id}_label`, { fill: '#f1f1f1' })
      }
    }

    mapController.startAnimation = (id: string) => {
      const expedition = expeditionAnimations.find((expedition) => expedition.id === id)
      if(expedition) expedition.startAnimation()
    }
    //#endregion

    //#region setup elements
    const applyRaceActiveStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: '#f81b5d'})
      svgController.applyStyle(generators.getRacePathId(id), { stroke: '#f81b5d'})
      svgController.applyStyle(generators.getRaceStartId(id), { fill: '#f81b5d'})
    }

    const applyRaceDefaultStyle = (id: string) => {
      svgController.applyStyle(generators.getRaceIconFlagId(id), { fill: '#f1f1f1'})
      svgController.applyStyle(generators.getRacePathId(id), { stroke: '#7a7a7a'})
      svgController.applyStyle(generators.getRaceStartId(id), { fill: '#7a7a7a'})
    }
    
    const toggleRaceStyle = (visible: boolean) => {
      if(visible) {
        svgController.applyStyle(mapIds.routes, { display: 'none' })
        svgController.applyStyle(mapIds.raceAmundsenRoutePath, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottRoutePath, { display: 'block' })
        svgController.applyStyle(mapIds.raceAmundsenRouteStart, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottRouteStart, { display: 'block' })

        svgController.applyStyle(mapIds.raceScottEvansDied, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottEvansDiedPointer, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottEvansDiedLabel, { display: 'block'})
  
        svgController.applyStyle(mapIds.raceScottDied, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottDiedPointer, { display: 'block'})
        svgController.applyStyle(mapIds.raceScottDiedLabel, { display: 'block' })
  
        svgController.applyStyle(mapIds.raceScottOatesDied, { display: 'block' })
        svgController.applyStyle(mapIds.raceScottOatesDiedPointer, { display: 'block'})
        svgController.applyStyle(mapIds.raceScottOatesDiedLabel, { display: 'block'})
      } else {
        svgController.applyStyle(mapIds.routes, { display: 'block' })
        svgController.applyStyle(mapIds.raceAmundsenRoutePath, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottRoutePath, { display: 'none' })
        svgController.applyStyle(mapIds.raceAmundsenRouteStart, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottRouteStart, { display: 'none' })

        svgController.applyStyle(mapIds.raceScottEvansDied, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottEvansDiedPointer, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottEvansDiedLabel, { display: 'none'})
  
        svgController.applyStyle(mapIds.raceScottDied, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottDiedPointer, { display: 'none'})
        svgController.applyStyle(mapIds.raceScottDiedLabel, { display: 'none' })
  
        svgController.applyStyle(mapIds.raceScottOatesDied, { display: 'none' })
        svgController.applyStyle(mapIds.raceScottOatesDiedPointer, { display: 'none'})
        svgController.applyStyle(mapIds.raceScottOatesDiedLabel, { display: 'none'})
      }
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
      onEnter: () => { svgController.applyStyle(mapIds.raceAmundsenIconFlag, { fill: '#f81b5d' }) },
      onLeave: () => { !raceState.current.amundsenVisible && svgController.applyStyle(mapIds.raceAmundsenIconFlag, { fill: '#f1f1f1' }) }
    })
    svgController.addOnHover(mapIds.raceScottIconFlagFrame, {
      onEnter: () => { svgController.applyStyle(mapIds.raceScottIconFlag, { fill: '#f81b5d' }) },
      onLeave: () => { !raceState.current.scottVisible && svgController.applyStyle(mapIds.raceScottIconFlag, { fill: '#f1f1f1' }) }
    })


    //#region setup expedition routes
    expedition.forEach((expedition) => {
      const routeBoxId = generators.getRouteBoxId(expedition.id)
      const routeCircleId = generators.getRouteCircleId(expedition.id)
      const routeLabelId = generators.getRouteLabelId(expedition.id)
      const routeStartId = generators.getRouteStartId(expedition.id)

      const routeLabelStyle = { fill: '#f1f1f1', }
      const routeCircleStyle = { stroke: '#1997ff', strokeWidth: 3, fill: 'none' }
      const routeStartStyle = { fill: '#333', strokeWidth: 4}
      const routeBoxStyle = { fill: '#ffffff00', cursor: 'pointer' }

      svgController.applyStyle(routeLabelId, routeLabelStyle)
      svgController.applyStyle(routeCircleId, routeCircleStyle)
      svgController.applyStyle(routeStartId, routeStartStyle)
      svgController.applyStyle(routeBoxId, routeBoxStyle)

      svgController.getElement(routeBoxId).onclick = () => mapController.onClick && mapController.onClick(expedition.id)

      svgController.addOnHover(routeBoxId, {
        onEnter: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: '#f81b5d' }) },
        onLeave: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: '#f1f1f1' }) }
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

      controller.applyStyle(mapIds.captionTitle, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.captionDescription, { fill: '#f1f1f1' })

      controller.applyStyle(mapIds.frame, { fill: '#ffffff00' })
      controller.applyStyle(mapIds.antarticSurface, { stroke: '#030303', fill: 'none', strokeWidth: '1' })
      controller.applyStyle(mapIds.antarticIceSurface, { stroke: '#000000', fill: 'none', strokeWidth: '1' })

      controller.applyStyle(mapIds.elementsItemsTextDeg0, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsItemsTextDeg90, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsItemsText2600, { fill: '#333' })
      controller.applyStyle(mapIds.elementsItemsTextPole, { fill: '#333' })

      controller.applyStyle(mapIds.raceAmundsenIconFlag, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.raceAmundsenIconFlagFrame, { stroke: '#f1f1f1', strokeWidth: 2, cursor: 'pointer', fill: 'hsla(0, 0%, 0%, 0)'})
      controller.applyStyle(mapIds.raceAmundsenIconText, { fill: '#f1f1f1', strokeWidth: 2 })
      controller.applyStyle(mapIds.raceAmundsenLabelPointer, { stroke:'#333', strokeWidth: 2 })
      controller.applyStyle(mapIds.raceAmundsenLabel, { fill:'#333', strokeWidth: 2 })

      controller.applyStyle(mapIds.raceScottEvansDied, { stroke:'#333', strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottEvansDiedPointer, { stroke:'#333', strokeWidth: 2, display: 'none' })
      controller.applyStyle(mapIds.raceScottEvansDiedLabel, { fill:'#333', display: 'none'})

      controller.applyStyle(mapIds.raceScottDied, { stroke:'#333', strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottDiedPointer, { stroke:'#333', strokeWidth: 2, display: 'none'})
      controller.applyStyle(mapIds.raceScottDiedLabel, { fill:'#333', display: 'none' })

      controller.applyStyle(mapIds.raceScottOatesDied, { stroke:'#333', strokeWidth: 4, display: 'none' })
      controller.applyStyle(mapIds.raceScottOatesDiedPointer, { stroke:'#333', strokeWidth: 2, display: 'none'})
      controller.applyStyle(mapIds.raceScottOatesDiedLabel, { fill:'#333', display: 'none'})
      
      controller.applyStyle(mapIds.raceScottLabel, { fill:'#333', strokeWidth: 2 })
      controller.applyStyle(mapIds.raceScottLabelPointer, { stroke:'#333', strokeWidth: 2 })
      controller.applyStyle(mapIds.raceScottRoutePath, { stroke: '#7a7a7a', strokeWidth: 5, display: 'none' })
      controller.applyStyle(mapIds.raceAmundsenRoutePath, { stroke: '#7a7a7a', strokeWidth: 5, display: 'none' })
      controller.applyStyle(mapIds.raceAmundsenRouteStart, { fill: '#7a7a7a', display: 'none' })
      controller.applyStyle(mapIds.raceScottRouteStart, { fill: '#7a7a7a', display: 'none' })

      controller.applyStyle(mapIds.raceScottIconFlag, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.raceScottIconFlagFrame, { stroke: '#f1f1f1', strokeWidth: 2, cursor: 'pointer', fill: 'hsla(0, 0%, 0%, 0)' })
      controller.applyStyle(mapIds.raceScottIconText, { fill: '#f1f1f1', strokeWidth: 2 })

      controller.applyStyle(mapIds.elementsCircleText, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsTextWeddellSea, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsTextRossIce, { fill: '#333' })
      controller.applyStyle(mapIds.elementsTextRossSea, { fill: '#f1f1f1' })

      controller.applyStyle(mapIds.elementsMountVinsonIcon, { fill: '#333' })
      controller.applyStyle(mapIds.elementsMountVinsonLabel, { fill: '#333' })
      controller.applyStyle(mapIds.elementsMountErebusIcon, { fill: '#333' })
      controller.applyStyle(mapIds.elementsMountVinsonIcon, { fill: '#333' })

      return controller
    }).catch((error) => {
      throw (`Error loading SVG: ${error}`)
    })
}

//#endregion
