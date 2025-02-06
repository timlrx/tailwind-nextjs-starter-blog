import React, { useState, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"

import siteMetadata from "@/data/siteMetadata"
import useTranslation from "next-translate/useTranslation"
const Giscus = () => {
  const { t } = useTranslation()
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ""
      ? theme === "dark" || resolvedTheme === "dark"
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = "comments-container"

  const LoadComments = useCallback(() => {
    setEnabledLoadComments(false)

    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", repo)
    script.setAttribute("data-repo-id", repositoryId)
    script.setAttribute("data-category", category)
    script.setAttribute("data-category-id", categoryId)
    script.setAttribute("data-mapping", mapping)
    script.setAttribute("data-reactions-enabled", reactions)
    script.setAttribute("data-emit-metadata", metadata)
    script.setAttribute("data-input-position", inputPosition)
    script.setAttribute("data-lang", lang)
    script.setAttribute("data-loading", "lazy")
    script.setAttribute("data-input-position", "top")
    script.setAttribute("data-theme", commentsTheme)
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ""
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    // commenting these lines enable giscus to load upon page loading instead of clicking on "Load comments"
    // const iframe = document.querySelector("iframe.giscus-frame")
    // if (!iframe) return
    LoadComments()
  }, [LoadComments])

  return (
    <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && <button onClick={LoadComments}>{t("common:comment")}</button>}{" "}
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  )
}

export default Giscus
