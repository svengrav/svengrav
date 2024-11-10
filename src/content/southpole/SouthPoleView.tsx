import { ReactNode, useEffect, useRef, useState } from "react"
import { useWindowResize } from "../../hooks/useWindowResize"
import Page from "../../components/Page"
import { CanvasWrapper } from "../../components/CanvasWrapper"
import { Canvas } from "../../components/Canvas"
import { CanvasZoomControl } from "../../components/CanvasZoomControl"
import { CanvasLayerControl } from "../../components/CanvasLayerControl"
import { Navigator } from "../../components/Navigator"
import { Sidepanel2, Sidepanel2Controller } from "../../components/Sidepanel2"
import { OverlayProvider, useOverlay } from "../../components/Overlay"
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Icon from "../../components/Icon"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { SouthpoleMap } from "./SouthPole"
import { description } from "./SouthPoleData"

interface SouthPoleViewProps {
  map: SouthpoleMap
  inner?: ReactNode
}

export default function SouthPoleView({ map, inner }: SouthPoleViewProps) {
  const [window] = useWindowResize()
  const leftSidepanel = useRef<Sidepanel2Controller>(null)
  const controller = map.controller
  const [section, setSection] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  })

  if (controller) {
    controller.onClick = (id: string) => { console.log("click", id) }
  }

  const setActiveSection = (id: string) => {
    if (controller && controller.setVisibility) {
      controller.setVisibility(id, !section[id]);
      setSection((section) => ({ ...section, [id]: !section[id] }))
    }
  }


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
          full={window.width < 600}
          className="bg-gray-950 border-r-white/20 border-r text-gray-400"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          {Title()}
          <p className="py-4">
            {description}
          </p>
          {
            map.expeditions.map((expedition) => (
              <InformationSection
                key={expedition.id}
                title={
                  <InformationTitle title={expedition.name} year={expedition.year} />
                }
                open={section[expedition.id]}
                onClick={() => setActiveSection(expedition.id)}
              >
                {expedition.description}
              </InformationSection>
            ))
          }
        </Sidepanel2>

        <CanvasWrapper artwork={map} size={{ height: window.height - 150, width: window.width }}>
          <Navigator className="md:w-96 md:absolute right-0 z-20 " />
          <Canvas className="m-auto" />
          <CanvasZoomControl />
          <CanvasLayerControl />
        </CanvasWrapper>
      </OverlayProvider>
    </Page>
  )
}

const InformationTitle = ({ title, year }: { title: string, year: string }) => {
  return <div className="flex w-full justify-between">
    <h1>{title}</h1>
    <p className=" text-gray-500 mr-2">{year}</p>
  </div>
}

const InformationSection = ({
  title,
  children,
  open = false,
  onClick,
}: {
  title: ReactNode
  children?: any
  open?: boolean
  onClick?: () => void
}) => {
  return (
    <>
      <Disclosure key={"" + open} defaultOpen={open}>
        <DisclosureButton className="flex w-full justify-between py-2 text-white hover:text-blue-300" onClick={onClick}>
          {title}
          <Icon primary={ChevronDownIcon} secondary={ChevronUpIcon} active={open} />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-300/80">{children}</DisclosurePanel>
      </Disclosure>
    </>
  )
}

const Information = () => {
  const overlay = useOverlay()

  const showOverlay = () => {
    overlay?.showOverlay({
      backdropClassName: "bg-gray-950",
      contentClassName: "bg-gray-950",
      label: "Das Projekt",
      full: false,
      children: (
        <>
          <h1 className="pb-8 text-2xl px-4 ">

          </h1>
          <div className="flex flex-col lg:flex-row items-start justify-start">

          </div>
        </>
      ),
    })
  }

  return (
    <div className="justify-start w-full flex">
      <Icon onClick={() => showOverlay()} primary={InformationCircleIcon} label="Projekt" />
    </div>
  )
}
function Title() {
  return <div className="text-white text-center border-b border-gray-600 leading-relaxed mb-4 cursor-pointer flex flex-col items-center justify-center pb-4">
    <p className="uppercase text-2xl p-2">The Race</p>
    <p>to the</p>
    <p className="uppercase text-2xl p-2">South Pole</p>
  </div>
}

