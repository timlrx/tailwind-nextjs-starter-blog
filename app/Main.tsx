import { MainFooter } from '@/components/MainFooter'

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between">
        <a
          className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center"
          href="https://github.com/pmndrs"
        >
          <h1 className="relative z-[1] text-6xl font-semibold text-white">Poimandres</h1>
          <div
            className="pointer-events-none absolute z-0 h-[30rem] w-[30rem]"
            style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / 89%), transparent 70%)' }}
          />
        </a>
        <video
          className="fixed left-0 top-0 z-0 h-screen w-screen object-cover"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src="/static/videos/bg.mp4" type="video/mp4" />
        </video>
        <MainFooter />
      </main>
    </>
  )
}
