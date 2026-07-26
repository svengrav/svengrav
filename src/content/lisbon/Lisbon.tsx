import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const lisbon: Artwork = {
  id: 'lisbon',
  name: 'Lissabon 2026',
  description: ['Illustration of Lisbon, created with Procreate in 2026.'],
  year: 2026,
  size: { width: 3400, height: 2490 },
  defaultIndex: 0,
  tags: ['artwork', 'procreate'],
  layer: [
    {
      id: 'full',
      name: 'Full',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/lissabon/lissabon-2026.jpg' />
      )
    },
  ],
}

export const lisbonPage: PageDescription = {
  title: lisbon.name,
  id: lisbon.id,
  description: lisbon.description,
  date: date(1, 1, 2026),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/lissabon/lissabon-2026-thumb.jpg'
    />
  ),
  element: (
    <ArtworkView artwork={lisbon} inner={
      <PagePanel
        position="left"
        width={400}
        closable
        visible
        label=""
        className="bg-gray-950/95 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 gap-2" }}
      >
        <div className='text-center text-sm bg-gray-900 self-center rounded-full px-2 py-0.5'>{lisbon.year}</div>
        <h1 className='text-white text-2xl text-center gap-12'>
          {lisbon.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='leading-relaxed flex flex-col gap-3'>
          {Array.isArray(lisbon.description)
            ? lisbon.description.map((p, i) => <p key={i}>{p}</p>)
            : lisbon.description}
        </div>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='flex gap-2 justify-center'>
          {lisbon.tags?.map((tag) => (
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

export default lisbonPage
