import { Transition } from "@headlessui/react";
import { useState } from "react";
import { Logo } from "../assets/icons";

interface ImageProps {
  src: string,
  alt?: string
}

/**
 * Shows an loader until Image has been loaded.
 * @param src source reference 
 * @returns image element
 */
export const ImageLoader = ({ src, alt }: ImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

  const img = new Image()
  img.src = src;
  img.onload = () => {
    setLoading(false)
    setTimeout(() => setVisible(true), 200)

  }
  return loading ? <>
    <div className=" text-white h-full w-full bg-gray-950 items-center justify-center flex">
      <div>
        <Logo className="bg-transparent animate-[spin_5s_ease-in-out_infinite] duration-100 fill-gray-100 hover:fill-emerald-500 h-24 m-auto " />
        <span className="text-gray-400 mt-4 text-sm">Loading...</span>
      </div>
    </div>
  </> :
    <Transition show={visible}
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <img src={img.src} alt={alt} />
    </Transition>
}
