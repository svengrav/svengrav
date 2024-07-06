import PageThumbnail from "../components/PageThumbnail";
import { Artwork } from "../core/Artwork";
import { PageDescription } from "../core/Page";
import { date } from "../utils/helper";
import ArtworkView from "../views/ArtworkView";
import { SpitalMap } from "./SpitalContent";

export const spital: Artwork = {
  id: 'spital',
  name: 'I spy with my little eye.',
  description: 'I spy with my little eye.',
  year: 2014,
  size: { width: 2000, height: 1200},
  defaultIndex: 1,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <SpitalMap />
    },
  ],
  points: [

  ]
};

export const spitalPage : PageDescription =  {
  title: "I spy with my little eye.",
  id: "spital",
  description: "I spy with my little eye.",
  date: date(5,5,2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail label="I spy." color="indigo"/> ,
  element: <ArtworkView artwork={spital} />
}

export default spitalPage;

