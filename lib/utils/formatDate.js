import siteMetadata from "@/data/siteMetadata"

const formatDate = (date, locale) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }

  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    return date
  }

  const formattedDate = dateObj.toLocaleDateString(locale, options)
  return formattedDate
}

export default formatDate
