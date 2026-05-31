import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f6f0e7',
  '--slot4-page-text': '#181411',
  '--slot4-panel-bg': '#fffaf2',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#665d53',
  '--slot4-soft-muted-text': '#6b6258',
  '--slot4-accent': '#9a6a38',
  '--slot4-accent-fill': '#c9823f',
  '--slot4-accent-soft': '#d9bd82',
  '--slot4-dark-bg': '#181411',
  '--slot4-dark-text': '#fff8ed',
  '--slot4-media-bg': '#ded3c3',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(154, 106, 56, 0.12), transparent 24%), radial-gradient(circle at top right, rgba(217, 189, 130, 0.16), transparent 28%), linear-gradient(180deg, #f6f0e7 0%, #fffaf2 45%, #f6f0e7 100%)',
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
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  border: 'border-black/10',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_20px_70px_rgba(24,20,17,0.08)]',
  shadowStrong: 'shadow-[0_24px_80px_rgba(24,20,17,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(24,20,17,0.1),rgba(24,20,17,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]',
    rail: 'flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'min-w-[280px] sm:min-w-[340px]',
  },
  type: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.28em]',
    heroTitle: 'text-5xl font-black tracking-[-0.08em] sm:text-6xl lg:text-8xl',
    sectionTitle: 'text-3xl font-black tracking-[-0.06em] sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center gap-2 rounded-full ${editablePalette.darkBg} px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5`,
    secondary: `inline-flex items-center gap-2 rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-6 py-3 text-sm font-black ${editablePalette.surfaceText} transition hover:-translate-y-0.5`,
    accent: `rounded-full ${editablePalette.accentSoftBg} px-6 py-3 text-sm font-black ${editablePalette.pageText}`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.6rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(24,20,17,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change full site colors in editableRootStyle first; editablePalette uses those CSS variables.',
  'Use editableDesignContract and editablePalette instead of hardcoded colors.',
  'Keep all cards at min-width 280px or larger.',
  'Never create skinny text columns for normal paragraphs.',
  'Use min-w-0 on grid children that contain text.',
  'Use line-clamp or max-width for long titles in cards.',
  'Use overflow-x-auto for carousel rails.',
  'Do not replace dynamic posts with mock arrays.',
] as const
