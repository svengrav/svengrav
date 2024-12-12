import { ReactElement, ReactNode } from 'react'

export type PageTag = 'art' | 'map'

const tagColors = {
  art: 'bg-white hover:bg-indigo-800',
  map: 'bg-white hover:bg-rose-800'
}

export const getPageTagColor = (tag: PageTag) => tagColors[tag]

/**
 * Represents the description of a page.
 */
export interface PageDescription {
  /**
   * The title of the page.
   */
  title: string;

  /**
   * The unique identifier for the page.
   */
  id: string;

  /**
   * A brief description of the page content.
   */
  description: string;

  /**
   * The date when the page was created or last updated.
   */
  date: Date;

  /**
   * Indicates whether the page is hidden.
   * @default false
   */
  hidden?: boolean;

  /**
   * An array of tags associated with the page.
   */
  tags?: PageTag[];

  /**
   * The thumbnail image or component for the page.
   */
  thumbnail: ReactNode;

  /**
   * The main React element representing the page content.
   */
  element: ReactElement;
}