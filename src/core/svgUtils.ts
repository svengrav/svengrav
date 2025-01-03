import { CSSProperties } from "react";

export interface OnHoverEvent {
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

/**
 * Attaches mouseenter/mouseleave listeners to an SVG, making it "hoverable".
 * If either callback is omitted, it's simply not called on that event.
 */
export function addOnHover(svg: SVGElement, hoverEvent: OnHoverEvent): void {
  const { onEnter, onLeave } = hoverEvent;

  if(typeof svg === 'string') { 
    svg = document.getElementById(`#${svg}`) as unknown as SVGElement;
    console.log(svg);
  }

  svg.addEventListener("mouseenter", (event: MouseEvent) => {
    if (onEnter) onEnter(event);
  });

  svg.addEventListener("mouseleave", (event: MouseEvent) => {
    if (onLeave) onLeave(event);
  });
}

/**
 * Retrieves the first SVG child element matching a given id.
 */
export function getElement(svg: SVGSVGElement, id: string): SVGElement | null {
  return svg.querySelector(`#${id}`) as SVGElement;
}

function getElements(svg: SVGElement, partialId: string): SVGElement[] {
  // querySelectorAll mit Attribut-Selektor [id*="..."]
  const nodeList = svg.querySelectorAll(`[id*="${partialId}"]`);
  // Umwandlung in ein echtes Array vom Typ SVGElement[]
  return Array.from(nodeList) as SVGElement[];
}


function addSVG(id: string, svg: SVGSVGElement): void { 
  document.getElementById(id)?.appendChild(svg);

}


/**
 * Loads an SVG from a given URI, optionally sets an id and style properties,
 * and returns the parsed SVG element.
 */
export async function fetchSVG(
  uri: string,
  id?: string,
  style?: CSSProperties
): Promise<SVGSVGElement> {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`Failed to load SVG from ${uri}: ${response.statusText}`);
  }

  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement as unknown as SVGSVGElement;

  // Remove empty text nodes (e.g. whitespace) from the newly parsed SVG
  removeEmptyTextNodes(svg);

  // Set optional id
  if (id) {
    svg.id = id;
  }

  // Apply optional React CSSProperties
  if (style) {
    Object.assign(svg.style, style);
  }

  return svg;
}

const applyStyle = (svg: SVGElement, style: CSSProperties) => {
  Object.assign(svg.style, style);

}

const tryApplyStyle = (svg?: SVGElement, style?: CSSProperties) => {
  if(svg && style)
    Object.assign(svg.style, style);
}



/**
 * Recursively removes empty text nodes (whitespace) from an SVG/HTML element.
 */
export function removeEmptyTextNodes(element: Node): void {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    if (
      child.nodeType === Node.TEXT_NODE &&
      !/\S/.test(child.nodeValue ?? "")
    ) {
      element.removeChild(child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      removeEmptyTextNodes(child);
    }
  }
}

const svgUtils = {
  applyStyle,
  tryApplyStyle,
  addOnHover,
  getElement,
  getElements,
  addSVG,
  loadSVG: fetchSVG,
  removeEmptyTextNodes,
}
export default svgUtils;


class SvgBox {
  svg: SVGElement;

  constructor(id: string, svgbase: SVGAElement) {
    this.svg =  svgbase.querySelector(`#${id}`) as SVGElement;
  }

  applyStyle(style: CSSProperties) : SvgBox {
    Object.assign({...this.svg.style, style})

    return this;
  }

}