import type { Locale } from "@/i18n/utils";

const calendlyUrl = "https://calendly.com/hello-awesomeworks/30min";
const emailUrl = "mailto:hello@awesomeworks.ai";
const localizedProductUrl = (baseUrl: string, locale: Locale) => `${baseUrl}/${locale}/`;
const githubUrl = "https://github.com/Raff-dev";
const gooseUrl = "https://raff-dev.github.io/goose/";
const gooseRepoUrl = "https://github.com/Raff-dev/goose";
const xUrl = "https://x.com/awesomeworksai";
const linkedinUrl = "https://linkedin.com/in/rlazicki";
const instagramUrl = "https://instagram.com/awesomeworksai";

const personalHome = {
  pl: {
    meta: {
      title: "Rafał Łazicki — systemy AI, agenci i produkty budowane przez foundera",
      description:
        "Systemy AI, które robią robotę, nie prezentację. Rafał Łazicki buduje agentów i produkty dla founderów i zespołów, które chcą szybciej dowozić.",
      socialDescription:
        "Rafał Łazicki buduje AI, które wykonuje realną pracę — nie demo.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "AI systems · founder",
      links: [
        { id: "story", label: "Historia", href: "/pl/story" },
        { id: "work", label: "Praca", href: "#work" },
        { id: "socials", label: "Sociale", href: "#socials" },
        { id: "contact", label: "Kontakt", href: "#contact" },
      ],
      cta: "Umów rozmowę",
    },
    hero: {
      eyebrow: "Rafał Łazicki · AI engineer · founder",
      name: "Rafał Łazicki",
      title: "Buduję systemy AI, które wykonują pracę — nie demonstracje.",
      subtitle:
        "Od backendu i dużych danych przeszedłem do własnych RAG-ów, agentów i harnessów. Dziś pracuję wyłącznie nad AI.",
      primaryCta: "Zobacz moją pracę",
      primaryHref: "#work",
      secondaryCta: "Umów rozmowę",
      secondaryHref: calendlyUrl,
      storyCta: "Przeczytaj pełną historię",
      storyHref: "/pl/story",
      facts: [
        "Wojskowa Akademia Techniczna · Data Science",
        "backend engineer · duże zbiory danych",
        "dziś: agent systems + harnesses",
      ],
    },
    story: {
      eyebrow: "Historia",
      title: "Backend. DevOps. Zawsze bliżej technologii niż opowieści o niej.",
      intro:
        "Ukończyłem Wojskową Akademię Techniczną w Warszawie na kierunku Data Science. Zanim wszedłem w AI na full-time, pracowałem przy danych, backendzie, DevOpsie i narzędziach wewnętrznych.",
      points: [
        {
          label: "Fascynacja",
          text: "Technologia i AI fascynowały mnie dużo wcześniej, zanim ten rynek zrobił się głośny.",
        },
        {
          label: "Backend",
          text: "Pracowałem jako backend engineer i obsługiwałem duże zbiory danych, gdzie liczyły się niezawodność i precyzja.",
        },
        {
          label: "DevOps",
          text: "Później przejąłem też DevOps i budowę narzędzi wewnętrznych, więc zacząłem patrzeć na system jako całość.",
        },
      ],
      quote: "Ta ścieżka dała mi dobre fundamenty pod AI, które ma działać w prawdziwym workflow.",
      imageAlt: "Rafał Łazicki",
    },
    pivot: {
      line: "2022. GPT-3.5.",
    },
    focus: {
      eyebrow: "Punkt zwrotny",
      title: "To był moment, w którym chciałem wejść w AI w całości.",
      description:
        "Zacząłem eksperymentować z wieloma narzędziami, budować własne wczesne systemy RAG i sprawdzać, co działa w praktyce. Nie chciałem już tylko dotykać AI z boku. Przeszedłem w nie w pełni.",
      points: [
        "Najpierw własne RAG-i.",
        "Później systemy agentowe.",
        "Dziś: harnessy, evaluacja i sterowanie agentami.",
      ],
      storyCta: "Przeczytaj pełną historię",
      storyHref: "/pl/story",
    },
    products: {
      eyebrow: "Praca",
      title: "Zobacz moją pracę tutaj.",
      subtitle: "Cztery różne produkty. Cztery różne typy problemu. Jedna linia: systemy AI, które wchodzą do realnej pracy.",
      extra: "Od SaaS-ów po workflow dla builderów i open source: każdy z tych produktów wyrósł z realnego bottlenecku w pracy.",
      items: [
        {
          id: "callwise",
          name: "CallWise",
          label: "Kontekst po rozmowie",
          title: "Nie gub ustaleń z rozmowy, od których potem zależy delivery.",
          description:
            "CallWise przechwytuje rozmowy discovery, notatki, action items i kluczowe ustalenia, żeby founder, PM i tech lead nie odbudowywali scope'u z fragmentów.",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "pl"),
          cta: "Otwórz CallWise",
          note: "Produkt live",
          aside: "Jedna rozmowa staje się pierwszym artefaktem delivery, zamiast kolejnym taskiem na recap.",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "AI coding workflow",
          title: "System pracy z agentami AI dla builderów, którzy chcą szybciej dowozić SaaS.",
          description:
            "CourseAI pokazuje workflow: pomysł → specyfikacja → kod → review → deploy, żeby budować szybciej bez dokładania headcountu zbyt wcześnie.",
          href: localizedProductUrl("https://course.awesomeworks.ai", "pl"),
          cta: "Otwórz CourseAI",
          note: "Aplikacja live",
          aside: "To nie katalog promptów. To system pracy dla builderów, którzy chcą domykać delivery częściej i spokojniej.",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Finanse i operacje",
          title: "Workflow finansowy bez ręcznego chaosu.",
          description:
            "Ask porządkuje obieg faktur i administrację operacyjną tam, gdzie manualna praca zaczyna spowalniać zespół.",
          href: "https://ask.awesomeworks.ai",
          cta: "Otwórz Ask",
          note: "Early access",
          aside: "Mniej ręcznego obiegu faktur i mniej tarcia tam, gdzie finanse spowalniają operacje.",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Open source",
          title: "Harness do testowania workflow AI i zachowania agentów.",
          description:
            "Goose pomaga testować prompty, tool-calle i zachowanie agentów, zanim błąd trafi do użytkownika albo na produkcję.",
          href: gooseUrl,
          cta: "Otwórz Goose",
          secondaryHref: gooseRepoUrl,
          secondaryCta: "Repo na GitHubie",
          note: "Repo publiczne",
          aside: "Prompty, tool-calle i agenci można złamać wcześniej — właśnie po to jest ten harness.",
        },
      ],
    },
    socials: {
      eyebrow: "Sociale",
      title: "Zobacz moje sociale tutaj.",
      subtitle:
        "GitHub pokazuje kod. X pokazuje obserwacje z rynku. LinkedIn daje szerszy kontekst. Instagram pokazuje, co buduję na co dzień.",
      items: [
        {
          icon: "github",
          name: "GitHub",
          href: githubUrl,
          meta: "github.com/Raff-dev",
          description: "Kod, repozytoria i open-source.",
        },
        {
          icon: "x",
          name: "X",
          href: xUrl,
          meta: "@awesomeworksai",
          description: "Krótkie obserwacje o AI, delivery i budowaniu produktów.",
        },
        {
          icon: "linkedin",
          name: "LinkedIn",
          href: linkedinUrl,
          meta: "linkedin.com/in/rlazicki",
          description: "Myślenie produktowe, AI i kontekst founderski.",
        },
        {
          icon: "instagram",
          name: "Instagram",
          href: instagramUrl,
          meta: "@awesomeworksai",
          description: "Krótsze formaty i to, co dzieje się wokół budowania.",
        },
      ],
    },
    closing: {
      eyebrow: "Kontakt",
      title: "Jeśli budujesz coś z AI, porozmawiajmy.",
      description:
        "Najchętniej rozmawiam z founderami i zespołami, które chcą przejść od pomysłu do działającego systemu.",
      primaryCta: "Umów rozmowę",
      primaryHref: calendlyUrl,
      secondaryCta: "Napisz maila",
      secondaryHref: emailUrl,
      storyCta: "Przeczytaj historię foundera",
      storyHref: "/pl/story",
      microcopy: "Możesz też zacząć od produktów albo sociali, jeśli chcesz najpierw zobaczyć pracę.",
    },
    footer: {
      tagline: "Personal landing Rafała Łazickiego. Systemy AI, agenci i produkty budowane przez foundera.",
      legal: "Prawne",
      legalLinks: [
        { label: "Polityka prywatności", href: "/pl/privacy" },
        { label: "Regulamin", href: "/pl/terms" },
      ],
      copyright: "© 2026 Rafał Łazicki / AwesomeWorks",
    },
  },
  en: {
    meta: {
      title: "Rafał Łazicki — AI systems, agents, and founder-built products",
      description:
        "Founder and AI engineer turning AI into working systems, agents, and products. Less demo theater, more delivery, automation, and leverage.",
      socialDescription:
        "Rafał Łazicki builds AI that does real work — not demo theater.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "AI systems · founder",
      links: [
        { id: "story", label: "Story", href: "/en/story" },
        { id: "work", label: "Work", href: "#work" },
        { id: "socials", label: "Socials", href: "#socials" },
        { id: "contact", label: "Contact", href: "#contact" },
      ],
      cta: "Book a call",
    },
    hero: {
      eyebrow: "Rafał Łazicki · AI engineer · founder",
      name: "Rafał Łazicki",
      title: "I build AI systems that do work — not demos.",
      subtitle:
        "I moved from backend and large datasets into early RAG systems, agents, and harnesses. Today I work entirely on AI.",
      primaryCta: "See my work",
      primaryHref: "#work",
      secondaryCta: "Book a call",
      secondaryHref: calendlyUrl,
      storyCta: "Read the full story",
      storyHref: "/en/story",
      facts: [
        "Military University of Technology · Data Science",
        "backend engineer · large datasets",
        "today: agent systems + harnesses",
      ],
    },
    story: {
      eyebrow: "Story",
      title: "Backend. DevOps. Always closer to the technology than the talk around it.",
      intro:
        "I graduated from the Military University of Technology in Warsaw in Data Science. Before moving into AI full-time, I worked across data-heavy backend systems, DevOps, and internal tooling.",
      points: [
        {
          label: "Fascination",
          text: "Technology and AI had my attention long before the space became loud.",
        },
        {
          label: "Backend",
          text: "I worked as a backend engineer on large datasets, where reliability and precision mattered every day.",
        },
        {
          label: "DevOps",
          text: "Later I also took on DevOps and internal tool building, so I started thinking in end-to-end systems.",
        },
      ],
      quote: "That path gave me the foundation for AI that has to work inside real workflows.",
      imageAlt: "Rafał Łazicki",
    },
    pivot: {
      line: "2022. GPT-3.5.",
    },
    focus: {
      eyebrow: "Turning point",
      title: "That was the moment I wanted to move fully into AI.",
      description:
        "I started experimenting with many tools, building my own early RAG systems, and testing what actually worked. I no longer wanted to stay adjacent to AI. I moved into it completely.",
      points: [
        "First, my own RAG systems.",
        "Then, agent systems.",
        "Today: harnesses, evaluation, and agent control.",
      ],
      storyCta: "Read the full story",
      storyHref: "/en/story",
    },
    products: {
      eyebrow: "Work",
      title: "See my work here.",
      subtitle: "Four different products. Four different problems. One line through all of them: AI systems that enter real workflows.",
      extra: "From SaaS products to builder workflows and open source, each of these started from a real bottleneck in day-to-day work.",
      items: [
        {
          id: "callwise",
          name: "CallWise",
          label: "Post-call context",
          title: "Keep the client-call context that delivery will need later.",
          description:
            "CallWise captures discovery calls, notes, action items, and key decisions so founders, PMs, and tech leads stop rebuilding scope from fragments.",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "en"),
          cta: "Open CallWise",
          note: "Live product",
          aside: "One call becomes the first delivery artifact instead of another recap task.",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "AI coding workflow",
          title: "A working system for builders who want to ship SaaS faster with AI agents.",
          description:
            "CourseAI teaches the workflow: idea → spec → code → review → deploy, so you can move faster without solving slow execution by hiring too early.",
          href: localizedProductUrl("https://course.awesomeworks.ai", "en"),
          cta: "Open CourseAI",
          note: "Live app",
          aside: "It is not a prompt catalog. It is a working system for builders who want more leverage and calmer delivery.",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Finance and ops",
          title: "Finance workflow without manual drag.",
          description:
            "Ask brings order to invoices and operational admin where manual finance work starts slowing the team down.",
          href: "https://ask.awesomeworks.ai",
          cta: "Open Ask",
          note: "Early access",
          aside: "Less invoice admin and less drag where finance starts slowing operations down.",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Open source",
          title: "A harness for testing AI workflows and agent behavior.",
          description:
            "Goose helps test prompts, tool calls, and agent behavior before failures reach users or production.",
          href: gooseUrl,
          cta: "Open Goose",
          secondaryHref: gooseRepoUrl,
          secondaryCta: "View the GitHub repo",
          note: "Public repo",
          aside: "Prompts, tool calls, and agents can fail early — this harness is there to catch that first.",
        },
      ],
    },
    socials: {
      eyebrow: "Socials",
      title: "See my socials here.",
      subtitle: "GitHub shows the code. X shows market observations. LinkedIn gives the broader context. Instagram shows what I’m building day to day.",
      items: [
        {
          icon: "github",
          name: "GitHub",
          href: githubUrl,
          meta: "github.com/Raff-dev",
          description: "Code, repositories, and open source.",
        },
        {
          icon: "x",
          name: "X",
          href: xUrl,
          meta: "@awesomeworksai",
          description: "Short takes on AI, delivery, and building products.",
        },
        {
          icon: "linkedin",
          name: "LinkedIn",
          href: linkedinUrl,
          meta: "linkedin.com/in/rlazicki",
          description: "Product thinking, AI, and founder context.",
        },
        {
          icon: "instagram",
          name: "Instagram",
          href: instagramUrl,
          meta: "@awesomeworksai",
          description: "Short-form building updates and behind the scenes.",
        },
      ],
    },
    closing: {
      eyebrow: "Contact",
      title: "If you're building something with AI, let's talk.",
      description:
        "I most like speaking with founders and teams who want to move from an idea to a working system.",
      primaryCta: "Book a call",
      primaryHref: calendlyUrl,
      secondaryCta: "Send an email",
      secondaryHref: emailUrl,
      storyCta: "Read the founder story",
      storyHref: "/en/story",
      microcopy: "You can also start with the products or socials if you want to see the work first.",
    },
    footer: {
      tagline: "Personal landing for Rafał Łazicki. AI systems, agents, and founder-built products.",
      legal: "Legal",
      legalLinks: [
        { label: "Privacy Policy", href: "/en/privacy" },
        { label: "Terms of Service", href: "/en/terms" },
      ],
      copyright: "© 2026 Rafał Łazicki / AwesomeWorks",
    },
  },
} as const;

export type PersonalHomeContent = (typeof personalHome)[Locale];

export function getPersonalHome(locale: Locale): PersonalHomeContent {
  return personalHome[locale];
}
