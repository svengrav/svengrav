import { calcLayerStateByIndex, calcLayerStateByValue, calcLayerStateByBoundary, sizeIsEqual, calcArtworkSize, calcArtworkRatio, calcCanvasPosition } from '../core/artworkCalculation'

// #region artwork size calculation
test('artwork matches canvas', () => {
  expect(calcArtworkSize({ width: 100, height: 100 }, { width: 100, height: 100 })).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 1,
      minScale: 1
    },
    size: {
      width: 100,
      height: 100
    }
  })
})

test('artwork gets shrinked by x2', () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 100 }, 'contain')).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1
    },
    size: {
      width: 100,
      height: 100
    }
  })
})

test('artwork is smaller then canvas', () => {
  expect(calcArtworkSize({ width: 100, height: 100 }, { width: 200, height: 200 })).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 1,
      minScale: 1
    },
    size: {
      width: 100,
      height: 100
    }
  })
})

test('artwork width exeeds the the canvas', () => {
  expect(calcArtworkSize({ width: 200, height: 100 }, { width: 100, height: 100 }, 'contain')).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1
    },
    size: {
      width: 100,
      height: 50
    }
  })
})

test('artwork height exeeds the the canvas', () => {
  expect(calcArtworkSize({ width: 100, height: 200 }, { width: 200, height: 100 }, 'contain')).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1
    },
    size: {
      width: 50,
      height: 100
    }
  })
})

test('artwork width and height exeeds the the canvas', () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 100 }, 'contain')).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1
    },
    size: {
      width: 100,
      height: 100
    }
  })
})

test('size objects withe the different size are not equal', () => {
  expect(sizeIsEqual({ width: 100, height: 100 }, { width: 50, height: 50 })).toBeFalsy()
})

test('size objects withe the same size are equal', () => {
  expect(sizeIsEqual({ width: 100, height: 100 }, { width: 100, height: 100 })).toBeTruthy()
})

test('artwork smaller than canvas, shrink is 1', () => {
  expect(calcArtworkRatio({ width: 50, height: 50 }, { width: 100, height: 100 })).toMatchObject({
    widthRatio: 1,
    heightRatio: 1
  })
})

test('artwork larger than canvas, shrink is 0.5', () => {
  expect(calcArtworkRatio({ width: 200, height: 200 }, { width: 100, height: 100 })).toMatchObject({
    widthRatio: 0.5,
    heightRatio: 0.5
  })
})

test('artwork width exeeds but fits the the canvas', () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 200 }, 'fit')).toMatchObject({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 0.5
    },
    size: {
      width: 200,
      height: 200
    }
  })
})

test('artwork width and height exeeds but fits the canvas', () => {
  expect(calcArtworkSize({ width: 200, height: 400 }, { width: 100, height: 200 }, 'fit')).toMatchObject({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1
    },
    size: {
      width: 100,
      height: 200
    }
  })
})

test('artwork position is center', () => {
  expect(calcCanvasPosition({ width: 200, height: 200 }, { width: 100, height: 200 }, 'center')).toMatchObject({
    x: -50,
    y: 0
  })
})

test('artwork position is top-left', () => {
  expect(calcCanvasPosition({ width: 200, height: 200 }, { width: 100, height: 200 }, 'top-left')).toMatchObject({
    x: 0,
    y: 0
  })
})

test('artwork position is not changed because canvas equals artwork', () => {
  expect(calcCanvasPosition({ width: 100, height: 100 }, { width: 100, height: 100 }, 'center')).toMatchObject({
    x: 0,
    y: 0
  })
})
// #endregion

// #region calc layer states
test('calc layer state by index 1 for 0 gaps', () => {
  expect(calcLayerStateByIndex(1, 1)).toStrictEqual({
    layerPercentage: 100,
    layerIndex: 1,
    gapLength: 0,
    gapSize: 0,
    gapStart: 0,
    gapEnd: 0,
    gapPercentage: 0
  })
})

test('calc layer state by 2 layer for 1 gap', () => {
  expect(calcLayerStateByIndex(1, 2)).toStrictEqual({
    layerPercentage: 0,
    layerIndex: 1,
    gapLength: 1,
    gapSize: 100,
    gapStart: 0,
    gapEnd: 0,
    gapPercentage: 0
  })
})

test('calc layer state by index 5 for 5 layers', () => {
  expect(calcLayerStateByIndex(5, 5)).toStrictEqual({
    layerPercentage: 100,
    layerIndex: 5,
    gapLength: 4,
    gapSize: 25,
    gapStart: 75,
    gapEnd: 100,
    gapPercentage: 100
  })
})

test('calc layer state by index 6 for 8 layers', () => {
  expect(calcLayerStateByIndex(6, 9)).toStrictEqual({
    layerPercentage: 62.5,
    layerIndex: 6,
    gapLength: 8,
    gapSize: 12.5,
    gapStart: 50,
    gapEnd: 62.5,
    gapPercentage: 100
  })
})

test('calc layer state by value 100 for 5 layers', () => {
  expect(calcLayerStateByValue(100, 5)).toStrictEqual({
    layerPercentage: 100,
    layerIndex: 5,
    gapLength: 4,
    gapSize: 25,
    gapStart: 75,
    gapEnd: 100,
    gapPercentage: 100
  })
})

test('calc layer state by value 50 for 5 layers', () => {
  expect(calcLayerStateByValue(50, 5)).toStrictEqual({
    layerPercentage: 50,
    layerIndex: 3,
    gapLength: 4,
    gapSize: 25,
    gapStart: 25,
    gapEnd: 50,
    gapPercentage: 100
  })
})

test('calc layer state by value 0 for 5 parts', () => {
  expect(calcLayerStateByValue(0, 5)).toStrictEqual({
    layerPercentage: 0,
    layerIndex: 1,
    gapLength: 4,
    gapSize: 25,
    gapStart: 0,
    gapEnd: 0,
    gapPercentage: 0
  })
})

test('calc layer state by value 25 for 5 parts', () => {
  expect(calcLayerStateByValue(25, 5)).toStrictEqual({
    layerPercentage: 25,
    layerIndex: 2,
    gapLength: 4,
    gapSize: 25,
    gapStart: 0,
    gapEnd: 25,
    gapPercentage: 100
  })
})
// #endregion

// #region calc layer state by boundary
test('calc layer state by boundary pos 0 and min 0', () => {
  expect(calcLayerStateByBoundary(0, 5, -1, 0, 0)).toMatchObject({
    layerPercentage: 0
  })
})

test('exceeding the maximum leads to one percent more', () => {
  expect(calcLayerStateByBoundary(0, 5, 200, 0, 100)).toMatchObject({
    layerPercentage: 1
  })
})

test('not exceeding the maximum and minimum leads to no change', () => {
  expect(calcLayerStateByBoundary(50, 5, 50, 0, 100)).toMatchObject({
    layerPercentage: 50
  })
})

test('negative percentage leads to error.', () => {
  expect(() => calcLayerStateByBoundary(-50, 5, 50, 0, 100)).toThrow()
})
// #endregion
