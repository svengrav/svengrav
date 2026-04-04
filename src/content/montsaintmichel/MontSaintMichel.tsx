import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '../../components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const montSaintMichel: Artwork = {
  id: 'montsaintmichel',
  name: 'Mont Saint-Michel',
  description: 'Illustration of Mont Saint-Michel, created with Procreate in 2025.',
  year: 2025,
  size: { width: 4950, height: 3600 },
  defaultIndex: 1,
  layer: [
    {
      id: 'outlines',
      name: 'Outlines',
      inner: (
        <ImageLoader src='/montsaintmichel/mont-saint-michel-outlines.jpg' />
      )
    },
    {
      id: 'full',
      name: 'Full',
      inner: (
        <ImageLoader src='/montsaintmichel/mont-saint-michel-full.jpg' />
      )
    },
  ],
}

export const montSaintMichelPage: PageDescription = {
  title: montSaintMichel.name,
  id: montSaintMichel.id,
  description: montSaintMichel.description,
  date: date(1, 1, 2025),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='/montsaintmichel/mont-saint-michel-thumb.png'
    />
  ),
  element: (
    <ArtworkView artwork={montSaintMichel} inner={
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
          {montSaintMichel.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-5' />
        <div className='text-center'>
          {montSaintMichel.description}
        </div>
      </PagePanel>
    } />
  )
}

export default montSaintMichelPage
