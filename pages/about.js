import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <img src={siteMetadata.image} alt="avatar" className="w-48 h-48 rounded-full" />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400 text-center">
              Self-taught software developer and indie hacker
            </div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="github" href={siteMetadata.github} />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} />
              {/* TODO: Uncomment to add social icons */}
              {/* <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
              <SocialIcon kind="facebook" href={siteMetadata.facebook} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} /> */}
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
            <p>
              I am working full-time as a backend engineer - mainly with .NET and the Microsoft
              stack.
            </p>
            <p>
              In my free time, I am helping people eat healthier with{' '}
              <a href="https://skrummy.co" target="_blank" rel="noreferrer">
                Skrummy (still in development)
              </a>{' '}
              - mainly using Flutter, Firebase and NextJS.
            </p>
            <p>
              This blog is my personal knowledge base. When I learn something new (mostly related to
              the field of software engineering), I document it here for my future self.
            </p>
            <p>
              If you have any questions or feedback feel free to reach out on Twitter{' '}
              <a href="https://twitter.com/nwbotha" target="_blank" rel="noreferrer">
                @nwbotha
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
