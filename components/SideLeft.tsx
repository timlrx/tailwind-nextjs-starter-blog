'use client'

import React, { useState, useEffect } from 'react'
import { useScrollspy } from '@/utils/use-scrollspy'

interface TOCProps {
  toc: { value: string; url: string; depth: number }[]
}
export default function SideLeft(props: TOCProps) {
  const { toc } = props
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [show, setShow] = useState(false)

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 150) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  // Effect to add or remove a class to the body element based on sidebar expansion
  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  const activeId = useScrollspy(
    props.toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' }
  )

  return (
    <>
      {sidebarExpanded && (
        <div className="fixed left-0 top-0 z-50 h-screen md:flex">
          <div className="sticky left-0 top-0 z-50 flex h-screen w-full transform flex-col overflow-y-auto bg-gray-50/70 px-1 py-2 shadow backdrop-blur-md transition duration-500 dark:bg-gray-800">
            <div className="mb-20 mt-2 px-4">
              {/* <div
                aria-hidden="true"
                onClick={toggleSidebar}
                onKeyDown={toggleSidebar}
                className="absolute right-2 top-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-gray-400 hover:text-gray-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div> */}
              <div className="text-md mb-4 border-b pb-2 font-semibold">Table of content</div>
              <div>
                <ul className="list-none">
                  {toc.map((item) => {
                    const { value, url, depth } = item
                    const isActive = url === `#${activeId}`
                    return (
                      <li key={url}>
                        <a
                          href={`${url}`}
                          className={`text-muted-foreground hover:text-foreground block cursor-pointer p-2 pr-2.5 text-sm leading-[1.2] transition-colors hover:text-primary-500 ${isActive && 'text-primary-600'}`}
                          style={{
                            paddingLeft: (depth > 2 ? depth - 1 : 0) * 10,
                          }}
                        >
                          {value}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div className="fixed bottom-6 left-2 z-50 mt-auto md:left-4">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="rounded-full bg-gray-200 p-2 text-gray-900 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <span className="sr-only">Expand / collapse sidebar</span>
            <svg
              className={`h-5 w-5 fill-current ${
                !sidebarExpanded ? 'rotate-180' : 'rotate-0'
              } transition duration-300 ease-in-out`}
              viewBox="0 0 24 24"
            >
              <path
                d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
