import { MapIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { ImageLoader } from '../components/ImageLoader'
import PageThumbnail from '../components/PageThumbnail'
import { Sidepanel2 } from '../components/Sidepanel2'
import { Artwork } from '../core/Artwork'
import { PageDescription } from '../core/Page'
import { date } from '../utils/helper'
import ArtworkView from '../views/ArtworkView'
import Icon from '../components/Icon'

const cafeMapPosition = 'https://maps.app.goo.gl/HSzLgr2AYfKJWa6u9'

export const cafe: Artwork = {
    id: 'cafe',
    name: 'Cafe Balthazar',
    description: 'I illustrated this beautiful little Cafe Balthazar located near Rue Arcisse de Caumont in Caen in July 2024. ',
    year: 2024,
    size: { width: 2000, height: 2700 },
    defaultIndex: 2,
    layer: [
        {
            id: 'outlines',
            name: 'Outlines',
            description: 'Layer with outlines.',
            inner: (
                <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/cafe/cafe_2.jpg' />
            )
        },
        {
            id: 'cafe-print',
            name: 'The Cafe Balthazar',
            description: 'Painting of the Cafe Balthazar.',
            inner: (
                <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/cafe/cafe_1.jpg' />
            )
        },
        {
            id: 'cafe',
            name: 'The Cafe Balthazar',
            description: 'Painting of the Cafe Balthazar.',
            inner: (
                <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/cafe/cafe_print_3.jpg' />
            )
        },
    ],
    points: []
}

export const cafePage: PageDescription = {
    title: 'Cafe',
    id: 'cafe',
    description: cafe.description,
    date: date(5, 5, 2024),
    tags: ['art'],
    hidden: false,
    thumbnail: (
        <PageThumbnail
            src='https://stsvengrav.blob.core.windows.net/stsvengrav/cafe/cafe_print_4.jpg'
            color='rose'
        />
    ),
    element: (
        <ArtworkView
        navigator={false}
            inner={
                <Sidepanel2
                    position="left"
                    
                    visible
                    width={400}
                    closable
                    label=""
                    className="bg-gray-950 text-gray-200"
                    scrollbar={{
                        className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
                    }}
                >
                    <h1 className='text-white text-2xl text-center py-4 cursor-pointer'>
                        Cafe Balthazar
                    </h1>
                    <div className='h-0.5 bg-gray-500 w-10 m-auto my-5' />
                    <p className='text-center'>
                        <Icon primary={MapPinIcon}  label='Google Maps' className='text-sm text-white' onClick={() => window.open(cafeMapPosition, "_blank")}  />

                    </p>
                    <p className='mt-4 px-4'>
                    I illustrated this beautiful little Cafe Balthazar located near Rue Arcisse de Caumont in Caen in July 2024. 
                    </p>
                    
                </Sidepanel2>
            }
            artwork={cafe}
        />
    )
}

export default cafePage
