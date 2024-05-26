import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { ArrowRightIcon, ArrowUpIcon, ArrowsPointingInIcon, Bars3Icon, ChevronDownIcon, ChevronLeftIcon, ChevronUpIcon, MagnifyingGlassPlusIcon, Square3Stack3DIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { EyeIcon, } from "@heroicons/react/24/outline"
import { useState } from "react";
import Icon from "./Icon";
import classNames from "classnames";
import Sidepanel from "./Sidepanel";
import { ArtworkContext } from "../hooks/useArtworkContext";

interface NavigatorProps {
  state: ArtworkContext,
  className?: string
}

/**
 * Navigator displays the artwork properties.
 * @param Context
 * @returns 
 */
export function Navigator({ state, className }: NavigatorProps) {
  const layers = state.artwork.layer;
  const [visible, setVisible] = useState(window.screen.width > 580);
  const propertyStyles = "text-sm font-medium flex text-gray-200"
  return (
    <div className={className}>
      <div className="z-20 absolute right-0 text-white py-2 px-1 ">
        <div className="z-[21] absolute right-3">
          <Icon Primary={ChevronLeftIcon} Secondary={XMarkIcon} active={visible} onClick={() => setVisible(!visible)} hover />
        </div>
        <Sidepanel show={visible} full={window.screen.width < 500}>
          <div className="bg-gray-950">

            {/** header */}
            <div onClick={() => setVisible(!visible)} className='w-full p-2 flex items-center justify-between text-white cursor-pointer'>
              <Square3Stack3DIcon className='h-5 w-5 mr-2' />Navigator
              <div className="h-5 w-5"/>
            </div>

            {/** content */}
            <div className={classNames(
              'w-full max-h-screen relative p-2 bg-gray-950/95 text-white items-center',
              'overflow-y-auto scrollbar-thin scrollbar-track-rounded-full',
              'scrollbar-thumb-gray-600 scrollbar-track-gray-800',
            )}>
              <NavigatorSection title='Properties' open>
                <div className="grid grid-cols-3 gap-2 py-2 text-gray-300/80">
                  <dt className={propertyStyles}><ArrowRightIcon className='h-5 w-5 mr-2' />Width</dt>
                  <dd className="col-span-2"> {state.canvasSize.width.toFixed(0)} / {state.artwork.size.width}</dd>

                  <dt className={propertyStyles}><ArrowUpIcon className='h-5 w-5 mr-2' />Height</dt>
                  <dd className="col-span-2">{state.canvasSize.height.toFixed(0)} / {state.artwork.size.height}</dd>

                  <dt className={propertyStyles}><ArrowUpIcon className='h-5 w-5 mr-2' />Position</dt>
                  <dd className="col-span-2">{state.canvasPosition.x.toFixed(0)}x / {state.canvasPosition.y.toFixed(0)}y</dd>

                  <dt className={propertyStyles}><MagnifyingGlassPlusIcon className='h-5 w-5 mr-2' />Scale</dt>
                  <dd className="col-span-2">{state.canvasScale.toFixed(2)} / { state.canvasMaxScale.toFixed(2)}</dd>

                  <dt className={propertyStyles}><ArrowsPointingInIcon className='h-5 w-5 mr-2' />Shrink</dt>
                  <dd className="col-span-2">{(state.canvasShrink * 100).toFixed(0)} %</dd>

                  <dt className={propertyStyles}><EyeIcon className='h-5 w-5 mr-2' />Visiblity</dt>
                  <dd className="col-span-2">{(state.layerPercentage).toFixed(0)} %</dd>

                  <dt className={propertyStyles}><Bars3Icon className='h-5 w-5 mr-2' />Layer</dt>
                  <dd className="col-span-2">{state.layerIndex} / {state.artwork.layer.length}</dd>
                </div>
              </NavigatorSection>
              {
                layers.map((layer, i) => {
                  return <NavigatorSection key={i} title={layer.name} open={state.layerIndex === i + 1}>{layer.description}</NavigatorSection>;
                })
              }
            </div>
          </div>
        </Sidepanel>
      </div>

    </div>
  );
};

interface NavigatorSectionProps {
  title?: string,
  children: any,
  open?: boolean
}

function NavigatorSection({ title, children, open = false }: NavigatorSectionProps) {
  return (
    <div className="p-1  border-b border-b-gray-900">
      <Disclosure defaultOpen={open} key={"" + open}>
        {({ open }) => (
          <>
            <DisclosureButton className="flex w-full justify-between py-2">
              <span>{title}</span>
              <Icon Primary={ChevronDownIcon} Secondary={ChevronUpIcon} active={open} hover />
            </DisclosureButton>
            <DisclosurePanel className={"text-gray-300/80"}>
              {children}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}