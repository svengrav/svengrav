import { calcPathPartSize, slicePath, slicePathByPart } from "../core/pathAnimation";


const genRoutePoints = (start: number, length: number) => Array.from({ length: length }, (_, i) => i ).map(i => ({
  x: i + start,
  y: i + start,
  i: i + start
}))

const getPathPart = (id: number, start: number, end: number) => ({
  id: `path-p-${id}`,
  start: start,
  end: end,
})

const routeGap = (start: number, end: number) => ({
  id: 0,
  start: start,
  end: end
})

test('path is sliced in one part', () => {
  const path = genRoutePoints(1, 100);
  const parts = [
    getPathPart(1, 1, 100),
  ]
  expect(slicePath('path', path, [])).toStrictEqual(parts);
});

test('path is sliced in two parts', () => {
  const path = genRoutePoints(1, 100);
  const gap = routeGap(50, 60)
  const parts = [
    getPathPart(1, 1, 50),
    getPathPart(2, 60, 100),
  ]
  expect(slicePath('path', path, [gap])).toStrictEqual(parts);
});

test('path is sliced in three parts', () => {
  const path = genRoutePoints(1, 150);
  const gap = [routeGap(50, 60), routeGap(100, 110)]
  const parts = [
    getPathPart(1, 1, 50),
    getPathPart(2, 60, 100),
    getPathPart(3, 110, 150)
  ]
  expect(slicePath('path',path, gap)).toStrictEqual(parts);
});


test('path is sliced in three parts by slice', () => {
  const path = genRoutePoints(1, 150);
  const parts = [
    getPathPart(1, 1, 50),
    getPathPart(2, 60, 100),
    getPathPart(3, 110, 150),
  ]
  expect(slicePathByPart('path', path, { parts: 3, size: 10})).toStrictEqual(parts);
});


test('calc path 2 parts with pos 1', () => {
  const points = genRoutePoints(1, 4);
  const parts = [
    getPathPart(1, 1, 2),
    getPathPart(1, 3, 4),
  ]
  const newParts = [
    { ...getPathPart(1, 1, 2), position: 1, tip: undefined},
    { ...getPathPart(1, 3, 4), position: 3, tip: undefined},
  ]
  expect(calcPathPartSize({parts: parts, points, offset: 1.0 }, 1)).toMatchObject(newParts);
})

test('calc path 2 parts with pos 2', () => {
  const points = genRoutePoints(1, 4);
  const parts = [
    getPathPart(1, 1, 2),
    getPathPart(1, 3, 4),
  ]
  const newParts = [
    { ...getPathPart(1, 1, 2), attributes: [["d", "M 1 1 2 2"]], position: 2, tip: { attributes: [["transform", "translate(2, 2) rotate(-135 0 0)"]] }},
    { ...getPathPart(1, 3, 4), attributes: [["d", "M 3 3"]], position: 3, tip: undefined},
  ]
  expect(calcPathPartSize({parts: parts, points, offset: 1.0 }, 3)).toMatchObject(newParts);

  // throw if out of range
  expect(() => calcPathPartSize({parts: parts, points, offset: 1.0 }, 5)).toThrow();
  expect(() => calcPathPartSize({parts: parts, points, offset: 1.0 }, 0)).toThrow();

})
