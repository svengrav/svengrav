import { Bars3Icon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import { Transition, TransitionChild } from '@headlessui/react'
import Icon from './Icon'
import { PageDescription } from './PageDescription'
import classNames from 'classnames'
import { router } from '../App'

/**
 * Navigation component that displays a toggleable sidebar menu.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.showSubtitle=false] - Flag to show or hide the subtitle in the navigation items.
 * @param {boolean} [props.isOpen=false] - Initial state of the navigation menu (open or closed).
 *
 * @returns {JSX.Element} The rendered Navigation component.
 */
interface NavigationProps {
  showSubtitle?: boolean
  isOpen?: boolean
}

const Navigation = ({ showSubtitle = false, isOpen = false }: NavigationProps) => {
  const location = useLocation()
  const [showNavigation, setShowNavigation] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='w-min'>

      {/** Toggle navigation icon */}
      <Icon primary={Bars3Icon} secondary={XMarkIcon} active={showNavigation} onClick={() => setShowNavigation(!showNavigation)} />

      <div
        className={classNames(
          'absolute left-0 w-full h-[calc(100%-_48px)] z-50 top-12',
          isVisible ? 'visible' : 'hidden'
        )}
      >
        <Transition show={showNavigation}>

          {/** navigation */}
          <TransitionChild
            enter=' ease duration-500 transform '
            enterFrom='-translate-x-96'
            enterTo='translate-x-0'
            leave=' ease duration-500 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-96'
            afterLeave={() => { setIsVisible(false) }}
            beforeEnter={() => { setIsVisible(true) }}
          >
            <div className='md:max-w-96 w-full bg-base-background text-base-content h-full -translate-x-0 z-50'>
                <h1 className='mb-4 uppercase'>Menu</h1>
              {
                router.routes?.map((route, i) => {
                  const page = route.handle as PageDescription
                  const linkClassName = classNames('border-white/20 hover:bg-base-onSurface hover:text-base-surface border-b text-base flex p-2 items-center ', {
                    'bg-base-onSurface text-base-surface hover:bg-gray-200': isPathActive(location.pathname, route.path)
                  })

                  if (page.hidden || !route.path) {
                    return null
                  }

                  const pageRoutePath = normalizePath(route.path)

                  return (
                    <Link key={i} to={pageRoutePath} className={linkClassName} relative='route'>
                      <ChevronRightIcon className='h-4 w-4 mx-2' />
                      <div className='ml-2'>
                        <h1 className='flex w-full items-center'>{page.title}</h1>
                        {
                          showSubtitle && <p className='text-xs text-left text-gray-500 mt-1 truncate'>{page.description}</p>
                        }
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </TransitionChild>

          {/** background layer */}
          <TransitionChild
            enter=' ease duration-500 transition '
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave=' ease duration-500 transition'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              className='absolute h-full w-full bg-gray-950/70 -z-10 left-0 top-0'
              onClick={() => setShowNavigation(false)}
            />
          </TransitionChild>

        </Transition>
      </div>
    </div>
  )
}

const isPathActive = (path: string | undefined, location: string | undefined): boolean => {
  return normalizePath(location) === normalizePath(path)
}

const normalizePath = (path: string | undefined) => {
  return path?.startsWith('/') ? path : '/' + path
}

export default Navigation