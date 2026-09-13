import type { Locale } from "@/i18n/utils";

// Personal business card of the founder: the QR code on the physical card
// points at https://awesomeworks.ai/people/rafal (Polish, unprefixed);
// the English twin lives under /en/people/rafal/.
// Timeline facts come from the CV only — no invented dates or numbers.

const calendlyUrl = "https://calendly.com/hello-awesomeworks/30min";
const email = "hello@awesomeworks.ai";
const phone = "+48 504 854 839";

const githubUrl = "https://github.com/Raff-dev";
const instagramUrl = "https://instagram.com/makeitagentic";
const linkedinUrl = "https://linkedin.com/in/rlazicki";

export const peopleRafalPath = (locale: Locale) => (locale === "en" ? "/en/people/rafal/" : "/people/rafal/");

const socialItems = [
  { icon: "linkedin", name: "LinkedIn", href: linkedinUrl },
  { icon: "github", name: "GitHub", href: githubUrl },
  { icon: "instagram", name: "Instagram", href: instagramUrl },
] as const;

const peopleRafal = {
  pl: {
    meta: {
      title: "Rafał Łazicki | Senior AI Engineer, founder AwesomeWorks",
      description:
        "Rafał Łazicki: Senior AI Engineer i założyciel AwesomeWorks. Buduje systemy AI dla firm: agentów głosowych, konwersacyjnych i dedykowany software. Twórca CallWise, odbiera.ai i CourseAI.",
    },
    nav: {
      links: [
        { id: "sociale", label: "Sociale", href: "#sociale" },
        { id: "droga", label: "Droga", href: "#droga" },
        { id: "kontakt", label: "Kontakt", href: "#kontakt" },
      ],
      cta: "Umów rozmowę",
    },
    hero: {
      name: "Rafał Łazicki",
      title: "Senior AI Engineer · founder AwesomeWorks",
      bio: [
        "Buduję systemy AI dla firm: agentów głosowych, agentów konwersacyjnych i dedykowany software, który zostaje na produkcji.",
        "Jako założyciel AwesomeWorks rozwijam własne produkty: CallWise (AI Call Scoring), odbiera.ai (recepcjonistka głosowa) i CourseAI (kurs AI codingu).",
      ],
      primaryCta: "Zobacz, co robimy",
      primaryHref: "/pl/",
      secondaryCta: "Napisz",
      secondaryHref: "#kontakt",
      photo: "/people/rafal.webp",
      photoSmall: "/people/rafal-560w.webp",
      photoAlt: "Rafał Łazicki",
      facts: ["Warszawa", "Python · FastAPI · LLM", "3 produkty na produkcji"],
    },
    socials: { items: socialItems },
    booking: {
      cta: "Umów rozmowę",
      href: calendlyUrl,
      note: "30 minut w Calendly. Bez zobowiązań i bez slajdów.",
    },
    timeline: {
      eyebrow: "droga",
      title: "Od developera do własnych produktów AI.",
      subtitle: "Etapy, które zbudowały to, co dziś robię w AwesomeWorks.",
      presentLabel: "dziś",
      items: [
        {
          from: "2018",
          to: "2018",
          company: "Wojskowa Akademia Techniczna",
          role: "mgr inż. · informatyka, data science",
        },
        {
          from: "2020",
          to: "2021",
          company: "enxoo",
          role: "Junior Software Developer",
        },
        {
          from: "2021",
          to: "2022",
          company: "Odoo",
          role: "Python Developer",
        },
        {
          from: "2022",
          to: "2025",
          company: "Gemius",
          role: "Python Developer / DevOps → Generative AI Engineer",
        },
        {
          from: "2025",
          to: "2025",
          company: "Awesome Works AI",
          role: "AI Consultant",
        },
        {
          from: "2025",
          to: "",
          company: "PwC",
          role: "Senior AI Engineer",
        },
        {
          from: "2026",
          to: "",
          company: "Awesome Works AI",
          role: "Lead AI Engineer · CallWise i odbiera.ai",
        },
        {
          from: "2026",
          to: "",
          company: "MakeItAgentic",
          role: "Mentoring AI engineering",
        },
      ],
    },
    projects: {
      eyebrow: "projekty",
      title: "Wybrane projekty.",
      items: [
        "Analiza wymagań, integracje z systemami zewnętrznymi i skrypty w Pythonie automatyzujące procesy.",
        "Dedykowane moduły Odoo i REST API pod indywidualne potrzeby klientów, plus techniczny consulting.",
        "Pipeline'y przetwarzające duże wolumeny danych i CI/CD dla wieloetapowych systemów; potem kategoryzacja treści reklamowych z użyciem LLM, RAG i wyszukiwania wektorowego.",
        "Projekt GenAI dla klienta: systemy LLM z narzędziami do analizy danych i wsparcia decyzji na Azure, z CI/CD i testami nadzorowanymi przez LLM.",
        "Konwersacyjny interfejs do analizy finansowej: LangGraph, RAG, serwery MCP i ewaluacja RAGAS, wdrażane na Azure Kubernetes Service.",
        "Dwa produkty SaaS na produkcji: CallWise analizuje rozmowy sprzedażowe end-to-end, odbiera.ai odbiera telefony po polsku 24/7.",
        "Płatna platforma kursowa o wieloagentowym AI engineeringu, mentoring i wystąpienia o AI w cyklu wytwarzania oprogramowania.",
      ],
    },
    contact: {
      eyebrow: "kontakt",
      title: "Porozmawiajmy.",
      subtitle: "Napisz, z czym przychodzisz. Odpowiadam osobiście.",
      channelsTitle: "Bezpośrednio",
      channels: [
        { icon: "mail", label: email, href: `mailto:${email}?subject=AwesomeWorks` },
        { icon: "calendar", label: "Umów 30 minut w Calendly", href: calendlyUrl, external: true },
        { icon: "phone", label: phone, href: `tel:${phone.replace(/\s/g, "")}` },
      ],
      next: ["Odpowiadam w ciągu 24 godzin.", "Pierwsza rozmowa jest bez zobowiązań i bez slajdów."],
    },
  },
  en: {
    meta: {
      title: "Rafał Łazicki | Senior AI Engineer, founder of AwesomeWorks",
      description:
        "Rafał Łazicki: Senior AI Engineer and founder of AwesomeWorks. Builds AI systems for business: voice agents, chat agents, and custom software. Creator of CallWise, odbiera.ai, and CourseAI.",
    },
    nav: {
      links: [
        { id: "sociale", label: "Socials", href: "#sociale" },
        { id: "droga", label: "Path", href: "#droga" },
        { id: "kontakt", label: "Contact", href: "#kontakt" },
      ],
      cta: "Book a call",
    },
    hero: {
      name: "Rafał Łazicki",
      title: "Senior AI Engineer · founder of AwesomeWorks",
      bio: [
        "I build AI systems for business: voice agents, chat agents, and custom software that stays in production.",
        "As the founder of AwesomeWorks I grow our own products: CallWise (AI Call Scoring), odbiera.ai (AI voice receptionist), and CourseAI (an AI-coding course).",
      ],
      primaryCta: "See what we do",
      primaryHref: "/en/",
      secondaryCta: "Write to me",
      secondaryHref: "#kontakt",
      photo: "/people/rafal.webp",
      photoSmall: "/people/rafal-560w.webp",
      photoAlt: "Rafał Łazicki",
      facts: ["Warsaw", "Python · FastAPI · LLM", "3 products in production"],
    },
    socials: { items: socialItems },
    booking: {
      cta: "Book a call",
      href: calendlyUrl,
      note: "30 minutes on Calendly. No strings, no slides.",
    },
    timeline: {
      eyebrow: "path",
      title: "From developer to my own AI products.",
      subtitle: "The stages that built what I do at AwesomeWorks today.",
      presentLabel: "now",
      items: [
        {
          from: "2018",
          to: "2018",
          company: "Military University of Technology, Warsaw",
          role: "M.Eng. · Computer Science, Data Science",
        },
        {
          from: "2020",
          to: "2021",
          company: "enxoo",
          role: "Junior Software Developer",
        },
        {
          from: "2021",
          to: "2022",
          company: "Odoo",
          role: "Python Developer",
        },
        {
          from: "2022",
          to: "2025",
          company: "Gemius",
          role: "Python Developer / DevOps → Generative AI Engineer",
        },
        {
          from: "2025",
          to: "2025",
          company: "Awesome Works AI",
          role: "AI Consultant",
        },
        {
          from: "2025",
          to: "",
          company: "PwC",
          role: "Senior AI Engineer",
        },
        {
          from: "2026",
          to: "",
          company: "Awesome Works AI",
          role: "Lead AI Engineer · CallWise and odbiera.ai",
        },
        {
          from: "2026",
          to: "",
          company: "MakeItAgentic",
          role: "AI engineering mentoring",
        },
      ],
    },
    projects: {
      eyebrow: "projects",
      title: "Selected projects.",
      items: [
        "Requirements analysis, integrations with external systems, and Python scripts automating processes.",
        "Custom Odoo modules and REST APIs tailored to individual customers, plus technical consulting.",
        "Batch pipelines over large data volumes and CI/CD for multi-stage systems; then ad-content categorization with LLMs, RAG, and vector search.",
        "A GenAI project for a client: tool-using LLM systems for data analysis and decision support on Azure, with CI/CD and LLM-supervised tests.",
        "A conversational interface for financial analysis: LangGraph, RAG, MCP servers, and RAGAS evaluation, deployed on Azure Kubernetes Service.",
        "Two SaaS products in production: CallWise analyzes sales calls end to end, odbiera.ai answers phone calls in Polish 24/7.",
        "A paid course platform on multi-agent AI engineering, mentoring, and talks on AI in the software delivery cycle.",
      ],
    },
    contact: {
      eyebrow: "contact",
      title: "Let's talk.",
      subtitle: "Tell me what brings you here. I answer personally.",
      channelsTitle: "Direct",
      channels: [
        { icon: "mail", label: email, href: `mailto:${email}?subject=AwesomeWorks` },
        { icon: "calendar", label: "Book 30 minutes on Calendly", href: calendlyUrl, external: true },
        { icon: "phone", label: phone, href: `tel:${phone.replace(/\s/g, "")}` },
      ],
      next: ["I reply within 24 hours.", "The first call comes with no commitments and no slides."],
    },
  },
} as const;

export type PeopleRafalContent = (typeof peopleRafal)[Locale];

export function getPeopleRafal(locale: Locale): PeopleRafalContent {
  return peopleRafal[locale];
}
