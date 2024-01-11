import type { ReactNode } from 'react'

const Divider = ({ className, children }: { className?: string; children?: ReactNode }) => {
  if (children) {
    return (
      <div className={`inline-flex w-full items-center justify-center ${className || ''}`}>
        <hr className="my-8 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
        <span className="absolute left-1/2 -translate-x-1/2 rounded-xl bg-white px-3 font-medium text-gray-900 dark:bg-dark">
          <div className="text-xl font-bold text-gray-500">{children}</div>
        </span>
      </div>
    )
  }
  return <hr className={`my-2 h-px border-0 bg-gray-200 dark:bg-gray-700 ${className || ''}`} />
}

export default Divider
