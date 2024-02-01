'use client'

import { useEffect, useState } from 'react'
import albumList from './albumList'
import './qishui.css'
import Link from 'next/link'

interface Comment {
  name: string
  url: string
  picurl: string
  artistsname: string
  avatarurl: string
  nickname: string
  content: string
}

export default function Page() {
  const [comment, setComment] = useState<Comment>({
    name: '',
    url: '',
    picurl: '',
    artistsname: '',
    avatarurl: '',
    nickname: '',
    content: '',
  })

  const getLyrics = () => {
    fetch('https://api.uomg.com/api/comments.163?mid=8164148113').then(async (res) => {
      const rt = await res.json()
      setComment(rt.data)
      console.log('comments', rt)
    })
  }

  useEffect(() => {
    getLyrics()
  }, [])

  return (
    <div className="">
      <div className="fixed flex flex-row-reverse mt-[600px] rotate-[-30deg]">
        {albumList.map((album, index) => (
          <>
            <div
              onMouseEnter={() => getLyrics()}
              key={index}
              className={`shrink-0 w-6 h-6 relative transform cursor-pointer -translate-x-1/2 -translate-y-1/2
                rotate-[30deg] scale-[8] transition-transform ease-in-out duration-300
                skew-x-[0deg] skew-y-[10deg] origin-[200%_200%] 
                hover:rotate-[50deg] hover:skew-x-[0] hover:skew-y-[0]
              `}
              style={{ marginTop: albumList.length > 30 && index % 2 === 0 ? '300px' : '' }}
            >
              <img
                src={album.url}
                alt={`Album ${index}`}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>
          </>
        ))}
      </div>
      <div className="lyrics-bg"></div>
      <div className="lyrics">
        <div className="title text-2xl">{comment.name}</div>
        <div className="author text-xl mb-6">{comment.artistsname}</div>
        <div className="comment-content">
          {comment.content?.split('，').map((line, index) => (
            <div key="index" className="lyrics-row mb-2">
              {line}
            </div>
          ))}
        </div>

        {comment.nickname && (
          <Link className="flex items-start" href={comment.url || ''}>
            <HeartIcon className="text-white" />
            <span className="ml-2">{comment.nickname}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
