import { Size } from "@core/geometry"
import canvasTransformation, { CanvasContext, sizeIsEqual, CanvasState, CanvasLayer, CanvasProviderState } from "./canvasTransformation"
import { Artwork } from "@components/artwork/Artwork"
import { createContext, useContext, useState } from "react"
import { CanvasWrapper } from "./CanvasWrapper"

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
  const [context, setState] = useState<CanvasProviderState>(canvasTransformation.initialize({ index: artwork.defaultIndex, noOfLayer: artwork.layer.length, size: artwork.size}, canvasSize))
  const CONTEXT_NOT_INITIALIZED = 'Canvas context is not initialized'

  const setContextState = (state: CanvasProviderState) => { 
    if(JSON.stringify(context, null, 1) == JSON.stringify(state,null, 1)) return;
    setState(state)
  }

  /**
   * Sets the size of the canvas context.
   *
   * @param {Size} size - The new size to set.
   * @throws {Error} If the context is not initialized.
   */
  const resize = (size: Size) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    if (sizeIsEqual(size, context.size)) {
      return
    }

    setContextState(canvasTransformation.resize(context, artwork.size, size))
  }

  const setView = ({ position, scale }: { position: { x: number, y: number }, scale: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    setContextState(canvasTransformation.setView(context, position, scale))
  }

  const setLayer = ({ progress, index }: { progress?: number, index?: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    if (progress === undefined && index === undefined) {
      throw new Error('Either progress or index must be provided')
    }

    if (progress !== undefined) {
      setContextState(canvasTransformation.setLayer(context, artwork.layer.length, { progress }))
    } else if (index !== undefined) {
      setContextState(canvasTransformation.setLayer(context, artwork.layer.length, { index }))
    }
  }

  const getContext = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    return {
      transformation: context.transformation,
      artwork: artwork,
      size: context.size
    }
  }

  const getTransformation = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    return context.transformation
  }

  const getLayer = (index: number): CanvasLayer => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }


    artwork.layer[index]
    return {
      ...context.transformation.layer.layers[index],
      ...artwork.layer[index]
    }
  }


  return {
    getTransformation,
    getContext,
    getLayer,
    setView,
    resize,
    setLayer
  }
}

const Canvas = createContext<CanvasContext | undefined>(undefined)

interface CanvasStateProvider {
  children: React.ReactNode
  artwork: Artwork
  size: Size
}

export const CanvasStateProvider = ({
  children,
  artwork,
  size
}: CanvasStateProvider) => {
  const context = useProviderContext(artwork, size)
  return (
    <Canvas.Provider value={context}>
      <CanvasWrapper>
      {children}
      </CanvasWrapper>
    </Canvas.Provider>
  )
}

export const useCanvasContext = () => {
  const context = useContext(Canvas)
  if (context == null) {
    throw new Error('useCanvasContext must be used within a CanvasProvider')
  }
  return context
}
