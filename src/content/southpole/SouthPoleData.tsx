export interface Expedition {
    id: string;
    name: string;
    year: string;
    position: {
      latitude: string;
      longitude: string;
    };
    route: {
        start: [number, number],
        end: [number, number]
    },
    distance: number;
    description: string;
  }
  
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
        start: [2660,738],
        end: [1700,1290]
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
      route: {
        start: [2750,910],
        end: [1700,1290]
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
      route: {
        start: [2800,1100],
        end: [1775,1280]
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
      route: {
        start: [2810,1300],
        end: [2090,1295]
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
      route: {
        start: [2810,1490],
        end: [2246,1390]
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
      route: {
        start: [2750,1675],
        end: [2460,1570]
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
      route: {
        start: [2665,1850],
        end: [2390,1690]
      },
      distance: 2121.42,
      description: "James Cook's second voyage is often credited as the first to cross the Antarctic Circle, although he never sighted the continent. His voyages laid the foundation for future explorations of the southern latitudes."
    }
  ];
  