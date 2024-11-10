import { useEffect, useRef } from 'react'
import Scalable from '../../components/Scalable'
import { usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'
import { fetchSVG } from '../Spital/svgUtils'

const SOUTPOLE_SVG = "https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole.svg"


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
  const pathAnimations: any[] = []

  const pathOptions = {
    pathStyle: { stroke: '#000285', strokeWidth: 4 },
    tipStyle: {
      fill: '#000285'
    }
  }

  const routeId = (id: string) => `${id}_route`
  const routeLabel = (id: string) => `${id}_label`

  expedition.forEach((expedition) => {
    pathAnimations.push(usePathAnimation('svg-routes', `${expedition.id}_route`, pathOptions))
  })
  
  //controllers


  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {


    getSouthPoleSVG().then((svg) => {
      if(!ref.current?.querySelector('#svg-routes')) {
        ref.current?.appendChild(svg)
      }

      expedition.forEach((expedition) => {
        getSVGElement(svg, routeId(expedition.id)).style.stroke = 'none'
        getSVGElement(svg, routeLabel(expedition.id)).onclick = () => controller.onClick && controller.onClick(expedition.id)

      })


    }).then(() => {
      pathAnimations.forEach((expedition) => {
        expedition.startAnimation()
      })
    })
    
    controller.setVisibility = (id: string, visible: boolean) => {
      var svg = ref.current?.querySelector('#svg-routes') as SVGSVGElement
      var elemtn = getSVGElement(svg, "cook_circle")
      elemtn.style.fill = 'red'
    }

  }, [])
  return (
    <Scalable width={3400} height={2600}>
      <div ref={ref}></div>
    </Scalable>
  )
}
export default SouthPoleMap

//#region privates

const getSouthPoleSVG = async () => {
  return await fetchSVG(SOUTPOLE_SVG)
    .then((svgMap) => {
      svgMap.id = 'svg-routes'
      getSVGElement(svgMap, 'text').style.fill = '#333'
      routeIds.forEach((id) => {
        try {
          getSVGElement(svgMap, `${id}_route`).style.stroke = '#4b97d1'
          getSVGElement(svgMap, `${id}_circle`).style.stroke = '#4b97d1'
          getSVGElement(svgMap, `${id}_circle`).style.strokeWidth = '3'
          getSVGElement(svgMap, `${id}_circle`).style.fill = 'none'
        } catch {
          console.log(`Could not find element ${id}`)
        }
        getSVGElement(svgMap, `polar_circle`).style.fill = 'none'
        getSVGElement(svgMap, `polar_circle`).style.stroke = '#4b97d1'
        getSVGElement(svgMap, `polar_circle`).style.strokeWidth = '5'
      })
      return svgMap
    })
}

const getSVGElement = (svg: SVGSVGElement, id: string): SVGElement => {
  return svg.querySelectorAll(`#${id}`)[0] as SVGElement
}
//#endregion