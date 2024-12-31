import { Artwork } from '../components/artwork/Artwork'
import Page from '@components/page/Page'
import { Canvas } from '@components/canvas/Canvas'
import { ReactNode } from 'react'

interface ArtworkViewProps {
  artwork: Artwork
  inner?: ReactNode
  navigator?: boolean
}

export default function ArtworkView ({ artwork, inner, navigator = true }: ArtworkViewProps) {
  return (
    <Page>
      {inner}
      <Canvas artwork={artwork}/>
    </Page>
  )
};
