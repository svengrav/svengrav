

import { canvasTransformation } from "@components/canvas/canvasTransformation"
import { Artwork } from "@components/artwork/Artwork"
import { Size } from "@core/geometry"

describe('transformation', () => {
  it('initialize should calculate the correct canvas context', () => {
    const layer = {
      id: '',
      name: '',
      inner: undefined
    }
    const artwork: Artwork = {
      size: { width: 100, height: 200 },
      layer: [layer, layer, layer],
      id: '',
      name: '',
      description: '',
      year: 0,
      defaultIndex: 0
    }
    const canvasSize: Size = { width: 100, height: 100 }

    const result = canvasTransformation.initialize(artwork, canvasSize)


    expect(result.artwork).toEqual(artwork)
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
  })
})