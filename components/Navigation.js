import { useRouter } from 'next/router'
import ThemeSwitch from './ThemeSwitch'

const Navigation = () => {
  const router = useRouter()

  return (
    <div className="mx-auto flex flex-row">
      <nav className="m-0 flex rounded-full border border-gray-300 bg-gray-100 p-0 px-5 dark:bg-gray-800 dark:text-white">
        <button
          className={`h-full focus:outline-none ${
            router.pathname === '/'
              ? 'border-b border-solid border-purple-500 text-purple-500'
              : 'hover:text-purple-500'
          } mx-3 flex flex-col items-center justify-center`}
          onClick={() => router.push('/')}
        >
          <span className="p-2 text-sm font-bold">Home</span>
        </button>
        <button
          className={`h-full focus:outline-none ${
            router.pathname.indexOf('/blog') === 0
              ? 'border-b border-purple-500 text-purple-500'
              : 'hover:text-purple-500'
          } mx-3 flex flex-col items-center justify-center`}
          onClick={() => router.push('/blog')}
        >
          <span className="p-2 text-sm font-bold">Blog</span>
        </button>
        <button
          className={`h-full focus:outline-none ${
            router.pathname.indexOf('/about') === 0
              ? 'border-b border-purple-500 text-purple-500'
              : 'hover:text-purple-500'
          } mx-3 flex flex-col items-center justify-center`}
          onClick={() => router.push('/about')}
        >
          <span className="p-2 text-sm font-bold">About</span>
        </button>
        <ThemeSwitch />
      </nav>
    </div>
  )
}

export default Navigation
