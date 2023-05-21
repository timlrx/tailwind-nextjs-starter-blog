import Script from 'next/script'
import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
      <Script
        src="https://beamanalytics.b-cdn.net/beam.min.js"
        data-token="87bfba49-b685-4303-b41d-efe869dc8e28"
        async
      />
    </>
  )
}

export default Analytics
