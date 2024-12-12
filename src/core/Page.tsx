import { ReactElement, ReactNode } from 'react'

export type PageTag = 'art' | 'map'

const tagColors = {
  art: 'bg-white hover:bg-indigo-800',
  map: 'bg-white hover:bg-rose-800'
}

export const getPageTagColor = (tag: PageTag) => tagColors[tag]

/**
 * Interface representing a page description.
 * 
 * @property {string} title - The title of the page.
 * @property {string} id - The unique identifier for the page.
 * @property {string} description - A brief description of the page content.
 * @property {Date} date - The date when the page was created or last updated.
 * @property {boolean} [hidden] - Optional flag indicating if the page is hidden.
 * @property {PageTag[]} [tags] - Optional array of tags associated with the page.
 * @property {ReactNode} thumbnail - The thumbnail image or component for the page.
 * @property {ReactElement} element - The main React element or component for the page.
 */
export interface PageDescription {
  title: string;
  id: string;
  description: string;
  date: Date;
  hidden?: boolean;
  tags?: PageTag[];
  thumbnail: ReactNode;
  element: ReactElement;
}