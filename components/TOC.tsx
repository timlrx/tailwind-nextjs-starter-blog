'use client'
import { useScrollspy } from '@/utils/use-scrollspy'

interface TOCProps {
  toc: { value: string; url: string; depth: number }[]
}

const TOC = (props: TOCProps) => {
  const { toc } = props
  const activeId = useScrollspy(
    toc.map(({ url }) => url),
    {
      rootMargin: '0% 0% -80% 0%',
      threshold: 0.5,
    }
  )

  return (
    <div className="hidden border p-2 shadow-gray-600 dark:border-gray-800 lg:block">
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
  )
}

export default TOC
