import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Icon from './Icon'

interface SidepanelProps {
  visible?: boolean
  position?: 'left' | 'right'
  closable?: boolean
  label?: string
  children?: any
  className?: string
  scrollbar?: {
    className?: string
  },
  zIndex?: number
  width?: number
  full?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export interface Sidepanel2Controller {
  open: () => void
  close: () => void
  toggle: () => void
  scrollTo: (id: string) => void
}

interface SidepanelState {
  width: number
  visible: boolean
  scrollTo?: string
}

export const Sidepanel2 = forwardRef<Sidepanel2Controller, SidepanelProps>((props: SidepanelProps, ref) => {
  const { 
    children, 
    zIndex = 5, 
    width = window.screen.width < 500 ? window.screen.width : 300, 
    label = "", 
    closable, 
    visible = false, 
    position = 'left', 
    full,
    scrollbar,
    className,
    onOpen = () => {},
    onClose = () => {},
  } = props

  const scrollableContainer = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<SidepanelState>({
    visible: visible,
    width: full ? window.innerWidth : width
  })

  const fzIndex = state.visible ? zIndex + 2 : zIndex;

  useImperativeHandle(
    ref,
    () => ({
      open, 
      close,
      toggle,
      scrollTo
    }),
    []
  )

  useEffect(() => {
    if (state.visible) {
      const animationIsRunning = scrollableContainer.current?.getAnimations()
      if (animationIsRunning && animationIsRunning.length > 0) {
        animationIsRunning.forEach(a => a.onfinish = () => {
          scrollableContainer.current?.querySelector(`#${state.scrollTo}`)?.scrollIntoView({ behavior: 'smooth' })
        })
      } else {
        scrollableContainer.current?.querySelector(`#${state.scrollTo}`)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [state.scrollTo, state.width, state.visible])

  const calcTransformValue = () => {
    if (position === 'left') {
      return state.visible ? 0 : state.width * -1
    }
    if (position === 'right') {
      return state.visible ? 0 : state.width
    }
    return 0
  }

  // Scroll to a specific element
  const scrollTo = (id: string) => {
    onOpen()
    setState({ ...state, visible: true, scrollTo: id })
  }

  // Toggle the sidepanel in and out
  const toggle = () => {
    state.visible ? onClose() : onOpen();
    setState(prevState => {
      return { ...prevState, visible: !prevState.visible }
    })
  }

  const open = () => {
    onOpen()
    setState({ ...state, visible: true })
  }

  const close = () => {
    onClose()
    setState({ ...state, visible: false })
  }

  return (
    <div>
      <SidepanelControl closable={closable} active={state.visible} onClick={toggle} position={position} zindex={fzIndex + 1}  />
      <div
        ref={scrollableContainer}
        className={classNames(className,
          'w-full max-h-screen absolute transition-all top-0 h-full items-center overflow-hidden',
          {
            'left-0': position === 'left',
            'right-0': position === 'right'
          }
        )}
        style={{
          zIndex: fzIndex,
          transform: `translate(${calcTransformValue()}px, 0px)`,
          width: state.width
        }}
      >
        <div className='flex flex-col h-full'>
          {closable && (
            <div className={classNames('flex justify-start items-center px-4 py-1 text-gray-400', {
              'ml-8': position === 'left'
            })} >
              {label}
            </div>
          )}
          <div
            className={classNames(
              'grow p-4 overflow-y-auto scrollbar-thin scrollbar-track-rounded-full',
              scrollbar?.className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
})
Sidepanel2.displayName = 'Sidepanel2'

const SidepanelControl = ({ position, closable, active, zindex, onClick}: { zindex: number, position: 'left' | 'right', active: boolean, closable?: boolean, onClick: () => void}) => {
  return (
    <div className={
      classNames('absolute',
        {
          'hidden': !closable,
          'right-2': closable && position === 'right',
          'left-2': closable && position === 'left',
        }
      )} style={{
        zIndex: zindex
      }}>
      <Icon onIconOpen={position === 'left' ? ChevronRightIcon : ChevronLeftIcon} onIconClose={XMarkIcon} active={active} onClick={() => onClick()}  />
    </div>
  )

}
