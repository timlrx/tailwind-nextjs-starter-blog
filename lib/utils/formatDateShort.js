import siteMetadata from '@/data/siteMetadata'

const formatDateShort = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDateShort
