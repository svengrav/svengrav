import { useState, useRef, useEffect } from "react";
import { getSpitalMapSVG as newSpitalMapSVG } from "./SpitalMapSVG";
import { campLabel, MapElement, mapViews, Position, spitalLabel, spitalEventPoints, getMapTitle, spitalMapData } from "./SpitalMapData";
import { SpitalMapCamp } from "./SpitalCampMap";
import spitalTheme from "./SpitalTheme";
import { SpitalCategory } from "./Spital";
import { createMapConnection, MapLabel, MapPoint, MapTitle } from "@components/map/MapComponents";
import classNames from "classnames"

export interface SpitalMapController {
  moveToCamp: () => void;
  moveToEvent: () => void;
  moveToPoint: (id: string) => void;
  onPointClick?: (id: string) => void;
}

interface MapState {
  initialized: boolean;
  activePoint?: string;
  elements: Array<MapElement & any>;
}

const positionToTransformValue = ({ x, y, s }: Position) => `translate(${x}px, ${y}px) scale(${s})`;

const getMapElement = (id: string, elements: MapElement[]) => elements.find((p) => p.id === id)!;

const camp = getMapElement(SpitalCategory.Camp, mapViews);
const path = getMapElement(SpitalCategory.Event, mapViews);
const eventTitle = getMapTitle(SpitalCategory.Event);
const campTitle = getMapTitle(SpitalCategory.Camp);

export const SpitalMap = ({ controller }: { controller: SpitalMapController }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const initTransform = positionToTransformValue(camp.position as Position);
  const [mapState, setMapState] = useState<MapState>({ initialized: false, elements: [] });
  const colors = spitalTheme.colors.spital.map;

  useEffect(() => {
    if (!mapState.initialized) {
      newSpitalMapSVG(spitalMapData.id).then((svg) => {
        mapContainerRef.current?.querySelector(`#${spitalMapData.id}`)?.remove();
        mapContainerRef.current?.appendChild(svg);

        campLabel.forEach((key) => {
          key.connections?.forEach((connection) => {
            const element = createMapConnection(mapContainerRef.current!, spitalMapData.id, key.id, connection);
            mapState.elements.push(element);
          });
        });

        setMapState((prevState) => ({ ...prevState, initialized: true }));
      });
    }
  }, [mapState.initialized]);

  //#region map controller methods
  controller.moveToCamp = () => {
    moveToPosition(camp.position as Position);
  };

  controller.moveToEvent = () => {
    moveToPosition(path.position as Position);
  };

  controller.moveToPoint = (id: string) => {
    setMapState((prevState) => ({ ...prevState, activePoint: id }));
    const pointElement = mapContainerRef.current?.querySelector(`#${id}`);
    pointElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    mapState.elements.forEach((element) => element.hide());
    mapState.elements.find((element) => element.sourceId === id)?.show();
  };
  //#endregion

  // Moves the map to a specific position.
  const moveToPosition = (position: Position) => {
    const { x, y, s } = position;
    mapContainerRef.current?.animate([{ transform: `translate(${x}px, ${y}px) scale(${s})` }], {
      duration: 1000,
      fill: "forwards",
    });
  };

  // Handles the click event on a map point.
  const onMapClick = (id: string) => {
    mapState.elements.forEach((element) => element.hide());
    mapState.elements.find((element) => element.sourceId === id)?.show();
    controller.onPointClick && controller.onPointClick(id);
    setMapState((prevState) => ({ ...prevState, activePoint: id }));
  };

  return (
    <div
      className="text-spital-map-label relative "
      style={{
        transform: initTransform,
        transformOrigin: "top left",
        opacity: mapState.initialized ? 1 : 0,
        visibility: mapState.initialized ? "visible" : "hidden",
        transition: "opacity 0.5s, visibility 0.3s",
        width: 1250,
        height: 1000,
        background: colors.background,
      }}
      ref={mapContainerRef}
    >
      <SpitalMapCamp
        className="absolute z-20 "
        style={{ top: 476, left: 1007, transform: "scale(0.471) rotate(53.11deg) ", transformOrigin: "top left" }}
      />

      <div className="absolute z-10">
        <MapTitle
          id={eventTitle.id}
          position={eventTitle.position}
          title={eventTitle.inner}
          className="uppercase tracking-[3px] text-spital-primary text-[15px] p-2"
        />
        <MapTitle
          id={campTitle.id}
          position={campTitle.position}
          title={campTitle.inner}
          className="uppercase tracking-[3px] text-spital-primary text-[10px] p-2"
        />

        {campLabel.map(({ id, position, label }) => (
          <MapLabel
            key={id}
            id={id}
            label={label!}
            position={position as Position}
            onClick={onMapClick}
            className={classNames("text-spital-map-label uppercase tracking-[3px] text-[9px] hover:bg-spital-background px-1", {

            })}
            activeClassName="text-spital-primary bg-spital-background"
            activeId={mapState.activePoint}
          />
        ))}

        {spitalLabel.map(({ id, position, label }) => (
          <MapLabel
            key={id}
            id={id}
            label={label!}
            position={position as Position}
            activeId={mapState.activePoint}
            style={{ fontSize: 10 }}
            className="text-spital-map-label uppercase tracking-[5px]"
          />
        ))}

        {spitalEventPoints.map(({ id, position, label }) => (
          <MapPoint
            key={id}
            id={id}
            label={label}
            position={position as Position}
            onClick={onMapClick}
            active={mapState.activePoint}
            className="text-spital-map-label border rounded-sm text-[10px] hover:border-spital-primary"
            activeClassName="border-spital-primary text-spital-primary bg-spital-background/50"
          />
        ))}
      </div>
    </div>
  );
};
