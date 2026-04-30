import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  const footerLinks = {
    services: [
      { href: '/case-studies', title: 'Case Studies' },
      { href: '/contact', title: 'Contact' },
    ],
    resources: [{ href: '/blog', title: 'Blog & Podcasts' }],
  }

  return (
    <footer className="divider-asymmetric relative mt-auto py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link href="/home" className="inline-block">
            <span className="text-2xl font-semibold tracking-tight text-text-primary">
              {siteMetadata.title}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-text-secondary">
            Expert software development, AI agents, and consulting services to transform your ideas
            into reality.
          </p>
          <div className="mt-6 flex gap-4">
            <SocialIcon kind="github" href={siteMetadata.github} size="5" />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="5" />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-4 font-semibold text-text-primary">Services</h4>
          <ul className="space-y-2">
            {footerLinks.services.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-text-primary">Resources</h4>
          <ul className="space-y-2">
            {footerLinks.resources.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-border-subtle pt-8 text-center text-sm text-text-muted">
        <p>
          &copy; {new Date().getFullYear()} {siteMetadata.title}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
