import classNames from "classnames";
import { CSSProperties } from "react";

type IconType = any;

type IconState = "active" | "disabled" | "hover" | "default";

const ACTIVE_STYLE = {
  className: "text-white rounded-md"
}

const BASE_STYLE = {
  className: "text-white rounded-md",
};

interface IconStyle {
  style?: CSSProperties;
  className?: string;
}

interface IconProps {
  primary?: IconType;
  secondary?: IconType;
  active?: boolean;
  state?: IconState;
  label?: string;
  dense?: boolean;
  style?: CSSProperties;
  className?: string;
  activeStyle?: IconStyle;
  disabledStyle?: IconStyle;
  href?: string;
  onClick?: () => void;
}

/**
 * Returns an icon element.
 */
export default function Icon({
  primary: Primary,
  secondary: Secondary,
  label,
  onClick,
  href,
  dense,
  style,
  className,
  active,
  activeStyle = ACTIVE_STYLE,
  state = "default",
}: IconProps) {
  const isActive = state === "active" || active;
  const activeClassName = activeStyle.className ?? ACTIVE_STYLE.className;
  const defaultClassName = className ?? BASE_STYLE.className;
  const iconClassName = active ? activeClassName : defaultClassName;

  return (
    <div className={iconClassName} style={{ ...style, ...activeStyle.style }}>
      <a href={href}>
        <div className="flex items-center group cursor-pointer text-center grow justify-center" onClick={onClick}>
          {
            Primary && (
              <div className={classNames("h-8 w-8 flex items-center justify-center", label && " mr-1")}>
                {
                  isActive && Secondary ? (
                    <Secondary
                      className={classNames("p-0.5", {
                        "h-6 w-6": !dense,
                        "h-4 w-4": dense,
                      })}
                    />
                  ) : (
                     <Primary
                      className={classNames({
                        "h-6 w-6": !dense,
                        "h-4 w-4": dense,
                      })}
                    />
                  )
                }
                
              </div>
            )

          }
          {label}
        </div>
      </a>
    </div>
  );
}
