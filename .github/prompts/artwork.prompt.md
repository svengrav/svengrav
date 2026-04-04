---
name: artwork
description: Describe when to use this prompt
---

# New Content Page

Erstelle eine neue Content-Seite für das Projekt. Folge dem bestehenden Muster.

Je Content Page erstelle ein Verzeichnis unter src/content

## Struktur

Jede Content-Seite besteht aus zwei Objekten:

1. **`Artwork`** — Bilddaten, Layer, Größe
2. **`PageDescription`** — Metadaten, Thumbnail, View-Element

## Einfache Seite (einzelne Datei)

Für reine Artwork-Seiten ohne eigene Logik (wie `HappyHour.tsx`, `Cafe.tsx`):

```tsx
// src/content/MyContent.tsx

import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '@components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const myContent: Artwork = {
  id: 'mycontent',               // URL-slug, lowercase, keine Leerzeichen
  name: 'My Content', 
  description: 'Short description.',
  year: 2025, // Jahr
  size: { width: 2000, height: 2700 }, // Standard Size des Images
  defaultIndex: 0,               // Index des Standard-Layers (0-basiert)
  layer: [
    {
      id: 'layer1',
      name: 'Layer Name',
      inner: (
        <ImageLoader src='https://stsvengrav.blob.core.windows.net/stsvengrav/mycontent/image.jpg' />
      )
    },
  ],
}

export const myContentPage: PageDescription = {
  title: myContent.name,
  id: myContent.id,
  description: myContent.description,
  date: date(1, 1, 2025),        // date(tag, monat, jahr)
  tags: ['art'],                 // 'art' | 'map'
  thumbnail: (
    <PageThumbnail
      src='https://stsvengrav.blob.core.windows.net/stsvengrav/mycontent/thumbnail.jpg'
    />
  ),
  element: (
    <ArtworkView artwork={myContent} inner={
      <PagePanel
        position="left"
        width={400}
        closable
        visible
        label=""
        className="bg-gray-950 text-gray-200"
        scrollbar={{ className: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900" }}
      >
        <h1 className='text-white text-2xl text-center py-4'>
          {myContent.name}
        </h1>
        <div className='h-0.5 bg-gray-500 w-10 m-auto my-5' />
        <div className='text-center'>
          {myContent.description}
        </div>
      </PagePanel>
    } />
  )
}

export default myContentPage
```

## Komplexe Seite (Unterordner)

Verwende einen Unterordner (`src/content/mycontent/`) wenn:
- eigene Datentypen oder Interfaces nötig sind
- separate Map- oder Route-Komponenten existieren
- der Artwork-Typ erweitert wird (z.B. `Artwork & { chapters: Chapter[] }`)

Orientiere dich an `southpole/` oder `Spital/`.

## Registrierung in App.tsx

Nach dem Erstellen der Datei muss die Seite in `src/App.tsx` eingetragen werden:

```tsx
// 1. Import hinzufügen
import myContentPage from './content/MyContent'

// 2. In contentPages[] eintragen
const contentPages = [
  // ... bestehende Seiten ...
  myContentPage,
]
```

Die Route wird automatisch aus `PageDescription.id` generiert.

## Pflichtfelder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `string` | URL-slug, eindeutig, lowercase |
| `name` | `string` | Anzeigename |
| `description` | `string` | Kurzbeschreibung |
| `year` | `number` | Entstehungsjahr |
| `size` | `{ width, height }` | Originalmaße in px |
| `defaultIndex` | `number` | Aktiver Layer beim Öffnen |
| `layer` | `ArtworkLayer[]` | Mind. 1 Layer |
| `date` | `Date` | via `date(tag, monat, jahr)` |
| `tags` | `PageTag[]` | `'art'` oder `'map'` |
| `thumbnail` | `ReactNode` | `<PageThumbnail src="..." />` |
| `element` | `ReactElement` | View-Komponente |

## Optionale Felder

- `hidden: true` — Seite nicht in der Übersicht anzeigen
- `navigator: false` auf `ArtworkView` — Layer-Navigation ausblenden
- `points` auf `Artwork` — Interaktive Punkte auf dem Artwork
