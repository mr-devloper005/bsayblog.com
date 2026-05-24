import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { BookOpen, Bookmark, Building2, FileText, Image as ImageIcon, LifeBuoy, Search, Shield, Sparkles } from 'lucide-react'

const quickLinks = [
  { href: '/article', label: 'Browse articles', hint: 'Long-form knowledge' },
  { href: '/listing', label: 'Open listings', hint: 'Business discovery' },
  { href: '/image', label: 'View images', hint: 'Visual posts' },
  { href: '/contact', label: 'Contact support', hint: 'Send a message' },
]

const guides = [
  { icon: FileText, title: 'Articles', description: 'Read guides, stories, and long-form posts from the connected feed.' },
  { icon: ImageIcon, title: 'Image posts', description: 'Open image-led posts and galleries without changing the core routing contract.' },
  { icon: Building2, title: 'Listings', description: 'Browse business listings, profiles, and structured discovery pages.' },
  { icon: Bookmark, title: 'Bookmarks', description: 'Use SBM pages for curated links, references, and resource discovery.' },
  { icon: Shield, title: 'Reliable routes', description: 'Singular and plural routes stay supported to avoid backlink 404 regressions.' },
]

const faqs = [
  ['Why do old links still work?', 'The template keeps singular task routes and redirects/rewrites for legacy plural URLs.'],
  ['Where does content come from?', 'Public pages read from the Master Panel connector using the configured site code and API URL.'],
  ['Can UI editors change logic?', 'No. CI guards allow normal UI PRs to touch only src/editable/** and public assets.'],
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description={`Guides, shortcuts, and answers for ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <LifeBuoy className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Start here</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Use these paths to verify content surfaces, contact handling, and route behavior on a new Slot 4 site.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Slot 4 template</Badge>
                  <Badge>Production ready</Badge>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="space-y-3 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Search className="h-4 w-4 text-primary" aria-hidden />
                Popular destinations
              </div>
              <ul className="space-y-2">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group flex items-center justify-between rounded-lg border border-transparent px-3 py-2 text-sm transition-colors hover:border-border hover:bg-background">
                      <span>
                        <span className="font-medium text-foreground group-hover:text-primary">{item.label}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
                      </span>
                      <Sparkles className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Topic guides</h2>
              <p className="mt-1 text-sm text-muted-foreground">Main public workflows on the template.</p>
            </div>
            <BookOpen className="hidden h-8 w-8 text-primary/40 sm:block" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <h3 className="text-sm font-semibold text-foreground">{question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
