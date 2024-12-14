import { ReactNode } from "react"
import { Link } from "@components/base/Link"
import { Artwork } from "@components/Artwork"
import spitalTheme from "./SpitalTheme"

const colors = spitalTheme.colors.spital
export type SpitalArtwork = Artwork & SpitalChapters

export enum SpitalCategory {
  Event = "event",
  Camp = "camp"
}

export const spital: SpitalArtwork = {
  id: "spital",
  name: "2024 | 2014 | 1914",
  description: "2024 | 2014 | 1914",
  year: 2014,
  size: { width: 2500, height: 1500 },
  defaultIndex: 1,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <div />,
    },
  ],
  points: [],
  chapters: [
    {
      id: "friedhof",
      label: "Friedhof",
      category: SpitalCategory.Event,
      index: 1,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-1.jpg",
      inner: (
        <div>
          Der Friedhof und eine Kapelle im Lager gaben den Gefangenen die Möglichkeit, ihre Toten angemessen zu beerdigen. Auf dem Friedhof
          wurde am 1. August 1915 von französischen Gefangenen ein Denkmal zu Ehren der verstorbenen Kameraden eingeweiht. Nach Kriegs
          ende wurden die meisten Verstorbenen in ihre Heimatländer überführt. Die russischen Soldaten und ein indischer Soldat blieben auf
          dem Friedhof Haus Spital bestattet.
        </div>
      ),
    },
    {
      id: "arbeit",
      label: "Arbeit",
      category: SpitalCategory.Event,
      index: 2,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-2.jpg",
      inner: (
        <div>
          Arbeitseinsätze spielten für die Gefangenen eine bedeutende Rolle. Mit dem verdienten Geld konnten sie ihre Situation im Lager
          verbessern. Die Einsätze umfassten handwerkliche Tätig- keiten in der Stadt oder Arbeiten in der Landwirtschaft. Viele Gefangene
          waren auch zum Ruhrbergbau abgeordnet.
        </div>
      ),
    },
    {
      id: "notlager",
      label: "Notlager",
      category: SpitalCategory.Event,
      index: 3,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-3.jpg",
      inner: (
        <div>
          Vier Wochen nach Kriegsbeginn entstand ein Notlager. Erdhütten und Zelte auf feuchtem Untergrund dienten als provisorische
          Unterkünfte. Insgesamt war das Lager 500 m lang, 500 m breit und wurde von einem doppelten Stacheldraht umgeben. Die Gefangenen waren
          nach Nationalitäten getrennt untergebracht. In den folgenden Wochen wurden mithilfe der Kriegsgefangenen neben dem Notlager Baracken errichtet: Das Lager Haus Spital.
        </div>
      ),
    },
    {
      id: "lagerSpital",
      label: "Haus Spital",
      category: SpitalCategory.Event,
      index: 4,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-4.jpg",
      inner: (
        <div>
          Das auf feuchten Böden errichtete Gefangenen- lager bot keinen Komfort. Die unzureichenden hygienischen Bedingungen ließen
          ansteckende Krankheiten, wie z.B. die Ruhr, grassieren. Die beengte Anordnung und Bauweise der Baracken bot keinen Raum für
          Privatsphäre. Alle Gefangenen waren, unabhängig vom Rang, willkürlichen Durchsuchungen der Wachleute ausgesetzt.
        </div>
      ),
    },
    {
      id: "lagerLeben",
      label: "Lagerleben",
      category: SpitalCategory.Event,
      index: 5,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-5.jpg",
      inner: (
        <div>
          Der Lageralltag war von strengen Regeln geprägt. Die desolate Lebensmittelversorgung der Kriegsgefangenen verbesserte sich
          insgesamt nur wenig. Die Qualität der Versor- gung hing vom militärischen Rang sowie von zusätzlichen Verdienstmöglichkeiten ab.
          Neben der Arbeit blieb nur wenig Zeit. In Aus- nahmesituationen konnten die Gefangenen Sport treiben, musizieren oder Theater
          spielen.
        </div>
      ),
    },
    {
      id: "wachleute",
      label: "Wachleute",
      category: SpitalCategory.Event,
      index: 6,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-6.jpg",
      inner: (
        <div>
          Der Hof des Gutes Spital diente den Wachleuten als Unterkunft und Zentrale. Die Wachmannschaft bestand zu großen Teilen aus
          Angehörigen des Landsturms. Dieser setzte sich aus älteren oder invaliden Männern zusammen, die nicht mehr an der Front dienen
          konnten. Sie glichen den kriegsbedingten Mangel an militärischem Personal hinter der Front aus.
        </div>
      ),
    },
    {
      id: "bevoelkerung",
      label: "Bevölkerung",
      category: SpitalCategory.Event,
      index: 7,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-7.jpg",
      inner: (
        <div>
          Die Kriegsgefangenen kamen immer wieder mit der Bevölkerung in Kontakt. Die Münsteraner reagierten neugierig, interessiert, aber
          auch ablehnend. Am Bahnhof oder am Lagerzaun beobachteten Schaulustige die fremden Soldaten. Bei Arbeitseinsätzen oder Fußmärschen
          durch Münster nahmen manche Kontakt auf, sehr zum Missfallen der Behörden.
        </div>
      ),
    },
    {
      id: "kreuz",
      label: "„EISERNES KREUZ“",
      category: SpitalCategory.Event,
      index: 8,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-8.jpg",
      inner: (
        <div>
          Hier befand sich die Opfer- und Nagelungsstätte „Eisernes Kreuz“: ein hölzernes Kreuz, in welches die Bevölkerung Münsters
          Eisennägel einschlug und so Verbundenheit mit dem Kriegsgeschehen zeigte. Jeder Nagel symboli- sierte eine Geldspende für
          Kriegshinter- bliebene und Kriegsversehrte. Die Opfergaben wurden als patriotische Pflicht betrachtet und festlich zelebriert.
        </div>
      ),
    },
    {
      id: "camp-intro",
      label: "Lager",
      category: SpitalCategory.Camp,
      inner: (
        <p>
          Der abgebildete Grundriss des Lagers Haus Spital ist heute weitestgehend überbaut. Eine Skizze vom Lager aus der damaligen Zeit
          ermöglicht es, die Strukturen auf einem Luftbild aus dem Jahr 1935 genau zu verorten.
        </p>
      ),
    },
    {
      id: "bwz",
      label: "BWZ Turm",
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/camp-1.jpg",
      category: SpitalCategory.Camp,
      inner: (
        <p>
          Auf dem ehemaligen Innenhof des Lagers Haus Spital befindet sich heute der Turm des Bildungs- und Wissenschaftszentrum der
          Bundesfinanzverwaltung (BWZ).
        </p>
      ),
    },
    {
      id: "innenhof",
      label: "Innenhof",
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/camp-2.jpg",
      category: SpitalCategory.Camp,
      inner: <p>Die Fotografien aus dem Lager geben Aufschluss über die extrem widrigen Lebensumstände der Kriegsgefangenen</p>,
    },
    {
      id: "wohlfahrtsbaracke",
      label: "Wohlfahrtsbaracke",
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/camp-3.jpg",
      category: SpitalCategory.Camp,
      inner: (
        <p>
          Das Gebäude mit der Bezeichnung „Wohlfahrtsbaracke“ kann zwar zugeordnet werden - seine Bedeutung und damalige Funktion ist heute
          nicht mehr zu klären.
        </p>
      ),
    },
    {
      id: "krank",
      label: "Krankenbaracke",
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/camp-4.jpg",
      category: SpitalCategory.Camp,
      inner: (
        <p>
          Die medizinische Versorgung des Lagers war nach Berichten der Gefangenen und Protokollen des Roten Kreuzes mangelhaft.
          Gestellte Fotos sollten der Öffentlichkeit das Gegenteil suggerieren.
        </p>
      ),
    },
    {
      id: "intro",
      label: "",
      index: 8,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/prinzipalmarkt-1.png",
      inner: (
        <>
          <p>
            Im September 1914, nur einen Monat nach Ausbruch des Krieges, wird süd-westlich des Gutes Haus Spital das erste
            Kriegsgefangenenlager in Münster eingerichtet. Mehr als 20.000 Kriegsgefangene,
            vor allem aus Russland, Frankreich, Großbritannien und Italien, werden hier interniert.
          </p>
          <p className="mt-4">
            Am damaligen Schauplatz sind nur noch wenige Spuren zu erkennen. Da, wo heute gelebt,
            gewandert oder gearbeitet wird, stand ein großes Kriegsgefangenenlager.
          </p>
        </>
      ),
    },
    {
      id: "intro-extended",
      label: "",
      index: 8,
      image: "https://stsvengrav.blob.core.windows.net/stsvengrav/spital/prinzipalmarkt-1.png",
      inner: (
        <>
          <h1 className="text-2xl font-semibold mb-4" >
            Es war einmal <span> 2014</span>...
          </h1>
          <img src="https://stsvengrav.blob.core.windows.net/stsvengrav/spital/event-info.jpg" className="rounded-md mb-4" />
          <p>
            Studenten der Fachhochschule Münster und der Universität Münster liefern anhand von Fotos, Berichten und Archivunterlagen
            Einblicke in die Geschichte des Lagers. Das Studienprojekt ist Teil der
            <Link href="http://www.expedition-muensterland.de/" className="font-mono hover:text-spital-primary text-spital-secondary" label={"Expedition Münsterland"} />
            und wird in einer Kooperationdes Historischen Seminars, des Fachbereichs Geowissenschaften der Universität Münster und des Fachbereichs Design der
            Fachhochschule Münster durchgeführt.
          </p>
        </>
      ),
    },
    {
      id: "thanks",
      label: "Danke!",
      image: "",
      index: 99,
      inner: (
        <>
          <ul className="list-disc ml-6">
            <li>Leistungskurs Geschichte des Gymnasium Paulinum, Münster unter der Leitung von Thomas Deibert (Verortung des Lagers)</li>
            <li>Michael Bieber (Beratung)</li>
            <li>Wolfgang Hanne (Fotomaterial)</li>
            <li>Kathrin van der Meer und Marianne Vézinaud (Übersetzung)</li>
            <li>Jochen Wernsmann (Wegenutzung Haus Spital)</li>
            <li>Anja Gussek (Stadtarchiv Münster), Lukas Weingärtner (Tiefbauamt Stadt Münster)</li>
            <li>Wilhelm Klönne (Friedhofsverwaltung)</li>
            <li>Andreas Wienströer (Stadtwerke Münster)</li>
          </ul>
        </>
      ),
    },
    {
      id: "quellen",
      label: "Quellen",
      image: "",
      index: 99,
      inner: (
        <>
          <ul className="list-disc ml-6">
            <li>W. Hoffmann (Hrsg.), Hygiene. Handbuch der Ärztlichen Erfahrungen im Weltkriege 1914/1918. Bd. VII (Leipzig 1920);</li>
            <li>G. Pierre/A. Potage, Un Parc à Prisonnier. Haus-Spital près Münster-En-Westphalie (Lille 1920 – 1922);</li>
            <li>R. Van Emden, Prisoners of the Kaiser. The Last Pows of the Great War (Manchester 2000);</li>
          </ul>
          <p className="mt-4">
            <b className="font-semibold">Bildernachweise: </b> Die Bilder stammen aus den Beständen des Stadtarchivs Münster und aus dem
            Besitz von Wolfgang Hanne.
          </p>
        </>
      ),
    },
  ],
}

export const getChapterById = (artwork: SpitalArtwork, id: string) => artwork.chapters.find((chapter) => chapter.id === id)

export const getSpitalChapters = (artwork: SpitalArtwork): SpitalChapter[] =>
  artwork.chapters.filter((chapter) => chapter.category === SpitalCategory.Event)

export const getCampChapters = (artwork: SpitalArtwork): SpitalChapter[] =>
  artwork.chapters.filter((chapter) => chapter.category === SpitalCategory.Camp)


interface SpitalChapters {
  chapters: SpitalChapter[]
}

export interface SpitalChapter {
  id: string
  index?: number
  label: string
  category?: SpitalCategory
  image?: string
  inner: ReactNode
}
