export const FooterLinks = ({ navigation }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:col-span-4 lg:mt-0">
      <div className="ml-2 mt-12 md:mt-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
          About
        </h3>
        <ul role="list" className="mt-4 space-y-1">
          {navigation.about.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-2 mt-12 md:mt-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
          Product
        </h3>
        <ul role="list" className="mt-4 space-y-1">
          {navigation.product.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-2 mt-12 md:mt-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
          Tools for developers
        </h3>
        <ul role="list" className="mt-4 space-y-1">
          {navigation.tools.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-2 mt-12 md:mt-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
          Support
        </h3>
        <ul role="list" className="mt-4 space-y-1">
          {navigation.support.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-2 mt-12 md:mt-0">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-black dark:text-white">
          Ressources
        </h3>
        <ul role="list" className="mt-4 space-y-1">
          {navigation.company.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-500"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
