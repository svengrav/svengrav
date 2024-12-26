import { Artwork } from '../components/artwork/Artwork'
import Page from '@components/page/Page'
import { CanvasNavigator } from '@components/canvas/CanvasNavigator'
import { Canvas, CanvasView } from '@components/canvas/Canvas'
import { CanvasStateProvider } from '@components/canvas/CanvasStateProvider'
import { CanvasZoomControl } from '@components/canvas/CanvasZoomControl'
import { CanvasLayerControl } from '@components/canvas/CanvasLayerControl'
import { useWindowResize } from '../hooks/useWindowResize'
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
