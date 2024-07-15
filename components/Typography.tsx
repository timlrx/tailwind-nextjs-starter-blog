export function H1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl md:text-6xl">
      {children}
    </h1>
  )
}
