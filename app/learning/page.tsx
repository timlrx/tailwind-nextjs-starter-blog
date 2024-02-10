import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import coursesData from '@/data/coursesData'

export const metadata = genPageMetadata({ title: 'Learning' })

export default function Learning() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Learning
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            I like to learn a new things by watching courses. I have over 80 or maybe more courses on variety of platforms. Here is a list of only completed ones. I plan to present it differently than the cards, but let assume it's ok now ;)
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {coursesData.map((course) => (
              <Card
                key={course.title}
                title={course.title}
                description={course.description}
                imgSrc={course.imgSrc}
                href={course.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
