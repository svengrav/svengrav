import PageThumbnail from "../../components/PageThumbnail";
import { PageDescription } from "../../core/Page";
import { date } from "../../utils/helper";
import { spital } from "./Spital";
import SpitalView from "./SpitalView";

export const spitalPage: PageDescription = {
  title: spital.name,
  id: "spital",
  description: "The history of the Haus Spital prisoner-of-war camp in Münster.",
  date: date(1, 8, 2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail color="indigo" src="https://stsvengrav.blob.core.windows.net/stsvengrav/spital/spital-thumbnail.png" />,
  element: <SpitalView artwork={spital} />,
};

export default spitalPage;
