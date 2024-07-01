import { TransformWrapper } from "react-zoom-pan-pinch";
import { ArtworkContext, useArtworkContext } from "../hooks/useArtworkContext";
import { createContext, useContext } from "react";
import { Artwork } from "../core/Artwork";

const CanvasContext = createContext<ArtworkContext | undefined>(undefined);

interface CanwasWrapperProps {
  children: any;
  artwork: Artwork;
  size: Size;
}

export const CanvasWrapper = ({
  children,
  artwork,
  size,
}: CanwasWrapperProps) => {
  const context = useArtworkContext(artwork, { canvasSize: size });
  const transformed = context.state.transformed;

  return (
    <CanvasContext.Provider value={context}>
      <TransformWrapper
        centerOnInit={true}
        maxScale={transformed.scale.maxScale}
        minScale={transformed.scale.minScale}
        initialScale={transformed.scale.current}
        initialPositionX={transformed.position.x}
        initialPositionY={transformed.position.y}
      >
        {children}
      </TransformWrapper>
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};
