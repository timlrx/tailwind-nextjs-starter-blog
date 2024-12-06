import React from "react"
import Image from "next/image"
import buildNavigation from "./buildNavigation"
import { FooterLinks } from "./footerLinks"
import classNames from "../utils/classNames"

export default function FooterAxolo({ hostingTool = "GitHub", domain = "axolo" }) {
  const navigation = buildNavigation({ domain, hostingTool })

  return (
    <div className="mt-4 bg-white dark:bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-7xl pb-12 lg:pb-12">
        <div className="border-t border-gray-200 pb-8 dark:border-gray-700" />
        <div className="md:grid md:grid-cols-1 lg:grid-cols-7 lg:gap-8 ">
          <div className="row-start-2 mt-8 space-y-8 lg:col-span-3 lg:row-start-1 lg:mt-0 ">
            <div className="flex ">
              <a href="https://axolo.co" target="_blank" rel="noopener noreferrer">
                <Image
                  width={150}
                  height={33}
                  src="https://axolo.s3.eu-west-3.amazonaws.com/media/logo/logo_axolo.png"
                  alt="Axolo logo"
                />
              </a>
            </div>
            <p className="text-base text-gray-500 dark:text-gray-400">
              <span className="hidden sm:flex">
                On a mission to
                <span className="highlight highlight-blue !pl-1">
                  boost engineers' productivity.
                </span>{" "}
              </span>
              <span className="sm:hidden">On a mission to boost engineers' productivity.</span>
              Created by developers, for developers.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-400">
          <FooterLinks navigation={navigation} />
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-400">
          <p className="font-sans text-base text-gray-500 dark:text-gray-400 md:text-center">
            &copy; 2024 IT IS CHAOS, Inc. All rights reserved.
          </p>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                "pr-1 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400",
                item?.name === "LinkedIn" && "pl-1"
              )}
            >
              <span className="sr-only">{item.name}</span>
              <svg fill="currentColor" viewBox="0 0 24 24 " aria-hidden="true" className="h-6 w-6">
                {item.path}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
