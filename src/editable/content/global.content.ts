import { slot4BrandConfig } from '@/editable/theme/brand.config'
import { CATEGORY_OPTIONS } from '@/lib/categories'

const footerTopics = CATEGORY_OPTIONS.slice(0, 4).map((category) => ({
  label: category.name,
  href: `/article?category=${category.slug}`,
}))

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent article newsroom',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
    logo: slot4BrandConfig.logo,
  },
  nav: {
    tagline: 'Sharp articles for curious readers',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Articles', href: '/article' },
      { label: 'Latest', href: '/article' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Read articles', href: '/article' },
      secondary: { label: 'Pitch a story', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Independent article newsroom',
    description: 'A compact article publication for timely reads, thoughtful explainers, and useful perspectives across the stories readers come back to.',
    columns: [
      {
        title: 'Topics',
        links: [
          { label: 'Latest articles', href: '/article' },
          ...footerTopics,
        ],
      },
      {
        title: 'Reader desk',
        links: [
          { label: 'Search', href: '/search' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign in', href: '/login' },
        ],
      },
    ],
    bottomNote: 'Articles, analysis, and readable context for every visit.',
  },
  commonLabels: {
    readMore: 'Read article',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
}
