export interface Expedition {
  id: string
  name: string
  year: string
  position: {
    latitude: string
    longitude: string
  }
  route: {
    start: [number, number],
    end: [number, number]
  },
  distance: number
  description: string
  display: MapPosition
}

export interface MapPosition {
  x: number
  y: number
  r?: number // Optional rotation
}

/**
 * An object representing the title of the content. 
 */
export const title = {
  label: <>
    <p>
      The Race
    </p>
    <p>
      to the
    </p>
    <p>
      South Pole
    </p>
  </>
}

export const description = "The South Pole was first reached by Norwegian explorer Roald Amundsen and his team on December 14, 1911, during the Fram Expedition. Amundsen’s team arrived ahead of British explorer Robert Falcon Scott, who reached the pole on January 17, 1912. Tragically, Scott and his entire team perished on the return journey due to harsh conditions and a lack of supplies."

/**
 * A list of historical Antarctic expeditions with detailed information.
 * 
 * Each expedition object contains the following properties:
 * 
 * @property {string} id - A unique identifier for the expedition.
 * @property {string} name - The name of the expedition.
 * @property {string} year - The years during which the expedition took place.
 * @property {Object} position - The geographical coordinates of the expedition's notable position.
 * @property {string} position.latitude - The latitude of the position.
 * @property {string} position.longitude - The longitude of the position.
 * @property {Object} route - The start and end coordinates of the expedition's route.
 * @property {number[]} route.start - The starting coordinates of the route.
 * @property {number[]} route.end - The ending coordinates of the route.
 * @property {Object} display - Display properties for visual representation on a map.
 * @property {number} display.x - The x-coordinate for display.
 * @property {number} display.y - The y-coordinate for display.
 * @property {number} display.r - The rotation angle for display.
 * @property {number} distance - The distance covered by the expedition in kilometers.
 * @property {string} description - A brief description of the expedition and its significance.
 */
export const expeditions: Expedition[] = [
  {
    id: 'scott',
    name: "Scott's Terra-Nova-Expedition",
    year: "1910 – 1913",
    position: {
      latitude: "-90.0000",
      longitude: "0.0000"
    },
    route: {
      start: [2660, 738],
      end: [1705, 1295]
    },
    display: {
      x: 2705,
      y: 700,
      r: -30
    },
    distance: 0.00,
    description: "Led by Robert Falcon Scott, the Terra Nova Expedition aimed to be the first to reach the South Pole. Unfortunately, Scott and his team arrived second after Amundsen and perished on their return journey."
  },
  {
    id: 'amundsen',
    name: "Amundsen's Fram-Expedition",
    year: "1910 – 1912",
    position: {
      latitude: "-90.0000",
      longitude: "0.0000"
    },
    display: {
      x: 2810,
      y: 880,
      r: -20
    },
    route: {
      start: [2750, 910],
      end: [1705, 1295]
    },
    distance: 0.00,
    description: "Norwegian explorer Roald Amundsen led this expedition, becoming the first person to reach the South Pole on December 14, 1911. His meticulous planning and use of sled dogs contributed to the success."
  },
  {
    id: 'nimrod',
    name: "Nimrod-Expedition",
    year: "1907 – 1909",
    position: {
      latitude: "-88.2300",
      longitude: "162.0000"
    },
    display: {
      x: 2867,
      y: 1068,
      r: -10
    },
    route: {
      start: [2800, 1100],
      end: [1775, 1280]
    },
    distance: 197.70,
    description: "Led by Ernest Shackleton, the Nimrod Expedition came within 180 km of the South Pole, the closest any expedition had come at the time. Shackleton's decision to turn back likely saved his team from disaster."
  },
  {
    id: 'discovery',
    name: "Discovery-Expedition",
    year: "1901 – 1904",
    position: {
      latitude: "-82.1700",
      longitude: "164.0000"
    },
    display: {
      x: 2884,
      y: 1273,
      r: 0
    },
    route: {
      start: [2810, 1300],
      end: [2090, 1295]
    },
    distance: 874.51,
    description: "The British National Antarctic Expedition, led by Robert Falcon Scott, was primarily a scientific and exploration venture. It marked Scott's first major journey to Antarctica and laid the groundwork for future expeditions."
  },
  {
    id: 'cross',
    name: "Southern-Cross-Expedition",
    year: "1898 – 1900",
    position: {
      latitude: "-78.5000",
      longitude: "163.0000"
    },
    display: {
      x: 2865,
      y: 1480,
      r: 10
    },
    route: {
      start: [2810, 1490],
      end: [2246, 1390]
    },
    distance: 1284.31,
    description: "Carsten Borchgrevink's Southern Cross Expedition was the first to winter on the Antarctic continent. It also achieved the first confirmed landing on the Ross Ice Shelf and important scientific observations."
  },
  {
    id: 'belgica',
    name: "Die Belgica-Expedition",
    year: "1897 – 1899",
    position: {
      latitude: "-70.5000",
      longitude: "85.0000"
    },
    display: {
      x: 2815,
      y: 1665,
      r: 20
    },
    route: {
      start: [2750, 1675],
      end: [2460, 1570]
    },
    distance: 2177.20,
    description: "Led by Adrien de Gerlache, the Belgica Expedition became the first to overwinter in Antarctica, though the crew did so unintentionally. It provided vital experience for future expeditions to the polar regions."
  },
  {
    id: 'cook',
    name: "James Cook",
    year: "1772 – 1775",
    position: {
      latitude: "-71.0000",
      longitude: "106.9000"
    },
    display: {
      x: 2735,
      y: 1870,
      r: 30
    },
    route: {
      start: [2665, 1850],
      end: [2390, 1690]
    },
    distance: 2121.42,
    description: "James Cook's second voyage is often credited as the first to cross the Antarctic Circle, although he never sighted the continent. His voyages laid the foundation for future explorations of the southern latitudes."
  }
]


export const SouthPoleSummary = () => <div className="flex flex-col w-full">
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