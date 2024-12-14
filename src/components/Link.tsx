import classNames from 'classnames'
import React from 'react'


/**
 * Props for the TextLink component.
 * 
 * @property {string} href - The URL that the link points to.
 * @property {string} label - The text to display for the link.
 * @property {string} [className] - Optional CSS class name to apply to the link.
 * @property {React.CSSProperties} [style] - Optional inline styles to apply to the link.
 */
interface Link {
  href: string
  label: string
  className?: string
  style?: React.CSSProperties
}

/**
 * A functional component that renders a styled anchor (`<a>`) element.
 */
export const Link = ({
  href,
  className,
  style,
  label,
}: Link) => {
  const linkClassNames = "mx-2 text-nowrap hover:underline hover:underline-offset-[6px]"

  return (
    <a
      href={href}
      className={classNames(linkClassNames, className)}
      style={style}
    >
      {label}
    </a>
  )
}
