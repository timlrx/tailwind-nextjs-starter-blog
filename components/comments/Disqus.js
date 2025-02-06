import React, { useState } from "react"

import siteMetadata from "@/data/siteMetadata"
import useTranslation from "next-translate/useTranslation"
const Disqus = ({ frontMatter }) => {
  const [enableLoadComments, setEnabledLoadComments] = useState(true)
  const { t } = useTranslation()
  const COMMENTS_ID = "disqus_thread"

  function LoadComments() {
    setEnabledLoadComments(false)

    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = frontMatter.slug
    }
    if (window.DISQUS === undefined) {
      const script = document.createElement("script")
      script.src = "https://" + siteMetadata.comment.disqusConfig.shortname + ".disqus.com/embed.js"
      script.setAttribute("data-timestamp", +new Date())
      script.setAttribute("crossorigin", "anonymous")
      script.async = true
      document.body.appendChild(script)
    } else {
      window.DISQUS.reset({ reload: true })
    }
  }

  return (
    <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      {enableLoadComments && <button onClick={LoadComments}>{t("common:comment")}</button>}{" "}
      <div className="disqus-frame" id={COMMENTS_ID} />
    </div>
  )
}

export default Disqus
