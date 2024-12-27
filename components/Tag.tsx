import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="my-1 mr-3 rounded-lg border border-primary-400 p-1 px-2 text-sm font-medium uppercase text-primary-500 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-800  dark:hover:text-primary-400 "
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
