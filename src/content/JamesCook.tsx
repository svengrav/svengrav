import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../views/ArtworkView'

export const jamesCook: Artwork = {
  id: 'jamescook',
  name: 'Explorations by James Cook',
  description: 'An artwork illustrating Captain James Cooks three voyages, highlighting his routes, discoveries, and encounters in the Pacific.',
  year: 2000,
  size: { width: 2400, height: 3400 },
  defaultIndex: 1,
  layer: [
    {
      id: 'base',
      name: 'Base Map',
      description: 'An artwork illustrating Captain James Cooks three voyages, highlighting his routes, discoveries, and encounters in the Pacific.',
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/jamescook.jpg' />
    }
  ],
  points: [

  ]
}

export const jamesCookPage: PageDescription = {
  title: jamesCook.name,
  id: jamesCook.id,
  description: jamesCook.description,
  date: date(5, 5, 2024),
  tags: ['art', 'map'],
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/panel.jpg' color='rose' />,
  element: <ArtworkView artwork={jamesCook} key={jamesCook.id} />
}

export default jamesCookPage
