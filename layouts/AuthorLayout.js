import SocialIcon from '@/components/social-icons'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <div className="mx-auto max-w-3xl ">
      <PageSEO title={`About ${name}`} description={`About me - ${name}`} />
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="title">About me</h1>
        </div>
        <div className="items-start xl:grid xl:grid-cols-2 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-row space-x-6 space-x-reverse">
            <div className="order-last flex-none items-center pt-8">
              <Image
                src={avatar}
                alt="avatar"
                width="192px"
                height="192px"
                className="h-24 w-24 rounded-lg"
              />
            </div>
            <div className="prose max-w-none flex-1 py-0 dark:prose-dark">
              <h2>Hi, I'm Matt Galligan (aka mg)</h2>
              <p>
                I’m a dad, a Midwesterner living on the East Coast, a designer, craft beer & coffee
                lover, GIF evangelist, and generally into all things techy.
              </p>
              <p>
                Most of my professional time is dedicated to the company I{' '}
                <Link href="https://blog.xmtp.com/hello-world/">co-founded</Link>{' '}
                <Link href="https://xmtp.com/">XMTP Labs</Link> with my long-time friend,{' '}
                <Link href="https://twitter.com/shanemac">Shane Mac</Link>. We're building a web3
                messaging protocol for wallet-to-wallet communication.
              </p>
              <p>
                Previously I had co-founded{' '}
                <Link href="https://medium.com/interchange/introducing-interchange-from-the-picks-shovels-co-ea891352eede">
                  The Picks & Shovels Co.
                </Link>
                {', '}
                <Link href="https://www.youtube.com/watch?v=F5oyVKKEupc">Circa News</Link>
                {', '}
                <Link href="https://www.youtube.com/watch?v=VwnjfEaaMvg">SimpleGeo</Link>
                {', and '}
                <Link href="https://www.youtube.com/watch?v=KryicDrVUYU&t=93s">Socialthing</Link>.
              </p>
            </div>
          </div>
          <div className="prose max-w-none pt-0 pb-8 dark:prose-dark">{children}</div>
        </div>
      </div>
    </div>
  )
}
