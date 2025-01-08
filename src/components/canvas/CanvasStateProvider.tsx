import { Size } from "@core/geometry";
import canvasTransformation, { CanvasContext, sizeIsEqual, CanvasLayer, CanvasProviderState } from "./canvasTransformation";
import { Artwork } from "@components/artwork/Artwork";
import { createContext, useContext, useState } from "react";
import { CanvasWrapper } from "./CanvasWrapper";
import { animateProgress } from "@core/progressAnimation";

/**
 * Custom hook to manage the canvas context state.
 *
 * @returns {CanvasContext} The canvas context API.
 *
 * @throws {Error} If the canvas context is not initialized.
 *
 * @example
 * const {
 *   getTransformation,
 *   getContext,
 *   setArtwork,
 *   setTransformation,
 *   setSize,
 *   setLayer
 * } = useCanvasContext();
 *
 * @function
 * @name useCanvasContext
 *
 * @typedef {Object} CanvasContext
 * @property {function(): Transformation} getTransformation - Gets the current transformation of the canvas.
 * @property {function(): CanvasState} getContext - Gets the current canvas context state.
 * @property {function(Size, Artwork): void} setArtwork - Sets the artwork and updates the canvas context.
 * @property {function({ position: { x: number, y: number }, scale: number }): void} setTransformation - Sets the transformation of the canvas.
 * @property {function(Size): void} setSize - Sets the size of the canvas.
 * @property {function({ progress?: number, index?: number }): void} setLayer - Sets the layer of the canvas.
 */
const useProviderContext = (artwork: Artwork, canvasSize: Size): CanvasContext => {
  const CONTEXT_NOT_INITIALIZED = "Canvas context is not initialized";

  const [context, setState] = useState<CanvasProviderState & {i: number}>(
    () => {
      return{ ...canvasTransformation.initialize(
        { index: artwork.defaultIndex, noOfLayer: artwork.layer.length, size: artwork.size },
        canvasSize
      ), i: 0 }
    }
  );

  const setContextState = (state: CanvasProviderState) => {
    setState(prevState => {
      const newIndex = prevState.i + 1;
      return {
        ...state,
        i: newIndex
      };
    });
  };

  /**
   * Sets the size of the canvas context.
   *
   * @param {Size} size - The new size to set.
   * @throws {Error} If the context is not initialized.
   */
  const resize = (size: Size) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    if (sizeIsEqual(size, context.size)) {
      return;
    }

    setContextState(canvasTransformation.resize(context, artwork.size, size));
  };

  /**
   * Sets the view of the canvas by updating the position and scale.
   */
  const setView = ({ position, scale }: { position: { x: number; y: number }; scale: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    setContextState(canvasTransformation.setView(context, position, scale));
  };

  /**
   * Sets the layer of the canvas by updating the progress or index.
   */
  const setLayer = ({ progress, index }: { progress?: number; index?: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    if (progress === undefined && index === undefined) {
      throw new Error("Either progress or index must be provided");
    }

    if (progress !== undefined) {
      setContextState(canvasTransformation.setLayer(context, artwork.layer.length, { progress }));
    } else if (index !== undefined) {
      const finalState = canvasTransformation.setLayer(context, artwork.layer.length, { index });
      const currentProgress = context.transformation.layer.progress;

      animateProgress({
        startValue: currentProgress,
        endValue: finalState.transformation.layer.progress!,
        duration: 500, // 1 Sekunde
        onUpdate: (value: number) => {
          setContextState(canvasTransformation.setLayer(context, artwork.layer.length, { progress: value }));
        },
        onComplete: () => {
          setContextState(finalState);
        },
      });
    }
  };

  /*
   * Sets the artwork of the canvas context.
   */
  const getContext = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    return {
      transformation: context.transformation,
      artwork: artwork,
      size: context.size,
    };
  };

  /*
   * Gets the transformation of the canvas context.
   */
  const getTransformation = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    return context.transformation;
  };

  /*
   * Gets the layer of the canvas context.
   */
  const getLayer = (index: number): CanvasLayer => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }

    return {
      ...context.transformation.layer.layers[index],
      ...artwork.layer[index],
    };
  };

  return {
    getTransformation,
    getContext,
    getLayer,
    setView,
    resize,
    setLayer,
  };
};

const Canvas = createContext<CanvasContext | undefined>(undefined);

interface CanvasStateProvider {
  children: React.ReactNode;
  artwork: Artwork;
  size: Size;
}

/**
 * Provides the canvas context to the children components.
 */
export const CanvasStateProvider = ({ children, artwork, size }: CanvasStateProvider) => {
  const context = useProviderContext(artwork, size);
  return (
    <Canvas.Provider value={context} key={artwork.id}>
      <CanvasWrapper>{children}</CanvasWrapper>
    </Canvas.Provider>
  );
};

/**
 * Custom hook to use the canvas context.
 */
export const useCanvasContext = () => {
  const context = useContext(Canvas);
  if (context == null) {
    throw new Error("useCanvasContext must be used within a CanvasProvider");
  }
  return context;
};
