import { ReactNode, useEffect, useRef, useState } from "react"
import { useWindowResize } from "../../hooks/useWindowResize"
import Page from "@components/Page"
import { CanvasWrapper } from "@components/canvas/CanvasWrapper"
import { Canvas } from "@components/canvas/Canvas"
import { CanvasZoomControl } from "@components/canvas/CanvasZoomControl"
import { CanvasLayerControl } from "@components/canvas/CanvasLayerControl"
import { CanvasNavigator } from "@components/canvas/CanvasNavigator"
import { Sidepanel2, Sidepanel2Controller } from "@components/Sidepanel2"
import { OverlayProvider, useOverlay } from "@components/Overlay"
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Icon from "@components/Icon"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { SouthpoleMap } from "./SouthPole"
import { description, SouthPoleSummary } from "./SouthPoleData"
import { fetchSVG } from "../Spital/svgUtils"
import { i } from "vite/dist/node/types.d-aGj9QkWt"

interface SouthPoleViewProps {
  map: SouthpoleMap
  inner?: ReactNode
}

export default function SouthPoleView({ map, inner }: SouthPoleViewProps) {
  const { windowSize } = useWindowResize()
  const leftSidepanel = useRef<Sidepanel2Controller>(null)
  const controller = map.controller
  const [activeExpedition , setActiveExpedition] = useState({
    id: ''
  })

  //#region controller and active setup
  if (controller) {
    controller.onClick = (id: string) => { setActiveSection(id) }
  }

  const setActiveSection = (id: string) => {
    if (!controller || !controller.setVisibility) {
      console.log("no controller or setVisibility")
      return
    }


    map.expeditions.forEach((expedition) => {
      controller.setVisibility!(expedition.id, false)
    })

    if (activeExpedition.id === id) {
      controller.setVisibility(id, false)
      setActiveExpedition({ id: '' })
    } else {
      controller.setVisibility(id, true)
      setActiveExpedition({ id: id })
      console.log("active", id)
    }
  }
  //#endregion

  return (
    <Page>
      <OverlayProvider>
        {inner}
        <Sidepanel2
          position="left"
          visible
          width={400}
          closable
          label="The Project"
          ref={leftSidepanel}
          full={windowSize.width < 600}
          className="bg-gray-950/90 border-r-white/20 border-r text-gray-400"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          <ProjectTitle />
          <ProjectInformationOverlay />
          <p className="py-4">
            {description}
          </p>
          {
            map.expeditions.map((expedition) => (
              <InformationSection
                key={expedition.id + activeExpedition.id} 
                title={<InformationTitle title={expedition.name} year={expedition.year} />}
                open={activeExpedition.id === expedition.id}
                onClick={() => setActiveSection(expedition.id)}
              >
                {expedition.description}
              </InformationSection>
            ))
          }
        </Sidepanel2>

        <CanvasWrapper artwork={map} size={{ height: windowSize.height - 150, width: windowSize.width }}>
          <CanvasNavigator />
          <Canvas className="m-auto" />
          <CanvasZoomControl />
          <CanvasLayerControl />
        </CanvasWrapper>
      </OverlayProvider>
    </Page>
  )
}


type InformationTitleProps = { title: string, year: string };
const InformationTitle = ({ title, year }: InformationTitleProps) => {
  return <div className="flex w-full justify-between">
    <h1>{title}</h1>
    <p className=" text-gray-500 mr-2">{year}</p>
  </div>
}

type InformationSectionProps = { title: ReactNode, children: ReactNode, open?: boolean, onClick?: () => void };
const InformationSection = ({title, children, open = false, onClick }: InformationSectionProps) => {
  return (
    <>
      <Disclosure key={title?.toString()} defaultOpen={open}>
        <DisclosureButton className="flex w-full justify-between py-2 text-white hover:text-blue-300" onClick={onClick}>
          {title}
          <Icon primary={ChevronDownIcon} secondary={ChevronUpIcon} active={open} />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-300/80">{children}</DisclosurePanel>
      </Disclosure>
    </>
  )
}

function ProjectTitle() {
  const baseRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetchSVG("https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-title.svg").then((svg) => {
      if (!(baseRef.current?.querySelector(`#${svg.id}`) as SVGSVGElement)) {
        baseRef.current?.appendChild(svg)
      }
    })

  }, [])

  return <div className="w-full  flex items-center justify-center pb-4">
    <div ref={baseRef} className="w-48"></div>
  </div>
}


/**
 * Component that renders an icon which, when clicked, displays an overlay with project information.
 * The overlay contains the project title and a summary of the South Pole project.
 */
const ProjectInformationOverlay = () => {
  const overlay = useOverlay()

  const showOverlay = () => {
    overlay?.showOverlay({
      backdropClassName: "bg-gray-950",
      contentClassName: "bg-gray-950",
      label: "",
      full: false,
      children: (
        <>
          <div className="flex flex-col w-full">
            <ProjectTitle />
            <SouthPoleSummary />
          </div>
        </>
      ),
    })
  }
  return <Icon onClick={showOverlay} primary={InformationCircleIcon} label="Projekt" className="text-gray-200" />
}