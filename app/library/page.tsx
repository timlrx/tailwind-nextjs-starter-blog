import Data from '@/data/tofu.json'
import Link from 'next/link'
import Image from 'next/image'
import PageTitle from '@/components/PageTitle'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'Library' })
async function getNodes() {
  type Node = {
    type: string
    title: string
    stars: string | null
    date: string
    cover: string
    url: string
    comment: string
  }

  const nodes: Node[] = []

  let count = 0
  for (const i of Data.interest.reverse()) {
    if (i.status === 'done') {
      count++
      nodes.push({
        type: i.type,
        title: i.interest.subject.title,
        stars: i.interest.rating ? '★'.repeat(i.interest.rating.value) : null,
        date: i.interest.create_time.split(' ')[0],
        cover: i.interest.subject.cover_url,
        url: i.interest.sharing_url,
        comment: i.interest.comment,
      })
      if (count > 50) break
    }
  }

  return nodes
}

export default async function Page() {
  const nodes = await getNodes()

  return (
    <>
      <PageTitle>Library</PageTitle>
      <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
        <ol className="divider-gray-200 divide-y dark:divide-gray-700">
          {nodes.map((node, index) => {
            return (
              <li key={index}>
                <Link
                  className="block items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 sm:flex"
                  href={node.url}
                >
                  <Image
                    className="mb-3 mr-3 h-12 w-12 rounded-full sm:mb-0"
                    src={node.cover}
                    alt={node.title}
                    width={48}
                    height={48}
                  />
                  <div className="text-gray-600 dark:text-gray-400">
                    <div className="text-base font-normal">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {node.title}
                      </span>
                    </div>
                    <div className="text-sm font-normal">{node.comment}</div>
                    <span className="inline-flex items-center text-xs font-normal text-yellow-300">
                      {node.stars}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}
