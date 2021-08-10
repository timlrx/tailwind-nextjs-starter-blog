import { useRouter } from 'next/router'

import siteMetadata from '@/data/siteMetadata'

const Rss = () => {
  const { locale, defaultLocale } = useRouter()
  return (
    <link
      key={locale}
      rel="alternate"
      type="application/rss+xml"
      title={`${siteMetadata.title[locale]} - ${locale.toLocaleUpperCase()} RSS feed`}
      href={`/feed${locale === defaultLocale ? '' : `.${locale}`}.xml`}
    />
  )
}

export default Rss
