import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Overview",
    body: `${SITE_CONFIG.name} (“we”) respects your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you use our websites, apps, and related services.`,
  },
  {
    title: "Information we collect",
    bullets: [
      "Account details such as name, email, username, and profile information you choose to add.",
      "Content you create or upload—posts, comments, media, bookmarks, listings, and similar submissions.",
      "Usage data like device type, approximate location derived from IP, pages viewed, and interaction events to improve performance and security.",
      "Communications you send to support, including attachments you voluntarily provide.",
      "Payment-related metadata processed by our payment partners (we do not store full card numbers on our servers).",
    ],
  },
  {
    title: "How we use information",
    bullets: [
      "Operate, secure, and improve the Service, including personalization and relevance ranking.",
      "Communicate about your account, product updates, and (where allowed) marketing—you can opt out of promotional messages.",
      "Detect abuse, fraud, and policy violations; enforce our Terms of Service.",
      "Comply with legal obligations and respond to lawful requests.",
      "Analyze aggregated or de-identified trends to guide product decisions.",
    ],
  },
  {
    title: "Legal bases (EEA/UK users)",
    body: "Where GDPR or UK GDPR applies, we rely on contract performance, legitimate interests (such as securing the platform and improving features), consent where required, and legal obligation when necessary.",
  },
  {
    title: "Sharing & disclosure",
    body: "We share information with service providers who assist us (hosting, analytics, email delivery, payments) under confidentiality and data-processing terms. We may disclose information if required by law or to protect rights, safety, and integrity of users and the public. Business transfers (e.g., merger) may involve transferring information with appropriate notice.",
  },
  {
    title: "Retention",
    body: "We keep information as long as needed to provide the Service, comply with law, resolve disputes, and enforce agreements. You may request deletion of your account subject to legal retention requirements.",
  },
  {
    title: "Security",
    body: "We use administrative, technical, and organizational measures designed to protect information. No method of transmission or storage is completely secure; please use strong passwords and enable available security features.",
  },
  {
    title: "International transfers",
    body: "We may process information in countries other than your own. Where required, we implement appropriate safeguards such as standard contractual clauses.",
  },
  {
    title: "Your choices & rights",
    bullets: [
      "Access, correct, or delete certain personal information through your account settings where available.",
      "Object to or restrict certain processing, or request portability, depending on applicable law.",
      "Withdraw consent where processing is consent-based, without affecting prior lawful processing.",
      "Lodge a complaint with a supervisory authority in your region.",
    ],
  },
  {
    title: "Children",
    body: "The Service is not directed to children under the age required for lawful consent in their region. If you believe we have collected a child’s information improperly, contact us and we will take appropriate steps.",
  },
  {
    title: "Cookies & similar technologies",
    body: `We use cookies and similar tools for authentication, preferences, analytics, and security. See our Cookies policy for more detail on categories and controls.`,
  },
  {
    title: "Changes",
    body: "We may update this Privacy Policy periodically. We will revise the “Last updated” date and, where appropriate, provide additional notice such as an in-product message or email.",
  },
  {
    title: "Contact",
    body: `For privacy requests or questions, contact us through the channels listed on ${SITE_CONFIG.name}.`,
  },
];

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects your personal information.`}
      actions={
        <Button asChild className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white hover:opacity-95">
          <Link href="/cookies">Cookie details</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-[#4B2188]/10 via-card to-[#1E4BB5]/10 p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#1E4BB5]/20 blur-3xl" />
          <p className="relative max-w-3xl text-sm leading-relaxed text-muted-foreground">
            We built {SITE_CONFIG.name} for people who{" "}
            <span className="font-mono text-foreground/90">code</span>,{" "}
            <span className="font-mono text-foreground/90">solve</span>, and{" "}
            <span className="font-mono text-foreground/90">elevate</span> their craft—privacy practices should be clear and
            predictable. This policy explains what we collect and why, in plain language.
          </p>
          <div className="relative mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-[#4B2188]/40">
              GDPR-aware framing
            </Badge>
            <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">Data minimization</Badge>
          </div>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last updated: April 13, 2026</p>
            <div className="mt-8 space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                  <h2 className="text-lg font-semibold tracking-tight text-foreground">{section.title}</h2>
                  {section.body && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{section.body}</p>}
                  {section.bullets && (
                    <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground marker:text-[#4B2188]">
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          For terms governing use of the platform, see our{" "}
          <Link href="/terms" className="font-medium text-foreground underline-offset-4 hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
