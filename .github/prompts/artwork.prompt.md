---
name: artwork
description: Use this prompt to create a new artwork content page for the project.
---

# New Content Page

Create a new content page for the project. Follow the existing patterns.

Each content page gets its own directory under `src/content/<name>/`.
After creating the page, add a row to the **Artworks** table in `README.md` with the artwork name linked to its live URL (`https://www.svengrav.de/<id>`).

## Structure

Every content page consists of two objects:

1. **`Artwork`** — image data, layers, dimensions
2. **`PageDescription`** — metadata, thumbnail, view element

## Simple Page

For pure artwork pages without custom logic (like `HappyHour.tsx`, `Cafe.tsx`):

```tsx
// src/content/mycontent/MyContent.tsx

import { ImageLoader } from '@components/base/ImageLoader'
import PageThumbnail from '@components/page/PageThumbnail'
import { Artwork } from '@components/artwork/Artwork'
import { PageDescription } from '@components/page/PageDescription'
import { date } from '@core/date'
import ArtworkView from '../../views/ArtworkView'
import { PagePanel } from '@components/page/PagePanel'

export const myContent: Artwork = {
  id: 'mycontent',               // URL slug — lowercase, no spaces
  name: 'My Content',
  description: 'Short description.',
  year: 2025,
  size: { width: 2000, height: 2700 }, // original image dimensions in px
  defaultIndex: 0,               // active layer on open (0-based)
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
  date: date(1, 1, 2025),        // date(day, month, year)
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

## Complex Page (subfolder)

Use a subfolder (`src/content/mycontent/`) when:
- custom data types or interfaces are needed
- separate map or route components exist
- the `Artwork` type is extended (e.g. `Artwork & { chapters: Chapter[] }`)

Use `southpole/` or `Spital/` as a reference.

## Register in App.tsx

After creating the file, register the page in `src/App.tsx`:

```tsx
// 1. Add import
import myContentPage from './content/mycontent/MyContent'

// 2. Add to contentPages[]
const contentPages = [
  // ... existing pages ...
  myContentPage,
]
```

The route is generated automatically from `PageDescription.id`.

## Add to README.md

Add a row to the **Artworks** table in `README.md`:

```md
| [**My Content**](https://www.svengrav.de/mycontent) | Short description. |
```

## Required Fields

| Field | Type | Description |
|---|---|---|
| `id` | `string` | URL slug — unique, lowercase |
| `name` | `string` | Display name |
| `description` | `string` | Short description |
| `year` | `number` | Year of creation |
| `size` | `{ width, height }` | Original dimensions in px |
| `defaultIndex` | `number` | Active layer on open |
| `layer` | `ArtworkLayer[]` | At least one layer |
| `date` | `Date` | via `date(day, month, year)` |
| `tags` | `PageTag[]` | `'art'` or `'map'` |
| `thumbnail` | `ReactNode` | `<PageThumbnail src="..." />` |
| `element` | `ReactElement` | View component |

## Optional Fields

- `hidden: true` — hide page from the overview
- `navigator: false` on `ArtworkView` — hide layer navigation
- `points` on `Artwork` — interactive points on the artwork
