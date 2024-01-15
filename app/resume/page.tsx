import BUAA from '@/components/icons/BUAA.svg'
import NUS from '@/components/icons/NUS.svg'
import TailWindCSS from '@/components/icons/tailwindcss.svg'
import ReactIcon from '@/components/icons/react.svg'
import MySQL from '@/components/icons/mysql.svg'
import Django from '@/components/icons/django.svg'
import Nginx from '@/components/icons/nginx.svg'
import TypeScript from '@/components/icons/typescript.svg'
import TensorFlow from '@/components/icons/tensorflow.svg'
import Projects from '@/components/Projects'
import { genPageMetadata } from '../seo'

export const metadata = genPageMetadata({ title: 'Resume' })
export default function Page() {
  return (
    <>
      <div className="prose max-w-none dark:prose-dark lg:prose-lg">
        <h2 className="text-center font-extrabold">🥳 hansking</h2>
        <hr />
        <div>
          <p className="text-[#bd93f9] font-semibold text-lg font-mono">
            `React` `Next.js` `Vue` `Serverless` `Python` `uni-app`
          </p>
          <p>
            <b>Programming Languages:</b> JavaScript, Python.
          </p>
          <p>
            <b>Frameworks & Tools:</b>
            <span className="ml-2 space-x-2">
              <i className="inline-block">
                <ReactIcon className="h-6 w-6" />
              </i>
              <i className="inline-block">
                <MySQL className="h-6 w-6" />
              </i>
              <i className="inline-block">
                <Nginx className="h-6 w-6" />
              </i>
              <i className="inline-block">
                <TypeScript className="h-6 w-6" />
              </i>
              <i className="inline-block">
                <TailWindCSS className="h-6 w-6" />
              </i>
            </span>
          </p>
        </div>

        <hr />

        <h2>Projects</h2>
        <Projects />
      </div>
    </>
  )
}
