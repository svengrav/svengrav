import { useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowsPointingInIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  MagnifyingGlassPlusIcon,
  Square3Stack3DIcon,
  XMarkIcon
} from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/outline'
import Icon from '@components/base/Icon'
import classNames from 'classnames'
import { useCanvasContext } from './CanvasStateProvider'

interface CanvasNavigatorProps {
  className?: string,
  visible?: boolean
}

/**
 * CanvasNavigator component provides a side panel navigator for canvas properties and layers.
 * 
 * @param {Object} props - The component props.
 * @param {string} [props.className="md:w-96 md:absolute right-0 z-20"] - Optional class names for the component.
 *
 * @remarks
 * This component uses the `useCanvasContext` hook to access canvas state, including layer, transformed, and artwork properties.
 * It displays various properties such as width, height, position, scale, shrink, visibility, and layer information.
 * The visibility of the side panel can be toggled by clicking an icon.
 */
export function CanvasNavigator({ className = "md:w-96 md:absolute right-0 z-20", visible }: CanvasNavigatorProps) {
  const [isVisible, setVisible] = useState(visible)
  const canvasContext = useCanvasContext()
  const transformed = canvasContext.getTransformation()
  const context = canvasContext.getContext()
  const propertyStyles = 'text-sm font-medium flex text-gray-200'
  const windowWidth = window.innerWidth
  const isFullScreen = windowWidth < 600

  // Toggle visibility of the navigator panel
  const toggleVisibility = () => setVisible(!isVisible)

  return (
    <div className={className} >

      {/** Toggle button */}
      <div className='z-30 absolute right-0 text-white py-2 px-1'>
        <Icon primary={ChevronLeftIcon} secondary={XMarkIcon} active={isVisible} onClick={toggleVisibility} className='bg-gray-950 text-white ' />
      </div>

      {/** Navigator panel */}
      <CanavasNavigatorPanel show={isVisible} full={isFullScreen}>
          {/** header */}
          <div className='w-full p-2 flex items-center justify-between text-white cursor-pointer bg-gray-950/95'>
            <Square3Stack3DIcon className='h-5 w-5 mr-2' />Navigator
            <div className='h-5 w-5' />
          </div>

          {/** content */}
          <div className={classNames(
            'w-full relative p-2 bg-gray-950/95 text-white items-center',
            'overflow-y-auto scrollbar-thin scrollbar-track-rounded-full',
            'scrollbar-thumb-gray-600 scrollbar-track-gray-800'
          )} style={{ maxHeight: 'calc(100vh - 88px)' }}
          >
            <NavigatorSection title='Properties' open>
              <div className='grid grid-cols-3 gap-2 py-2 text-gray-300/80'>
                <dt className={propertyStyles}><ArrowRightIcon className='h-5 w-5 mr-2' />Width</dt>
                <dd className='col-span-2'> {transformed.size.width.toFixed(0)} / {context.artwork.size.width}</dd>

                <dt className={propertyStyles}><ArrowUpIcon className='h-5 w-5 mr-2' />Height</dt>
                <dd className='col-span-2'>{transformed.size.height.toFixed(0)} / {context.artwork.size.height}</dd>

                <dt className={propertyStyles}><ArrowsPointingInIcon className='h-5 w-5 mr-2' />Position</dt>
                <dd className='col-span-2'>{transformed.position.x.toFixed(0)}x / {transformed.position.y.toFixed(0)}y</dd>

                <dt className={propertyStyles}><MagnifyingGlassPlusIcon className='h-5 w-5 mr-2' />Scale</dt>
                <dd className='col-span-2'>{transformed.scale.current?.toFixed(2)} / {transformed.scale.max.toFixed(2)}</dd>

                <dt className={propertyStyles}><EyeIcon className='h-5 w-5 mr-2' />Progress</dt>
                <dd className='col-span-2'>{(transformed.layer.progress).toFixed(0)} %</dd>

                <dt className={propertyStyles}><Bars3Icon className='h-5 w-5 mr-2' />Layer</dt>
                <dd className='col-span-2'>{transformed.layer.index} / {transformed.layer.layers.length}</dd>
              </div>
            </NavigatorSection>
            {
              transformed.layer.layers.map((v, i) => {
                const artworkLayer = context.artwork.layer[i]
                return <NavigatorSection key={i} title={artworkLayer.name} open={transformed.layer.index === i + 1}>{artworkLayer.description}</NavigatorSection>
              })
            }
          </div>
      </CanavasNavigatorPanel>
    </div>
  )
};

/**
 * Props for the NavigatorSection component.
 * 
 * @interface NavigatorSectionProps
 * 
 * @property {string} [title] - The title of the section.
 * @property {React.ReactNode} children - The content to be rendered within the section.
 * @property {boolean} [open] - Indicates whether the section is open or closed.
 */
interface NavigatorSectionProps {
  title?: string
  children: any
  open?: boolean
}

/**
 * A component that renders a section within a navigator with a collapsible panel.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the section.
 * @param {React.ReactNode} props.children - The content to be displayed within the collapsible panel.
 * @param {boolean} [props.open=false] - A flag indicating whether the panel should be open by default.
 *
 */
const NavigatorSection = ({ title, children, open = false }: NavigatorSectionProps) => {
  return (
    <div className='p-1 border-b border-b-gray-900'>
      <Disclosure defaultOpen={open} key={'' + open}>
        {({ open }) => (
          <>
            <DisclosureButton className='flex w-full justify-between py-2'>
              <span>{title}</span>
              <Icon primary={ChevronDownIcon} secondary={ChevronUpIcon} active={open} />
            </DisclosureButton>
            <DisclosurePanel className='text-gray-300/80'>
              {children}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

interface CanavasNavigatorPanelProps {
  show?: boolean
  children?: any
  full?: boolean
}

const CanavasNavigatorPanel = ({
  children,
  show = false,
  full
}: CanavasNavigatorPanelProps) => {
  const PANEL_WIDTH = 400
  const actualWidth = full ? window.innerWidth : PANEL_WIDTH

  return (
    <div className='w-min max-h-10'>
      <div
        className='absolute transition-all top-0 right-0 h-full z-20 '
        style={{
          transformOrigin: 'top right',
          transform: `translate(${show ? 0 : actualWidth}px)`,
          width: actualWidth
        }}
      >
        {children}
      </div>
    </div>
  )
}
