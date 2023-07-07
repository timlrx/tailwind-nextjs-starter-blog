import { allAuthors } from 'contentlayer/generated'
import About from './About'

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default')
  return <About author={author} />
}
