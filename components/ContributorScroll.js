import Link from '@/components/Link'
import Image from 'next/image'

const contributors = [
  // Major Web3 Organizations
  { name: 'Ethereum Foundation', href: 'https://ethereum.foundation/' },
  { name: 'ZKSync', href: 'https://zksync.io/' },
  { name: 'GitCoin', href: 'https://gitcoin.co/' },
  { name: 'Superfluid', href: 'https://superfluid.finance/' },
  { name: 'MakerDAO', href: 'https://makerdao.com/' },
  { name: 'Gnosis', href: 'https://gnosis.io/' },
  { name: 'Lens Protocol', href: 'https://lens.xyz/' },
  { name: 'POKT Network', href: 'https://pokt.network/' },
  { name: 'Tellor', href: 'https://tellor.io/' },
  { name: 'Liquity', href: 'https://liquity.org/' },
  { name: 'Saga', href: 'https://saga.xyz/' },
  // AI & Open Source
  { name: 'ElizaOS', href: 'https://elizaos.ai/' },
  { name: 'MiniMax AI', href: 'https://minimax.io/', logo: '/static/images/minimax-logo.png' },
  { name: 'Hey', href: 'https://hey.xyz/' },
  { name: 'Synpress', href: 'https://synpress.io/' },
  { name: 'Cerebras', href: 'https://cerebras.ai/' },
  { name: 'GGML', href: 'https://github.com/ggml-ai/ggml' },
  // DAOs & Guilds
  { name: 'Raid Guild', href: 'https://raidguild.org/' },
  { name: 'Metagame', href: 'https://metagame.wtf/' },
  { name: 'ScopeLift', href: 'https://scopelift.co/' },
  // DeFi Protocols
  { name: 'Alluo', href: 'https://alluo.finance/' },
  { name: 'DebtDAO', href: 'https://debtdao.finance/' },
  { name: 'Mustang Protocol', href: 'https://mustang.finance/' },
  // Clients
  { name: 'Pangea', href: 'https://pangea.io/' },
  { name: 'NextMeta', href: 'https://nextmeta.io/' },
]

export default function ContributorScroll() {
  // Double the array for seamless loop
  const scrollItems = [...contributors, ...contributors]

  return (
    <div className="relative overflow-hidden py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-text-muted">
        Contributed To
      </p>

      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface-base to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface-base to-transparent" />

      {/* Scrolling container */}
      <div className="animate-scroll flex">
        {scrollItems.map((org, i) => (
          <Link
            key={`${org.name}-${i}`}
            href={org.href}
            className="mx-8 flex flex-shrink-0 items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            {org.logo && (
              <Image src={org.logo} alt={org.name} width={80} height={20} className="h-5 w-auto" />
            )}
            {!org.logo && org.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
