'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import { PillButton } from '@/components/gallery/PillButton'

type Article = { title: string; href: string; author: string }

export function ArticleCTA({ article }: { article: Article }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 sm:bottom-4 sm:left-4">
      <div className="relative">
        {collapsed ? (
          <PillButton
            standalone
            onClick={() => setCollapsed(false)}
            aria-label="Show new article"
            className="pointer-events-auto flex h-8 min-w-[5.5rem] items-center justify-center gap-2 px-3"
          >
            <span className="text-[0.6rem] leading-none tracking-[0.08em] uppercase">
              New Article
            </span>
            <svg viewBox="0 0 10 10" aria-hidden className="h-[0.7rem] w-[0.7rem]">
              <path
                d="M2 5H8M5 2V8"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </PillButton>
        ) : (
          <div className="pointer-events-auto w-[12.5rem] rounded-xl bg-white p-3 shadow-[0_2px_16px_rgb(0_0_0/0.08)] ring-1 ring-black/5 sm:w-[18rem] sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              <p className="text-[0.6rem] font-semibold tracking-[0.2em] text-[#aaa] uppercase sm:text-[0.7rem]">
                New Article
              </p>
              <button
                type="button"
                onClick={() => setCollapsed(true)}
                aria-label="Hide new article"
                className="pointer-events-auto grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-[#777] transition-colors hover:bg-black/5 hover:text-[#111] sm:h-7 sm:w-7"
              >
                <svg viewBox="0 0 10 10" aria-hidden className="h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <path d="M2 5H8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="pt-1.5 sm:pt-2">
              <p className="text-sm leading-snug font-semibold text-[#111] sm:text-[0.95rem]">
                {article.title}
              </p>
              <p className="mt-1 text-[0.65rem] text-[#999] sm:text-[0.75rem]">
                by {article.author}
              </p>
              <Link
                href={article.href}
                className="mt-3 inline-block rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-[0.75rem] font-medium text-[#333] transition hover:bg-black/10 sm:mt-3.5 sm:px-3.5 sm:py-1.5 sm:text-[0.8rem]"
              >
                Read article
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
