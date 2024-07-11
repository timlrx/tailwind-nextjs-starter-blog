export function H1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 className="text-4xl uppercase leading-none tracking-tight sm:text-5xl md:text-7xl">
      {children}
    </h1>
  )
}
