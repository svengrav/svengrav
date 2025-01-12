import { useEffect, useRef, useState } from 'react'
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
export const SouthPoleMap = ({ expedition, controller }: { expedition: Expedition[], controller: SouthPoleMapController }) => {
  const baseRef = useRef<HTMLDivElement>(null)
  const expeditionAnimations: RouteAnimationContext[] = []

  const antarticCircleAnimation = usePathAnimation("antarticCircleId", SVG_ID, mapIds.antarticCirclePath, {
    pathStyle: {
      stroke: '#1dcaff',
      strokeWidth: 6,
      strokeDasharray: '20 10',
      fill: 'none'
    },
    tipStyle: {
      fill: '#1dcaff'
    },
    speed: 20
  })

  expedition.forEach((expedition) => {
    expeditionAnimations.push(usePathAnimation(expedition.id, SVG_ID, generators.getRouteId(expedition.id), {
      pathStyle: {
        stroke: '#f81b5d',
        strokeWidth: 5,
        strokeDasharray: '40 5',
      },
      tipStyle: {
        fill: '#ff5052'
        
      }
    }))
  })

  const configureSouthPoleMap = () => createSouthPoleMap().then((svgController) => {
    let activeExpeditionID = ''
    baseRef.current?.replaceChildren(svgController.base)
    expedition.forEach((expedition) => {
      const routeBoxId = generators.getRouteBoxId(expedition.id)
      const routeCircleId = generators.getRouteCircleId(expedition.id)
      const routeLabelId = generators.getRouteLabelId(expedition.id)
      const routeStartId = generators.getRouteStartId(expedition.id)

      const routeLabelStyle = { fill: '#f1f1f1', }
      const routeCircleStyle = { stroke: '#1997ff', strokeWidth: 4, fill: 'none' }
      const routeStartStyle = { fill: '#333', strokeWidth: 5 }
      const routeBoxStyle = { fill: '#ffffff00', cursor: 'pointer' }

      svgController.applyStyle(routeLabelId, routeLabelStyle)
      svgController.applyStyle(routeCircleId, routeCircleStyle)
      svgController.applyStyle(routeStartId, routeStartStyle)
      svgController.applyStyle(routeBoxId, routeBoxStyle)

      svgController.getElement(routeBoxId).onclick = () => controller.onClick && controller.onClick(expedition.id)

      svgController.addOnHover(routeBoxId, {
        onEnter: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: '#f81b5d' }) },
        onLeave: () => { activeExpeditionID !== expedition.id && svgController.applyStyle(routeLabelId, { fill: '#f1f1f1' }) }
      })

      controller.setVisibility = (id: string, visible: boolean) => {
        if (visible) {
          activeExpeditionID = id
          svgController?.applyStyle(`${id}_circle`, { stroke: '#f81b5d' })
          svgController?.applyStyle(`${id}_label`, { fill: '#f81b5d' })
        } else {
          svgController?.applyStyle(`${id}_circle`, { stroke: '#2b8af7' })
          svgController?.applyStyle(`${id}_label`, { fill: '#f1f1f1' })
        }
      }

      controller.startAnimation = (id: string) => {
        const expedition = expeditionAnimations.find((expedition) => expedition.id === id)
        if(expedition) expedition.startAnimation()
      }
    })
  }).then(() => {
    antarticCircleAnimation.startAnimation()
    expeditionAnimations.forEach((expedition) => {
      expedition.startAnimation()
    })
  })

  useEffect(() => {
    configureSouthPoleMap()
  }, [baseRef.current])

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
      controller.applyStyle(mapIds.antarticSurface, { stroke: '#ffffff', fill: 'none', strokeWidth: '4' })
      controller.applyStyle(mapIds.antarticIceSurface, { stroke: '#ffffff', fill: 'none', strokeWidth: '4' })

      controller.applyStyle(mapIds.elementsItemsTextDeg0, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsItemsTextDeg90, { fill: '#f1f1f1' })
      controller.applyStyle(mapIds.elementsItemsText2600, { fill: '#333' })
      controller.applyStyle(mapIds.elementsItemsTextPole, { fill: '#333' })


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
