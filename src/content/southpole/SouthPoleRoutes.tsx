import { useEffect, useRef } from 'react'
import Scalable from '../../components/Scalable'
import { usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'
import { fetchSVG } from '../Spital/svgUtils'

function createPath(id: string, route: { start: [number, number], end: [number, number] }) {
  // Create a new 'path' element
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  // Create the 'd' attribute string for the path
  const d = `M${route.start[0]} ${route.start[1]} L${route.end[0]} ${route.end[1]}`

  // Set the 'd' attribute to define the shape of the path
  path.setAttribute('d', d)
  path.setAttribute('id', id)

  // Optional: Set other attributes like stroke and fill
  path.setAttribute('stroke', 'none')
  path.setAttribute('stroke-width', '3')
  path.setAttribute('fill', 'none')
  return path
}

export const getSouthPoleSVG = async (id: string) => {
  return await fetchSVG('https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-text.svg')
    .then((svgMap) => {
      getSVGElement(svgMap, 'text').style.fill = '#444'
      getSVGElement(svgMap, 'title').style.fill = '#444'
      getSVGElement(svgMap, 'grid').style.fill = 'none'
      getSVGElement(svgMap, 'grid').style.stroke = '#4b97d1'
      getSVGElement(svgMap, 'grid').style.strokeWidth = '4'

      return svgMap
    })
}

const getSVGElement = (svg: SVGSVGElement, id: string): SVGElement => {
  return svg.querySelectorAll(`#${id}`)[0] as SVGElement
}

export const MapSVG = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    getSouthPoleSVG('southpole-text').then((svg) => {
      ref.current?.appendChild(svg)
    })
  })
  return (<div ref={ref}></div>)
}

export const SouthPoleRoutes = ({ expedition }: { expedition: Expedition[] }) => {
  const pathOptions = {
    pathStyle: { stroke: '#FF3653', strokeWidth: 4 },
    tipStyle: {
      fill: '#FF3653'
    }
  }
  const exp: any[] = []
  const svg = useRef<SVGSVGElement>(null)
  expedition.map((expedition) => {
    exp.push(usePathAnimation('svg-routes', expedition.id, pathOptions))
  })

  useEffect(() => {
    expedition.map((expedition) => {
      const route = createPath(expedition.id, expedition.route)
      svg.current?.appendChild(route)
    })
    exp.forEach((expedition) => {
      expedition.startAnimation()
    })
  })

  return (
    <Scalable width={3400} height={2600}>
      <svg id='svg-routes' className='absolute' viewBox='0 0 3400 2600' ref={svg}></svg>
      <MapSVG />
      <div className='h-full w-full justify-center items-center flex ' id='test'>
        <div className='absolute text-black text-center  font-semibold' style={{ left: 152, top: 236, fontSize: 100 }}>
        </div>
      </div>
    </Scalable>
  )
}
export default SouthPoleRoutes
