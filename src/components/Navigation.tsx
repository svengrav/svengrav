import { Bars3Icon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { router } from "..";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Transition, TransitionChild } from '@headlessui/react'
import Icon from "./Icon";
import { PageDescription } from "../core/Page";
import classNames from "classnames";

interface NavigationProps {
  isOpen?: boolean,
  showSubtitle?: boolean
}

/**
 * Navigation
 * @param Navigation props 
 * @returns 
 */
export default function Navigation({ showSubtitle = false, isOpen = false }: NavigationProps) {
  const currentRouter = router;
  const location = useLocation();
  const [showNavigation, setShowNavigation] = useState(isOpen);
  const [hiddenAttribute, setHiddenAttribute] = useState(true)

  return (
    <div className="w-min">

      {/** toggle */}
      <Icon Primary={Bars3Icon} Secondary={XMarkIcon} border active={showNavigation} onClick={() => setShowNavigation(!showNavigation)} hover />

      <div className={`absolute left-0 w-full h-[calc(100%-_48px)] z-50 top-12 ${hiddenAttribute ? "hidden" : "visible"}`} >
        <Transition show={showNavigation}>

          {/** navigation */}
          <TransitionChild
            enter=" ease duration-500 transform "
            enterFrom="-translate-x-96"
            enterTo="translate-x-0"
            leave=" ease duration-500 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-96"
            afterLeave={() => { setHiddenAttribute(true) }}
            beforeEnter={() => { setHiddenAttribute(false) }}
          >
            <div className="md:max-w-96 w-full bg-gray-950 text-white h-full -translate-x-0 z-50">
              <h1 className="mb-4">Navigation</h1>
              {
                currentRouter.routes.map(route => {

                  const panel = route.handle as PageDescription;
                  const linkStyle = classNames("border-white/20 hover:bg-gray-700 border-b text-base flex p-2 items-center ", {
                    "bg-white text-black hover:bg-gray-200": pathIsActive(location.pathname, route.path)
                  });

                  if(panel.hidden)
                    return <div key={route.id} />;


                  return (
                    <a key={route.id} href={route.path} className={linkStyle} >
                      <ChevronRightIcon className="h-4 w-4 mx-2" />
                      <div className="ml-2">
                        <h1 className="flex w-full items-center">{panel.title}</h1>
                        {
                          show(showSubtitle, <p className="text-xs text-left text-gray-500 mt-1 truncate">{panel.description}</p>)
                        }
                      </div>
                    </a>
                  )
                })
              }
            </div>
          </TransitionChild>

          {/** background layer */}
          <TransitionChild
            enter=" ease duration-500 transition "
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" ease duration-500 transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="absolute h-full w-full bg-gray-950/70 -z-10 left-0 top-0"
              onClick={() => setShowNavigation(false)} />
          </TransitionChild>

        </Transition>
      </div>
    </div>
  )
}

const show = (condition: boolean | undefined, a: any, b?: any) => condition ? a : b ? b : <></>;

const pathIsActive = (path: string | undefined, location: string | undefined): boolean => {
  return handlePath(location) === handlePath(path)
}

const handlePath = (path: string | undefined) => {
  return path?.startsWith('/') ? path : "/" + path
}