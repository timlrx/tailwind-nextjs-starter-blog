import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Link from '@/components/Link'
import { PageSeo } from '@/components/SEO'

export default function Projects() {
  return (
    <>
      <PageSeo
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap -m-4">
            {projectsData.map((d) => (
              <div className="p-4 md:w-1/2" key={d.title}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 dark:border-gray-700 rounded-md overflow-hidden">
                  <Link href={d.href} aria-label={`Link to ${d.title}`}>
                    <Image
                      alt={d.title}
                      src={d.imgSrc}
                      className="lg:h-48 md:h-36 object-cover object-center"
                      width={721}
                      height={401}
                    />
                  </Link>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold leading-8 tracking-tight mb-3">
                      <Link href={d.href} aria-label={`Link to ${d.title}`}>
                        {d.title}
                      </Link>
                    </h2>
                    <p className="prose text-gray-500 max-w-none dark:text-gray-400 mb-3">
                      {d.description}
                    </p>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={d.href}
                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        aria-label={`Link to ${d.title}`}
                      >
                        Learn more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
