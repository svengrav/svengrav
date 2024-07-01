import { Position, Size } from "./BaseType";

export interface Artwork {
  id: string;
  name: string;
  description: string;
  year: number;
  size: Size;
  defaultIndex: number;
  layer: ArtworkLayer[];
  points?: ArtworkPoint[];
}

export interface ArtworkLayer {
  id: string;
  name: string;
  description?: string | undefined;
  size?: Size
  inner: any;
}

export interface ArtworkPoint {
  name: string;
  position: Position,
  description?: string | undefined;
  inner: any;
  layers?: number[];
}
