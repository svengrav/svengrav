import { Artwork } from '../../core/Artwork'
import { date } from '../../utils/helper'
import PageThumbnail from '../../components/PageThumbnail'
import { PageDescription } from '../../core/Page'
import { ImageLoader } from '../../components/ImageLoader'
import SouthPoleMap from './SouthPoleRoutes'
import { Expedition, expeditions } from './SouthPoleData'
import SouthPoleView from './SouthPoleView'

export type SouthpoleMap = Artwork & {
  expeditions: Expedition[]
  controller?: SouthPoleMapController
}

export interface SouthPoleMapController {
  setVisibility?: (id: string, visible: boolean) => void
  onClick?: (id: string) => void
}

const controller: SouthPoleMapController = {

}

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

export const southPole: SouthpoleMap = {
  id: 'southpole',
  name: 'South Pole',
  description:
    'The seven most important voyages of discovery to the South Pole.',
  year: 2024,
  size: { width: 3400, height: 2600 },
  defaultIndex: 3,
  expeditions: expeditions,
  controller: controller,
  layer: [
    {
      id: 'quote',
      inner: <SouthPoleQuote />,
      name: 'Robert Falcon Scott',
      description: 'Robert Falcon Scotts journals, Scotts Last Expedition, document his harrowing journey to the South Pole, filled with vivid descriptions of the relentless Antarctic landscape and extreme conditions that he and his team faced.',
    },
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
      inner: <SouthPoleMap expedition={expeditions} controller={controller} />
    },
  ],
  points: []
}

export const southPolePage: PageDescription = {
  title: 'The Race to the South Pole',
  id: 'southpole',
  description: 'The seven most important voyages of discovery to the South Pole.',
  tags: ['map'],
  date: date(12, 10, 2024),
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-thumbnail.jpg' />,
  element: (
    <SouthPoleView map={southPole} />
  )
}

export default southPolePage

