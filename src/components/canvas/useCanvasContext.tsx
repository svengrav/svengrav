import { Size } from "@core/geometry"
import canvasTransformation, { CanvasContext, sizeIsEqual, CanvasState } from "./canvasTransformation"
import { Artwork } from "@components/artwork/Artwork"
import { useState } from "react"


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
export const useCanvasContext = (): CanvasContext => {
  const [context, setContextState] = useState<CanvasState | null>(null)
  const CONTEXT_NOT_INITIALIZED = 'Canvas context is not initialized'

  const initialize = (canvasSize: Size, artwork: Artwork) => {
    setContextState(canvasTransformation.initialize(artwork, canvasSize))
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

    setContextState(canvasTransformation.resize(context, size))
  }

  const setView = ({ position, scale }: { position: { x: number, y: number }, scale: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    setContextState(canvasTransformation.setView(context, position, scale))
  }

  const setLayer = ({ progress, index }: { progress?: number, index?: number }) => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED);
    }
  
    if (progress === undefined && index === undefined) {
      throw new Error('Either progress or index must be provided');
    }
  
    if (progress !== undefined) {
      setContextState(canvasTransformation.setLayer(context, { progress }));
    } else if (index !== undefined) {
      setContextState(canvasTransformation.setLayer(context, { index }));
    }
  };

  const getContext = () => {
    if (context == null) {
      throw new Error()
    }

    return context
  }

  const getTransformation = () => {
    if (context == null) {
      throw new Error(CONTEXT_NOT_INITIALIZED)
    }

    return context.transformation
  }

  return {
    getTransformation,
    getContext,
    initialize,
    setView,
    resize,
    setLayer
  }
}


