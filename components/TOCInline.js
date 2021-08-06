const TOCInline = ({ toc, indentDepth = 3 }) => {
  return (
    <details open>
      <summary className="pt-2 pb-2 ml-6 text-xl font-bold">Table of Contents</summary>
      <div className="ml-6">
        <ul>
          {toc.map((heading) => (
            <li key={heading.value} className={`${heading.depth >= indentDepth && 'ml-6'}`}>
              <a href={heading.url}>{heading.value}</a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

export default TOCInline
