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
import { fetchSVG } from "../Spital/svgUtils"

interface SouthPoleViewProps {
  map: SouthpoleMap
  inner?: ReactNode
}

export default function SouthPoleView({ map, inner }: SouthPoleViewProps) {
  const {window} = useWindowResize()
  const leftSidepanel = useRef<Sidepanel2Controller>(null)
  const controller = map.controller
  const [section, setSection] = useState({
    active: ''
  })

  //#region controller and active setup
  if (controller) {
    controller.onClick = (id: string) => { setActiveSection(id) }
  }

  const setActiveSection = (id: string) => {
    if (controller && controller.setVisibility) {
      map.expeditions.forEach((expedition) => {
        controller.setVisibility!(expedition.id, false)
      })

      if (section.active === id) {
        controller.setVisibility(id, false)
        setSection({ active: '' })
      } else {
        controller.setVisibility(id, true)
        setSection({ active: id })
      }
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
          full={window.width < 600}
          className="bg-gray-950 border-r-white/20 border-r text-gray-400"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          <ProjectTitle />
          <ProjectInformation />
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
                open={section.active === expedition.id}
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


const ProjectInformation = () => {
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
            <div className="w-full mt-4">
              <img
                src="https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-tablet.jpg"
                className="object-contain"
              />
            </div>
            <div className="mt-8 tracking-wide leading-relaxed text-gray-200 ">

              <p className="mb-4 max-w-lg">
                This map illustrates the "Race to the South Pole," chronicling a series of expeditions that attempted to
                conquer the frigid and uncharted frontier of Antarctica from 1772 to 1913.
                I researched the seven most significant expeditions to the South Pole and painted the base map using Procreate on an iPad. Then, I added text and landmarks in Illustrator and converted the final design to SVG.
              </p>
              <p className="mb-4 max-w-lg">
                Starting from the early explorations led by James Cook (1772-1775), who reached 71°10' South, this timeline covers notable expeditions,
                including the Belgian Antarctic Expedition (1897-1899) at 70°5' South and the Southern Cross Expedition (1898-1900), inching closer at 78°5' South.
              </p>
              <p className="mb-4 max-w-lg">
                Later, British-led missions such as the Discovery Expedition (1901-1904) and the Nimrod Expedition (1907-1909) reached 82°17' South and 88°23' South, respectively,
                showing incremental advancements toward the elusive pole.
              </p>
              <img
                src="https://stsvengrav.blob.core.windows.net/stsvengrav/southpole/southpole-scott.jpg"
                className="object-contain my-4"
              />
              <p className="text-gray-300 text-sm mb-4">
                The photo shows Scott's expedition to the South Pole
              </p>
              <p className="mb-4 max-w-lg">
                It culminates with the famed rivalry between Roald Amundsen’s Norwegian team and Robert Falcon Scott’s British Terra Nova Expedition.
                Amundsen’s Fram Expedition reached the South Pole first on December 14, 1911,
                achieving a historic victory by navigating to the heart of Antarctica at 90° South.
                Tragically, Scott and his team followed, reaching the pole on January 17, 1912, but perished on the return journey due to extreme conditions and limited supplies.
              </p>

            </div>
          </div>
        </>
      ),
    })
  }
  return <div>
    <Icon onClick={() => showOverlay()} primary={InformationCircleIcon} label="Projekt" className="text-gray-200" />
  </div>
}