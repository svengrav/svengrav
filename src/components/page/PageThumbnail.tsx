import { ImagePreloader } from '@components/base/ImagePreloader'
import classNames from 'classnames'

type PanelColor = 'emerald' | 'sky' | 'rose' | 'orange' | 'indigo'

const panelColorVariants = {
  emerald:
    'border-emerald-600 hover:bg-emerald-500 bg-emerald-400 from-emerald-600',
  sky: 'border-sky-600 hover:bg-sky-500 bg-sky-400 from-sky-600',
  rose: 'border-rose-600 hover:bg-rose-500 bg-rose-400 from-rose-600',
  orange: 'border-orange-600 hover:bg-orange-500 bg-orange-400 from-orange-600',
  indigo: 'border-indigo-600 hover:bg-indigo-500 bg-indigo-500 from-indigo-600'
}

const backgroundPattern = ''

/**
 * Props for the PanelThumbnail component.
 *
 * @interface PanelThumbnailProps
 * @property {string} [src] - The source URL for the thumbnail image.
 * @property {string} [label] - The label text for the thumbnail.
 * @property {PanelColor} [color] - The color theme for the panel.
 */
interface PanelThumbnailProps {
  src?: string
  label?: string
  color?: PanelColor
}


/**
 * Component to render a thumbnail with an optional background image, color, and label.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.src - The source URL of the background image.
 * @param {string} [props.color='emerald'] - The color variant for the background gradient.
 * @param {string} [props.label=''] - The label text to display in the center of the thumbnail.
 */
export const PageThumbnail = ({
  src,
  color = 'emerald',
  label = ''
}: PanelThumbnailProps) => {
  return (
    <ImagePreloader sources={src ? [src] : []} key={src}>
      <div
        className={classNames(
          `h-full w-full rounded-md bg-gradient-to-r hover:animate-pulse transition-all transform ${panelColorVariants[color]}`
        )}
        style={{
          backgroundImage: src ? `url(${src})` : backgroundPattern,
          backgroundSize: 'cover'
        }}
      >
        <span className='text-2xl flex items-center justify-center h-full '>
          {label}
        </span>
      </div>
    </ImagePreloader>
  )
}

export default PageThumbnail