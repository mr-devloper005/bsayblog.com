import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { CreditCard, Receipt, RefreshCw, Scale, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: CreditCard,
    title: "Accepted methods",
    body: "We support major cards and trusted payment processors where available. Available methods may vary by region and product.",
  },
  {
    icon: Receipt,
    title: "Transparent receipts",
    body: "Every successful charge generates a clear receipt with plan name, amount, tax if applicable, and transaction reference.",
  },
  {
    icon: RefreshCw,
    title: "Subscriptions",
    body: "Recurring plans renew automatically on each billing date unless you cancel before the renewal window described at checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    body: "Payment details are handled by PCI-aware providers. We do not store full card numbers on our own servers.",
  },
  {
    icon: Scale,
    title: "Fair resolution",
    body: "If something looks wrong with a charge, contact us first—we will investigate and correct legitimate billing errors.",
  },
];

const sections = [
  {
    title: "Pricing & quotes",
    paragraphs: [
      `Published prices on ${SITE_CONFIG.name} are shown in the currency selected at checkout unless stated otherwise. Promotional pricing may be time-limited and will be clearly labeled.`,
      "Taxes, duties, or regulatory fees may be added where required by law and will appear before you confirm payment.",
    ],
  },
  {
    title: "Billing cycles",
    paragraphs: [
      "For subscription products, you are charged at the start of each billing period. Upgrades typically take effect immediately; downgrades may apply at the next renewal depending on the product.",
      "Failed payments may result in a grace period followed by suspension of paid features until the balance is resolved.",
    ],
  },
  {
    title: "Refunds & credits",
    paragraphs: [
      "Refund eligibility depends on the specific product, jurisdiction, and the terms shown at purchase. Where a refund is not required by law, we may still offer account credit for good-faith disputes on a case-by-case basis.",
      "To request a refund or credit, reach out through our contact channel with your account email and transaction reference.",
    ],
  },
  {
    title: "Chargebacks & disputes",
    paragraphs: [
      "Please contact support before initiating a chargeback so we can help quickly. Unfounded chargebacks may lead to account review or closure.",
    ],
  },
  {
    title: "Enterprise & invoices",
    paragraphs: [
      "Teams purchasing through invoice or custom agreements are bound by the order form or contract in addition to these policies. In case of conflict, the signed agreement prevails for that order.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Payment Policy to reflect new features, partners, or legal requirements. The “Last updated” date below will change when we publish revisions.",
    ],
  },
];

export default function PaymentPolicyPage() {
  return (
    <PageShell
      title="Payment Policy"
      description={`How billing, renewals, and refunds work when you pay for products on ${SITE_CONFIG.name}.`}
      actions={
        <Button asChild variant="outline" className="border-[#4B2188]/40 bg-background hover:bg-[#4B2188]/5">
          <Link href="/contact">Billing questions</Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#4B2188]/12 via-card to-[#1E4BB5]/10 p-8 shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[#4B2188]/25 to-[#1E4BB5]/20 blur-3xl" />
          <p className="relative max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-mono text-xs text-[#4B2188]">{`{ `}</span>
            This policy explains what you can expect when you purchase paid features, subscriptions, or other offerings from{" "}
            {SITE_CONFIG.name}. It works together with our{" "}
            <Link href="/terms" className="font-medium text-foreground underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            .
            <span className="font-mono text-xs text-[#1E4BB5]">{` }`}</span>
          </p>
          <div className="relative mt-4 flex flex-wrap gap-2">
            <Badge className="bg-gradient-to-r from-[#4B2188] to-[#1E4BB5] text-white">PCI-aware checkout</Badge>
            <Badge variant="secondary">Subscription-friendly</Badge>
            <Badge variant="outline">Region-aware tax</Badge>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4B2188]/15 to-[#1E4BB5]/15 text-[#4B2188]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border bg-card">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground"></p>
            {sections.map((section) => (
              <section key={section.title} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
