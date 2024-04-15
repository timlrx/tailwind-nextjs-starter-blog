import { AreaChart } from 'lucide-react'

import siteMetadata from '@/data/siteMetadata'

const AnalyticsLink = () => {
  return (
    <button
      aria-label="Open analytics"
      type="button"
      className="dark:hover:bg-primary ml-1 mr-1 h-8 w-8 rounded p-1 hover:bg-gray-200 sm:ml-4"
      data-umami-event="nav-analytics"
      onClick={() => window.open(siteMetadata.analyticsURL, '_blank')}
    >
      <AreaChart strokeWidth={1.5} size={20} />
    </button>
  )
}

export default AnalyticsLink
