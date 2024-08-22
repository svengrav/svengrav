import PageThumbnail from "../../components/PageThumbnail";
import { PageDescription } from "../../core/Page";
import { date } from "../../utils/helper";
import { spital } from "./Spital";
import SpitalView from "./SpitalView";

export const spitalPage: PageDescription = {
  title: spital.name,
  id: "spital",
  description: "The history of the Haus Spital prisoner-of-war camp in Münster.",
  date: date(5, 5, 2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail label="2024 | 2014 | 1914" color="indigo" />,
  element: <SpitalView artwork={spital} />,
};

export default spitalPage;
