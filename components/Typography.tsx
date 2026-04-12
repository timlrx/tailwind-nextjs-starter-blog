export function H1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 className="text-4xl leading-none font-semibold tracking-tight sm:text-5xl md:text-6xl">
      {children}
    </h1>
  )
}
