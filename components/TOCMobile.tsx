'use client'
import { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react'
import { useScrollspy } from '@/utils/use-scrollspy'

interface TOCProps {
  toc: { value: string; url: string; depth: number }[]
}

export default function TOCMobile(props: TOCProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeId = useScrollspy(
    props.toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' }
  )

  return (
    <div className="z-50 flex flex-col gap-2">
      <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger className="mx-1 border-none bg-gray-100 px-2 dark:bg-gray-700">
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-900 dark:text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-2">
            <div className="rounded bg-gray-50 px-4 py-2 shadow">
              <div className="mb-4 border-b border-gray-300 py-2 text-base font-semibold dark:text-gray-900">
                On this page
              </div>
              <div>
                {props.toc.map((item) => {
                  const { value, url, depth } = item
                  const isActive = url === `#${activeId}`
                  return (
                    <a
                      key={url}
                      href={`${url}`}
                      className={`text-muted-foreground hover:text-foreground block py-2 pr-2.5 text-sm leading-[1.2] transition-colors ${isActive && 'font-bold text-primary-600 dark:text-primary-600'} hover:text-primary-600 dark:text-gray-900 dark:hover:text-primary-500`}
                      style={{
                        paddingLeft: (depth > 2 ? depth - 1 : 0) * 10,
                      }}
                    >
                      {value}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
