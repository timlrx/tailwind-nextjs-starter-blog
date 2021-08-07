import siteMetadata from '@/data/siteMetadata'

const formatDate = (date, locale) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  console.log('locale : ', locale)
  const now = new Date(date)
    .toLocaleDateString(locale, options)
    .split(' ') // needed to be congruent with en (uperCamelCase)
    .map((e) => e[0].toUpperCase() + e.substring(1))
    .join(' ')

  return now
}

export default formatDate
