

import { canvasTransformation } from "@components/canvas/canvasTransformation"
import { Size } from "@core/geometry"

describe('transformation', () => {
  it('initialize should calculate the correct canvas context', () => {

    const artworkProperties = { index: 1, noOfLayer: 3, size: { width: 100, height: 200 }}
    const canvasSize: Size = { width: 100, height: 100 }

    const result = canvasTransformation.initialize(artworkProperties, canvasSize)
    expect(result.size).toEqual(canvasSize)
    expect(result.transformation.overflow).toBe('fit')
    expect(result.transformation.size).toEqual({ width: 50, height: 100 })
    expect(result.transformation.position).toEqual({ x: 25, y: 0 })
    expect(result.transformation.scale.max).toBeCloseTo(2)
    expect(result.transformation.scale.min).toBeCloseTo(1)
    expect(result.transformation.scale.current).toBe(1)
    expect(result.transformation.layer.index).toBe(1)
    expect(result.transformation.layer.progress).toBe(0)
    expect(result.transformation.layer.layers.length).toBe(3)
  }),

  it('initialize should calculate the correct canvas layers', () => {
    const artworkProperties = { index: 1, noOfLayer: 1, size: { width: 100, height: 200 }}
    const canvasSize: Size = { width: 100, height: 100 }

    const result = canvasTransformation.initialize(artworkProperties, canvasSize)
    expect(result.transformation.layer.index).toBe(1)
    expect(result.transformation.layer.progress).toBe(100)
    expect(result.transformation.layer.layers.length).toBe(1)
  })


  it('initialize should calculate the correct canvas layers', () => {
    const artworkProperties = { index: 2, noOfLayer: 4, size: { width: 100, height: 200 }}
    const canvasSize: Size = { width: 100, height: 100 }

    const result = canvasTransformation.initialize(artworkProperties, canvasSize)
    expect(result.transformation.layer.index).toBe(2)
    expect(result.transformation.layer.progress).toBe(33)
    expect(result.transformation.layer.layers.length).toBe(4)
  })
})
