import classNames from 'classnames';
import React from 'react';

// Define the props for the component
interface TextLinkProps {
  href: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export const TextLink = ({
  href,
  className,
  style,
  label,
}: TextLinkProps) => {
  return (
    <a
      href={href}
      className={classNames("mx-2 text-nowrap hover:underline hover:underline-offset-[6px]", className)}
      style={{ ...style }}
    >
      {label}
    </a>
  );
};
