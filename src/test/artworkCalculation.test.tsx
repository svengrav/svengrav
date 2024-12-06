import {
  sizeIsEqual,
  calcArtworkSize,
  calcArtworkRatio,
  calcCanvasPosition,
} from "../core/artworkCalculation";
import { calculateAllLayerStates, calculateLayerStateByIndex } from "../core/artworkLayerCalculation";

describe("calculate full layer state", () => {
  test("layer index for 2 layers is 2", () => {
    expect(calculateLayerStateByIndex(2, 2)).toEqual({
      active: 2,
      progress: 100,
      layers: [
        { index: 1, transition: { start: 0, end: 0, progress: 1 } },
        { index: 2, transition: { start: 0, end: 100, progress: 1 } },
      ],
    });
  });

  test("layer index for 2 layers is 1", () => {
    expect(calculateLayerStateByIndex(2, 1)).toEqual({
      active: 1,
      progress: 0,
      layers: [
        { index: 1, transition: { start: 0, end: 0, progress: 1 } },
        { index: 2, transition: { start: 0, end: 100, progress: 0 } },
      ],
    });
  });

  test("layer full progress for 3 layers is 50", () => {
    expect(calculateAllLayerStates(3, 50)).toEqual({
      active: 2,
      progress: 50,
      layers: [
        { index: 1, transition: { start: 0, end: 0, progress: 1 } },
        { index: 2, transition: { start: 0, end: 50, progress: 1 } },
        { index: 3, transition: { start: 50, end: 100, progress: 0 } },
      ],
    });
  });

  test("layer index for 3 layers is 2", () => {
    expect(calculateLayerStateByIndex(3, 2)).toEqual({
      active: 2,
      progress: 50,
      layers: [
        { index: 1, transition: { start: 0, end: 0, progress: 1 } },
        { index: 2, transition: { start: 0, end: 50, progress: 1 } },
        { index: 3, transition: { start: 50, end: 100, progress: 0 } },
      ],
    });
  });

  test("layer index for 3 layers is 3", () => {
    expect(calculateLayerStateByIndex(3, 3)).toEqual({
      active: 3,
      progress: 100,
      layers: [
        { index: 1, transition: { start: 0, end: 0, progress: 1 } },
        { index: 2, transition: { start: 0, end: 50, progress: 1 } },
        { index: 3, transition: { start: 50, end: 100, progress: 1 } },
      ],
    });
  });
});

// #region artwork size calculation
test("artwork matches canvas", () => {
  expect(calcArtworkSize({ width: 100, height: 100 }, { width: 100, height: 100 })).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 1,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 100,
    },
  });
});

test("artwork gets shrinked by x2", () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 100 }, "contain")).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 100,
    },
  });
});

test("artwork is smaller then canvas", () => {
  expect(calcArtworkSize({ width: 100, height: 100 }, { width: 200, height: 200 })).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 1,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 100,
    },
  });
});

test("artwork width exeeds the the canvas", () => {
  expect(calcArtworkSize({ width: 200, height: 100 }, { width: 100, height: 100 }, "contain")).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 50,
    },
  });
});

test("artwork height exeeds the the canvas", () => {
  expect(calcArtworkSize({ width: 100, height: 200 }, { width: 200, height: 100 }, "contain")).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1,
    },
    size: {
      width: 50,
      height: 100,
    },
  });
});

test("artwork width and height exeeds the the canvas", () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 100 }, "contain")).toStrictEqual({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 100,
    },
  });
});

test("size objects withe the different size are not equal", () => {
  expect(sizeIsEqual({ width: 100, height: 100 }, { width: 50, height: 50 })).toBeFalsy();
});

test("size objects withe the same size are equal", () => {
  expect(sizeIsEqual({ width: 100, height: 100 }, { width: 100, height: 100 })).toBeTruthy();
});

test("artwork smaller than canvas, shrink is 1", () => {
  expect(calcArtworkRatio({ width: 50, height: 50 }, { width: 100, height: 100 })).toMatchObject({
    widthRatio: 1,
    heightRatio: 1,
  });
});

test("artwork larger than canvas, shrink is 0.5", () => {
  expect(calcArtworkRatio({ width: 200, height: 200 }, { width: 100, height: 100 })).toMatchObject({
    widthRatio: 0.5,
    heightRatio: 0.5,
  });
});

test("artwork width exeeds but fits the the canvas", () => {
  expect(calcArtworkSize({ width: 200, height: 200 }, { width: 100, height: 200 }, "fit")).toMatchObject({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 0.5,
    },
    size: {
      width: 200,
      height: 200,
    },
  });
});

test("artwork width and height exeeds but fits the canvas", () => {
  expect(calcArtworkSize({ width: 200, height: 400 }, { width: 100, height: 200 }, "fit")).toMatchObject({
    scale: {
      current: 1,
      maxScale: 2,
      minScale: 1,
    },
    size: {
      width: 100,
      height: 200,
    },
  });
});

test("artwork position is center", () => {
  expect(calcCanvasPosition({ width: 200, height: 200 }, { width: 100, height: 200 }, "center")).toMatchObject({
    x: -50,
    y: 0,
  });
});

test("artwork position is top-left", () => {
  expect(calcCanvasPosition({ width: 200, height: 200 }, { width: 100, height: 200 }, "top-left")).toMatchObject({
    x: 0,
    y: 0,
  });
});

test("artwork position is not changed because canvas equals artwork", () => {
  expect(calcCanvasPosition({ width: 100, height: 100 }, { width: 100, height: 100 }, "center")).toMatchObject({
    x: 0,
    y: 0,
  });
});
// #endregion

