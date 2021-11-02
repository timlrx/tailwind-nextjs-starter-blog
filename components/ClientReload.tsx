import { useEffect } from 'react'
import Router from 'next/router'

/**
 * Client-side complement to next-remote-watch
 * Re-triggers getStaticProps when watched mdx files change
 *
 */
export const ClientReload = () => {
  // Exclude socket.io from prod bundle
  useEffect(() => {
    import('socket.io-client').then((module) => {
      const socket = module.io()
      socket.on('reload', () => {
        Router.replace(Router.asPath, undefined, {
          scroll: false,
        })
      })
    })
  }, [])

  return null
}
