export type ProjectCategory = 'web' | 'app' | 'software' | 'ai'

export interface PortfolioProject {
  id: string
  slug: string
  title: string
  client: string
  category: ProjectCategory
  shortDescription: string
  fullDescription?: string
  image: string
  techStack: string[]
  liveUrl?: string
  featured: boolean
}
