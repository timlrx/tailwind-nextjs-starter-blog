import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import TimelineEntry from '@/components/timeline/TimelineEntry'
import experienceData from '@/data/experienceData'
import educationData from '@/data/educationData'
import Skill from '@/components/Progress'
import SectionLayout from '@/layouts/SectionLayout'
import skillsData from '@/data/skillsData'
import dynamic from "next/dynamic";

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

    const Map = dynamic(() => import("../../components/Map"), {
        ssr: false
    });

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>

      <Map />

      <SectionLayout title={'Experience'}>
        <div className="container mt-8">
          <div className="flex grid-cols-12 flex-col text-gray-50 md:grid">
            {experienceData.map((experienceDataEntry, index) => (
              <TimelineEntry key={`experience-entry-${index}`} entry={experienceDataEntry} />
            ))}
          </div>
        </div>
      </SectionLayout>

      <SectionLayout title="Skills">
        <div className="my-4 flex flex-wrap items-center justify-around gap-2">
          {skillsData.map((skill, index) => (
            <Skill key={`skill-${index}`} name={skill.title} percent={skill.percent} />
          ))}
        </div>
      </SectionLayout>

      <SectionLayout title={'Education'}>
        <div className="container mt-8">
          <div className="flex grid-cols-12 flex-col text-gray-50 md:grid">
            {educationData.map((educationEntry, index) => (
              <TimelineEntry key={`education-entry-${index}`} entry={educationEntry}>
                <p className="my-2 text-justify leading-tight text-gray-500">
                  {'Specialization: Software Engineering'}
                </p>
              </TimelineEntry>
            ))}
          </div>
        </div>
      </SectionLayout>
    </>
  )
}
