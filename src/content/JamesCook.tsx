import { ImageLoader } from '../components/ImageLoader'
import PageThumbnail from '../components/PageThumbnail'
import { Artwork } from '../core/Artwork'
import { PageDescription } from '../core/Page'
import { date } from '../utils/helper'
import ArtworkView from '../views/ArtworkView'

export const jamesCook: Artwork = {
  id: 'jamescook',
  name: 'James Cooks Pacific Voyages: Exploration and Discovery',
  description: 'James Cooks three voyages (1768-1771, 1772-1775, 1776-1779) explored the Pacific Ocean extensively.',
  year: 2022,
  size: { width: 2400, height: 3400 },
  defaultIndex: 1,
  layer: [
    {
      id: 'layer1',
      name: 'Artwork',
      description: 'James Cooks three voyages (1768-1771, 1772-1775, 1776-1779) explored the Pacific Ocean extensively.',
      inner: <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/jamescook.jpg' />
    }
  ]
}

export const jamesCookPage: PageDescription = {
  title: jamesCook.name,
  id: 'jamescook',
  description: jamesCook.description,
  date: date(1, 1, 2024),
  tags: ['art', 'map'],
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/panel.jpg' color='rose' />,
  element: <ArtworkView artwork={jamesCook} />
}

export default jamesCookPage
