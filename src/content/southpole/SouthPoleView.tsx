import { ReactNode, useEffect, useRef, useState } from "react"
import Page from "@components/page/Page"
import { Canvas } from "@components/canvas/Canvas"
import { PagePanel, PagePanelController } from "@components/page/PagePanel"
import { usePageOverlay } from "@components/page/PageOverlay"
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import Icon from "@components/base/Icon"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { SouthpoleMap } from "./SouthPole"
import { description, expeditions, SouthPoleSummary } from "./SouthPoleData"
import { fetchSVG } from "../Spital/svgUtils"
import classNames from "classnames"

interface SouthPoleViewProps {
  map: SouthpoleMap
  inner?: ReactNode
}

export default function SouthPoleView({ map, inner }: SouthPoleViewProps) {
  const leftSidepanel = useRef<PagePanelController>(null)
  const mapController = map.controller
  const [activeExpedition, setActiveExpedition] = useState({
    id: ''
  })

  //#region controller and active setup
  if (mapController) {
    mapController.onClick = (id: string) => { setActiveSection(id) }
  }

  const setActiveSection = (id: string) => {
    if (!mapController || !mapController.setVisibility) {
      return
    }

    leftSidepanel.current?.scrollTo(id)
    map.expeditions.forEach((expedition) => {
      mapController.setVisibility!(expedition.id, false)
    })

    if (activeExpedition.id === id) {
      mapController.setVisibility(id, false)
      setActiveExpedition({ id: '' })
    } else {
      mapController.setVisibility(id, true)
      mapController.startAnimation(id)
      setActiveExpedition({ id: id })
    }
  }
  //#endregion

  return (
    <Page>
      {inner}
      <PagePanel
        position="left"
        visible
        closable
        label="The Project"
        ref={leftSidepanel}
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
              id={activeExpedition.id}
              key={expedition.id + activeExpedition.id}
              title={
                <InformationTitle label={expedition.name} year={expedition.year} />
              }
              open={activeExpedition.id === expedition.id}
              onClick={() => setActiveSection(expedition.id)}
            >
              {expedition.description}
            </InformationSection>
          ))
        }
      </PagePanel>
      <Canvas artwork={map} />
    </Page>
  )
}

type InformationTitleProps = { label: string, year: string }
const InformationTitle = ({ label, year }: InformationTitleProps) => {
  return (
    <div className="flex w-full justify-between">
      <h1>{label}</h1>
      <p className=" text-gray-500 mr-2">{year}</p>
    </div>
  )
}

type InformationSectionProps = { title: ReactNode, children: ReactNode, open?: boolean, onClick?: () => void, id?: string }
const InformationSection = ({ title, children, open = false, onClick, id }: InformationSectionProps) => {
  return (
    <div id={id}>
      <Disclosure key={title?.toString()} defaultOpen={open}>
        <DisclosureButton className={classNames("flex w-full justify-between py-2 text-white hover:text-rose-400", {
          "!text-rose-400": open
        })} onClick={onClick}>
          {title}
          <Icon primary={ChevronDownIcon} secondary={ChevronUpIcon} active={open} />
        </DisclosureButton>
        <DisclosurePanel className="text-gray-300/80">{children}</DisclosurePanel>
      </Disclosure>
    </div>
  )
}

const ProjectTitle = () => {
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
  const overlay = usePageOverlay()

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