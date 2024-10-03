import { useEffect, useRef } from 'react'
import Scalable from '../../components/Scalable'
import { usePathAnimation } from '../../hooks/usePathAnimation'
import { Expedition } from './SouthPoleData'

function createPath(id: string, route: {start: [number, number], end: [number, number] }) {
  // Create a new 'path' element
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  // Create the 'd' attribute string for the path
  const d = `M${route.start[0]} ${route.start[1]} L${route.end[0]} ${route.end[1]}`;
  
  // Set the 'd' attribute to define the shape of the path
  path.setAttribute('d', d);
  path.setAttribute('id', id);
  
  // Optional: Set other attributes like stroke and fill
  path.setAttribute('stroke', 'none');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('fill', 'none');
  return path;
}

export const SouthPoleRoutes = ({ expedition }: {expedition: Expedition[]}) => {
  const pathOptions = {
    pathStyle: { stroke: '#F54E51', strokeWidth: 3 },
    tipStyle: {
      fill: '#F54E51'
    }
  }
  const exp : any[] = [];
  const svg = useRef<SVGSVGElement>(null)
  expedition.map((expedition) => {
    exp.push(usePathAnimation('svg-routes', expedition.id, pathOptions));
  })

  useEffect(() => {
    expedition.map((expedition) => {
      const route = createPath(expedition.id, expedition.route);
      svg.current?.appendChild(route);
    })
    exp.forEach((expedition) => { 
      expedition.startAnimation()
    })
  })

  return (
    <Scalable width={3400} height={2600}>
      <div className='h-full w-full justify-center items-center flex bg-sky-900/50'>
        <svg id='svg-routes' viewBox='0 0 3400 2600' ref={svg}></svg>
      </div>
    </Scalable>
  )
}
export default SouthPoleRoutes
