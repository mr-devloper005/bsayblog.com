import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Latest articles, briefings, and reader-first analysis',
      description: 'Read timely articles, practical explainers, and curated editorial picks in a clean news-style layout.',
      openGraphTitle: 'Latest articles and reader-first analysis',
      openGraphDescription: 'A compact article publication for timely reads, explainers, and carefully selected stories.',
      keywords: ['article website', 'news articles', 'editorial publication', 'latest stories'],
    },
    hero: {
      badge: 'Hot now',
      title: ['Articles that explain', 'what matters today.'],
      description: 'A focused article-first homepage with latest reads, topic lanes, editor picks, and clean search for readers who want substance without clutter.',
      primaryCta: { label: 'Read latest', href: '/article' },
      secondaryCta: { label: 'Search articles', href: '/search' },
      searchPlaceholder: 'Search articles, topics, and authors',
      focusLabel: 'Focus',
      featureCardBadge: 'Lead story',
      featureCardTitle: 'The day starts with one clear story.',
      featureCardDescription: 'A calm, compact news layout keeps articles readable and discovery quick.',
    },
    intro: {
      badge: 'Editorial mission',
      title: 'Built for people who read articles to understand the world, not just scroll past it.',
      paragraphs: [
        `${slot4BrandConfig.siteName} organizes every page around the article: the headline, the context, the source details, and the next useful read.`,
        'The layout is intentionally compact, with strong section labels, reliable topic lanes, and image-led cards that feel like a modern newspaper rather than a stretched landing page.',
        'Readers can move from breaking context to evergreen explainers, then into related stories without losing their place.',
      ],
      sideBadge: 'Reader promise',
      sidePoints: [
        'Article-first structure on every major page.',
        'Narrower, normal-width layouts for easier reading.',
        'Clear topic lanes, search, and related story paths.',
        'Local account flow for reader access and testing.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'Contact the desk', href: '/contact' },
    },
    cta: {
      badge: 'Keep reading',
      title: 'Find your next useful article in seconds.',
      description: 'Search the archive, browse topic lanes, or contact the editorial desk with a story idea.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Pitch a Story', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Fresh articles and updates from this section.',
    },
  },
  about: {
    badge: 'About the publication',
    title: `About ${slot4BrandConfig.siteName}`,
    description: `${slot4BrandConfig.siteName} is an article-only publication shaped around clear headlines, concise context, and useful follow-up reading.`,
    paragraphs: [
      'Our job is to make articles feel easier to enter and easier to trust. Every page is designed around the reader: what the story is, why it matters, and where to go next.',
      'We favor compact layouts, strong editorial hierarchy, readable summaries, and topic sections that help visitors scan quickly without making the site feel empty or stretched.',
      'The publication voice is direct, curious, and useful. Whether a reader lands on a lead story, an archive page, or a detail view, the experience should feel like a coherent newsroom.',
    ],
    values: [
      {
        title: 'Reader-first editing',
        description: 'Every article is presented with a clear headline, useful summary, and enough surrounding context to help the reader decide what to open next.',
      },
      {
        title: 'Compact discovery',
        description: 'Topic sections, cards, and side rails keep browsing efficient without oversized blocks or stretched layouts.',
      },
      {
        title: 'Useful editorial rhythm',
        description: 'The site balances latest articles, evergreen reads, search, and related stories so the archive keeps working after the first visit.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Reach the editorial desk.',
    description: 'Send article pitches, correction requests, partnership notes, or reader feedback. The form is tuned for article workflows, so your message reaches the right editorial lane.',
    formTitle: 'Send an editorial note',
  },
  auth: {
    loginTitle: 'Sign in to continue reading.',
    loginDescription: 'Use a local reader account to test saved access, comments, and account-aware navigation without changing backend logic.',
    signupTitle: 'Create your reader account.',
    signupDescription: 'Join the local reader desk, save your name in the browser, and return to a cleaner article experience with your account shown in the navbar.',
  },
  search: {
    metadata: {
      title: 'Search articles, profiles, and topics',
      description: 'Search the archive by keyword, category, or content type to find relevant articles, profiles, and reader resources.',
    },
    hero: {
      badge: 'Archive search',
      title: 'Find the right story faster.',
      description: 'Search across articles, profiles, categories, and tags with a focused archive view built for quick discovery.',
      placeholder: 'Search articles, topics, profiles...',
    },
    resultsTitle: 'Latest from the archive',
  },
  create: {
    metadata: {
      title: 'Create a reader submission',
      description: 'Submit an article idea, profile note, listing, or editorial resource for review.',
    },
    locked: {
      badge: 'Reader access',
      title: 'Sign in to submit.',
      description: 'Create a local reader account or sign in before sending a new submission into the editorial workflow.',
    },
    hero: {
      badge: 'Create',
      title: 'Share something worth reading.',
      description: 'Send a concise article idea, profile update, listing, or resource note. Keep it clear and useful so the editorial desk can review it quickly.',
    },
    formTitle: 'New submission',
    successTitle: 'Submission saved locally for review.',
    submitLabel: 'Submit',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related posts',
      fallbackTitle: 'Post details',
    },
    image: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
