import { useEffect, useRef } from 'react'
import Scalable from '../../components/Scalable'
import { usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'
import { fetchSVG } from '../Spital/svgUtils'

const SOUTPOLE_SVG = "https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole.svg"
const SVG_ID = 'svg-base'

type SouthPoleRouteId = 'cook' | 'belgica' | 'cross' | 'amundsen' | 'scott' | 'nimrod' | 'discovery'
const routeIds: SouthPoleRouteId[] = ['cook', 'belgica', 'cross', 'amundsen', 'scott', 'nimrod', 'discovery']

export interface SouthPoleMapController {
  setVisibility?: (id: string, visible: boolean) => void
  onClick?: (id: string) => void
}


/**
 * SouthPoleRoutes component renders a scalable SVG map with animated expedition routes.
 *
 * @param {Object} props - The component props.
 * @param {Expedition[]} props.expedition - An array of expedition objects containing route information.
 *
 * @returns {JSX.Element} A scalable SVG map with animated expedition routes.
 *
 * @example
 * <SouthPoleRoutes expedition={expeditionData} />
 *
 * @component
 */
export const SouthPoleMap = ({ expedition, controller }: { expedition: Expedition[], controller: SouthPoleMapController }) => {

  //setup
  const baseRef = useRef<HTMLDivElement>(null)
  const pathAnimations: any[] = []

  const pathOptions = {

    pathStyle: { stroke: '#000285', strokeWidth: 4 },
    tipStyle: {
      fill: '#000285'
    }
  }

  const routeId = (id: string) => `${id}_route`
  const routeLabel = (id: string) => `${id}_label`
  const routeCircle = (id: string) => `${id}_circle`
  const routeBox = (id: string) => `${id}_box`
  const getBaseSVG = () => baseRef.current?.querySelector(`#${SVG_ID}`) as SVGSVGElement

  expedition.forEach((expedition) => {
    pathAnimations.push(usePathAnimation(SVG_ID, `${expedition.id}_route`, pathOptions))
  })

  //controllers
  controller.setVisibility = (id: string, visible: boolean) => {
    var circle = getSVGElement(getBaseSVG(), routeCircle(id))
    var label = getSVGElement(getBaseSVG(), routeLabel(id))
    var route = getSVGElement(getBaseSVG(), `${id}_route-path-p-1`)
    if (visible) {
      circle.style.stroke = '#FF1A56'
      label.style.fill = '#FF1A56'
      circle.style.strokeWidth = '6'
      route.style.stroke = '#FF1A56'
    } else {
      circle.style.stroke = '#4b97d1'
      label.style.fill = '#333'
      circle.style.strokeWidth = '3'
      route.style.stroke = '#000285'

    }
  }

  useEffect(() => {
    getSouthPoleSVG().then((svg) => {
      if (!getBaseSVG()) {
        baseRef.current?.appendChild(svg)
      }
      expedition.forEach((expedition) => {
        getSVGElement(svg, routeId(expedition.id)).style.stroke = 'none'
        getSVGElement(svg, routeBox(expedition.id)).onclick = () => controller.onClick && controller.onClick(expedition.id)
      })

    }).then(() => {
      pathAnimations.forEach((expedition) => {
        expedition.startAnimation()
      })
    })
  }, [])


  return (
    <Scalable width={3400} height={2600}>
      <div ref={baseRef}></div>
    </Scalable>
  )
}
export default SouthPoleMap

//#region privates

const getSouthPoleSVG = async () => {
  return await fetchSVG(SOUTPOLE_SVG)
    .then((svgMap) => {
      // this is impotant to avoid conflicts with other SVGs in the page
      svgMap.id = SVG_ID

      getSVGElement(svgMap, 'text').style.fill = '#333'
      routeIds.forEach((id) => {
        try {
          getSVGElement(svgMap, `${id}_route`).style.stroke = '#4b97d1'
          getSVGElement(svgMap, `${id}_circle`).style.stroke = '#4b97d1'
          getSVGElement(svgMap, `${id}_circle`).style.strokeWidth = '3'
          getSVGElement(svgMap, `${id}_circle`).style.fill = 'none'
          getSVGElement(svgMap, `${id}_box`).style.fill = 'rgba(255, 0, 0, 0.001)'
        } catch {
          console.log(`Could not find element ${id}`)
        }
      })
      try {
        getSVGElement(svgMap, `polar_circle`).style.fill = 'none'
        getSVGElement(svgMap, `polar_circle`).style.stroke = '#4b97d1'
        getSVGElement(svgMap, `polar_circle`).style.strokeWidth = '5'
        getSVGElement(svgMap, `frame`).style.fill = 'none'
        getSVGElement(svgMap, `outer_circle`).style.fill = 'none'
        getSVGElement(svgMap, `outer_circle`).style.stroke = 'none'
        getSVGElement(svgMap, `outer_circle`).style.strokeWidth = '5'
        getSVGElement(svgMap, `frame`).style.fill = 'none'
      } catch {

      }
      return svgMap
    }).catch((error) => {
      throw (`Error loading SVG: ${error}`)
    })
}

const getSVGElement = (svg: SVGSVGElement, id: string): SVGElement => {
  return svg.querySelectorAll(`#${id}`)[0] as SVGElement
}
//#endregion