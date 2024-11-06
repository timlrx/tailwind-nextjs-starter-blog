import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { useEffect, useState } from 'react'

interface AuthorProps {
  author: {
    slug: string
    name: string
    bio: string
    body: { code: string }
  }
}

const Author = ({ author }: AuthorProps) => {
  const [authorData, setAuthorData] = useState(author)

  useEffect(() => {
    setAuthorData(author)
  }, [author])

  return (
    <div>
      <h1>{authorData.name}</h1>
      <p>{authorData.bio}</p>
      <MDXLayoutRenderer code={authorData.body.code} />
    </div>
  )
}
