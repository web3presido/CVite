export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  photo: string | null
  linkedin?: string
  github?: string
  website?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  achievements?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
  relevantCourses?: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  link?: string
  technologies: string[]
  achievements: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  link?: string
}

export interface Language {
  language: string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}

export interface CVData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: {
    technical: string[]
    soft: string[]
  }
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  awards?: {
    title: string
    issuer: string
    date: string
    description?: string
  }[]
  professionalMemberships?: {
    organization: string
    role?: string
    startDate: string
    endDate?: string
  }[]
}