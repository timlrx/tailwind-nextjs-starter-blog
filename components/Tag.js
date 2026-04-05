import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="rounded-lg bg-surface-inset px-2 py-1 text-xs font-medium text-accent-subtle transition-colors hover:text-text-primary"
    >
      {text}
    </Link>
  )
}

// Component to display limited tags with optional expand
const TagList = ({ tags, limit = 3, showCount = false }) => {
  const displayTags = tags?.slice(0, limit) || []
  const remaining = (tags?.length || 0) - limit

  return (
    <div className="flex flex-wrap items-center gap-2">
      {displayTags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
      {remaining > 0 && <span className="text-xs text-text-muted">+{remaining}</span>}
    </div>
  )
}

export default Tag
export { TagList }
