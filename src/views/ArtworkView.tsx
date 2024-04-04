import { Artwork } from "../core/Artwork";
import Page from "../components/Page";
import { Navigator } from "../components/Navigator";
import { Canvas } from "../components/Canvas";
import { useArtworkContext } from "../hooks/useArtworkContext";

interface ArtworkViewProps {
  artwork: Artwork,
  inner?: any
}

export default function ArtworkView({ artwork, inner }: ArtworkViewProps) {
  const { setCanvasLayer, setCanvasScale, setCanvasSize, state } = useArtworkContext(artwork);
  return (
    <Page>
        {inner}
        <Navigator state={state} className={"md:w-96 md:absolute right-0 z-20 "} />
        <Canvas
          maxSize={{ height: window.screen.height - 48, width: window.innerWidth }}
          className="m-auto"
          artworkState={state}
          onSizeChange={setCanvasSize}
          onScaleChange={setCanvasScale}
          onLayerChange={setCanvasLayer}
          layerControl
          zoomControl
        />
    </Page>
  );
};
