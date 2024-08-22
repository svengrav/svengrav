import { ReactNode } from "react";
import { SpitalCategory } from "./Spital";

console.log(SpitalCategory.Camp)
export const spitalMapData = {
  id: "spital-map",
  initView: SpitalCategory.Camp,
}

export interface Position {
  x: number;
  y: number;
  r?: number;
  s?: number;
}

export interface MapElement {
  id: string;
  label?: string;
  inner?: ReactNode,
  position: Position;
  connections?: Position[];
}

export const mapViews: MapElement[] = [
  {
    id: SpitalCategory.Event,
    position: { x: 0, y: 0, s: 2.3 },
    label: SpitalCategory.Event,
  },
  {
    id: SpitalCategory.Camp,
    position: { x: -2100, y: -2150, s: 3.7 },
    label: "Lager",
  },
];

export const mapTitle: MapElement[] = [
  {
    id: SpitalCategory.Event,
    position: { x: 40, y: 380 },
    label: "Perspektiven - Haus Spital",
    inner: <>Perspektiven <br/> Haus Spital</>
  },
  {
    id: SpitalCategory.Camp,
    position: { x:600, y: 900 },
    label: "Kriegsgefangenenlager - Haus Spital",
    inner: <>Kriegsgefangenenlager <br/> Haus Spital</>
  },
];

export const getMapTitle = (id: SpitalCategory.Event | SpitalCategory.Camp) => mapTitle.find((t) => t.id === id)!;

export const campLabel: MapElement[] = [
  {
    id: "bwz",
    position: { x: 600, y: 760 },
    label: "BWZ Turm",
    connections: [{ x: 905, y: 680 }],
  },
  {
    id: "innenhof",
    position: { x: 600, y: 780 },
    label: "Innenhof",
    connections: [{ x: 835, y: 760 }],
  },
  {
    id: "wohlfahrtsbaracke",
    position: { x: 600, y: 800 },
    label: "Wohlfahrtsbaracke",
    connections: [{ x: 830, y: 733 }],
  },
  {
    id: "krank",
    position: { x: 600, y: 820 },
    label: "Krankenbaracke",
    connections: [{ x: 1070, y: 728 }],
  },
];

export const campSecond: MapElement[] = [
  {
    id: "arrest-1",
    label: "Arrest",
    position: { x: 300, y: 765, r: 0 },
    connections: [],
  },
  {
    id: "arrest-2",
    label: "Arrest",
    position: { x: 190, y: 765, r: 0 },
    connections: [],
  },
  {
    id: "abort-1",
    label: "Abort",
    position: { x: 110, y: 740, r: 0 },
  },
  {
    id: "abort-2",
    label: "Abort",
    position: { x: 690, y: 740, r: 0 },
  },
  {
    id: "abort-3",
    label: "Abort",
    position: { x: 687, y: 300, r: -90 },
  },
  {
    id: "waschen-1",
    label: "Waschgebäude",
    position: { x: 185, y: 535, r: -90 },
    connections: [],
  },
  {
    id: "waschen-2",
    label: "Waschgebäude",
    position: { x: 315, y: 535, r: -90 },
    connections: [],
  },
  {
    id: "waschen-2",
    label: "Waschgebäude",
    position: { x: 540, y: 535, r: -90 },
    connections: [],
  },
  {
    id: "waschen-4",
    label: "Waschgebäude",
    position: { x: 665, y: 535, r: -90 },
    connections: [],
  },
  {
    id: "handwerker",
    label: "Handwerker",
    position: { x: 540, y: 765, r: 0 },
  },
  {
    id: "pfoertner",
    label: "Pförtner",
    position: { x: 390, y: 800, r: 0 },
  },
  {
    id: "post",
    label: "Post",
    position: { x: 390, y: 620, r: -90 },
  },
  {
    id: "dolmetscher",
    label: "Dolmetscher",
    position: { x: 325, y: 640, r: -90 },
  },
  {
    id: "kapelle",
    label: "Kapelle",
    position: { x: 460, y: 580, r: -90 },
  },
  {
    id: "wache",
    label: "Wache",
    position: { x: 470, y: 640, r: -90 },
  },
  {
    id: "kueche-1",
    label: "Küche",
    position: { x: 250, y: 540, r: -90 },
    connections: [],
  },
  {
    id: "kueche-2",
    label: "Küche",
    position: { x: 600, y: 540, r: -90 },
    connections: [],
  },
  {
    id: "baracken-1",
    label: "Baracken I",
    position: { x: 222, y: 432, r: 0 },
  },
  {
    id: "baracken-2",
    label: "Baracken II",
    position: { x: 573, y: 432, r: 0 },
  },
  {
    id: "baracken-3",
    label: "Krankenbaracke",
    position: { x: 520, y: 210, r: 0 },
  },
  {
    id: "wohlfahrt",
    label: "Wohlfahrtsbaracke",
    position: { x: 225, y: 660, r: 0 },
  },
];

export const spitalLabel: MapElement[] = [
  {
    id: "spital",
    position: { x: 750, y: 220 },
    label: "Haus Spital",
  },
  {
    id: "ehrenfriedhof",
    position: { x: 60, y: 210, r: -36.8 },
    label: "Ehrenfriedhof",
  },
  {
    id: "kreuz",
    position: { x: 950, y: 65, r: 53 },
    label: "Eisernes Kreuz",
  },
];

export const spitalEventPoints: MapElement[] = [
  {
    id: "friedhof",
    position: { x: 215, y: 120 },
    label: "1",
  },
  {
    id: "arbeit",
    position: { x: 275, y: 210 },
    label: "2",
  },
  {
    id: "notlager",
    position: { x: 340, y: 170 },
    label: "3",
  },
  {
    id: "lagerSpital",
    position: { x: 435, y: 135 },
    label: "4",
  },
  {
    id: "lagerLeben",
    position: { x: 537, y: 129 },
    label: "5",
  },
  {
    id: "wachleute",
    position: { x: 755, y: 129 },
    label: "6",
  },
  {
    id: "bevoelkerung",
    position: { x: 910, y: 125 },
    label: "7",
  },
  {
    id: "kreuz",
    position: { x: 1000, y: 115 },
    label: "8",
  },
];
