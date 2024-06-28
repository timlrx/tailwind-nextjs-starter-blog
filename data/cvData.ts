interface cv {
  education?: {
    schoolName: string
    title: string
    startDate: Date
    endDate?: Date
    skills?: string[]
  }[]
  experience?: {
    company: string
    companyLogoImgSrc?: string
    description?: string
    positions: {
      title: string
      startDate: Date
      endDate?: Date
      skills?: string[]
    }[]
  }
  volunteerExperience: {
    company: string
    companyLogoImgSrc?: string
    description?: string
    positions: {
      title: string
      startDate: Date
      endDate?: Date
      skills?: string[]
    }[]
  }
  coursesLicensesAndCertifications: {
    issuerName: string
    title: string
    issueDate: Date
    skills?: string[]
  }[]
}

const cvData: cv[] = []

export default cvData
