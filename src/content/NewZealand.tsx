import NewZealandRoutes from "./NewZealandRoutes";
import { ImageLoader } from "../components/Image";
import PageThumbnail from "../components/PageThumbnail";
import { Artwork } from "../core/Artwork";
import { date } from "../utils/helper";
import { PageDescription } from "../core/Page";
import ArtworkView from "../views/ArtworkView";

export const newZealand: Artwork = {
  id: 'newzealand',
  name: 'New Zealand',
  description: 'New Zealand artwork to test my homepage.',
  year: 2000,
  size: { width: 3300, height: 4400},
  defaultIndex: 1,
  layer: [
    {
      id: "layer1",
      name: "Map of New Zealand",
      description: "New Zealand based on James Cooks Voyage in October 1769.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/newzealand/newzealand1.jpg" />
    },
    {
      id: "layer2",
      name: "Schematic view",
      description: "High-contrast visualisation of the routes. Comparison of the modern map with James Cook's map.",
      inner: <NewZealandRoutes />
    },
  ],
  points: [
  ]
};

export const newZealandPage : PageDescription =  {
  title: "New Zealand",
  id: "newzealand",
  description: "Artwork of the map of New Zealand based on the first map made by James Cook in 1769.",
  date: date(5,5,2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail color={"indigo"} label="New Zealand" />,
  element: <ArtworkView artwork={newZealand} />
}

export default newZealandPage;