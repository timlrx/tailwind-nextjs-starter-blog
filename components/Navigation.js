import { useRouter } from 'next/router';
import ThemeSwitch from './ThemeSwitch';

const Navigation = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row mx-auto">
  <nav className="border border-gray-300 m-0 p-0 px-5 bg-gray-100 dark:bg-gray-800 rounded-full dark:text-white flex">
    <button className={`focus:outline-none h-full ${router.pathname === '/' ? 'border-solid border-b border-purple-500 text-purple-500' : 'hover:text-purple-500'} flex flex-col items-center justify-center mx-3`} onClick={() => router.push('/')}>
      <span className="text-sm font-bold p-2">Home</span>
    </button>
    <button className={`focus:outline-none h-full ${router.pathname.indexOf('/blog') === 0 ? 'border-b border-purple-500 text-purple-500' : 'hover:text-purple-500'} flex flex-col items-center justify-center mx-3`} onClick={() => router.push('/blog')}>
      <span className="text-sm font-bold p-2">Blog</span>
    </button>
    <button className={`focus:outline-none h-full ${router.pathname.indexOf('/about') === 0 ? 'border-b border-purple-500 text-purple-500' : 'hover:text-purple-500'} flex flex-col items-center justify-center mx-3`} onClick={() => router.push('/about')}>
      <span className="text-sm font-bold p-2">About</span>
    </button>
    <ThemeSwitch />
  </nav>
</div>

  

  );
};

export default Navigation;
