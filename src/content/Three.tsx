import React from 'react'
import { ThreeLayer } from './ThreeLayers'
import PageThumbnail from '../components/PageThumbnail'
import { Artwork } from '../core/Artwork'
import { date } from '../utils/helper'
import { PageDescription } from '../components/PageDescription'
import ArtworkView from '../views/ArtworkView'

export const three: Artwork = {
  id: 'Three',
  name: 'Three',
  description: 'Sample artwork to test my homepage.',
  year: 2000,
  size: { width: 800, height: 1100 },
  defaultIndex: 7,
  layer: [
    {
      id: 'layer1',
      name: 'Layer 1',
      inner: <ThreeLayer index={0} />
    },
    {
      id: 'layer2',
      name: 'Layer 2',
      inner: <ThreeLayer index={1} />
    },
    {
      id: 'layer3',
      name: 'Layer 3',
      inner: <ThreeLayer index={2} />
    },
    {
      id: 'layer4',
      name: 'Layer 4',
      inner: <ThreeLayer index={3} />
    },
    {
      id: 'layer5',
      name: 'Layer 5',
      inner: <ThreeLayer index={4} />
    },
    {
      id: 'layer6',
      name: 'Layer 6',
      inner: <ThreeLayer index={5} />
    },
    {
      id: 'layer7',
      name: 'Layer 7',
      inner: <ThreeLayer index={6} />
    }

  ]
}

export const threePage: PageDescription = {
  title: 'Three',
  id: 'Three',
  description: 'Sample artwork to test my homepage.',
  date: date(5, 5, 2024),
  tags: ['art'],
  thumbnail: <PageThumbnail src='https://stsvengrav.blob.core.windows.net/stsvengrav/triangle/panel.png' color='sky' />,
  element: <ArtworkView artwork={three} />
}

export default threePage
