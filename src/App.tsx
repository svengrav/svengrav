import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./assets/styles.css";
import { cafePage } from "./content/Cafe";
import castlePage from "./content/Castle";
import columbusPage from "./content/Columbus";
import jamesCookPage from "./content/JamesCook";
import { routeLabPage } from "./content/Lab";
import newZealandPage from "./content/NewZealand";
import northSouthPage from "./content/NorthSouth";
import southPolePage from "./content/southpole/SouthPole";
import spitalPage from "./content/Spital/SpitalPage";
import { threePage } from "./content/Three";
import walspergerPage from "./content/walsperger/WalspergMap";
import { PageDescription } from "./components/page/PageDescription";
import HomeView from "views/HomeView"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// List of all content pages
const contentPages = [
  cafePage,
  northSouthPage,
  threePage,
  castlePage,
  jamesCookPage,
  newZealandPage,
  columbusPage,
  routeLabPage,
  southPolePage,
  spitalPage,
  walspergerPage,
];

// Home / Root page element
const homePageElement = (
  <>
    <Navigate replace to="/" />
    <HomeView panels={contentPages} />
  </>
);
const homePage = {
  path: "/",
  id: "home",
  handle: {
    title: "Home",
  } as PageDescription,
  errorElement: homePageElement,
  element: homePageElement,
};

// Sort pages by date descending
const sortDateDescending = (a: PageDescription, b: PageDescription): number => new Date(b.date).getTime() - new Date(a.date).getTime();

// Create router
export const router = createBrowserRouter([
  homePage,
  ...contentPages.sort(sortDateDescending).map((page) => {
    return {
      path: page.id,
      id: page.id,
      handle: page,
      element: page.element,
    };
  }),
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
