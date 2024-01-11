import { ReactNode } from 'react'

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
      {children}
    </h1>
  )
}
