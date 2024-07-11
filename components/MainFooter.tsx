import Link from 'next/link'

export function MainFooter() {
  return (
    <footer className="absolute bottom-0 left-0 z-[1] w-screen">
      <div className="jusitfy-center grid grid-cols-3 grid-rows-1 items-center p-[30px]">
        <div className="text-left">
          <a
            className="inline-flex opacity-50 transition-opacity duration-200 ease-in-out hover:opacity-100"
            aria-label="Credits"
            href="https://twitter.com/pmndrs"
            target="_blank"
            rel="noopener"
          >
            <div>
              <svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M0 0h15v15H0z" />
              </svg>
            </div>
          </a>
        </div>
        <div className="flex flex-row justify-center gap-3 text-center">
          <FooterLink href="https://docs.pmnd.rs/home">Docs</FooterLink>
          <FooterLink href="https://pmnd.rs/github">GitHub</FooterLink>
          <FooterLink href="https://pmnd.rs/twitter">Twitter</FooterLink>
          <FooterLink href="https://pmnd.rs/discord">Discord</FooterLink>
          <Link href="/blog">Blog</Link>
        </div>
        <div className="text-right"></div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="text-s" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
