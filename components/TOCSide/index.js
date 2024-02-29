// TOCSide.js or TOCSide.jsx
const TOCSide = ({ headings }) => {
  return (
    <aside className="mb-4 pt-4">
      <h2 className="text-md mb-4">Overview:</h2>
      <nav>
        <ul className={`tocSideList border-l border-slate-800 pl-4 text-sm dark:border-secondary`}>
          {headings.map((heading, index) => (
            <li
              key={index}
              className={` mb-2 text-gray-800 hover:font-medium hover:text-primaryBlue dark:text-gray-50 dark:hover:text-secondary`}
            >
              <a href={heading.url}>{heading.value}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default TOCSide
