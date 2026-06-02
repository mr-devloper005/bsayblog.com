import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)
const env = process.env
const siteName = env.NEXT_PUBLIC_SITE_NAME || 'Article Daily'
const siteTagline = env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent article newsroom'
const siteDomain = env.NEXT_PUBLIC_SITE_DOMAIN || 'example.com'
const siteUrl = env.NEXT_PUBLIC_SITE_URL || `https://${siteDomain}`

export const slot4BrandConfig = {
  siteName,
  tagline: siteTagline,
  domain: siteDomain,
  baseUrl: siteUrl,
  productKind,
  ogImage: env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  logo: env.NEXT_PUBLIC_SITE_LOGO || '/favicon.png',
  accents: { primary: '#ef2b2d', surface: '#f5f5f3' },
} as const
