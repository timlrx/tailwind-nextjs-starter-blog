import { demos } from '@/data/demos'
import { GalleryShell } from '@/components/gallery/GalleryShell'

export default function Page() {
  return <GalleryShell demos={demos} />
}
