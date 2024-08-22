import Scalable from "../../components/Scalable"
import { mapPoints, mapPoints2, mapText } from "./WalspergMap"

export const MapElements = () => <>
  <Scalable width={7500} height={7500}>
    <PointToMap />
    <PointToMap2 />
    <TextToMap />
  </Scalable></>

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
        <div style={{ top: point.position.y, left: point.position.x, position: "absolute",  translate: "0px -20px"}} className="h-4 w-4 bg-black rotate-45">
        </div>
      </>
      )
    }
  </div>
}
