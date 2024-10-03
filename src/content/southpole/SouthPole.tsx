import { Artwork } from '../../core/Artwork'
import { date } from '../../utils/helper'
import ArtworkView from '../../views/ArtworkView'
import PageThumbnail from '../../components/PageThumbnail'
import { PageDescription } from '../../core/Page'
import { ImageLoader } from '../../components/ImageLoader'
import SouthPoleRoutes from './SouthPoleRoutes'
import { expeditions } from './SouthPoleData'

export const southPole: Artwork = {
  id: 'southpole',
  name: 'South Pole',
  description:
    'The seven most important voyages of discovery to the South Pole.',
  year: 2024,
  size: { width: 3400, height: 2600 },
  defaultIndex: 2,
  layer: [

    {
      id: 'map',
      name: 'South Pole',
      description: 'The seven most important voyages of discovery to the South Pole.',
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole.jpg' />
    },
    {
      id: 'map',
      name: 'South Pole',
      description: 'The seven most important voyages of discovery to the South Pole.',
      inner: <SouthPoleRoutes expedition={expeditions} />
    },
  ],
  points: []
}

export const southPolePage: PageDescription = {
  title: 'South Pole',
  id: 'southpole',
  description: 'The seven most important voyages of discovery to the South Pole.',
  tags: ['map'],
  date: date(5, 5, 2024),
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-thumbnail.png' />,
  element: (
    <ArtworkView
      artwork={southPole}
      inner={
        <div className='hidden lg:flex'>
          <div className='absolute text-white text-4xl left-32 top-20 leading-14'>
            The discovery of <br /> the South Pole
          </div>
          <div className='absolute text-white left-52 bottom-28 leading-14 w-24'>
            {southPole.description}
          </div>
        </div>
      }
    />
  )
}

export default southPolePage
