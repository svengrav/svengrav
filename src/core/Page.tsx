import { ReactElement, ReactNode } from 'react'

export type PageTag = 'art' | 'map'

const tagColors = {
  art: 'bg-white hover:bg-indigo-800',
  map: 'bg-white hover:bg-rose-800'
}

export const getPageTagColor = (tag: PageTag) => tagColors[tag]

export interface PageDescription {
  title: string
  id: string
  description: string
  date: Date
  hidden?: boolean
  tags?: PageTag[]
  thumbnail: ReactNode
  element: ReactElement
}
