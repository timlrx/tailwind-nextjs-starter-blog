'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState, useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)
  const commentsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.1, // Trigger when at least 10% of the target is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoadComments(true) // Load comments when in view
          observer.unobserve(entry.target) // Ngừng theo dõi sau khi đã load
          commentsRef.current = null // Reset commentsRef
        }
      })
    }, options)

    const currentCommentsRef = commentsRef.current
    if (currentCommentsRef) {
      observer.observe(currentCommentsRef) // Theo dõi element
    }

    return () => {
      if (currentCommentsRef) {
        observer.unobserve(currentCommentsRef) // Dọn dẹp khi component unmount
      }
    }
  }, [])

  if (!siteMetadata.comments?.provider) {
    return null
  }

  return (
    <div ref={commentsRef}>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <p>Cuộn xuống để tải bình luận</p>
      )}
    </div>
  )
}
