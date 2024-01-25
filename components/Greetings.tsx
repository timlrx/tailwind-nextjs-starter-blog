import React from 'react'
import Typed from 'typed.js'
import Emoji from '@/components/twemoji'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from 'antd'

const Greetings = () => {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null)
  // Create reference to store the Typed instance itself
  const typed = React.useRef<Typed | null>(null)

  React.useEffect(() => {
    const options = {
      strings: [
        'Like Web from 2018.',
        'I was raised in Tianjin.',
        'I like 🏊‍♂️ / 🏃 / 🏸.',
        'I like G·E·M. 🎤',
        '...',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    }

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options)

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current?.destroy()
    }
  }, [])

  return (
    <div className="lg:mb-10 lg:mt-10">
      <h1 className="clip  text-7xl font-extrabold text-transparent dark:to-blue-500">
        Hi Friends,
      </h1>
      <div className="prose dark:prose-dark lg:prose-lg">
        <p>
          Welcome! I’m <b>hans</b>. <Emoji kind="partyingFace" />
        </p>

        <p>hans is the abbreviation I use on social media.</p>

        <div className="type-wrap">
          <span style={{ whiteSpace: 'pre' }} ref={el} />
          <br />

          <p>
            This website is used to introduce myself, publish some regular blogs, document my travel
            diaries, as well as record books, movies, and music I've experienced. Feel free to{' '}
            <Link href="/about"> get to know me better.</Link>
          </p>
        </div>
      </div>
      {/* NewBlogButton */}
      <Tooltip title="新的一天~ 记录一下." trigger="hover">
        <Link
          className="fixed bottom-40 sm:bottom-20 right-8 cursor-pointer hover:shadow-lg hover:brightness-125"
          target="_blank"
          href={`https://github.com/HansKing98/hans-nextjs-blog/new/main/data/posts/2024`}
        >
          <Image src="/button/add.svg" className="w-24 sm:w-32" alt="" width={140} height={30} />
        </Link>
      </Tooltip>
    </div>
  )
}

export default Greetings
