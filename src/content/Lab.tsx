import Page from "../components/Page";
import { PageDescription } from "../core/Page";
import { date } from "../utils/helper";
import { usePathAnimation } from "../hooks/usePathAnimation";
import { PathState } from "../core/pathAnimation";
import { useState } from "react";

//#region svg elements interfaces

const Lab = () => {
  const [state, setState] = useState<PathState>();
  const { stopAnimation, startAnimation } = usePathAnimation("testId", "route1", {
    position: 500,
    events: [
      {
        onTrigger: (e) => { startAnimation(true) },
        position: 500,
      }
    ],
    onRouteStateChange: (state) => {
      setState(state)
    }
  })

  const buttonStyle = "text-white uppercase p-2 border rounded-sm border-gray-500 hover:border-emerald-500 ml-8 first:ml-0"
  const routePosition = state ? state.position : 100;
  return (
    <div className="flex min-h-[calc(100vh_-_48px)] w-full items-center justify-center flex-col">
      <div className="w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full overflow-hidden border-2 border-gray-800  bg-emerald-600 relative" >
        <div className=" text-white w-full text-center mt-10 lg:mt-28"> {routePosition} {state?.length ? "/ " + state.length : ""} </div>
        <svg id="testId" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className=" top-0 left-0 absolute w-[300px] h-[300px] lg:w-[600px] lg:h-[600px]">
          <path id="route1" d="M47.24,152.35l121.61,307.57,81.16-292.15,149.92,250.01c46.08-41.2,75.08-101.1,75.08-167.78,0-124.26-100.74-225-225-225" style={{
            fill: "none",
            strokeWidth: 2,
            stroke: "rgb(16 185 129 / var(--tw-bg-opacity))",
            strokeDasharray: "0",
            strokeDashoffset: "200"
          }} />
        </svg>

      </div>
      <div className="flex w-min justify-between py-4">
        <button onClick={() => startAnimation()} className={buttonStyle}>Start</button>
        <button onClick={() => stopAnimation()} className={buttonStyle}> Stop</button>
        <button onClick={() => startAnimation(true)} className={buttonStyle}>Reverse</button>
      </div>
    </div>
  )
}

export const routeLabPage: PageDescription = {
  title: "Sven's Lab",
  id: "lab",
  description: "Sample lab to test my route.",
  hidden: true,
  date: date(5, 5, 2024),
  tags: ["art"],
  thumbnail: <></>,
  element: <Page><Lab /></Page>
}

