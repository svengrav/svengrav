# svengrav

My personal collection of illustrated maps and artworks. Historical voyages, places, and stories brought to life with interactive layers. Maps, stories & illustrations, made with [heart@svengrav.de](https://www.svengrav.de) 👌.

Write me 📫[sven@svengrav.de](mailto:sven@svengrav.de)

## Artworks

Each piece lives under `src/content/<name>/` and is composed of layered SVG/image views with interactive controls.

| Artwork | Description |
|---|---|
| [**Cafe Balthazar**](https://www.svengrav.de/cafe) | Illustrated café near Rue Arcisse de Caumont in Caen (2024) |
| [**Castle**](https://www.svengrav.de/castle) | Layered castle illustration |  
| [**Voyages of Columbus**](https://www.svengrav.de/columbus) | Columbus' four Atlantic voyages from 1492 to 1504 |
| [**Explorations by James Cook**](https://www.svengrav.de/jamescook) | Cook's three Pacific voyages with interactive routes |
| [**New Zealand**](https://www.svengrav.de/newzealand) | Map of New Zealand based on Cook's 1769 voyage |
| [**NorthSouth**](https://www.svengrav.de/northsouth) | Polar expeditions between 1772 and 1928 |
| [**South Pole**](https://www.svengrav.de/southpole) | Interactive South Pole expedition map |
| [**Haus Spital**](https://www.svengrav.de/spital) | History of the Spital prisoner-of-war camp in Münster |
| [**Walsperger Map**](https://www.svengrav.de/walsperger) | Interactive medieval world map |
| [**Happy Hour**](https://www.svengrav.de/happyhour) | Illustration (2025) |
| [**Three**](https://www.svengrav.de/three) | Sample layered artwork |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Vitest** — unit tests
- **Azure Static Web Apps** — hosting

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and build for production |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `bash publish.sh` | Build and deploy to Azure |

## Project Structure

```
src/
  App.tsx             # Router setup
  assets/             # Global styles and theme
  components/         # Reusable UI components
  content/            # Artwork content (one folder per artwork)
  core/               # Utilities (geometry, animation, date, …)
  hooks/              # Custom React hooks
  views/              # Page-level view components
```


- Artwork Loader: The canvas should be shown when the full artwork is loaded.