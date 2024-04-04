import classNames from "classnames"

type PanelColor = 'emerald' | 'sky' | 'rose' | 'orange' | `indigo`

const panelColorVariants = {
  emerald: 'border-emerald-600 hover:bg-emerald-500 bg-emerald-400 from-emerald-600',
  sky: 'border-sky-600 hover:bg-sky-500 bg-sky-400 from-sky-600',
  rose: 'border-rose-600 hover:bg-rose-500 bg-rose-400 from-rose-600',
  orange: 'border-orange-600 hover:bg-orange-500 bg-orange-400 from-orange-600',
  indigo: 'border-indigo-600 hover:bg-indigo-500 bg-indigo-500 from-indigo-600',
}

interface PanelThumbnailProps {
  src?: string,
  label?: string,
  color?: PanelColor
}

const backgroundPattern = ``


/**
 * Renders a preview thumbnail for a panel.
 * @param src 
 * @param color 
 * @returns 
 */
export default function PageThumbnail({src, color = 'emerald', label = ''}: PanelThumbnailProps) {
  return (
    <div className={classNames(`h-full w-full rounded-md bg-gradient-to-r ${panelColorVariants[color]} hover:animate-pulse transition-all transform ` )} 
      style={{
        backgroundImage:  src ? `url(${src})` : backgroundPattern, 
        backgroundSize: "cover",
      
      
      }}> 
      <span className="text-2xl flex items-center justify-center h-full ">
        {label}
      </span> 
    </div>
  )
}