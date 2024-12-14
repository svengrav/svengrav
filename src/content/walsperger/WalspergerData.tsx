import classNames from "classnames"
import Scalable from "@components/base/Scalable"
import { mapPoints, mapPoints2, mapText } from "./WalspergMap"
import { MutableRefObject, useEffect, useRef, useState } from "react"

// Definieren des Controller-Interfaces
export interface MapElementsController {
  setVisibility(id: number, show: boolean): void;
}

export const MapElementController = {
  mapElementsRef: null as MutableRefObject<MapElementsController | null> | null,

  // Setzen des Refs
  setRef(ref: MutableRefObject<MapElementsController | null>) {
    this.mapElementsRef = ref;
  },

  // Zugriffsmethode für Sichtbarkeit
  setVisibility(id: number, show: boolean) {
    if (this.mapElementsRef?.current) {
      this.mapElementsRef.current.setVisibility(id, show);
    }
  },
};

// Typisierte React-Komponente mit Ref
export const MapElements = () => {
  // State für die Sichtbarkeit der Elemente
  const internalRef = useRef<MapElementsController | null>(null);

  const [visible, setVisibile] = useState<Record<number, boolean>>({
    1: false,
  });

  useEffect(() => {
    MapElementController.setRef(internalRef)
    internalRef.current = {
      setVisibility(id, show) {
        setVisibile((prevState) => ({
          ...prevState,
          [id]: show,
        }));
      },
    };
  }, []);

  return (
    <>
      <Scalable width={7500} height={7500}>
        <div
          className={classNames('border-white absolute border-4 rounded-md', {
            hidden: !visible[1],
          })}
          style={{ width: 500, height: 500, top: 2850, left: 3300, borderWidth: 20 }}
        ></div>
        <PointToMap />
        <PointToMap2 />
        <TextToMap />
      </Scalable>
    </>
  );
};


export const TextToMap = () => {
  return <div style={{ height: 7500, width: 7500 }}>
    {
      mapText.map(text => <>
        <div style={{ top: text.position.y, left: text.position.x, position: "absolute", fontSize: "30px", }} className="font-semibold -translate-y-6 tracking-tight leading-tight shadow-sm textsh hover:text-white cursor-pointer">
          {text.label}
        </div>
      </>
      )
    }
  </div>
}

export const PointToMap = () => {
  return <div style={{ height: 7500, width: 7500 }}>
    {
      mapPoints.map(point => <>
        <div style={{ top: point.position.y, left: point.position.x, position: "absolute", translate: "0px -20px" }} className="h-4 w-4 bg-black rounded-full">
        </div>
      </>
      )
    }
  </div>
}

export const PointToMap2 = () => {
  return <div style={{ height: 7500, width: 7500 }}>
    {
      mapPoints2.map(point => <>
        <div style={{ top: point.position.y, left: point.position.x, position: "absolute", translate: "0px -20px" }} className="h-4 w-4 bg-black rotate-45">
        </div>
      </>
      )
    }
  </div>
}
