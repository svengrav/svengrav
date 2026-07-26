import { CSSProperties, useEffect, useRef } from "react";
import classNames from "classnames";
import { campSecond } from "./SpitalMapData";
import { fetchSVG } from "./svgUtils";
import spitalTheme from "./SpitalTheme";
import { MapLabel } from "@components/map/MapComponents";

// spital elements
const SPITAL_MAP_CAMP_ID = "spital-camp-map";
const WIRE_1 = "wire-1";
const WIRE_2 = "wire-2";
const WIRE_3 = "wire-3";
const KUECHE_1 = "kueche-1";
const KUECHE_2 = "kueche-2";
const WASCHEN_1 = "waschen-1";
const WASCHEN_2 = "waschen-2";
const WASCHEN_3 = "waschen-3";
const WASCHEN_4 = "waschen-4";
const WOHLFAHRT = "wohlfahrt";
const ARREST = "arrest";
const HANDWERKER = "handwerker";
const KAPELLE = "kapelle";
const DOLMETSCHER = "dolmetscher";
const WACHE = "wache";
const POST = "post";
const PFOERTNER = "pfoertner";
const BARACKE_1 = "baracke-1";
const BARACKE_2 = "baracke-2";
const BARACKE_3 = "baracke-3";
const BUILDINGS_1 = "buildings-1";
const BUILDINGS_2 = "buildings-2";

export const SpitalMapCamp = ({ className, style }: { className: string; style: CSSProperties }) => {
  const campContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSVG('https://stsvengrav.blob.core.windows.net/stsvengrav/spital/spital-map-camp.svg', SPITAL_MAP_CAMP_ID).then((svgMap) => {
      campContainer.current?.querySelectorAll(`#${SPITAL_MAP_CAMP_ID}`).forEach((element) => campContainer.current?.removeChild(element));
      const colors = spitalTheme.colors.spital.map.camp;

      Object.assign(svgMap.style, {
        stroke: colors.base,
        fill: "none",
      });

      svgMap.querySelector(`#${BUILDINGS_1}`)!.childNodes.forEach((buildings) => {
        const element = buildings as SVGElement;
        // element.style.fill = "blue"
        // element.style.transition = 'fill 1s, stroke 2s'
        element.style.opacity = "0"; // Initial opacity
        element.style.transition = `opacity ${Math.random()}s`; // Transition for opacity
      });

      svgMap.querySelector(`#${BUILDINGS_2}`)!.childNodes.forEach((buildings) => {
        const element = buildings as SVGElement;
        element.style.fill = colors.spots;
        element.style.transition = "fill 1s, stroke 2s";
        // element.style.opacity = "0"; // Initial opacity
        // element.style.transition = `opacity ${Math.random()}s`; // Transition for opacity
      });

      svgMap.querySelectorAll(`#${WIRE_1}, #${WIRE_2}, #${WIRE_3}`).forEach((wire) => {
        const element = wire as SVGElement;
        element.style.stroke = colors.wire;
       });

      campContainer.current?.appendChild(svgMap);

      // Start the animation after the component mounts
      setTimeout(() => {
        animateBuildings();
      }, 1000); // Delay start of animation to allow initial render
    });
  }, []);

  const animateBuildings = () => {
    const buildings = campContainer.current?.querySelectorAll(`#${BUILDINGS_1} > *`) as NodeListOf<SVGElement>;
    buildings.forEach((building) => {
      building.style.opacity = "1"; // Target opacity
    });
  };

  return (
    <div id="spital-camp-container" className={classNames(className)} style={style}>
      {/* map lables */}
      <div id="spital-camp-labels">
        {campSecond.map(({ id, position, label }) =>
          (Array.isArray(position) ? position : [position])?.map((p) => (
            <MapLabel key={id} id={id} label={label} position={p} style={{ 
              fontSize: 9,
              height: 0,
              width: 0,
            }} 
             className="text-spital-map-label uppercase tracking-[3px]"
             activeClassName="text-spital-onPrimary"
            />
          ))
        )}
      </div>

      {/* map container */}
      <div id="spital-camp-map-container" style={{ width: 800, height: 800 }} ref={campContainer} />
    </div>
  );
};

