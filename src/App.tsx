import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./assets/styles.css";
import { cafePage } from "./content/cafe/Cafe";
import castlePage from "./content/castle/Castle";
import columbusPage from "./content/columbus/Columbus";
import jamesCookPage from "./content/jamescook/JamesCook";
import { routeLabPage } from "./content/lab/Lab";
import newZealandPage from "./content/newzealand/NewZealand";
import northSouthPage from "./content/northsouth/NorthSouth";
import southPolePage from "./content/southpole/SouthPole";
import spitalPage from "./content/spital/SpitalPage";
import { threePage } from "./content/three/Three";
import walspergerPage from "./content/walsperger/WalspergMap";
import happyHourPage from "./content/happyhour/HappyHour";
import montSaintMichelPage from "./content/montsaintmichel/MontSaintMichel";
import rathausPage from "./content/rathaus/Rathaus";
import lisbonPage from "./content/lisbon/Lisbon";
import stockholmPage from "./content/stockholm/Stockholm";
import { PageDescription } from "./components/page/PageDescription";
import HomeView from "./views/HomeView";

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
  happyHourPage,
  montSaintMichelPage,
  rathausPage,
  lisbonPage,
  stockholmPage,
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
