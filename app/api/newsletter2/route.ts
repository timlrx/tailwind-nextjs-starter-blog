import { NextResponse } from 'next/server'
import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res) // { email: 'test@example.com' }

  return NextResponse.json({ res })
  // return NewsletterAPI({
  //   // @ts-ignore
  //   provider: siteMetadata.newsletter.provider,
  // })
}
