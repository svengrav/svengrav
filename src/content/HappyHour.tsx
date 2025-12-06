import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const happyHour: Artwork = {
  id: 'happyhour',
  name: 'Happy Hour',
  description: 'Illustration from the year 2025.',
  year: 2025,
  size: { width: 2100, height: 3000 },
  defaultIndex: 2,
  layer: [
    {
      id: 'outlines',
      name: 'Outlines',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/happyhour/happy-hour-outlines.jpg' />
      )
    },
    {
      id: 'complete',
      name: 'Complete',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/happyhour/happy-hour-complete.jpg' />
      )
    },
  ],
}

export const happyHourPage: PageDescription = {
  title: 'Happy Hour',
  id: 'happyhour',
  description: happyHour.description,
  date: date(6, 12, 2024),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/happyhour/happy-hour-complete.jpg'
    />
  ),
  element: <ArtworkView artwork={happyHour} inner={
     <PagePanel
          position="left"
          width={400}
          closable
          visible
          label=""
          className="bg-gray-950 text-gray-200"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          <h1 className='text-white text-2xl text-center py-4 cursor-pointer'>
            {happyHour.name}
          </h1>
          <div className='h-0.5 bg-gray-500 w-10 m-auto my-5' />
          <div className='text-center'>
            {happyHour.description}
          </div>
        </PagePanel>
  } />
}

export default happyHourPage
