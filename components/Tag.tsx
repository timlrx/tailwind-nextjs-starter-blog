import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-md bg-primary-50 p-1 text-xs font-medium capitalize text-primary-500 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
