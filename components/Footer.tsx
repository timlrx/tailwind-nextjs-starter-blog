import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="juejin" href={siteMetadata.juejin} size={6} />
          <SocialIcon kind="rss" href="/feed.xml" size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>{' '}
          <Image
            src="https://komarev.com/ghpvc/?username=hansking98&label=Profile%20views&color=0e75b6&style=flat"
            alt=""
            width={111}
            height={20}
          />
        </div>
        <div className="flex items-center mb-8 text-sm text-gray-500 dark:text-gray-400">
          Powered by{` `}
          <a className={'underline'} href="https://nextjs.org">
            <Image src="/static/images/Next.js.svg" alt="upyun" width={32} height={32} />
          </a>
          Next
          {` `}&{` `}
          <a className={'underline mx-2'} href="https://tailwindcss.com">
            <Image src="/static/images/tailwindcss.svg" alt="upyun" width={20} height={20} />
          </a>
          tailwind
          {` `}&{` `}
          <a
            className={'underline mx-1'}
            href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
          >
            <Image src="/static/images/upyun.png" alt="upyun" width={50} height={20} />
          </a>
          CDN
        </div>
      </div>
    </footer>
  )
}
