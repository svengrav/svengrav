import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles.css'
import {
  Navigate,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './views/HomeView'
import { threePage } from './content/Three'
import castlePage from './content/Castle'
import northSouthPage from './content/NorthSouth'
import jamesCookPage from './content/JamesCook'
import { PageDescription } from './core/Page'
import newZealandPage from './content/NewZealand'
import columbusPage from './content/Columbus'
import southPolePage from './content/SouthPole'
import { routeLabPage } from './content/Lab'
import spitalPage from './content/Spital/SpitalPage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const pages = [
  northSouthPage,
  threePage,
  castlePage,
  jamesCookPage,
  newZealandPage,
  columbusPage,
  routeLabPage,
  southPolePage,
  spitalPage
]

const homePage = <><Navigate replace to='/' /><Home panels={pages} /></>

export const router = createBrowserRouter([
  {
    path: '/',
    id: 'home',
    handle: {
      title: 'Home'
    } as PageDescription,
    errorElement: homePage,
    element: homePage
  },
  ...pages.map(page => {
    return {
      path: page.id,
      id: page.id,
      handle: page,
      element: page.element
    }
  })
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
