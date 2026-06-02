import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset = 'classic-news'

export const visualPresets = {
  'classic-news': {
    label: 'Classic News',
    mood: 'compact article newsroom',
    fontDirection: 'bold sans headlines with quiet body copy',
    colors: {
      background: '#f5f5f3',
      foreground: '#0d0d0d',
      muted: '#666666',
      primary: '#0b0b0b',
      accent: '#ef2b2d',
      surface: '#ffffff',
    },
    shape: 'square editorial modules with fine dividers',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'classic-news',
  radius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-2 duration-500',
    cardHover: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
    softHover: 'transition duration-200 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.16em]',
    heroTitle: 'text-3xl font-black tracking-normal sm:text-4xl lg:text-5xl',
    sectionTitle: 'text-xl font-black tracking-normal sm:text-2xl',
    body: 'text-base leading-7',
    caption: 'text-[11px] font-bold uppercase tracking-[0.14em]',
  },
  surfaces: {
    glass: 'border border-black/10 bg-white/90',
    paper: 'border border-black/10 bg-white shadow-sm',
    quiet: 'border border-black/10 bg-black/[0.03]',
    dark: 'border border-white/10 bg-[#0b0b0b] text-white',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[var(--editable-container)] px-4 sm:px-6',
    sectionY: 'py-10 sm:py-12 lg:py-14',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
