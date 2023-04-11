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
      <div className="max-w-screen-lg mx-auto py-12 px-4 flex flex-col">
      <div className="relative w-20 h-20 shadow-md rounded-full mb-8 border-2 border-gray-200">
        <Image src={`../../static/images/author.jpg`} alt='Profile Picture' layout="fill" objectFit="cover" className="rounded-full" />
      </div>

        <p className="text-2xl font-bold mb-4">Backend Engineer, Hiker, Climber.</p>
        <p className="text-lg mb-8">
          When I am not workin I am usually hiking or climbing.
          I am usually posting online about programming career and technology that I work with, that includes.
        </p>
        <div className="flex w-full space-x-3">
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
          <SocialIcon kind="github" href={siteMetadata.github} size="5" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="5" />
        </div>

      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-10 w-full max-w-screen-lg">
          <div className="relative w-full h-80 transform -rotate-3 rounded-lg border">
            <Image src={`../../static/images/did_hike.jpeg`} alt='Image 1' layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="relative w-full h-80 transform rotate-2 rounded-lg border">
            <Image src={`../../static/images/did_climbing.jpeg`} alt='Image 2' layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="relative w-full h-80 transform -rotate-3 rounded-lg border">
            <Image src={`../../static/images/did_work.jpeg`} alt='Image 3' layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
          <div className="relative w-full h-80 transform rotate-3 rounded-lg border">
            <Image src={`../../static/images/did_camp.jpeg`} alt='Image 4' layout="fill" objectFit="cover" className="rounded-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-2/3">
            <div className="space-y-6">
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                const { slug, date, title, summary, tags } = frontMatter;
                return (<a className="group block rounded-xl font-size-1 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" href='#'>
                    <p className="text-gray-500 border-l-2 p-0 border-gray-200 pl-5 text-sm mt-3 mb-3">
                        <time dateTime={date}>{formatDate(date)}</time>
                    </p>
                    <h3 className="font-bold text-xl mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-500">{summary}</p>
                    <p className="text-purple-500 font-bold group-hover:text-purple-600 transition mt-2">
                    Read more →
                    </p>
                </a>)
            })}
            </div>
            </div>
            <div className="w-full md:w-1/3">
                <div className="border border-gray-300 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Stay up to date</h3>
                    <p className="text-gray-700 dark:text-gray-100 mb-4">Get notified when I publish something new, and unsubscribe at any time.</p>
                    <form className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" className="border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring focus:border-blue-300" />
                        <button type="submit" className="bg-purple-500 border border-purple-600 hover:bg-purple-600 text-white py-2 rounded-lg">Join</button>
                    </form>
                </div>

                <div className=" mt-7 border border-gray-300 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-4">Work</h3>
                    <div className="flex flex-col md:flex-row md:space-x-6">
                    <div className="flex-grow">
                        <div className="mb-8 flex items-center">
                            <div className="rounded-full bg-gray-300 w-4 h-4 mr-2">
                              <img src='https://media.licdn.com/dms/image/C4E0BAQE7Fs46KFoosw/company-logo_100_100/0/1606975757334?e=1689206400&v=beta&t=PUwK9A592EC1ydFCYGStTgoCmdpDg6W0DKJZjqArdqY' className='rounded-xl' />
                            </div>
                            <div className='mb-1'>
                              <p className="text-lg font-bold">Nord VPN</p>
                              <p className="text-gray-500 text-xs">Senior Backend Engineer</p>
                            </div>
                            <p className="rounded-full bg-gray-200 border border-gray-300 text-gray-500 text-sm px-2 py-1 ml-auto text-xs">From 2022</p>
                        </div>

                        <div className="mb-8 flex items-center">
                            <div className="rounded-full bg-gray-300 w-4 h-4 mr-2">
                              <img src='https://media.licdn.com/dms/image/D4E0BAQFSujdc9NkEKg/company-logo_100_100/0/1666246505157?e=1689206400&v=beta&t=blS1I8TvtfIVfIl7xPPZT2jaKyX-5ObropNtfpIZ8OE' className='rounded-xl' />
                            </div>
                            <div className='mb-1'>
                              <p className="text-lg font-bold">Billie</p>
                              <p className="text-gray-500 text-xs">Senior Backend Engineer</p>
                            </div>
                            <p className="rounded-full bg-gray-200 border border-gray-300 text-gray-500 text-sm px-2 py-1 ml-auto text-xs">2019 — 2022</p>
                        </div>
                        <div className="mb-8 flex items-center">
                            <div className="rounded-full bg-gray-300 w-4 h-4 mr-2">
                            <img src='https://media.licdn.com/dms/image/C4E0BAQENe9LVbMg7lA/company-logo_100_100/0/1608041272310?e=1689206400&v=beta&t=QFbpM_xU3KokAzp_aEa3qu0xYxLn6eo_Dy3zunEi3us' className='rounded-xl' />
                            </div>
                            <div className='mb-1'>
                              <p className="text-lg font-bold">Elba Tech</p>
                              <p className="text-gray-500 text-xs">RPA Automation engineer</p>
                            </div>
                            <p className="rounded-full border border-gray-300 bg-gray-200 text-gray-500 text-sm px-2 py-1 ml-auto text-xs">2018 — 2019</p>
                        </div>
                        <div className="mb-8 flex items-center">
                            <div className="rounded-full bg-gray-300 w-4 h-4 mr-2">
                              <img src='https://www.jaywalker-digital.ch/wp-content/themes/jd/images/logo-jaywalker-digital-single-darkblue.svg' className='rounded-xl' />
                            </div>
                            <div className='mb-1'>
                              <p className="text-lg font-bold">Jaywalker Digital</p>
                              <p className="text-gray-500 text-xs">Backend Engineer</p>
                            </div>
                            <p className="rounded-full bg-gray-200 border border-gray-300 text-gray-500 text-sm px-2 py-1 ml-auto text-xs">2015 — 2018</p>
                        </div>
                        <div className="mb-8 flex items-center">
                          <a href='#' className="bg-gray-200 border border-gray-300 hover:bg-gray-300 text-gray-900 py-2 rounded-lg w-full text-center">See CV</a>
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
