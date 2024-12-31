import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { Logo } from '@assets/icons'

interface ImageProps {
  src: string
  alt?: string
}

/**
 * Shows an loader until Image has been loaded.
 * @param src source reference
 * @param alt alternative text for the image
 * @returns image element
 */
export const ImageLoader = ({ src, alt }: ImageProps) => {
  const [imageState, setImageState] = useState({
    loading: true,
    visible: false,
    img: new Image()
  })

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.complete ? setImageState(prevState => ({ ...prevState, loading: false, visible: true, img: img    })) : null
    img.onload = () => {
      setImageState(prevState => ({
        ...prevState,
        loading: false,
        visible: true,
        img: img
      }))
    }
  }, [src])

  if (imageState.loading) {
    return <div className=" text-white h-full w-full bg-gray-950 items-center justify-center flex">
      <div>
        <Logo className="bg-transparent animate-[spin_5s_ease-in-out_infinite] duration-100 fill-gray-100 h-24 m-auto " />
        <span className="text-gray-400 mt-4 text-sm">Loading...</span>
      </div>
    </div>
  }
  return <img src={imageState.img.src} alt={alt} />
}
