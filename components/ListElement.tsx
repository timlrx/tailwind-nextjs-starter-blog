import Link from './Link'

const ListElement = ({ title, description, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div className="p-6">
      <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      {href && (
        <Link
          href={href}
          className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label={`Link to ${title}`}
        >
          Lue lisää &rarr;
        </Link>
      )}
    </div>
  </div>
)

export default ListElement
