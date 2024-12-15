import { Artwork } from '../components/artwork/Artwork'
import Page from '@components/page/Page'
import { CanvasNavigator } from '@components/canvas/CanvasNavigator'
import { Canvas } from '@components/canvas/Canvas'
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
  const { windowSize: window } = useWindowResize()
  return (
    <Page>
      {inner}
      <CanvasStateProvider artwork={artwork} size={{ height: window.height - 150, width: window.width }}>
        { navigator && <CanvasNavigator />}
        <Canvas className='m-auto' />
        <CanvasZoomControl />
        <CanvasLayerControl />
      </CanvasStateProvider>
    </Page>
  )
};
