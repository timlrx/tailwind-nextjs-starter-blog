import projectsData from '@/data/projectsData';
import Card from '@/components/Card';
import { genPageMetadata } from 'app/seo';
import Link from 'next/link';

export const metadata = genPageMetadata({ title: 'Projects' });

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            This page lists my side projects worked on in my own time. I have
            more on the way soon!
            <br />
            You can also read about what I'm currently up to at work on my{' '}
            <Link
              href="/about"
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to about page`}
            >
              about page
            </Link>
            .
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
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
  );
}
