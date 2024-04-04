import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { Fragment, useState } from 'react'

type PointProps = {
  label: string,
  icon?: any,
  inner: any,
}

export default function Point({label, icon, inner }: PointProps) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <PointIcon onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/10" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-gray-950 p-6 text-left align-middle transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white flex justify-between" >
                    {label}
                    <XMarkIcon className='h-6 w-6 border border-gray-500 hover:text-emerald-500' onClick={closeModal} />
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-200">
                      {inner}
                    </p>
                  </div>
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

interface PointIconProps {
  children?: any, 
  onClick: () => void
}

function PointIcon({onClick, children} : PointIconProps) {
  return (<>
    <div onClick={onClick}>
      { children ? children : <div className={classNames(
        "border-2",
        "w-4",
        "h-4",
        "transform",
        "rotate-45",
        "hover:border-white/70",
        "cursor-pointer",
        "hover:rotate-0",
        "transition-all",
      )} onClick={onClick} />}
    </div>
  </>)
}

