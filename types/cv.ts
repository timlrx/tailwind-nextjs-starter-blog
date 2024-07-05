export interface Education {
  schoolName: string
  title: string
  startDate: Date
  endDate?: Date
  skills?: string[]
  schoolLogo?: string
}

export interface Experience {
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

export interface CourseLicenseOrCertification {
  issuerName: string
  issuerLogo?: string
  title: string
  issueDate: Date
  skills?: string[]
}

export interface CV {
  education?: Education[]
  experience?: Experience[]
  volunteerExperience?: Experience[]
  coursesLicensesAndCertifications?: CourseLicenseOrCertification[]
}
