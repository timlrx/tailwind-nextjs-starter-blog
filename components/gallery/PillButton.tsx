import type { ReactNode, MouseEventHandler } from 'react'

type PillButtonProps = {
  children: ReactNode
  className?: string
  tooltip?: string
  standalone?: boolean
  href?: string
  onClick?: MouseEventHandler
  'aria-label'?: string
  target?: string
  rel?: string
}

export function PillButton({
  children,
  className,
  tooltip,
  standalone = false,
  href,
  onClick,
  'aria-label': ariaLabel,
  target,
  rel,
}: PillButtonProps) {
  const containerClasses = [
    'group relative',
    standalone
      ? 'pointer-events-auto inline-flex rounded-full bg-white p-1.5 shadow-[0_1px_6px_rgb(0_0_0/0.08)] ring-1 ring-black/5 dark:bg-[#1a1a1a] dark:shadow-[0_1px_6px_rgb(0_0_0/0.3)] dark:ring-white/10'
      : '',
  ]
    .filter(Boolean)
    .join(' ')

  const surfaceClassName = [
    'cursor-pointer rounded-full text-[#555] transition-colors duration-150 hover:bg-black/6 hover:text-[#111] dark:text-[#aaa] dark:hover:bg-white/8 dark:hover:text-white',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const surface = href ? (
    <a className={surfaceClassName} href={href} target={target} rel={rel} aria-label={ariaLabel}>
      {children}
    </a>
  ) : onClick ? (
    <button className={surfaceClassName} onClick={onClick} type="button" aria-label={ariaLabel}>
      {children}
    </button>
  ) : (
    <div className={surfaceClassName}>{children}</div>
  )

  return (
    <div className={containerClasses}>
      {surface}
      {tooltip ? (
        <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-[0.45rem] -translate-x-1/2 rounded bg-[#222] px-2 py-1 text-[0.65rem] whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-[#eee] dark:text-black">
          {tooltip}
        </span>
      ) : null}
    </div>
  )
}
