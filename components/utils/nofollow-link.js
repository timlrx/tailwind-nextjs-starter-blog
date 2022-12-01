export const NoFollowLink = ({ url, className = "", children }) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      href={`${url}?href=axolo.co`}
      className={className}
    >
      {children}
    </a>
  )
}
