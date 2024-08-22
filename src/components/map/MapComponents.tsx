import React, { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import spitalTheme from '../../content/Spital/SpitalTheme';

/**
 * Interface for position props.
 */
interface MapPosition {
  x: number;
  y: number;
  r?: number; // Optional rotation
}

/**
 * Props for the MapTitle component.
 */
interface MapTitleProps {
  id: string;
  position: MapPosition;
  title: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * A component representing a title on the map.
 * @param {MapTitleProps} props - The properties for the MapTitle component.
 * @returns {JSX.Element} The rendered MapTitle component.
 */
export const MapTitle = ({ id, position, title, style, className }: MapTitleProps): JSX.Element => {
  return (
    <div
      id={id}
      className={classNames('absolute', className)}
      style={{
        top: position.y,
        left: position.x,
        ...style,
      }}
    >
      {title}
    </div>
  );
};

/**
 * Props for the MapLabel component.
 */
interface MapLabelProps {
  id: string;
  position: MapPosition;
  label?: string;
  activeId?: string;
  onClick?: (id: string) => void;
  style?: CSSProperties;
  className?: string;
  activeClassName?: string;
  hoverClassName?: string;
}

/**
 * A component representing a label on the map.
 * @param {MapLabelProps} props - The properties for the MapLabel component.
 * @returns {JSX.Element} The rendered MapLabel component.
 */
export const MapLabel = ({ id, label, position, onClick, style, className, activeClassName, hoverClassName, activeId }: MapLabelProps): JSX.Element => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      className={classNames('absolute flex justify-center items-center cursor-pointer whitespace-nowrap font-semibold text-center', className, {
        [hoverClassName || '']: !!onClick,
        [activeClassName || '']: activeId === id,
      })}
      style={{
        left: position.x,
        top: position.y,
        transformOrigin: 'center',
        transform: `rotate(${position.r ?? 0}deg)`,
        ...style,
      }}
    >
      {label}
    </div>
  );
};

/**
 * Props for the MapPoint component.
 */
interface MapPointProps {
  id: string;
  position: MapPosition;
  onClick?: (id: string) => void;
  label?: string;
  active?: string;
  style?: CSSProperties;
  className?: string;
  activeClassName?: string;
  hoverClassName?: string;
}

/**
 * A component representing a point on the map.
 * @param {MapPointProps} props - The properties for the MapPoint component.
 * @returns {JSX.Element} The rendered MapPoint component.
 */
export const MapPoint = ({ id, label, active, className, position, style, onClick, activeClassName, hoverClassName }: MapPointProps): JSX.Element => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      className={classNames('rounded-md absolute w-5 h-5 text-center flex justify-center items-center cursor-pointer', className, {
        [activeClassName || '']: active === id,
        [hoverClassName || '']: !!onClick,
      })}
      style={{
        left: position.x,
        top: position.y,
        transform: `rotate(${position.r ?? 0}deg)`,
        ...style,
      }}
    >
      {label}
    </div>
  );
};


/**
 * Creates a connection between a source element and a target point on the map.
 * @param container - The container element that holds the map and source element.
 * @param mapId - The ID of the SVG element within the container where the connection path will be appended.
 * @param sourceId - The ID of the source element within the container.
 * @param target - The target position as an object with x and y coordinates.
 * @param style - Optional CSS properties to style the connection path.
 * @returns An object containing the connection details and methods to toggle, show, or hide the connection.
 */
export const createMapConnection = (container: HTMLDivElement, mapId: string, sourceId: string, target: MapPosition, style?: CSSProperties) => {
  const sourceElement = container.querySelector<HTMLDivElement>(`#${sourceId}`);
  if (!sourceElement) {
    console.error(`Source element with ID ${sourceId} not found`);
    return null;
  }

  const source = {
    x: sourceElement.offsetLeft + sourceElement.offsetWidth,
    y: sourceElement.offsetTop,
  };

  const connectionPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  connectionPath.id = `${sourceId}-to-${target.x}-${target.y}`;
  const pathData = `M ${source.x},${source.y} L ${target.x},${target.y}`;
  connectionPath.setAttribute("d", pathData);

  Object.assign(connectionPath.style, {
    transition: "opacity 0.5s, visibility 0.3s",
    stroke: spitalTheme.colors.spital.primary,
    strokeWidth: "0.5",
    opacity: "0",
    zIndex: "50",
    ...style,
  });

  const svgContainer = container.querySelector<SVGElement>(`#${mapId}`);
  if (!svgContainer) {
    console.error(`SVG container with ID ${mapId} not found`);
    return null;
  }

  // Create start rectangle
  const startRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  startRect.setAttribute("x", `${source.x - 1.5}`);
  startRect.setAttribute("y", `${source.y - 1.5}`);
  startRect.setAttribute("width", "3");
  startRect.setAttribute("height", "3");
  startRect.id = `${connectionPath.id}-rect`;
  Object.assign(startRect.style, {
    opacity: "0",
    fill: spitalTheme.colors.spital.primary,
    stroke: "none",
  });

  // Create end circle
  const endCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  endCircle.setAttribute("cx", `${target.x}`);
  endCircle.setAttribute("cy", `${target.y}`);
  endCircle.setAttribute("r", "2");
  endCircle.id = `${connectionPath.id}-circle`;
  Object.assign(endCircle.style, {
    opacity: "0",
    fill: spitalTheme.colors.spital.primary,
    stroke: "none",
  });

  svgContainer.appendChild(connectionPath);
  svgContainer.appendChild(startRect);
  svgContainer.appendChild(endCircle);

  const toggleVisibility = () => {
    const elements = container.querySelectorAll<SVGElement>(`#${connectionPath.id}, #${connectionPath.id}-rect, #${connectionPath.id}-circle`);
    elements.forEach(element => {
      element.style.opacity = element.style.opacity === "0" ? "1" : "0";
    });
  };

  const show = () => {
    const elements = container.querySelectorAll<SVGElement>(`#${connectionPath.id}, #${connectionPath.id}-rect, #${connectionPath.id}-circle`);
    elements.forEach(element => {
      element.style.opacity = "1";
    });
  };

  const hide = () => {
    const elements = container.querySelectorAll<SVGElement>(`#${connectionPath.id}, #${connectionPath.id}-rect, #${connectionPath.id}-circle`);
    elements.forEach(element => {
      element.style.opacity = "0";
    });
  };

  return {
    id: connectionPath.id,
    sourceId,
    start: source,
    end: target,
    toggleVisibility,
    show,
    hide,
  };
};
