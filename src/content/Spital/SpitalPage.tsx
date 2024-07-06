import PageThumbnail from "../../components/PageThumbnail";
import { PageDescription } from "../../core/Page";
import { date } from "../../utils/helper";
import { spital } from "./Spital";
import SpitalView from "./SpitalView";

export const spitalPage: PageDescription = {
  title: spital.name,
  id: "spital",
  description: "I spy with my little eye.",
  date: date(5, 5, 2024),
  tags: ["art", "map"],
  thumbnail: <PageThumbnail label="I spy." color="indigo" />,
  element: <SpitalView artwork={spital} />,
};

export default spitalPage;
