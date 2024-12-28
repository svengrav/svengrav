import { Artwork } from '@components/artwork/Artwork'
import { date } from '@core/date'
import PageThumbnail from '@components/page/PageThumbnail'
import { PageDescription } from '@components/page/PageDescription'
import { ImageLoader } from '@components/base/ImageLoader'
import SouthPoleMap from './SouthPoleMap'
import { Expedition, expeditions, resources, SouthPoleQuote } from './SouthPoleData'
import SouthPoleView from './SouthPoleView'

/**
 * Represents a map of the South Pole, extending the Artwork type.
 * 
 * @typedef {Object} SouthpoleMap
 * @extends {Artwork}
 * 
 * @property {Expedition[]} expeditions - A list of expeditions related to the South Pole.
 * @property {SouthPoleMapController} [controller] - An optional controller for the South Pole map.
 */
export type SouthpoleMap = Artwork & {
  expeditions: Expedition[]
  controller?: SouthPoleMapController
}

/**
 * Interface representing a controller for the South Pole map.
 */
export interface SouthPoleMapController {
  /**
   * Sets the visibility of a map element.
   * 
   * @param id - The unique identifier of the map element.
   * @param visible - A boolean indicating whether the element should be visible.
   */
  setVisibility: (id: string, visible: boolean) => void;

  /**
   * Handles the click event on a map element.
   * 
   * @param id - The unique identifier of the map element.
   */
  onClick: (id: string) => void;

  /**
   * Starts an animation for a map element.
   * 
   * @param id - The unique identifier of the map element.
   */
  startAnimation: (id: string) => void;
}

const controller: SouthPoleMapController = {
  setVisibility: () => { console.warn('SouthPoleMapController: setVisibility method is not implemented.') },
  onClick: () => { console.warn('SouthPoleMapController: onClick method is not implemented.')  },
  startAnimation: () => { console.warn('SouthPoleMapController: startAnimation method is not implemented.')  }
}

/**
 * Represents the South Pole map configuration.
 */
export const southPole: SouthpoleMap = {
  id: 'southpole',
  name: 'The Race to the South Pole',
  description:
    'The seven most important voyages of discovery to the South Pole.',
  year: 2024,
  size: { width: 3400, height: 2600 },
  defaultIndex: 2,
  expeditions: expeditions,
  controller: controller,
  resources: resources,
  layer: [
    {
      id: 'map',
      name: 'South Pole',
      description: 'The seven most important voyages of discovery to the South Pole.',
      inner: <ImageLoader src={resources.base.src} />
    },
    {
      id: 'base',
      name: 'Watercolor Basemap',
      description: 'The watercolor-style basemap of Antarctica.',
      inner: <SouthPoleMap expedition={expeditions} controller={controller} />
    },
    {
      id: 'quote',
      inner: <SouthPoleQuote />,
      name: 'Robert Falcon Scott',
      description: 'Robert Falcon Scotts journals, Scotts Last Expedition, document his harrowing journey to the South Pole, filled with vivid descriptions of the relentless Antarctic landscape and extreme conditions that he and his team faced.',
    }
  ],
  points: []
}

/**
 * Represents the page description for the South Pole page.
 */
export const southPolePage: PageDescription = {
  title: 'The Race to the South Pole',
  id: 'southpole',
  description: 'The seven most important voyages of discovery to the South Pole.',
  tags: ['map'],
  date: date(12, 10, 2024),
  thumbnail: <PageThumbnail src={resources.thumbnail.src} />,
  element: <SouthPoleView map={southPole} />
}

export default southPolePage