'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, RadioGroup, Transition } from '@headlessui/react'
import { headerNavOptions } from '@/data/headerNavLinks'
import Link from 'next/link'

export const NavOptions = () => {
  return (
    <div className="mr-5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          {headerNavOptions.title && (
            <Menu.Button className={'hidden font-medium text-gray-900 dark:text-gray-100 sm:block'}>
              {headerNavOptions.title}
            </Menu.Button>
          )}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="p-1">
              {headerNavOptions.children && headerNavOptions.children.map((link) => (
                <Menu.Item>
                  <Link
                    key={link.title}
                    href={link.href}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm">
                    {link.title}
                  </Link>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}