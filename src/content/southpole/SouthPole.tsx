import { Artwork } from '../../core/Artwork'
import { date } from '../../utils/helper'
import PageThumbnail from '@components/page/PageThumbnail'
import { PageDescription } from '@components/page/PageDescription'
import { ImageLoader } from '@components/base/ImageLoader'
import SouthPoleMap from './SouthPoleRoutes'
import { Expedition, expeditions } from './SouthPoleData'
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
  setVisibility?: (id: string, visible: boolean) => void;

  /**
   * Handles the click event on a map element.
   * 
   * @param id - The unique identifier of the map element.
   */
  onClick?: (id: string) => void;
}

const controller: SouthPoleMapController = {}

const baseMap = <SouthPoleMap expedition={expeditions} controller={controller} />

const SouthPoleQuote = () => {
  return <>
    <div className="text-slate-700 tracking-widestleading-loose text-3xl flex justify-center items-center absolute w-full h-full bg-white/70">
      <div>
        <p className='max-w-96 font-serif leading-relaxed'>
          “The eternal silence of the great white desert. Cloudy columns of snow drift advancing from the south, pale yellow wraiths, heralding the coming storm, blotting out one by one the sharp-cut lines of the land.”
        </p>
        <p className='text-lg mt-8 text-slate-500'>
          Robert Falcon Scott, <br/> Scott's Last Expedition: The Journals
        </p>
      </div>

    </div>
    <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-base.jpg' />
  </>
}


/**
 * Represents the South Pole map configuration.
 */
export const southPole: SouthpoleMap = {
  id: 'southpole',
  name: 'South Pole',
  description:
    'The seven most important voyages of discovery to the South Pole.',
  year: 2024,
  size: { width: 3400, height: 2600 },
  defaultIndex: 2,
  expeditions: expeditions,
  controller: controller,
  layer: [
    {
      id: 'map',
      name: 'South Pole',
      description: 'The seven most important voyages of discovery to the South Pole.',
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-base.jpg' />
    },
    {
      id: 'base',
      name: 'Watercolor Basemap',
      description: 'The watercolor-style basemap of Antarctica.',
      inner: baseMap
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
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-thumbnail.jpg' />,
  element: <SouthPoleView map={southPole} />
}

export default southPolePage