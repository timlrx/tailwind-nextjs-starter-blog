import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div>
      <>
        <div className="container mx-auto grid grid-cols-1 gap-10 pb-12 md:grid-cols-2">
          <div className="order-2 flex w-full flex-col items-center md:order-1 md:flex-row">
            <div className="">
              <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white md:text-5xl">
                Hi, this is lynx
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Welcome to my blog - This is going to be my portfolio/blog website from now on. I am
                a B.com student who is learning fullstack and data-science. Have a good read!
              </p>
              {/* <div className="mt-6">
                <a
                  href="#"
                  className="block transform rounded-md bg-blue-500 px-3 py-4 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-400 md:inline"
                >
                  Visit my old website here!
                </a>
              </div> */}
            </div>
          </div>
          <div className="order-1 flex h-80 w-full items-center justify-center overflow-hidden md:order-2">
            <Image
              src={require('../public/static/images/profile.jpeg')}
              width={310}
              height={310}
              className=" rounded-full object-cover"
              alt="profile image"
              placeholder="blur"
              priority={true}
            />
          </div>
        </div>
      </>
    </div>
  )
}

export default Hero
