import { ReactNode } from 'react'
import { Position, Size } from '@core/geometry'


/**
 * Represents an artwork with various properties such as id, name, description, year, size, default index, layers, and optional points.
 * 
 * @property {string} id - Unique identifier for the artwork.
 * @property {string} name - Name of the artwork.
 * @property {string} description - Description of the artwork.
 * @property {number} year - Year the artwork was created.
 * @property {Size} size - Size dimensions of the artwork.
 * @property {number} defaultIndex - Default index for the artwork.
 * @property {ArtworkLayer[]} layer - Layers associated with the artwork.
 * @property {ArtworkPoint[]} [points] - Optional points associated with the artwork.
 */
export interface Artwork {
  id: string;
  name: string;
  description: string;
  year: number;
  size: Size;
  defaultIndex: number;
  resources?: ArtworkResource[];
  layer: ArtworkLayer[];
  points?: ArtworkPoint[];
}

/**
 * Represents a layer in an artwork.
 * 
 * @property {string} id - The unique identifier for the layer.
 * @property {string} name - The name of the layer.
 * @property {string} [description] - An optional description of the layer.
 * @property {Size} [size] - An optional size of the layer.
 * @property {ReactNode} inner - The inner content of the layer.
 */
export interface ArtworkLayer {
  id: string;
  name: string;
  description?: string | undefined;
  size?: Size;
  inner: ReactNode;
}


/**
 * Represents a point in an artwork.
 *
 * @property {string} name - The name of the artwork point.
 * @property {Position} position - The position of the artwork point.
 * @property {string} [description] - An optional description of the artwork point.
 * @property {ReactNode} inner - The inner content of the artwork point.
 * @property {number[]} [layers] - An optional array of layer numbers associated with the artwork point.
 */
export interface ArtworkPoint {
  name: string
  position: Position
  description?: string | undefined
  inner: ReactNode
  layers?: number[]
}


export interface ArtworkResource {
  id: string;
  src: string;
}

export const getArtworkResourceById = (artwork: Artwork, id: string) => {
  return artwork.resources?.find(resource => resource.id === id)
}