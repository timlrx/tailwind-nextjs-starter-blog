import Link from 'next/link'
import GitHubCard from '@/components/GitHubCard'
import NextJS from '/components/icons/nextjs.svg'
import TailWindCSS from '/components/icons/tailwindcss.svg'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function About() {
  return (
    <>
      <div className="prose max-w-none dark:prose-dark lg:prose-lg">
        {/*<p>*/}
        {/*  Hi, my name is <b>Zhou Zihang</b>. I'm a computer science student now.*/}
        {/*</p>*/}

        <h2>Travel Journey</h2>
        <p>
          I love traveling.
          <br />
          You can find my photo travelogues, as well as VLOGs, under my
          {` `}
          <Link href="/tags/游记">Travel Tag.</Link>
        </p>

        <h2>My Shelf</h2>
        <b>Books & Movies</b>
        <p>
          I watch and read all kinds of stuff.
          <br />
          You can see what I'm watching or reading recently at{` `}
          <Link href="/library">Library Page.</Link>
        </p>
        <b>Music</b>
        <p>
          I listen to music all the time.
          <br />
          You can see what I'm listening recently at{` `}
          <Link href="/music">Music Page.</Link>
        </p>

        <h2>About This Site</h2>
        <div>
          <GitHubCard repo="hansking98/hans-nextjs-blog" />
          <div>
            It's hosted on <a href="https://vercel.com">Vercel</a> and built with{' '}
            <a href="https://nextjs.org">
              <i className="inline-block">
                <NextJS className="h-6 w-6" />
              </i>
            </a>{' '}
            and{' '}
            <a href="https://tailwindcss.com">
              <i className="inline-block">
                <TailWindCSS className="h-6 w-6" />
              </i>
            </a>
            <br />I started it with my previous{' '}
            <a href="https://github.com/hansking98/hans-blog-gatsby">Gatsby version</a> and{' '}
            <a href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
              Tailwind Nextjs Starter Blog
            </a>
            .
            <br />
            If you are finding inspiration, you can see my these 2 posts about this site.
            <ul>
              <li>
                <Link href="posts/202301/front-end-learning-and-gatsby">About Gatsby</Link>
              </li>
              <li>
                <Link href="posts/202301/moving-to-nextjs">About NextJS</Link>
              </li>
            </ul>
          </div>
        </div>

        {/*<h2>Podcast</h2>*/}
        {/*<div className="lg:flex lg:flex-row">*/}
        {/*  <Image*/}
        {/*    className="rounded lg:basis-1/4"*/}
        {/*    src={PodcastCover}*/}
        {/*    alt="Podcast"*/}
        {/*    width="256"*/}
        {/*    height="256"*/}
        {/*    quality="100"*/}
        {/*    placeholder="blur"*/}
        {/*  />*/}
        {/*  <div className="lg:basis-3/4 lg:p-8">*/}
        {/*    I and my friends have a mandarin conversation podcast talking about books and movies.*/}
        {/*    <br />*/}
        {/*    You can access it with{' '}*/}
        {/*    <a href="https://podcasts.apple.com/us/podcast/就是奇谈/id1670887501">Apple Podcast</a>*/}
        {/*    {` `}and{` `}*/}
        {/*    <a href="https://open.spotify.com/show/7L3SZKRRb0LgBm90PgY6Xd">Spotify</a>.<br />*/}
        {/*    RSS feed:{` `}*/}
        {/*    <a href="https://feed.xyzfm.space/f8fvn3qbq4y3">小宇宙</a>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </>
  )
}
