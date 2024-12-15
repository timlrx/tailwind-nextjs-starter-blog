import { time } from 'framer-motion'

// interface PostInterface {
//   title: string
// 	date: string | null
// 	tags: string[]
// 	lastmod: string | null
// 	draft: boolean
// 	authors: string[]
// 	filePath: string | null
// 	images: string[]
// 	path: string
// 	readingTime: object{
// 		text: string
// 		minutes: number,
// 		time: number
// 		words: number
// 	}
// 	slug: string
//   description: string
//   slug: string
// }
export default function PostHomePage(post: object) {
  console.log(post)
  return (
    <>
      <div className="overflow-hidden rounded shadow-lg">
        {/* <a href="#"></a> */}
        <div className="relative">
          <a>
            <img
              className="w-full"
              src="https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              alt="Sunset in the mountains"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gray-900 opacity-25 transition duration-300 hover:bg-transparent"></div>
          </a>
          <a href="#!">
            <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
              Photos
            </div>
          </a>

          <a href="!#">
            <div className="absolute right-0 top-0 mr-3 mt-3 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-indigo-600 px-4 text-sm text-white transition duration-500 ease-in-out hover:bg-white hover:text-indigo-600">
              <span className="font-bold">27</span>
              <small>March</small>
            </div>
          </a>
        </div>
        <div className="px-6 py-4">
          <a className="inline-block text-lg font-semibold transition duration-500 ease-in-out hover:text-indigo-600">
            {post.title}
          </a>
          <p className="text-sm text-gray-500">The city that never sleeps</p>
        </div>
        <div className="flex flex-row items-center px-6 py-4">
          <span className="font-regular mr-1 flex flex-row items-center py-1 text-sm text-gray-900">
            svg time
            <span className="ml-1">6 mins ago</span>
          </span>
        </div>
      </div>
    </>
  )
}
