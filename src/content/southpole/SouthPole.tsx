import { Artwork } from '../../core/Artwork'
import { date } from '../../utils/helper'
import PageThumbnail from '../../components/PageThumbnail'
import { PageDescription } from '../../core/Page'
import { ImageLoader } from '../../components/ImageLoader'
import SouthPoleMap from './SouthPoleRoutes'
import { Expedition, expeditions } from './SouthPoleData'
import SouthPoleView from './SouthPoleView'

export type SouthpoleMap = Artwork & {
  expeditions: Expedition[];
  controller?: SouthPoleMapController;
}

export interface SouthPoleMapController {
  setVisibility?: (id: string, visible: boolean) => void 
  onClick?: (id: string) => void 
}

const controller : SouthPoleMapController = { 

}

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
      inner: <SouthPoleMap expedition={expeditions} controller={controller} />
    },
  ],
  points: []
}

export const southPolePage: PageDescription = {
  title: 'South Pole',
  id: 'southpole',
  description: 'The seven most important voyages of discovery to the South Pole.',
  tags: ['map'],
  date: date(12, 10, 2024),
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-thumbnail.png' />,
  element: (
    <SouthPoleView map={southPole} />
  )
}

export default southPolePage
