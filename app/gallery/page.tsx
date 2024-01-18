import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'Gallery' })

export default function About() {
  return (
    <iframe title="Gallery" className="w-full h-screen" src="https://gallery.hansking.cn"></iframe>
  )
}
