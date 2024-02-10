import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
  title: string
}

export default function SectionLayout({ children, title }: Props) {
  return (
    <div className="my-8 divide-y divide-gray-200 dark:divide-gray-700">
      <h1 className="mb-4 mt-8 text-2xl font-extrabold leading-5 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-7">
        {title}
      </h1>
      <SectionContainer>{children}</SectionContainer>
    </div>
  )
}
