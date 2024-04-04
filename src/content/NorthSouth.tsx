import  NorthSouth from "./NorthSouthRoutes";
import { ImageLoader } from "../components/Image";
import { Artwork } from "../core/Artwork";
import { date } from "../utils/helper";
import ArtworkView from "../views/ArtworkView";
import PageThumbnail from "../components/PageThumbnail";
import { PageDescription } from "../core/Page";
import Grid from "../components/Grid";

export const northSouth: Artwork = {
  id: 'northsouth',
  name: 'NorthSouth',
  description: 'The map shows the most important voyages to the Poles between 1772 and 1928.',
  year: 2022,
  size: { width: 5000, height: 3500},
  defaultIndex: 3,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "Base map from the South and North Pole.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/northsouth/northsouth1.jpg" />
    },
    {
      id: "layer2",
      name: "Routes",
      description: "...",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/northsouth/northsouth3.jpg" />
    },
    {
      id: "layer3",
      name: "Description",
      description: "Layers with descriptions of the map.",
      inner: <ImageLoader src="https://stsvengrav.blob.core.windows.net/stsvengrav/northsouth/northsouth4.jpg" />
    },
    {
      id: "layer4",
      name: "Routes",
      description: "",
      inner: <div className=" bg-black/70"><NorthSouth/></div>
    },
  ]
};

export const northSouthPage : PageDescription =  {
  title: "North South",
  id: "northsouth",
  description: "The map shows the most important voyages to the Poles between 1772 and 1928.",
  date: date(5,5,2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail src="https://stsvengrav.blob.core.windows.net/stsvengrav/northsouth/panel.png" color="orange"/>,
  element: <ArtworkView artwork={northSouth} inner={<>
  <Grid />
    <div className="absolute text-white text-2xl z-10 rotate-90 origin-top-left top-0 left-28 align-text-bottom  uppercase "> 
      {northSouth.name}
    </div>
    <div className="absolute text-white  bottom-28 left-20 w-32 ">
    {northSouth.description}
    </div></>
  } />
}

export default northSouthPage;