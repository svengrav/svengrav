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
import { WalspergerMap } from "./WalspergMap";

interface WalspergerViewProps {
  map: WalspergerMap;
  inner?: ReactNode;
}

export default function WalspergerView({ map, inner }: WalspergerViewProps) {
  const { window } = useWindowResize();
  const leftSidepanel = useRef<Sidepanel2Controller>(null);
  const [section, setSection] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const setActiveSection = () => {
    map.controller().setVisibility(1, !section[1]);
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
          label="Die Weltkarte"
          ref={leftSidepanel}
          full={window.width < 600}
          className="bg-gray-950 border-r-white/20 border-r text-gray-400"
          scrollbar={{
            className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
          }}
        >
          <h1 className="text-white text-3xl font-serif leading-relaxed mb-4 border-b pb-8 border-gray-600 cursor-pointer">
            Weltkarte des <br />
            Andreas Walsperger{" "}
          </h1>
          <Information />

          <p className="py-4">
            Die Weltkarte des Andreas Walsperger, erstellt um 1448, ist ein bedeutendes Beispiel mittelalterlicher Kartografie und ein
            seltenes Zeugnis der Weltanschauung im spätmittelalterlichen Europa. Andreas Walsperger, ein deutscher Kartograf und Mönch aus
            Salzburg, erstellte die Karte in Konstanz, und sie spiegelt eine Kombination aus geographischem Wissen und religiöser
            Vorstellung seiner Zeit wider.
          </p>
          <InformationSection title={"Orientierung und Darstellung"} open={section[1]} onClick={setActiveSection}>
            Die Karte ist eine sogenannte „mappae mundi“, eine mittelalterliche Weltkarte, die die Erde als eine Scheibe darstellt. Sie ist
            nach Osten orientiert, was in mittelalterlichen Karten üblich war, da der Osten mit dem Paradies und der biblischen
            Schöpfungsgeschichte verbunden wurde.
          </InformationSection>
          <InformationSection title={"Zentraler Fokus"} open={section[2]}>
            Im Zentrum der Karte liegt Jerusalem, ein deutlicher Ausdruck der religiösen Weltanschauung des Mittelalters. Diese zentrale
            Positionierung Jerusalems betont die geistliche Bedeutung der Stadt.
          </InformationSection>
          <InformationSection title={"Geografische Elemente"} open={section[3]}>
            Die Karte zeigt Europa, Asien und Afrika in stark stilisierter Form. Flüsse, Meere und Gebirge sind eingezeichnet, aber ihre
            Proportionen und Lagen entsprechen oft nicht der tatsächlichen Geografie. Die Weltmeere umgeben die Landmassen, und die
            Darstellung von Ländern und Städten ist stark vereinfacht und symbolisch.
          </InformationSection>
          <InformationSection title={"Mythische Elemente"} open={section[4]}>
            Die Karte enthält sowohl reale als auch mythische Orte und Wesen. Neben geografischen Orten sind auch Fabelwesen und
            legendenhafte Orte, wie das Paradies und das Reich des Priesterkönigs Johannes, dargestellt. Solche mythischen Elemente zeigen
            die Vermischung von realem Wissen und Legenden in der damaligen Zeit.
          </InformationSection>
          <InformationSection title={"Textliche Ergänzungen"} open={section[5]}>
            Die Karte enthält lateinische Inschriften, die geografische und religiöse Informationen bieten. Diese Texte erläutern oft die
            abgebildeten Orte und sind eine wichtige Quelle für das Verständnis der mittelalterlichen Weltansicht.
          </InformationSection>
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
            Walsperger Weltkarte: Überarbeitung und <br />
            Neucolorierung 2015 - 2024
          </h1>
          <div className="flex flex-col lg:flex-row items-start justify-start">
            <img
              src="https://stsvengrav.blob.core.windows.net/stsvengrav/walsperger/walsperger-ausstellung.jpg"
              className="object-contain max-w-96 px-4"
            />
            <div className="max-w-3xl px-4">
              <p className="mb-6  text-gray-400">
                Die Grundlage dieser Interpretation der Weltkarte von Andreas Walsperger habe ich im Jahr 2015 für mein Buchprojekt Mapping
                the World im Rahmen meines Bachelorstudiums an der Fachhochschule Münster, Fachbereich Design, erstellt. Im Jahr 2024 habe
                ich diese Arbeit überarbeitet und neu coloriert.
              </p>
              <p className="mb-6  text-gray-400">
                Die Reinterpretation zeigt eine stilisierte, künstlerische Darstellung der mittelalterlichen Welt mit charakteristischen
                Elementen der Originalkarte: Eine runde Weltansicht mit Europa, Asien und Afrika, die durch markante Gebirge, Flüsse und
                symbolische Darstellungen von Städten geprägt ist. Im Westen ragt ein imposantes Gebäude mit Türmen heraus, das vermutlich
                Rom symbolisieren soll. Die Karte ist umrahmt von einem dekorativen Rand, der den historischen Charme betont. Die Farben und
                die Gestaltung heben die mythische und religiöse Bedeutung der Orte hervor und vermitteln ein stimmungsvolles Bild der
                mittelalterlichen Weltanschauung.
              </p>

              <h2 className="py-4 text-lg">Geschichtlicher Hintergrund</h2>
              <p className="mb-6  text-gray-400">
                Die Weltkarte des Andreas Walsperger, auch bekannt als die Walsperger-Karte, ist ein bemerkenswertes mittelalterliches
                Dokument, das um das Jahr 1448 erstellt wurde. Andreas Walsperger, ein deutscher Mönch aus Konstanz, schuf diese Karte als
                eine Mischung aus mittelalterlicher Weltanschauung und den geografischen Kenntnissen seiner Zeit. Die Karte befindet sich
                heute in der Vatikanischen Bibliothek und gilt als ein wichtiges Beispiel für die Kartografie des 15. Jahrhunderts, die
                unmittelbar vor der Entdeckung Amerikas stand.
              </p>
            </div>
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
