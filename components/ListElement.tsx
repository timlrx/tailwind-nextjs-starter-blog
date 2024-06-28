import Link from './Link'
import { Education, Experience, CourseLicenseOrCertification } from '../types/cv'

// Type guard to check if data is Education
const isEducation = (
  data: Education | Experience | CourseLicenseOrCertification
): data is Education => {
  return (data as Education).schoolName !== undefined
}

// Type guard to check if data is Experience
const isExperience = (
  data: Education | Experience | CourseLicenseOrCertification
): data is Experience => {
  return (data as Experience).company !== undefined
}

// Type guard to check if data is CourseLicenseOrCertification
const isCourseLicenseOrCertification = (
  data: Education | Experience | CourseLicenseOrCertification
): data is CourseLicenseOrCertification => {
  return (data as CourseLicenseOrCertification).issuerName !== undefined
}

const ListElement = (props: { data: Education | Experience | CourseLicenseOrCertification }) => {
  const { data } = props

  return (
    <div className="md p-4 py-2.5">
      {isEducation(data) && (
        <>
          <h3 className="mb-2 text-xl font-bold leading-8 tracking-tight">{data.schoolName}</h3>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">{data.title}</p>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {data.startDate.toDateString()} - {data.endDate?.toDateString() || 'Nyt'}
          </p>
          {data.skills && (
            <p className="prose max-w-none text-gray-500 dark:text-gray-400">
              Taidot: {data.skills.join(', ')}
            </p>
          )}
        </>
      )}
      {isExperience(data) && (
        <>
          <div className="mb-2 flex max-h-9 place-items-center gap-3">
            <img
              src={data.companyLogoImgSrc}
              className="aspect-square w-9 rounded-md object-cover"
            />
            <h3 className="text-md font-bold leading-8 tracking-tight">{data.company}</h3>
          </div>
          {data.positions.map((position, index) => (
            <div key={position.title} className="relative mb-3 flex h-full place-items-center">
              <div className="absolute top-6 mx-3 h-full w-3">
                {data.positions.length === 1 ? (
                  <></>
                ) : (
                  <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                )}
                {index === data.positions.length - 1 ? (
                  <></>
                ) : (
                  <div className="mx-1 h-full w-1 bg-gray-300 dark:bg-gray-600" />
                )}
              </div>
              <div key={index} className="ml-12">
                <h4 className="mb-0.5 text-xl font-bold leading-8 tracking-tight">
                  {position.title}
                </h4>
                <p className="prose mb-0.5 max-w-none text-gray-500 dark:text-gray-400">
                  {position.startDate.toDateString()} - {position.endDate?.toDateString() || 'Nyt'}
                </p>
                {position.skills && (
                  <p className="mb- prose max-w-none text-gray-500 dark:text-gray-400">
                    Taidot: {position.skills.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
          {data.description && (
            <p className="prose max-w-none text-gray-500 dark:text-gray-400">{data.description}</p>
          )}
        </>
      )}
      {isCourseLicenseOrCertification(data) && (
        <>
          <h3 className="text-xl font-bold leading-8 tracking-tight">{data.title}</h3>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">{data.issuerName}</p>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">
            {data.issueDate.toDateString()}
          </p>
          {data.skills && (
            <p className="prose max-w-none text-gray-500 dark:text-gray-400">
              Skills: {data.skills.join(', ')}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default ListElement
