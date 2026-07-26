import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const stockholm: Artwork = {
  id: 'stockholm',
  name: 'Stockholm 2026',
  description: ['Illustration of Stockholm, created with Procreate in 2026.'],
  year: 2026,
  size: { width: 3300, height: 2400 },
  defaultIndex: 2,
  tags: ['artwork', 'procreate'],
  layer: [
        {
      id: 'linework',
      name: 'Linework',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/stockholm/stockholm-linework-2026.jpg' />
      )
    },
    {
      id: 'full',
      name: 'Full',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/stockholm/stockholm-2026.jpg' />
      )
    }
  ],
}

export const stockholmPage: PageDescription = {
  title: stockholm.name,
  id: stockholm.id,
  description: stockholm.description,
  date: date(1, 7, 2026),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/stockholm/stockholm-thumb-2026.jpg'
    />
  ),
  element: (
    <ArtworkView artwork={stockholm} inner={
      <PagePanel
        position="left"
        width={400}
        closable
        label=""
        className="bg-gray-950/95 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 gap-2" }}
      >
        <div className='text-center text-sm bg-gray-900 self-center rounded-full px-2 py-0.5'>{stockholm.year}</div>
        <h1 className='text-white text-2xl text-center gap-12'>
          {stockholm.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='leading-relaxed flex flex-col gap-3'>
          {Array.isArray(stockholm.description)
            ? stockholm.description.map((p, i) => <p key={i}>{p}</p>)
            : stockholm.description}
        </div>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='flex gap-2 justify-center'>
          {stockholm.tags?.map((tag) => (
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

export default stockholmPage
