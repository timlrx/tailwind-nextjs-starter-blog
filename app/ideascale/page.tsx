import Card from '@/components/common/Card'
import ideascaleData from '@/data/ideascaleData'
import { genPageMetadata } from 'app/seo'
import { allProjects } from 'contentlayer/generated'
export const metadata = genPageMetadata({ title: 'Ideascale' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
            Our Ideascale Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {ideascaleData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
