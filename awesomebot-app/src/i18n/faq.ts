// Shared FAQ item list — single source for both the rendered FAQ section
// (Faq.astro) and the FAQPage JSON-LD (BaseLayout.astro), so the two
// cannot drift apart.
import type { UiKey } from "~/i18n/ui";

export type SegPair = { med: UiKey; est: UiKey };
export type FaqItem = { q: UiKey | SegPair; a: UiKey | SegPair };

export const faqItems: FaqItem[] = [
  { q: { med: "faq.q1.q.med", est: "faq.q1.q.est" }, a: "faq.q1.a" },
  { q: "faq.q2.q", a: "faq.q2.a" },
  { q: "faq.q3.q", a: "faq.q3.a" },
  { q: "faq.q4.q", a: "faq.q4.a" },
  { q: "faq.q5.q", a: "faq.q5.a" },
  { q: { med: "faq.q6.q.med", est: "faq.q6.q.est" }, a: { med: "faq.q6.a.med", est: "faq.q6.a.est" } },
  { q: "faq.q7.q", a: "faq.q7.a" },
];

export const isSegPair = (v: UiKey | SegPair): v is SegPair => typeof v !== "string";
