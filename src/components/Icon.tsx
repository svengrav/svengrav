import classNames from "classnames";

type IconType = any;

interface IconProps {
  Primary: IconType,
  Secondary?: IconType,
  label?: string,
  active?: boolean,
  border?: boolean,
  dense?: boolean,
  className?: string,
  hover?: boolean,
  href?: string,
  onClick?: () => void
}

/**
 * Returns an icon element.
 */
export default function Icon({ 
  Primary, 
  Secondary,  
  label, 
  onClick, 
  href, 
  dense,
  className = "", 
  hover, 
  active, 
  border }: IconProps) {

  const classStyles = classNames('',
  {
    'text-white fill-white': !active,
    'bg-white text-black fill-black' : active,
    'border': border,
    'group-hover:bg-white group-hover:text-black group-hover:fill-black': hover && !active,
    'group-hover:bg-black group-hover:text-white group-hover:fill-white': hover && active
  })

  return (
    <div className={className}>
      <a href={href}>
      <div className="flex items-center group" onClick={onClick}>
        <div className="h-8 w-8 flex items-center justify-center cursor-pointer">
          <div className={classStyles} >
            { 
              active && Secondary ? <Secondary className={classNames("p-0.5", {
                "h-6 w-6": !dense,
                "h-4 w-4": dense,
              })} /> : <Primary className={classNames("", {
                "h-6 w-6": !dense,
                "h-4 w-4": dense,
              })} />
            }
          </div>
        </div>
        {
          label ? <span className="ml-1.5 text-base group-hover:text-emerald-400">{label}</span> : <></>
        }
      </div>
      </a>
    </div>
  )
}
