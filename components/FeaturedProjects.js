import Link from '@/components/Link'

const featuredProjects = [
  {
    title: 'TurboQuant',
    description:
      'Near-optimal KV cache quantization for LLM inference (3-bit keys, 2-bit values) with Triton kernels + vLLM integration',
    href: 'https://github.com/0xSero/turboquant',
    tags: ['Python', '1.2k stars'],
  },
  {
    title: 'Parchi',
    description:
      'Your AI friend right in your browser. Browser extension for AI automation with orchestrator mode and vision',
    href: 'https://github.com/0xSero/parchi',
    tags: ['TypeScript', '525 stars'],
  },
  {
    title: 'vLLM Studio',
    description:
      'Control panel for VLLM, SGLang, llama.cpp, ExLlamaV3. Local inference management UI',
    href: 'https://github.com/0xSero/vllm-studio',
    tags: ['TypeScript', '502 stars'],
  },
  {
    title: 'MoE Compress',
    description:
      'Model-agnostic MoE compression automation: calibration, REAP/quantization, benchmark, publish',
    href: 'https://github.com/0xSero/moe-compress',
    tags: ['Python', '177 stars'],
  },
  {
    title: 'Pi Brain',
    description: 'Local AI memory system with graph-based retrieval and MCP server support',
    href: 'https://github.com/0xSero/pi-brain',
    tags: ['TypeScript', '162 stars'],
  },
  {
    title: 'REAP Expert Swap',
    description: 'How many experts do we need to serve a model? MoE expert pruning research',
    href: 'https://github.com/0xSero/reap-expert-swap',
    tags: ['Python', '122 stars'],
  },
]

export default function FeaturedProjects() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((project) => (
        <Link
          key={project.title}
          href={project.href}
          className="group bg-surface-elevated/50 relative rounded-xl border border-border-subtle p-5 transition-all hover:border-border-strong hover:bg-surface-elevated"
        >
          <div className="mb-2">
            <h3 className="font-medium text-text-primary transition-colors group-hover:text-accent-subtle">
              {project.title}
            </h3>
          </div>
          <p className="mb-3 text-sm text-text-secondary">{project.description}</p>
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface-inset px-2 py-0.5 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <svg
            className="absolute right-4 top-4 h-4 w-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      ))}
    </div>
  )
}
