import { ImageLoader } from "../components/Image";
import PageThumbnail from "../components/PageThumbnail";
import { Artwork } from "../core/Artwork";
import { PageDescription } from "../core/Page";
import { date } from "../utils/helper";
import ArtworkView from "../views/ArtworkView";

export const castle: Artwork = {
  id: 'castle',
  name: 'Castle ',
  description: 'Castle artwork to test my homepage.',
  year: 2000,
  size: { width: 1755, height: 1105},
  defaultIndex: 5,
  layer: [
    {
      id: "layer1",
      name: "Outlines",
      description: "Layer with outlines.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/castle4.png" />
    },
    {
      id: "layer2",
      name: "Golden",
      description: "Layer with golden roofs.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/castle3.png" />
    },

    {
      id: "layer1",
      name: "Blue",
      description: "Layer with blue roofs.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/castle1.png" />
    },
    {
      id: "layer1",
      name: "Red",
      description: "Layer with red roofs",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/castle2.png" />
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "...",
      inner: <div className="bg-rose-400 bg-gradient-to-tr from-red-500"> <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/castle6.png" /></div>
    },
  ],
  points: [

  ]
};

export const castlePage : PageDescription =  {
  title: "Castle",
  id: "castle",
  description: "Castle Artwork.",
  date: date(5,5,2024),
  tags: ["art"],
  thumbnail: <PageThumbnail src="https://stsvengrav.blob.core.windows.net/stsvengrav/castle/panel.png" color="rose"/> ,
  element: <ArtworkView artwork={castle} inner={
    <div className="absolute hidden lg:block text-gray-300 z-20 uppercase left-5 top-10 ">
      <h1 className="lg:text-8xl font-semibold "> { castle.name }</h1>
     
      <p className="mt-5">{ castle.description }</p>
      <div className="border-b w-20 mt-5" />
    </div>
  }/>,
}

export default castlePage;