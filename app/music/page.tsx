import PageTitle from '@/components/PageTitle'
import Divider from '@/components/Divider'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'Music' })
export default function Page() {
  const playlists = [
    'https://embed.music.apple.com/us/playlist/202308/pl.u-EdAVvWVuDbMd6lo',
    'https://embed.music.apple.com/us/playlist/202307/pl.u-r2yBJG4sRgj4Z1W',
    'https://embed.music.apple.com/us/playlist/202306/pl.u-pMylDLRiW8K2N7P',
    'https://embed.music.apple.com/us/playlist/202305/pl.u-r2yBJ3kCRgj4Z1W',
    'https://embed.music.apple.com/us/playlist/202304/pl.u-qxyl0bls3zGgDkb',
    'https://embed.music.apple.com/us/playlist/202303/pl.u-r2yBJPGsRgj4Z1W',
    'https://embed.music.apple.com/us/playlist/202302/pl.u-55D6Pp1H69V3rRa',
    'https://embed.music.apple.com/us/playlist/202301/pl.u-4JomKZ3FJBmAPk9',
  ]

  return (
    <>
      <PageTitle>Music Playlists</PageTitle>
      <Divider />
      <div className="prose max-w-none dark:prose-dark lg:prose-lg">
        <p>
          Starting from 2023, I've developed a habit of creating a playlist every month and adding
          the songs I've been listening to during that month. Music holds memories, so this serves
          as a way to review specific periods of time.
        </p>
        <h2>2023</h2>
        {playlists.map((playlist) => {
          return (
            <iframe
              title={playlist}
              key={playlist}
              className="mt-3 w-full"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              height="450"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              src={playlist}
            ></iframe>
          )
        })}
      </div>
    </>
  )
}
