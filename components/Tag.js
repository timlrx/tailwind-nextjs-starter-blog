import Link from 'next/link'
import kebabCase from 'just-kebab-case'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="uppercase text-sm font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
