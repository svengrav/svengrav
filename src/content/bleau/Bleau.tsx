import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '@components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const bleau: Artwork = {
  id: 'bleau',
  name: 'Bleau',
  description: 'This illustration is based on two world maps created by cartographer Willem Blaeu and his son Joan in the years 1630 and 1665. The artwork shows the rapid expansion of geographical knowledge during that era.',
  year: 2021,
  size: { width: 3600, height: 2400 },
  defaultIndex: 3,
  layer: [
        {
      id: 'willem',
      name: 'Willem',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/bleau/2026-bleau-willem.jpg' />
      )
    },
    {
      id: 'joan',
      name: 'Joan',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/bleau/2026-bleau-joan.jpg' />
      )
    },

        {
      id: 'full',
      name: 'Full',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/bleau/2026-bleau-full.jpg' />
      )
    },
  ],
}

export const bleauPage: PageDescription = {
  title: bleau.name,
  id: bleau.id,
  description: bleau.description,
  date: date(4, 9, 2026),
  tags: ['art','map'],
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/bleau/2026-bleau-thumbnail.jpg'
    />
  ),
  element: (
    <ArtworkView artwork={bleau} inner={
      <PagePanel
        position="left"
        width={400}
        closable
        visible
        label=""
        className="bg-gray-950 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900" }}
      >
        <h1 className='text-white text-2xl text-center py-4'>
          {bleau.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-5' />
        <div className='text-center'>
          {bleau.description}
        </div>
      </PagePanel>
    } />
  )
}

export default bleauPage
