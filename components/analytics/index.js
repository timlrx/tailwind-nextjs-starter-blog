import GA from "./GoogleAnalytics"
import Plausible from "./Plausible"
import SimpleAnalytics from "./SimpleAnalytics"
import Umami from "./Umami"
import siteMetadata from "@/data/siteMetadata"
import { GoogleAnalytics } from "nextjs-google-analytics"

const isProduction = process.env.NODE_ENV === "production"

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}
      {/* {siteMetadata.analytics.googleAnalyticsId && (
        <GoogleAnalytics
          trackPageViews
          gaMeasurementId={siteMetadata.analytics.googleAnalyticsId}
        />
      )} */}
    </>
  )
}

export default Analytics
