import { NextSeo } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function About() {
  return (
    <>
      <NextSeo
        title={`About - ${siteMetadata.author}`}
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: `About - ${siteMetadata.author}`,
        }}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 items-start">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <img src={siteMetadata.image} alt="avatar" className="w-48 h-48 rounded-full" />
            <h3 className="text-2xl leading-8 font-bold tracking-tight pt-4 pb-2">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Professor of Atmospheric Science</div>
            <div className="text-gray-500 dark:text-gray-400">Stanford University</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="facebook" href={siteMetadata.facebook} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
            </div>
          </div>
          <div className="prose dark:prose-dark max-w-none pt-8 pb-8 xl:col-span-2">
            <p>
              Tails Azimuth is a professor of atmospheric sciences at the Stanford AI Lab. His
              research interests includes complexity modelling of tailwinds, headwinds and
              crosswinds.
            </p>
            <p>
              He leads the clean energy group which develops 3D air pollution-climate models, writes
              differential equation solvers, and manufactures titanium plated air ballons. In his
              free time he bakes raspberry pi.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique
              placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem
              nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
