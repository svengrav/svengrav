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
  description: 'Illustration of Mont Saint-Michel, created with Procreate in 2025. I visited Mont Saint-Michel in 2024 and was inspired by its unique architecture and stunning location. This artwork captures the beauty and grandeur of the iconic island commune, showcasing its medieval structures and picturesque surroundings.',
  year: 2025,
  size: { width: 3960, height: 2880 },
  defaultIndex: 2,
  tags: ['digital art', 'procreate', 'history'],
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
  date: date(4, 4, 2026),
  tags: ['art'],
  thumbnail: (
    <PageThumbnail
      src='/montsaintmichel/mont-saint-michel-thumb.jpg'
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
        className="bg-gray-950/95 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 gap-2" }}
      >       
        <div className='text-center text-sm bg-gray-900 self-center rounded-full px-2 py-0.5'>{montSaintMichel.year}</div>
        <h1 className='text-white text-2xl text-center gap-12'>
          {montSaintMichel.name}
        </h1>        
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6' />
        <div className='leading-relaxed'>
          {montSaintMichel.description}
        </div>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-6'/>
        <div className='flex gap-2 justify-center'>
          {montSaintMichel.tags?.map((tag) => (
            <span
              key={tag} 
              className="inline-block bg-gray-300  text-gray-800 rounded-full px-3 py-1 text-xs text-nowrap cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </PagePanel>
    } />
  )
}

export default montSaintMichelPage
