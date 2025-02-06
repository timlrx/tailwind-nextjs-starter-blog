import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import { getAllTags } from "@/lib/tags"
import kebabCase from "@/lib/utils/kebabCase"
import useTranslation from "next-translate/useTranslation"

export async function getStaticProps({ defaultLocale, locale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ""
  const tags = await getAllTags("p", otherLocale)

  return { props: { tags, locale, availableLocales: locales } }
}

export default function Tags({ tags, locale, availableLocales }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`${t("headerNavLinks:tags")} - ${siteMetadata.author}`}
        description={t("SEO:tags")}
        availableLocales={availableLocales}
      />{" "}
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
