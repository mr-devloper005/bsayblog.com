import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Agreement to these terms",
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the platform.`,
  },
  {
    title: "Eligibility & accounts",
    body: `You must provide accurate registration information and keep your credentials secure. You are responsible for activity under your account. We may suspend or terminate accounts that violate these terms or pose risk to the community.`,
  },
  {
    title: "The service",
    body: `${SITE_CONFIG.name} provides tools to discover, publish, and interact with digital content and community features as described on the site. We may modify, add, or retire features; where changes materially affect paid offerings, we will provide reasonable notice when required.`,
  },
  {
    title: "Your content",
    body: `You retain ownership of content you submit. By posting, you grant ${SITE_CONFIG.name} a worldwide, non-exclusive license to host, display, distribute, and promote your content in connection with operating and improving the service. You represent that you have the rights to grant this license.`,
  },
  {
    title: "Acceptable use",
    body: `You may not use the service for unlawful activity, harassment, malware distribution, credential stuffing, scraping that overloads our systems without permission, or to circumvent access controls. We enforce community standards and may remove content or restrict accounts.`,
  },
  {
    title: "Third-party links & integrations",
    body: "The service may link to third-party sites or APIs. Those services are governed by their own terms. We are not responsible for third-party content or availability.",
  },
  {
    title: "Payments",
    body: `Paid features are governed by our Payment Policy and the terms shown at checkout. By purchasing, you authorize us and our payment partners to charge your selected payment method.`,
  },
  {
    title: "Intellectual property",
    body: `The ${SITE_CONFIG.name} brand, logos, UI, and underlying software are protected. Do not copy or misuse our assets except as allowed by law or with written permission.`,
  },
  {
    title: "Disclaimers",
    body: `The service is provided “as is” to the fullest extent permitted by law. We disclaim implied warranties where allowable. We do not guarantee uninterrupted or error-free operation.`,
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, our aggregate liability arising from these terms or your use of the service is limited to the greater of amounts you paid us in the twelve months before the claim or fifty US dollars, except where liability cannot be limited by law.",
  },
  {
    title: "Indemnity",
    body: "You agree to defend and indemnify us against claims arising from your content, your misuse of the service, or your violation of these terms, subject to applicable law.",
  },
  {
    title: "Governing law & disputes",
    body: "These terms are governed by applicable law without regard to conflict-of-law rules. Courts in your jurisdiction may have mandatory protections; nothing here limits rights you cannot waive by contract.",
  },
  {
    title: "Changes",
    body: "We may update these terms from time to time. Continued use after changes become effective constitutes acceptance, except where stricter notice is required by law.",
  },
  {
    title: "Contact",
    body: `Questions about these terms? Reach us through the contact options listed on ${SITE_CONFIG.name}.`,
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The agreement between you and ${SITE_CONFIG.name} when you use our platform.`}
      actions={
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="border-[#4B2188]/40 bg-background hover:bg-[#4B2188]/5">
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button asChild className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95">
            <Link href="/payment-policy">Payment Policy</Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tr from-[#1E4BB5]/15 to-transparent blur-2xl" />
          <p className="relative text-sm leading-relaxed text-muted-foreground">
            These Terms of Service (“Terms”) govern access to and use of {SITE_CONFIG.name} (“we,” “us,” or “our”) and its
            associated websites, applications, and features (collectively, the “Service”). Our tagline—
            <span className="font-medium text-foreground"> {SITE_CONFIG.tagline}</span>—reflects how we think about the
            experience, but these Terms are the legal agreement that applies to your use.
          </p>
          <div className="relative mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-mono text-[11px]">
              &lt; / legal &gt;
            </Badge>
            <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">Community-first</Badge>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last updated: April 13, 2026</p>
            <div className="mt-8 space-y-6">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-xl border border-border/80 bg-secondary/30 p-5 transition-colors hover:bg-secondary/40"
                >
                  <h2 className="text-base font-semibold tracking-tight text-foreground">{section.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
