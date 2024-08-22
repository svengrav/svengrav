import spitalTheme from "./SpitalTheme"
import { fetchSVG } from "./svgUtils"

const EVENT_PATH_ID = 'event-path'
const FOREST_ID = 'forest'
const BUILDINGS_ID = 'buildings'
const CROSS_ID = 'cross'
const CEMETERY_ID = 'cemetery'
const STREETS_ID = 'streets'

export const getSpitalMapSVG = async (id: string) => {
  return await fetchSVG('https://stsvengrav.blob.core.windows.net/stsvengrav/spital/spital-map.svg')
    .then((svgMap) => {
      const mapColors = spitalTheme.colors.spital.map;

      svgMap.style.fill = 'none'
      svgMap.style.stroke = 'none'
      svgMap.id = id

      const forest = getSVGElement(svgMap, FOREST_ID)
      const buildings = getSVGElement(svgMap, BUILDINGS_ID)
      const cross = getSVGElement(svgMap, CROSS_ID)
      const cemetery = getSVGElement(svgMap, CEMETERY_ID)
      const streets = getSVGElement(svgMap, STREETS_ID)
      const eventPath = getSVGElement(svgMap, EVENT_PATH_ID)
      
      forest.style.fill = mapColors.forest;
      forest.style.stroke = mapColors.forestBorder;
      forest.style.strokeWidth = '1';
      
      buildings.style.fill = mapColors.building;
      cross.style.fill = mapColors.cross;
      cemetery.style.fill = mapColors.cemetery;
      streets.style.stroke = mapColors.streets;
      streets.style.strokeWidth = '1.5';

      eventPath.style.stroke = mapColors.eventPath;
      eventPath.style.strokeWidth = '4';
      svgMap.style.transformOrigin = 'top left'

      return svgMap
    })
}

const getSVGElement = (svg: SVGSVGElement, id: string): SVGElement => {
  return svg.querySelectorAll(`#${id}`)[0] as SVGElement
}

