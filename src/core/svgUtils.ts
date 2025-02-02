import { CSSProperties } from "react";

export interface OnHoverEvent {
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

/**
 * Attaches mouseenter/mouseleave listeners to an SVG, making it "hoverable".
 * If either callback is omitted, it's simply not called on that event.
 */
const addOnHover = (svg: SVGElement, hoverEvent: OnHoverEvent) => {
  const { onEnter, onLeave } = hoverEvent;

  if(typeof svg === 'string') { 
    svg = document.getElementById(`#${svg}`) as unknown as SVGElement;
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
export const getElement = (svg: SVGSVGElement, id: string): SVGElement | null => {
  return svg.querySelector(`#${id}`) as SVGElement;
}

/**
 * Retrieves an array of SVG elements whose IDs contain the specified partial ID.
 *
 * @param svg - The SVG element to search within.
 * @param partialId - The partial ID to match against the IDs of the SVG elements.
 * @returns An array of SVG elements that have IDs containing the partial ID.
 */
export const getElements = (svg: SVGElement, partialId: string): SVGElement[] => {
  const nodeList = svg.querySelectorAll(`[id*="${partialId}"]`);
  return Array.from(nodeList) as SVGElement[];
}

/**
 * Appends an SVG element to a specified HTML element by its ID.
 *
 * @param id - The ID of the HTML element to which the SVG will be appended.
 * @param svg - The SVG element to append.
 */
export const addSVG = (id: string, svg: SVGSVGElement): void => { 
  document.getElementById(id)?.appendChild(svg);
}

/**
 * Loads an SVG from a given URI, optionally sets an id and style properties,
 * and returns the parsed SVG element.
 */
 const fetchSVG = async (
  uri: string,
  id?: string,
  style?: CSSProperties
): Promise<SVGSVGElement> => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error(`Failed to load SVG from ${uri}: ${response.statusText}`);
  }

  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement as unknown as SVGSVGElement;

  removeEmptyTextNodes(svg);

  if (id) {
    svg.id = id;
  }

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
const removeEmptyTextNodes = (element: Node) => {
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

/**
 * Removes all styles from an SVG element, including <style> elements, inline styles,
 * and class or ID attributes.
 *
 * @param svgElement - The SVG element from which to remove all styles.
 */
const removeAllStylesFromSvg = (svgElement: SVGElement) => {
  // Entferne <style>-Elemente
  const styleElements = svgElement.querySelectorAll('style');
  styleElements.forEach(style => style.remove());

  // Entferne alle inline-Stile
  const elementsWithStyle = svgElement.querySelectorAll('[style]');
  elementsWithStyle.forEach(el => el.removeAttribute('style'));

  // Entferne Klassen und IDs, falls notwendig
  const elementsWithClassOrId = svgElement.querySelectorAll('[class]');
  elementsWithClassOrId.forEach(el => {
    el.removeAttribute('class');
  });

  svgElement.style.fill = 'none';
  svgElement.style.stroke = 'none';
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

export class SVGController {
  base: SVGSVGElement;
  elements: SVGElement[] = [];

  static create(base: SVGSVGElement, ids: string[] = []) { 
    return new SVGController(base, ids);
  }
  
  static async createFromUrl(url: string, baseId: string, ids: string[] = []): Promise<SVGController> {
    return new SVGController(await fetchSVG(url, baseId), ids);
  }

  private constructor(base: SVGSVGElement, ids: string[]) {
    removeAllStylesFromSvg(base);
    this.base = base;
    ids = Array.from(new Set(ids));
    ids.forEach(id => { 
      const element = base.querySelector(`#${id}`) as SVGElement;
      if(element) { 
        this.elements.push(element);
      } else {
        throw new Error(`SVG Controller (constructor): Element with id ${id} not found.`)
      }
    });
  }
  
  elementExists(id: string): boolean {
    return this.elements.some(element => element.id === id) !== undefined;
  }

  getElementOrNull(id: string): SVGElement | null {
    return this.elements.find(element => element.id === id) || null;
  }

  getElement(id: string): SVGElement {
    const element = this.elements.find(element => element.id === id);
    if(!element) { 
      throw new Error(`SVG Controller (getElement): Element with id ${id} not found.`)
    }

    return element;
  }

  removeStyle(id: string) : SVGController { 
    if(this.elementExists(id)) {  
      removeAllStylesFromSvg(this.getElement(id));
    }
    return this;
  }

  applyStyle(id: string, style: CSSProperties): SVGController {
    const element = this.getElementOrNull(id);
    if (element) {  
      Object.assign(element.style, style);
    } else {
      console.warn(`SVG Controller (applyStyle): Element with id ${id} not found.`);
    }
    return this;
  }

  addOnHover(id: string, hoverEvent: OnHoverEvent): void {
    const { onEnter, onLeave } = hoverEvent;
  
    const element = this.getElementOrNull(id);
    if (element) {  
      element.addEventListener("mouseenter", (event: MouseEvent) => {
        if (onEnter) onEnter(event);
      });
    
      element.addEventListener("mouseleave", (event: MouseEvent) => {
        if (onLeave) onLeave(event);
      });
    } else {
      console.warn(`SVG Controller (addOnHover): Element with id ${id} not found.`);
    }
  }

  fade(id: string, visible: boolean): void {
    if(visible) {
      this.applyStyle(id, { transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out', opacity: 1, visibility: 'visible', display: 'block' });
    } else {
      this.applyStyle(id, { transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out', opacity: 0, visibility: 'hidden' });
      setTimeout(() => {
        this.applyStyle(id, { display: 'none' });
      },500);
    }
  }
}