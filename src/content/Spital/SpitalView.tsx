import Page from "../../components/Page";
import { Canvas } from "../../components/Canvas";
import { CanvasWrapper } from "../../components/CanvasWrapper";
import { useWindowResize } from "../../hooks/useWindowResize";
import { SpitalMap, SpitalMapController } from "./SpitalMap";
import { ReactNode, useRef, useState } from "react";
import Scalable from "../../components/Scalable";
import { Sidepanel2, Sidepanel2Controller } from "../../components/Sidepanel2";
import SpitalLogo from "./SpitalLogo";
import {
  SpitalArtwork,
  SpitalCategory,
  SpitalChapter,
  getCampChapters,
  getChapterById,
  getSpitalChapters,
} from "./Spital";
import { OverlayProvider, useOverlay } from "../../components/Overlay";
import classNames from "classnames";
import {
  ArrowDownRightIcon,
  ArrowsPointingOutIcon,
  ArrowUpLeftIcon,
} from "@heroicons/react/24/solid";
import Icon from "../../components/Icon";

const BASE_BUTTON_STYLE =
  "text-spital-primary hover:bg-spital-surface border-spital-primary tracking-widest rounded-md px-1 uppercase";
const ACTIVE_BUTTON_STYLE = "border ";
const SIDEPANEL_WIDTH = 500

// Define interfaces for SpitalView and SpitalState
interface SpitalViewProps {
  artwork: SpitalArtwork;
}

export enum SpitalViewAction {
  LeftPanelChanged = "leftPanelChanged",
  RightPanelChanged = "rightPanelChanged",
  ViewChanged = "viewChanged",
  ActiveChanged = "activeChanged",
}

interface SpitalViewActionParams {
  type: SpitalViewAction;
  activeId?: string;
  view?: SpitalCategory.Camp | SpitalCategory.Event;
  leftPanel?: "open" | "closed";
  rightPanel?: "open" | "closed";
}

interface SpitalViewState {
  activeId?: string;
  chapters: SpitalChapter[];
  view: SpitalCategory.Camp | SpitalCategory.Event;
  leftPanel: "open" | "closed";
  rightPanel: "open" | "closed";
  canvasWidth: number;
}

export default function SpitalView({ artwork }: SpitalViewProps) {
  // Retrieve chapters for the artwork
  const spitalChapters = getSpitalChapters(artwork);
  const campChapters = getCampChapters(artwork);
  const textIntro = getChapterById(artwork, "intro");
  const textIntroExtended = getChapterById(artwork, "intro-extended");
  const textSources = getChapterById(artwork, "quellen");
  const textThanks = getChapterById(artwork, "thanks");


  // Get window size and initialize state
  const { windowSize: window } = useWindowResize();
  const [viewState, setViewState] = useState<SpitalViewState>({
    activeId: undefined,
    chapters: campChapters,
    view: SpitalCategory.Camp,
    leftPanel: "open",
    rightPanel: "closed",
    canvasWidth: window.width,
  });

  // Use refs for the container and side panels
  const containerRef = useRef<HTMLDivElement>(null);
  const rightSidepanel = useRef<Sidepanel2Controller>(null);
  const leftSidepanel = useRef<Sidepanel2Controller>(null);

  // Define the map controller
  const mapController: SpitalMapController = {
    moveToCamp: () => {},
    moveToEvent: () => {},
    moveToPoint: () => {},
    onPointClick: (id) => {
      requestViewAction({ type: SpitalViewAction.ActiveChanged, activeId: id });
    },
  };

  const requestViewAction = (action: SpitalViewActionParams) => {
    setViewState((prevState) => {
      switch (action.type) {
        case SpitalViewAction.LeftPanelChanged:
          if (action.leftPanel === "open" && prevState.leftPanel !== "open") {
            rightSidepanel.current?.close();
            leftSidepanel.current?.open();
          } else if (action.leftPanel === "closed" && prevState.leftPanel !== "closed") {
            leftSidepanel.current?.close();
          }
          return {
            ...prevState,
            leftPanel: action.leftPanel ?? prevState.leftPanel,
            rightPanel: action.leftPanel === "open" ? "closed" : prevState.rightPanel,
          };

        case SpitalViewAction.RightPanelChanged:
          if (action.rightPanel === "open" && prevState.rightPanel !== "open") {
            leftSidepanel.current?.close();
            rightSidepanel.current?.open();
          } else if (action.rightPanel === "closed" && prevState.rightPanel !== "closed") {
            rightSidepanel.current?.close();
          }
          return {
            ...prevState,
            rightPanel: action.rightPanel ?? prevState.rightPanel,
            leftPanel: action.rightPanel === "open" ? "closed" : prevState.leftPanel,
          };

        case SpitalViewAction.ViewChanged:
          if (action.view !== prevState.view) {
            rightSidepanel.current?.close();
            if (action.view === SpitalCategory.Camp) {
              mapController.moveToCamp();
            } else if (action.view === SpitalCategory.Event) {
              mapController.moveToEvent();
            }
            return {
              ...prevState,
              view: action.view ?? prevState.view,
              chapters: action.view === SpitalCategory.Camp ? campChapters : spitalChapters,
            };
          }
          break;

        case SpitalViewAction.ActiveChanged:
          if (action.activeId !== prevState.activeId) {
            if (action.activeId) {
              mapController.moveToPoint(action.activeId);
              rightSidepanel.current?.scrollTo(action.activeId);
            }
            return { ...prevState, activeId: action.activeId };
          }
          break;

        default:
          console.warn(`Unhandled action type: ${action.type}`);
          break;
      }
      return prevState;
    });
  };

  // Update the artwork layer
  artwork.layer.pop();
  artwork.layer.push({
    id: "spital",
    name: "base map",
    inner: (
      <Scalable width={artwork.size.width} height={artwork.size.height}>
        <div className="w-full h-full overflow-hidden bg-spital-map-background">
          <SpitalMap controller={mapController} />
        </div>
      </Scalable>
    ),
  });

  return (
    <Page>
      <OverlayProvider>
        {/* Left side overview panel */}
        <Sidepanel2
          position="left"
          visible
          width={SIDEPANEL_WIDTH}
          closable
          ref={leftSidepanel}
          full={window.width < 600}
          className="bg-spital-surface text-spital-onSurface"
          scrollbar={{
            className:
              "scrollbar-thin scrollbar-thumb-spital-onSurface scrollbar-track-spital-surface",
          }}
          onOpen={() =>
            requestViewAction({ type: SpitalViewAction.LeftPanelChanged, leftPanel: "open" })
          }
          onClose={() =>
            requestViewAction({ type: SpitalViewAction.LeftPanelChanged, leftPanel: "closed" })
          }
        >
          <SpitalStory
            summary={textIntro?.inner}
            details={
              <>
                <h1 className="font-semibold mt-4">{textIntroExtended?.label}</h1>
                {textIntroExtended?.inner}

                <h1 className="font-semibold mt-4">{textThanks?.label}</h1>
                {textThanks?.inner}

                <h1 className="font-semibold mt-4">{textSources?.label}</h1>
                {textSources?.inner}
              </>
            }
          />
        </Sidepanel2>
        {/* Right side panel for chapters */}
        <Sidepanel2
          ref={rightSidepanel}
          position="right"
          closable
          width={SIDEPANEL_WIDTH}
          full={window.width < 600}
          className="bg-spital-surface text-spital-onPrimary pl-8"
          scrollbar={{
            className:
              "scrollbar-thin scrollbar-thumb-spital-onSurface scrollbar-track-spital-surface",
          }}
          onOpen={() =>
            requestViewAction({ type: SpitalViewAction.RightPanelChanged, rightPanel: "open" })
          }
          onClose={() =>
            requestViewAction({ type: SpitalViewAction.RightPanelChanged, rightPanel: "closed" })
          }
        >
          <div className="h-full w-full z-40">
            {viewState.chapters.map((chapter) => (
              <SpitalPanel
                id={chapter.id}
                active={viewState.activeId}
                index={chapter.index}
                label={chapter.label}
                imageUri={chapter.image}
                key={chapter.id}
                onClick={(id) =>
                  requestViewAction({ type: SpitalViewAction.ActiveChanged, activeId: id })
                }
              >
                {chapter.inner}
              </SpitalPanel>
            ))}
          </div>
        </Sidepanel2>

        {/* Main content area */}
        <div className="flex w-full h-full bg-spital-background" style={{ height: window.height - 50 }}>
          <div className="flex grow flex-col ">
            <div
              className={`bg-spital-map-background flex justify-center transition-transform duration-1000`}
              ref={containerRef}
              style={{
                transformOrigin: "left",
                transform:
                  viewState.leftPanel === "open"
                    ? "translateX(100px)"
                    : viewState.rightPanel === "open"
                    ? "translateX(-100px)"
                    : "translateX(0%)",
              }}
            >
              <CanvasWrapper
                artwork={artwork}
                size={{
                  height: window.height - 140,
                  width: viewState.canvasWidth - SIDEPANEL_WIDTH,
                }}
              >
                <Canvas />
              </CanvasWrapper>
            </div>
            <div className="shrink">
              <SpitalMapControl
                onToPath={() =>
                  requestViewAction({
                    type: SpitalViewAction.ViewChanged,
                    view: SpitalCategory.Event,
                  })
                }
                onToCamp={() =>
                  requestViewAction({
                    type: SpitalViewAction.ViewChanged,
                    view: SpitalCategory.Camp,
                  })
                }
                view={viewState.view}
              />
            </div>
          </div>
          <div
            className="w-0 lg:w-[440px] flex-none"
            style={{ transition: "width 2s", width: 0 }}
          />
        </div>
      </OverlayProvider>
    </Page>
  );
}

// Component for map control buttons
const SpitalMapControl = ({
  view,
  onToCamp: goToCamp,
  onToPath: goToEvent,
}: {
  view: SpitalCategory.Camp | SpitalCategory.Event;
  onToCamp: () => void;
  onToPath: () => void;
}) => {
  return (
    <div className="flex w-full justify-center py-4">
      <Icon
        onIconOpen={ArrowUpLeftIcon}
        label="Haus Spital"
        onClick={goToEvent}
        className={classNames(
          BASE_BUTTON_STYLE,
          view === SpitalCategory.Event && ACTIVE_BUTTON_STYLE
        )}
      />
      <Icon
        onIconOpen={ArrowDownRightIcon}
        label="Lager"
        onClick={goToCamp}
        className={classNames(
          BASE_BUTTON_STYLE,
          view === SpitalCategory.Camp && ACTIVE_BUTTON_STYLE,
          "ml-2"
        )}
      />
    </div>
  );
};

// Component for individual chapter panels
const SpitalPanel = ({
  id,
  label,
  children,
  index,
  imageUri,
  active,
  onClick,
}: {
  id: string;
  label: string;
  children: ReactNode;
  index?: number;
  imageUri?: string;
  active?: string;
  onClick?: (id: string) => void;
}) => {
  const overlay = useOverlay();

  const showOverlay = () => {
    overlay?.showOverlay({
      backdropClassName: "bg-spital-surface",
      contentClassName: "bg-spital-surface",
      full: true,
      children: (
        <div className="max-w-3xl m-auto">
          <img src={imageUri} className="mb-4 rounded-md" />
          {children}
        </div>
      ),
    });
  };
  return (
    <div key={id} className="bg-spital-surface text-spital-onSurface" id={id}>
      <div
        className={classNames(
          "cursor-pointer text-2xl font-semibold flex mb-2 items-center",
          {
            "text-spital-primary": active === id,
          }
        )}
      >
        {index && (
          <div className="mr-2 leading-5 text-2xl rounded-full items-center justify-center text-center">
            {index}
          </div>
        )}
        <div
          onClick={() => onClick != null && onClick(id)}
          className="uppercase tracking-[4px] hover:text-spital-primary"
        >
          {label}
        </div>
      </div>
      <div className="text-spital-onSurface leading-6">
        <div onClick={showOverlay} className="cursor-pointer relative group rounded-md overflow-hidden">
          <div className="absolute w-full h-full hidden group-hover:flex group-hover:bg-spital-primary/80 text-spital-onPrimary justify-center items-center">
            <ArrowsPointingOutIcon className="size-8" />
          </div>
          <img src={imageUri} alt="" />
        </div>
        <div className="my-4">{children}</div>
        <div className="w-12 border-b border-spital-onSurface mt-8 mb-8" />
      </div>
    </div>
  );
};

// Component for displaying the story with a "show more" button
const SpitalStory = ({ summary, details }: { summary: ReactNode; details: ReactNode }) => {
  const overlay = useOverlay();

  const showMore = () => {
    overlay?.showOverlay({
      backdropClassName: "bg-spital-surface",
      contentClassName: "bg-spital-surface !text-spital-onSurface",
      full: true,
      children: <div className="max-w-3xl m-auto">
        {details}
      </div>,
      label: "Das Projekt",
    })
  }

  return (
    <div className="m-4 flex flex-col">
      <div className="w-48 mb-4">
        <SpitalLogo />
        <p className="mt-4 font-semibold">Eine Münsteraner Geschichte</p>
      </div>
      {summary}
      <Icon
        onClick={showMore}
        className={classNames(BASE_BUTTON_STYLE, ACTIVE_BUTTON_STYLE, "mt-6")}
        label="Mehr erfahren"
      />
    </div>
  );
};
