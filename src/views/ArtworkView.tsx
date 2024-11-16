import { Artwork } from '../core/Artwork'
import Page from '../components/Page'
import { Navigator } from '../components/Navigator'
import { Canvas } from '../components/Canvas'
import { CanvasWrapper } from '../components/CanvasWrapper'
import { CanvasZoomControl } from '../components/CanvasZoomControl'
import { CanvasLayerControl } from '../components/CanvasLayerControl'
import { useWindowResize } from '../hooks/useWindowResize'
import { ReactNode } from 'react'

interface ArtworkViewProps {
  artwork: Artwork
  inner?: ReactNode
  navigator?: boolean
}

export default function ArtworkView ({ artwork, inner, navigator = true }: ArtworkViewProps) {
  const [window] = useWindowResize()
  return (
    <Page>
      {inner}

      <CanvasWrapper artwork={artwork} size={{ height: window.height - 150, width: window.width }}>
        { navigator && <Navigator className='md:w-96 md:absolute right-0 z-20 ' />}
        <Canvas className='m-auto' />
        <CanvasZoomControl />
        <CanvasLayerControl />
      </CanvasWrapper>
    </Page>
  )
};
