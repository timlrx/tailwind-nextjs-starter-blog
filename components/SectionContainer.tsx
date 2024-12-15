import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="mx-auto max-w-3xl xl:max-w-7xl xl:px-0">{children}</section>
}
