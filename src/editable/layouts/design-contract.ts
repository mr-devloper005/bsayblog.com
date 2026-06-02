import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5f5f3',
  '--slot4-page-text': '#0d0d0d',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5d5d5d',
  '--slot4-soft-muted-text': '#7a7a7a',
  '--slot4-accent': '#ef2b2d',
  '--slot4-accent-fill': '#ef2b2d',
  '--slot4-accent-soft': '#f3f3f3',
  '--slot4-dark-bg': '#0b0b0b',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e6e6e6',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f5f5f3',
  '--slot4-lavender': '#101010',
  '--slot4-gray': '#f2f2f0',
  '--slot4-body-gradient': 'none',
  '--editable-container': '980px',
  '--editable-wide-container': '1180px',
  '--editable-border': 'rgba(13,13,13,0.11)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/10',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_28px_rgba(0,0,0,0.06)]',
  shadowStrong: 'shadow-[0_20px_60px_rgba(0,0,0,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.78))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6',
    wideSection: 'mx-auto w-full max-w-[var(--editable-wide-container)] px-4 sm:px-6',
    sectionY: 'py-10 sm:py-12 lg:py-14',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start',
    rail: 'flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[210px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.16em]',
    heroTitle: 'text-3xl font-black leading-[1.06] tracking-normal sm:text-4xl lg:text-[2.65rem]',
    sectionTitle: 'text-xl font-black tracking-normal sm:text-2xl',
    body: 'text-base leading-7',
  },
  surface: {
    card: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-sm ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-sm ${editablePalette.accentBg} px-5 py-3 text-sm font-black text-white transition hover:bg-black`,
    secondary: `inline-flex items-center justify-center rounded-sm border ${editablePalette.border} ${editablePalette.surfaceBg} px-5 py-3 text-sm font-black ${editablePalette.surfaceText} transition hover:border-black`,
    dark: `inline-flex items-center justify-center rounded-sm bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[var(--slot4-accent-fill)]`,
    accent: `inline-flex items-center justify-center rounded-sm ${editablePalette.accentBg} px-5 py-3 text-sm font-black text-white transition hover:bg-black`,
  },
  media: {
    frame: `relative overflow-hidden rounded-none ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]',
    fade: 'transition duration-200 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Keep all redesign edits inside src/editable.',
  'Use env-driven brand identity exposed by slot4BrandConfig/globalContent instead of hardcoded visible brand names.',
  'Keep article routes and postHref() intact.',
  'Prefer compact editorial sections with a narrow reading container and black/red news accents.',
] as const
