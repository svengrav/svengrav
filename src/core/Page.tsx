import { ReactElement } from "react";

export type Tag = "art" | "map"

const tagColors = {
    art: 'bg-indigo-600 hover:bg-indigo-800',
    map: 'bg-rose-700 hover:bg-rose-800',
}

export function getTagColor(tag: Tag) : string {
  return tagColors[tag];
}

export interface PageDescription {
  title: string, 
  id: string,
  description: string, 
  date: Date,
  hidden?: boolean
  tags?: Tag[],
  thumbnail: any,
  element: ReactElement
}