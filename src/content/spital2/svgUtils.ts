import { CSSProperties } from "react"

export const fetchSVG = async (uri: string, id?: string, style?: CSSProperties) => {
  return await fetch(uri)
  .then(async (res) => await res.text())
  .then((svgText) => {
    const parser = new DOMParser()
    const svgMap = parser.parseFromString(svgText, 'image/svg+xml').documentElement as unknown as SVGSVGElement
    removeTextNodes(svgMap)
    
    if(id) {
      svgMap.id = id
    }
    if(style) {
      Object.assign(svgMap.style, style)
    }
    return svgMap;
  })
}

function removeTextNodes(element: HTMLElement | ChildNode): void {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
      const child = element.childNodes[i];
      if (child.nodeType === Node.TEXT_NODE && !/\S/.test(child.nodeValue ?? '')) {
          element.removeChild(child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
          removeTextNodes(child);
      }
  }
}