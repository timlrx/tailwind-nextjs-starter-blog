/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string
}

const CustomLink = ({ href = '', ...rest }: CustomLinkProps) => {
  const isInternalLink = href.startsWith('/')
  const isAnchorLink = href.startsWith('#')

  if (isInternalLink) {
    return <Link className="break-words" href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  )
}

export default CustomLink
