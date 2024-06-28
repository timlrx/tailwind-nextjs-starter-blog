import cvData from '@/data/cvData'
import { genPageMetadata } from 'app/seo'
import ListElement from '@/components/ListElement'

export const metadata = genPageMetadata({ title: 'CV' })

export default function CV() {
  return (
    <div className="flex w-full flex-col place-items-center">
      <div className="max-w-[700px] place-items-center divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-4 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Curriculum Vitae
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"></p>
        </div>
        <div className="container w-full py-4">
          <div className="flex w-full flex-col">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">Koulutus</h2>
            <>{cvData.education?.map((d) => <ListElement key={d.title} data={d} />)}</>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">Työkokemus</h2>
            <>{cvData.experience?.map((d) => <ListElement key={d.company} data={d} />)}</>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">Vapaaehtoiskokemus</h2>
            <>{cvData.volunteerExperience?.map((d) => <ListElement key={d.company} data={d} />)}</>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              Kurssit, lisenssit ja sertifikaatit
            </h2>
            <>
              {cvData.coursesLicensesAndCertifications?.map((d) => (
                <ListElement key={d.title} data={d} />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
