import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Banner from '@/components/Banner'
export default function Home() {
  return (
    <div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Banner />
    </div>
  )
}
