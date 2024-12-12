import { CSSProperties, Fragment, ReactNode, createContext, useContext, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Icon from "./Icon";

interface ShowOverlay {
  showOverlay: (props: ShowOverlayProps) => void;
}

interface ShowOverlayProps {
  label?: string;
  children: ReactNode;
  full?: boolean;
  contentClassName?: string;
  backdropClassName?: string;
}

interface OverlayState {
  visible: boolean;
  children: ReactNode;
  label?: string;
  full?: boolean;
  contentClassName?: string;
  backdropClassName?: string;
}

const OverlayContext = createContext<ShowOverlay | undefined>(undefined);

/**
 * Custom hook to use the overlay context
 */
export const useOverlay = () => useContext(OverlayContext);

interface OverlayProviderProps {
  children: ReactNode;
  initialVisible?: boolean; // Add a prop to control initial visibility
}

export const OverlayProvider = ({ children, initialVisible = false }: OverlayProviderProps) => {
  const [overlayState, setOverlayState] = useState<OverlayState>({
    visible: initialVisible, // Use the initialVisible prop here
    children: null,
    label: "Information",
    full: false,
    contentClassName: "",
    backdropClassName: "",
  });

  /**
   * Function to show the overlay
   * @param {ShowOverlayProps} props - Properties to customize the overlay
   */
  const showOverlay = ({ full, children, label, contentClassName, backdropClassName }: ShowOverlayProps) => {
    setOverlayState({
      visible: true,
      children: children,
      label: label,
      full: full,
      contentClassName: contentClassName,
      backdropClassName: backdropClassName,
    });
  };

  return (
    <OverlayContext.Provider value={{ showOverlay }}>
      <Overlay {...overlayState} onClose={() => setOverlayState({ ...overlayState, visible: false })} />
      {children}
    </OverlayContext.Provider>
  );
};

interface OverlayProps {
  label?: string;
  visible?: boolean;
  children?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
  full?: boolean;
  contentClassName?: string;
  backdropClassName?: string;
}

/**
 * Overlay component to display modal content
 * @param {OverlayProps} props - Properties to customize the overlay
 * @returns {JSX.Element}
 */
export default function Overlay(props: OverlayProps) {
  const { children, style, label, visible = false, onClose = () => {}, full, contentClassName, backdropClassName } = props;
  return (
    <OverlayContainer show={visible}>
      <div className={classNames("h-full w-full flex")}>
        {/* scrollable content */}
        <div
          className={classNames("flex flex-col h-full w-full relative z-10 m-auto p-4 justify-center items-center", contentClassName, {
            "max-w-3xl": !full,
            "bg-gray-950 text-white": true,
          })}
          style={style}
        >
          <div
            className={classNames("flex w-full font-semibold items-center text-lg mb-4 cursor-pointer justify-end ", {
              "!justify-between": label,
            })}
          >
            {label}
            <Icon onIconOpen={XMarkIcon} onClick={onClose} />
          </div>
          <div
            className={classNames("pr-2 grow overflow-y-auto", "scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800  w-full ")}
          >
            {children}
          </div>
        </div>
        <div className={classNames("w-full h-full absolute top-0 left-0", backdropClassName, "bg-gray-950/50")} onClick={onClose} />
      </div>
    </OverlayContainer>
  );
}

/**
 * OverlayContainer component to handle transition effects
 * @param {show: boolean, children: ReactNode} props - Properties to customize the container
 * @returns {JSX.Element}
 */
const OverlayContainer = ({ show, children }: { show: boolean; children: ReactNode }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <div className="w-full h-[calc(100vh_-_48px)] fixed top-12 z-50 flex">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </TransitionChild>
      </div>
    </Transition>
  );
};
