import { Artwork } from "../core/Artwork";
import { date } from "../utils/helper";
import ArtworkView from "../views/ArtworkView";
import PageThumbnail from "../components/PageThumbnail";
import { PageDescription } from "../core/Page";
import SouthPoleRoutes from "./SouthPoleRoutes";

export const southPole: Artwork = {
  id: 'southpole',
  name: 'South Pole',
  description: 'The seven most important voyages of discovery to the South Pole.',
  year: 2000,
  size: { width: 1100, height: 950},
  defaultIndex: 1,
  layer: [
    {
      id: "layer1",
      name: "Base Map",
      description: "...",
      inner: <SouthPoleRoutes />
    }
  ],
  points: [

  ]
};

export const southPolePage : PageDescription =  {
  title: "South Pole",
  id: "southpole",
  description: "South Pole artwork to test my homepage.",
  tags: ["map"],
  date: date(5,5,2024),
  thumbnail: <PageThumbnail label="South Pole" color="sky"/>,
  element: <ArtworkView artwork={southPole} inner={<>
    <div className="absolute text-white text-4xl left-32 top-20 leading-14">
      The discovery of <br/> the South Pole
    </div>
    <div className="absolute text-white left-52 bottom-28 leading-14 w-24">
      {southPole.description}
    </div>
    </>
  } />
}

export default southPolePage;