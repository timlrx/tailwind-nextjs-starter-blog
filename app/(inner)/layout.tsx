import { NullFooter } from '@/components/NullFooter'
import SectionContainer from '@/components/SectionContainer'

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionContainer>
      <div className="flex min-h-screen flex-col justify-between pt-14 font-sans">
        <main className="mb-auto">{children}</main>
        <NullFooter />
      </div>
    </SectionContainer>
  )
}
