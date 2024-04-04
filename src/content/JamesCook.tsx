import { ImageLoader } from "../components/Image";
import PageThumbnail from "../components/PageThumbnail";
import { Artwork } from "../core/Artwork";
import { PageDescription } from "../core/Page";
import { date } from "../utils/helper";
import ArtworkView from "../views/ArtworkView";

export const jamesCook: Artwork = {
  id: 'jamescook',
  name: 'James Cook',
  description: 'James Cook artwork to test my homepage.',
  year: 2000,
  size: { width: 2400, height: 3400},
  defaultIndex: 1,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/jamescook.jpg" />
    },
  ],
  points: [

  ]
};

export const jamesCookPage : PageDescription =  {
  title: "James Cook",
  id: "jamescook",
  description: "NorthSouth artwork to test my homepage.",
  date: date(5,5,2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail src="https://stsvengrav.blob.core.windows.net/stsvengrav/jamescook/panel.jpg" color="rose"/> ,
  element: <ArtworkView artwork={jamesCook} />
}

export default jamesCookPage;