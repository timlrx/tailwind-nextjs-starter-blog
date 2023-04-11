import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import Hashtag from '@/components/Hashtag'
import formatDate from '@/lib/utils/formatDate'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <div className="mx-auto flex max-w-screen-lg flex-col py-12 px-4">
        <div className="relative mb-8 h-20 w-20 rounded-full border-2 border-gray-200 shadow-md">
          <Image
            src={`../../static/images/author.jpg`}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <p className="mb-4 text-2xl font-bold">Backend Engineer, Hiker, Climber.</p>
        <p className="mb-8 text-lg">
          When I am not workin I am usually hiking or climbing. I am usually posting online about
          programming career and technology that I work with, that includes.
        </p>
        <div className="flex w-full space-x-3">
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="5" />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="grid w-full max-w-screen-lg grid-cols-4 gap-10">
          <div className="relative h-80 w-full -rotate-3 transform rounded-lg border">
            <Image
              src={`../../static/images/did_hike.jpeg`}
              alt="Image 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative h-80 w-full rotate-2 transform rounded-lg border">
            <Image
              src={`../../static/images/did_climbing.jpeg`}
              alt="Image 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative h-80 w-full -rotate-3 transform rounded-lg border">
            <Image
              src={`../../static/images/did_work.jpeg`}
              alt="Image 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="relative h-80 w-full rotate-3 transform rounded-lg border">
            <Image
              src={`../../static/images/did_camp.jpeg`}
              alt="Image 4"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg py-12 px-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-2/3">
            <div className="space-y-6">
              {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date, title, summary, tags } = frontMatter
                return (
                  <a
                    key={slug}
                    className="font-size-1 group block rounded-xl p-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                  >
                    <p className="mt-3 mb-3 border-l-2 border-gray-200 p-0 pl-5 text-sm text-gray-500">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </p>
                    <h3 className="mb-2 text-xl font-bold">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-500">{summary}</p>
                    <p className="mt-2 font-bold text-purple-500 transition group-hover:text-purple-600">
                      Read more →
                    </p>
                  </a>
                )
              })}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="rounded-lg border border-gray-300 p-6">
              <h3 className="mb-4 text-2xl font-bold">Stay up to date</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-100">
                Get notified when I publish something new, and unsubscribe at any time.
              </p>
              <form className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="mb-4 rounded-lg border border-gray-300 py-2 px-4 focus:border-blue-300 focus:outline-none focus:ring"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-purple-600 bg-purple-500 py-2 text-white hover:bg-purple-600"
                >
                  Join
                </button>
              </form>
            </div>

            <div className=" mt-7 rounded-lg border border-gray-300 p-6">
              <h3 className="mb-4 text-2xl font-bold">Work</h3>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-grow">
                  <div className="mb-8 flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-gray-300">
                      <Image
                        alt="Nord VPN"
                        src="https://media.licdn.com/dms/image/C4E0BAQE7Fs46KFoosw/company-logo_100_100/0/1606975757334?e=1689206400&v=beta&t=PUwK9A592EC1ydFCYGStTgoCmdpDg6W0DKJZjqArdqY"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="mb-1">
                      <p className="text-lg font-bold">Nord VPN</p>
                      <p className="text-xs text-gray-500">Senior Backend Engineer</p>
                    </div>
                    <p className="ml-auto rounded-full border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-xs text-gray-500">
                      From 2022
                    </p>
                  </div>

                  <div className="mb-8 flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-gray-300">
                      <Image
                        alt="Billie"
                        src="https://media.licdn.com/dms/image/D4E0BAQFSujdc9NkEKg/company-logo_100_100/0/1666246505157?e=1689206400&v=beta&t=blS1I8TvtfIVfIl7xPPZT2jaKyX-5ObropNtfpIZ8OE"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="mb-1">
                      <p className="text-lg font-bold">Billie</p>
                      <p className="text-xs text-gray-500">Senior Backend Engineer</p>
                    </div>
                    <p className="ml-auto rounded-full border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-xs text-gray-500">
                      2019 — 2022
                    </p>
                  </div>
                  <div className="mb-8 flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-gray-300">
                      <Image
                        alt="Elba Tech"
                        src="https://media.licdn.com/dms/image/C4E0BAQENe9LVbMg7lA/company-logo_100_100/0/1608041272310?e=1689206400&v=beta&t=QFbpM_xU3KokAzp_aEa3qu0xYxLn6eo_Dy3zunEi3us"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="mb-1">
                      <p className="text-lg font-bold">Elba Tech</p>
                      <p className="text-xs text-gray-500">RPA Automation engineer</p>
                    </div>
                    <p className="ml-auto rounded-full border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-xs text-gray-500">
                      2018 — 2019
                    </p>
                  </div>
                  <div className="mb-8 flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-gray-300">
                      <Image
                        src="https://www.jaywalker-digital.ch/wp-content/themes/jd/images/logo-jaywalker-digital-single-darkblue.svg"
                        className="rounded-xl"
                        alt="Jaywalker Digital"
                      />
                    </div>
                    <div className="mb-1">
                      <p className="text-lg font-bold">Jaywalker Digital</p>
                      <p className="text-xs text-gray-500">Backend Engineer</p>
                    </div>
                    <p className="ml-auto rounded-full border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-xs text-gray-500">
                      2015 — 2018
                    </p>
                  </div>
                  <div className="mb-8 flex items-center">
                    <a
                      href="#"
                      className="w-full rounded-lg border border-gray-300 bg-gray-200 py-2 text-center text-gray-900 hover:bg-gray-300"
                    >
                      See CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
