import { CSSProperties, Fragment, ReactNode, createContext, useContext, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Icon from "./Icon";

/**
 * Interface representing the properties required to show an overlay.
 *
 * @property showOverlay - A function that takes `ShowOverlayProps` as an argument and displays the overlay.
 */
interface ShowOverlay {
  showOverlay: (props: ShowOverlayProps) => void;
}

/**
 * Props for the ShowOverlay component.
 *
 * @property {string} [label] - Optional label for the overlay.
 * @property {ReactNode} children - The content to be displayed inside the overlay.
 * @property {boolean} [full] - If true, the overlay will cover the full screen.
 * @property {string} [contentClassName] - Optional class name for the content container.
 * @property {string} [backdropClassName] - Optional class name for the backdrop.
 */
interface ShowOverlayProps {
  label?: string;
  children: ReactNode;
  full?: boolean;
  contentClassName?: string;
  backdropClassName?: string;
}

/**
 * Represents the state of the Overlay component.
 *
 * @property {boolean} visible - Indicates whether the overlay is visible.
 * @property {ReactNode} children - The content to be displayed within the overlay.
 * @property {string} [label] - An optional label for the overlay.
 * @property {boolean} [full] - An optional flag to indicate if the overlay should take up the full screen.
 * @property {string} [contentClassName] - An optional class name for the content within the overlay.
 * @property {string} [backdropClassName] - An optional class name for the backdrop of the overlay.
 */
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

/**
 * Props for the OverlayProvider component.
 *
 * @property {ReactNode} children - The child components to be rendered within the provider.
 * @property {boolean} [initialVisible] - Optional prop to control the initial visibility of the overlay.
 */
interface OverlayProviderProps {
  children: ReactNode;
  initialVisible?: boolean;
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
      <Overlay key={overlayState.visible ? "visible" : "hidden"} {...overlayState} onClose={() => setOverlayState({ ...overlayState, visible: false })} />
      {children}
    </OverlayContext.Provider>
  );
};

/**
 * Props for the Overlay component.
 *
 * @property {string} [label] - Optional label for the overlay.
 * @property {boolean} [visible] - Determines if the overlay is visible.
 * @property {ReactNode} [children] - Content to be rendered inside the overlay.
 * @property {() => void} [onClose] - Callback function to be called when the overlay is closed.
 * @property {CSSProperties} [style] - Custom styles for the overlay.
 * @property {boolean} [full] - If true, the overlay will take up the full screen.
 * @property {string} [contentClassName] - Additional class name for the content of the overlay.
 * @property {string} [backdropClassName] - Additional class name for the backdrop of the overlay.
 */
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
 * 
 * @param {OverlayProps} props - Properties to customize the overlay
 * @returns {JSX.Element}
 */
export default function Overlay(props: OverlayProps) {
  const {
    children,
    style,
    label,
    visible = false,
    onClose = () => {},
    full,
    contentClassName,
    backdropClassName,
  } = props;
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
            <Icon primary={XMarkIcon} onClick={onClose} />
          </div>
          <div
            className={classNames("pr-2 grow overflow-y-auto", "scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800  w-full ")}
          >
            {children}
          </div>
        </div>
        <div className={classNames("w-full h-full absolute top-0 left-0", backdropClassName, "bg-gray-950/50")} onClick={() => onClose()} />
      </div>
    </OverlayContainer>
  );
}

/**
 * OverlayContainer component to handle transition effects
 * 
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
