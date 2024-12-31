import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../views/ArtworkView'
import ColumbusRoutes from './ColumbusRoutes'

export const columbus: Artwork = {
  id: 'columbus',
  name: 'Voyages of Columbus',
  description: 'Columbus voyages in the 15th century were groundbreaking for the European discovery of the Americas.',
  year: 2000,
  size: { width: 2861, height: 3865 },
  defaultIndex: 1,
  layer: [
    {
      id: 'layer1',
      name: 'Columbus Artwork',
      description: "An artwork I created for Columbus' voyages.",
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/columbus/columbus.jpg' />
    },
    {
      id: 'layer2',
      name: 'Voyages',
      description: 'Highlighting the four voyages from 1492 to 1504.',
      inner: <ColumbusRoutes />
    }
  ]
}

export const columbusPage: PageDescription = {
  title: columbus.name,
  id: columbus.id,
  description: columbus.description,
  tags: ['art', 'map'],
  date: date(5, 5, 2024),
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/columbus/columbus-panel.png' color='rose' />,
  element: <ArtworkView
    key={columbus.id}
    artwork={columbus} inner={
      <div className='absolute hidden lg:flex flex-col text-white font-light left-10 top-10 font-serif w-40 '>
        <h1 className='text-2xl border-b pb-4 mb-4 leading-loose'>
          {columbus.name}
        </h1>
        <p className='text-gray-300'>
          {columbus.description}
        </p>
      </div>
  }/>
}

export default columbusPage
