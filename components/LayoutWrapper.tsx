import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Header from './Header'
import { NullFooter } from './NullFooter'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <NullFooter />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
