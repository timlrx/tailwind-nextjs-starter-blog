'use client'

import { useEffect, useState } from 'react'
import { Tooltip, Anchor } from 'antd'
import Link from '@/components/Link'
import Image from 'next/image'
interface AnchorArray {
  key: string
  href: string
  title: React.ReactNode
  children?: AnchorArray[]
}

interface InputItem {
  value: string
  url: string
  depth: number
}

const convertToItems = (inputArray: InputItem[]): AnchorArray[] => {
  return inputArray.map((el, index) => {
    return {
      href: el.url,
      title: (
        <>
          {Array(el.depth - 1)
            .fill('')
            .map((e) => (
              <span key={`part-${index}`} className="ml-3" />
            ))}
          <span>{el.value}</span>
        </>
      ),
      key: `part-${index}`,
    }
  })
}

const ScrollTopAndComment = ({ filePath, toc }) => {
  const [show, setShow] = useState(false)

  const anchorList: AnchorArray[] = convertToItems(toc)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }
  return (
    <div
      className={`fixed bottom-8 right-8 hidden flex-col gap-3 
        ${show ? 'md:flex' : 'md:hidden'} items-end`}
    >
      {/* Edit This Bolg */}
      <Tooltip title="🤪 您也可以编辑此页！" trigger="hover">
        <Link
          className="cursor-pointer hover:shadow-lg hover:brightness-125"
          target="_blank"
          href={`https://github.com/HansKing98/hans-nextjs-blog/edit/main/data/${filePath}`}
        >
          <Image src="/button/edit.svg" alt="" width={140} height={30} />
        </Link>
      </Tooltip>
      {/*<button*/}
      {/*  aria-label="Scroll To Comment"*/}
      {/*  types="button"*/}
      {/*  onClick={handleScrollToComment}*/}
      {/*  className="w-9 rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"*/}
      {/*>*/}
      {/*  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">*/}
      {/*    <path*/}
      {/*      fillRule="evenodd"*/}
      {/*      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"*/}
      {/*      clipRule="evenodd"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*</button>*/}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="w-9 rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Anchor
        className="fixed overflow-scroll top-8 right-6 md:w-0 xl:w-40 2xl:w-72"
        style={{ height: 'calc(100vh - 200px)' }}
        replace
        items={anchorList}
      />
    </div>
  )
}

export default ScrollTopAndComment
