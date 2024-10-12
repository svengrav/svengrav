import { ReactNode, useEffect, useRef, useState } from "react";
import { useWindowResize } from "../../hooks/useWindowResize";
import Page from "../../components/Page";
import { CanvasWrapper } from "../../components/CanvasWrapper";
import { Canvas } from "../../components/Canvas";
import { CanvasZoomControl } from "../../components/CanvasZoomControl";
import { CanvasLayerControl } from "../../components/CanvasLayerControl";
import { Navigator } from "../../components/Navigator";
import { Sidepanel2, Sidepanel2Controller } from "../../components/Sidepanel2";
import { OverlayProvider, useOverlay } from "../../components/Overlay";
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import Icon from "../../components/Icon";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { SouthpoleMap } from "./SouthPole"

interface SouthPoleViewProps {
  map: SouthpoleMap;
  inner?: ReactNode;
}

export default function SouthPoleView({ map, inner }: SouthPoleViewProps) {
  const [window] = useWindowResize();
  const leftSidepanel = useRef<Sidepanel2Controller>(null);
  const [section, setSection] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
  });

  const setActiveSection = () => {
    // map.controller().setVisibility(1, !section[1]);
    setSection((section) => ({ ...section, [1]: !section[1] }));
  };

  return (
    <Page>
      <OverlayProvider>
        {inner}
        <Sidepanel2
          position="left"
          visible
          width={400}
          closable
          label="Information"
          ref={leftSidepanel}
          full={window.width < 600}
          className="bg-gray-950 border-r-white/20 border-r text-gray-400"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          <div className="text-white text-center   leading-relaxed mb-4 border-b  border-gray-600 cursor-pointer border flex flex-col items-center justify-center p-1">
            <p className="uppercase text-2xl p-2">
            The Race
            </p>
            <p>
            to the
            </p>
            <p className="uppercase text-2xl p-2">
            South Pole
            </p>
            
          </div>
          <Information />

          <p className="py-4">
          The South Pole was first reached by Norwegian explorer Roald Amundsen and his team on December 14, 1911, during the Fram Expedition. 
          Amundsen’s team arrived ahead of British explorer Robert Falcon Scott, who reached the pole on January 17, 1912. 
          Tragically, Scott and his entire team perished on the return journey due to harsh conditions and a lack of supplies.
          </p>
          {
            map.expeditions.map((expedition) => (
              <InformationSection key={expedition.id} title={expedition.name} open={section[expedition.id]} onClick={() => setSection((section) => ({ ...section, [expedition.id]: !section[expedition.id] }))}>
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
  );
}

const InformationSection = ({
  title,
  children,
  open = false,
  onClick,
}: {
  title: string;
  children?: any;
  open?: boolean;
  onClick?: () => void;
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
  );
};

const Information = () => {
  const overlay = useOverlay();

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
    });
  };

  return (
    <div className="justify-start w-full flex">
      <Icon onClick={() => showOverlay()} primary={InformationCircleIcon} label="Projekt" />
    </div>
  );
};
