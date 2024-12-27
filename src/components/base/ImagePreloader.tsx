import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { Logo } from '@assets/icons'
import { read } from 'fs'

interface ImageProps {
  children?: React.ReactNode
  sources?: string[]
}

/**
 * Shows an loader until Image has been loaded.
 * @param src source reference
 * @param alt alternative text for the image
 * @returns image element
 */
export const ImagePreloader = ({ sources = [], children }: ImageProps) => {
  const [ready, setReady] = useState(false)
  console.log("ImagePreloader: Loading images", ready)
  imagePreload(sources).then(() => {
    setReady(true)
  })

  if (!ready) {
    return <div className=" text-white h-full w-full bg-gray-950 items-center justify-center flex">
      <div>
        <Logo className="bg-transparent animate-[spin_5s_ease-in-out_infinite] duration-100 fill-gray-100 h-24 m-auto " />
        <span className="text-gray-400 mt-4 text-sm">Loading...</span>
      </div>
    </div>
  }
  return (
    <Transition
      appear={true}
      show={ready}
      enter='transition-opacity ease-linear duration-500'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity ease-linear duration-500'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div>{children}</div>
    </Transition>
  )
}

const imagePreload = (imageSources: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!imageSources || imageSources.length === 0) {
      resolve() // Kein Bild zu laden
      return
    }

    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))

      })
    }

    // Alle Bild-Promises sammeln und auflösen
    Promise.all(imageSources.map(loadImage))
      .then(() => resolve())
      .catch((err) => reject(err))
  })
}