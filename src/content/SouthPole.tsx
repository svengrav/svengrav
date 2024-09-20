import { Artwork } from '../core/Artwork'
import { date } from '../utils/helper'
import ArtworkView from '../views/ArtworkView'
import PageThumbnail from '../components/PageThumbnail'
import { PageDescription } from '../core/Page'
import SouthPoleRoutes from './SouthPoleRoutes'

export const southPole: Artwork = {
  id: 'southpole',
  name: 'South Pole',
  description:
    'The seven most important voyages of discovery to the South Pole.',
  year: 2000,
  size: { width: 1100, height: 950 },
  defaultIndex: 1,
  layer: [
    {
      id: 'map',
      name: 'South Pole',
      description: 'The seven most important voyages of discovery to the South Pole.',
      inner: <SouthPoleRoutes />
    }
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
