import React, { useState } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'
import useTranslation from 'next-translate/useTranslation'

const Utterances = ({ issueTerm }) => {
  const { t } = useTranslation()
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.utterancesConfig.darkTheme
      : siteMetadata.comment.utterancesConfig.theme

  const COMMENTS_ID = 'comments-container'

  function LoadComments() {
    setEnabledLoadComments(false)
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', siteMetadata.comment.utterancesConfig.repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('label', siteMetadata.comment.utterancesConfig.label)
    script.setAttribute('theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }

  // Added `relative` to fix a weird bug with `utterances-frame` position
  return (
    <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && <button onClick={LoadComments}>{t('common:comment')}</button>}
      <div className="utterances-frame relative" id={COMMENTS_ID} />
    </div>
  )
}

export default Utterances
