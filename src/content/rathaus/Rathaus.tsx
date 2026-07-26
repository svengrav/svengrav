import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const rathaus: Artwork = {
  id: 'rathaus',
  name: 'Münster Rathaus',
  description: 'Illustration des Rathaus von Münster',
  year: 2026,
  size: { width: 1800, height: 2475 },
  defaultIndex: 2,
  tags: ['digital art', 'illustration'],
  layer: [
    {
      id: 'rathaus-lines',
      name: 'Lines',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/rathaus/rathaus-linees-sm.jpg' />
      )
    },
    {
      id: 'rathaus-colors',
      name: 'Colors',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/rathaus/rathaus-colors-sm.jpg' />
      )
    },
  ],
}

export const rathausPage: PageDescription = {
  title: rathaus.name,
  id: rathaus.id,
  description: rathaus.description,
  date: date(21, 6, 2026),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/rathaus/rathaus-colors-sm.jpg'
    />
  ),
  element: (
    <ArtworkView artwork={rathaus} inner={
      <PagePanel
        position="left"
        width={400}
        closable
        visible
        label=""
        className="bg-gray-950/95 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 gap-2" }}
      >
        <div className='text-center text-sm bg-gray-900 self-center rounded-full px-2 py-0.5'>{rathaus.year}</div>
        <h1 className='text-white text-2xl text-center gap-12'>
          {rathaus.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='leading-relaxed flex flex-col gap-3'>
          {Array.isArray(rathaus.description)
            ? rathaus.description.map((p, i) => <p key={i}>{p}</p>)
            : rathaus.description}
        </div>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='flex gap-2 justify-center'>
          {rathaus.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-300 text-gray-800 rounded-full px-3 py-1 text-xs text-nowrap cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </PagePanel>
    } />
  )
}

export default rathausPage
