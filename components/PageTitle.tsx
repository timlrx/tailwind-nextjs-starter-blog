import { ReactNode } from 'react'
import { H1 } from './Typography'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return <H1>{children}</H1>
}
