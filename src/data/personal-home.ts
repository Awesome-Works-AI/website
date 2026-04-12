import type { Locale } from "@/i18n/utils";

const calendlyUrl = "https://calendly.com/hello-awesomeworks/30min";
const localizedProductUrl = (baseUrl: string, locale: Locale) => `${baseUrl}/${locale}/`;
const githubUrl = "https://github.com/Raff-dev";
const gooseUrl = "https://raff-dev.github.io/goose/";
const xUrl = "https://x.com/awesomeworksai";
const linkedinUrl = "https://linkedin.com/in/rlazicki";
const instagramUrl = "https://instagram.com/awesomeworksai";

export const organizationSameAs = [linkedinUrl, githubUrl, xUrl, instagramUrl] as const;
export const personSameAs = [linkedinUrl, githubUrl] as const;

const personalHome = {
  pl: {
    meta: {
      title: "Rafał Łazicki — AI delivery systems dla zespołów produktowych",
      description:
        "Pomagam zespołom produktowym skrócić drogę od decyzji i scope'u do wdrożenia. Projektuję workflow, handoffy i internal tooling dla AI-native execution.",
      socialDescription:
        "AI delivery systems: workflow, handoffy i internal tooling dla zespołów produktowych.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "delivery systems",
      links: [
        { id: "work", label: "Praca", href: "#work" },
        { id: "process", label: "Proces", href: "#process" },
        { id: "faq", label: "FAQ", href: "#faq" },
        { id: "socials", label: "Sociale", href: "#socials" },
        { id: "story", label: "Historia", href: "#story" },
        { id: "contact", label: "Start", href: "#contact" },
      ],
      cta: "Umów rozmowę o delivery",
    },
    hero: {
      eyebrow: "Rafał Łazicki · delivery systems",
      name: "Rafał Łazicki",
      title: "Skróć drogę od decyzji do wdrożenia.",
      subtitle:
        "Pomagam usuwać bottlenecki w scope'owaniu, handoffach i workflow, żeby zespół dowoził szybciej i spokojniej.",
      primaryCta: "Umów rozmowę o delivery",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      facts: [],
    },
    bottlenecks: {
      title: "To zwykle nie jest problem tempa.",
      intro: "",
      items: [
        {
          title: "Kontekst nie trafia do delivery",
          text: "Ustalenia zostają w callach, notatkach i wątkach zamiast zamieniać się w scope i kolejne kroki.",
        },
        {
          title: "Workflow nadal jest ręczny",
          text: "Bez narzędzi wewnętrznych, guardrailów i sensownej automatyzacji zespół przepycha pracę zamiast ją przyspieszać.",
        },
        {
          title: "Nikt nie trzyma ręki na pulsie",
          text: "Potrzebujesz osoby, która śledzi narzędzia i metody, wybiera to, co warto wdrożyć, i podnosi tempo zespołu bez resetowania jego sposobu pracy.",
        },
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
      title: "Proof, nie obietnice.",
      subtitle: "",
      extra: "",
      items: [
        {
          id: "callwise",
          name: "CallWise",
          label: "Lead proof",
          title: "Rozmowy z klientem zamieniają się w pierwszy scope, zamiast ginąć w notatkach.",
          bullets: [
            "Łączy rozmowy, maile i notatki w jeden kontekst klienta.",
            "Wyciąga ustalenia, ryzyka i pytania do dalszego delivery.",
          ],
          logoSrc: "/callwise-logo.png",
          logoAlt: "CallWise logo",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "pl"),
          cta: "Zobacz proof w CallWise",
          note: "B2B · zamknięty dostęp",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "Orkiestracja workflow",
          title: "",
          description:
            "Warstwa pracy od pomysłu i specyfikacji do kodu, review i deployu.",
          logoSrc: "/courseai-logo.png",
          logoAlt: "CourseAI logo",
          href: localizedProductUrl("https://course.awesomeworks.ai", "pl"),
          cta: "Zobacz workflow",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Ops automation",
          title: "",
          description:
            "Zmniejsza ręczny ciężar w operacjach tam, gdzie admin zaczyna blokować delivery.",
          logoSrc: "/ask-logo.png",
          logoAlt: "Ask logo",
          href: "https://ask.awesomeworks.ai",
          cta: "Zobacz ops flow",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Ewaluacja i reliability",
          title: "",
          description:
            "Harness do testowania promptów, tool-calli i zachowania agentów przed produkcją.",
          logoSrc: "/goose-logo.png",
          logoAlt: "Goose logo",
          href: gooseUrl,
          cta: "Zobacz harness",
        },
      ],
    },
    process: {
      title: "Jak to działa",
      bridge: {
        kicker: "AI enablement w delivery",
        title: "Jeśli bottleneckiem jest brak obycia z AI, domykamy to w trakcie wdrożenia.",
        bullets: [
          "Budujemy w realnym workflow zespołu, nie obok niego.",
          "Pokazujemy wzorce, guardraile i decyzje na żywym projekcie.",
          "Po wdrożeniu zespół ma lepszy sposób pracy, nie tylko gotowy feature.",
        ],
        note: "To embedded enablement osadzone w delivery, nie osobna usługa szkoleniowa.",
        storyLabel: "",
        storyHref: "",
      },
      steps: [
        {
          title: "Mapujemy bottleneck",
          text: "Patrzymy, gdzie ginie kontekst między decyzją, scope'em i wykonaniem.",
        },
        {
          title: "Układamy workflow",
          text: "Porządkujemy handoffy, narzędzia i zasady pracy wokół realnego wąskiego gardła.",
        },
        {
          title: "Domykamy delivery",
          text: "Wdrażamy, testujemy i skracamy drogę od ustalenia do działającego efektu.",
        },
      ],
    },
    fit: {
      title: "Dla kogo to działa",
      good: [
        "Dla CTO i technical founderów, którzy widzą tarcie między rozmową, specyfikacją i implementacją.",
        "Dla zespołów produktowych, które mają klientów i za dużo ręcznych handoffów.",
        "Dla firm, które chcą spokojniejszego delivery bez dokładania kolejnej warstwy chaosu.",
      ],
      bad: [
        "Nie dla zespołów szukających tylko promptów albo warsztatu o AI.",
        "Nie dla organizacji, które wolą długi proces niż szybkie usunięcie konkretnego bottlenecku.",
        "Nie dla projektów bez właściciela decyzji po stronie produktu lub engineeringu.",
      ],
    },
    faq: {
      title: "Pytania, które padają najczęściej",
      items: [
        {
          q: "Co dokładnie robisz?",
          a: "Pomagam uporządkować to, co dzieje się między decyzją a wdrożeniem: scope, handoffy, workflow i narzędzia wewnętrzne.",
        },
        {
          q: "Czy to konsulting, czy wdrożenie?",
          a: "Jedno i drugie. Zaczynamy od znalezienia bottlenecku, ale celem jest działająca zmiana, nie slajd.",
        },
        {
          q: "Czy musimy już używać AI lub agentów?",
          a: "Nie. Pomogę wam zaplanować, gdzie AI ma sens, jak wdrożyć je mądrze i jak podnieść kompetencje zespołu w pracy z odpowiednimi narzędziami.",
        },
        {
          q: "Co przygotować na spotkanie?",
          a: "Zbierz informacje, z jakich narzędzi AI korzystają dziś wasi programiści, jakie mają kompetencje w obszarze AI i jak wygląda ich praktyczna wiedza o LLM-ach.",
        },
        {
          q: "Czy pomagacie też zespołowi nauczyć się tego sposobu pracy?",
          a: "Tak, ale w ramach wspólnego delivery. Celem nie jest warsztat o AI, tylko to, żeby po wdrożeniu zespół lepiej rozumiał decyzje, guardraile i kolejne kroki.",
        },
        {
          q: "Kiedy to nie ma sensu?",
          a: "Gdy problemem nie jest execution, tylko brak decyzji i ownershipu po stronie biznesu.",
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
      eyebrow: "Start",
      title: "Pokaż, gdzie dziś zacina się delivery.",
      description:
        "Przejdziemy scope, handoffy i workflow. Bez ogólników.",
      primaryCta: "Umów rozmowę o delivery",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      microcopy: "Najlepiej działa, gdy masz konkretny feature, klienta albo workflow do przejścia.",
    },
    footer: {
      name: "Rafał Łazicki",
      companyInfo: "Awesome Works AI · NIP: 5223202536 · Warszawa",
      storyLabel: "",
      storyHref: "",
      copyright: "© 2026 Rafał Łazicki / AwesomeWorks",
    },
  },
  en: {
    meta: {
      title: "Rafał Łazicki — AI delivery systems for product teams",
      description:
        "I help product teams shorten the path from decisions and scope to deployment. I design workflows, handoffs, and internal tooling for AI-native execution.",
      socialDescription:
        "AI delivery systems: workflows, handoffs, and internal tooling for product teams.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "delivery systems",
      links: [
        { id: "work", label: "Proof", href: "#work" },
        { id: "process", label: "Flow", href: "#process" },
        { id: "faq", label: "FAQ", href: "#faq" },
        { id: "socials", label: "Socials", href: "#socials" },
        { id: "story", label: "Story", href: "#story" },
        { id: "contact", label: "Start", href: "#contact" },
      ],
      cta: "Book a delivery call",
    },
    hero: {
      eyebrow: "Rafał Łazicki · delivery systems",
      name: "Rafał Łazicki",
      title: "Shorten the path from decision to deployment.",
      subtitle:
        "I remove bottlenecks in scoping, handoffs, and workflow so the team ships faster and with less chaos.",
      primaryCta: "Book a delivery call",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      facts: [],
    },
    bottlenecks: {
      title: "This is usually not a speed problem.",
      intro: "",
      items: [
        {
          title: "Context never reaches delivery",
          text: "Decisions stay in calls, notes, and threads instead of turning into scope and next steps.",
        },
        {
          title: "The workflow stays manual",
          text: "Without internal tools, guardrails, and smart automation, the team keeps pushing work around instead of speeding it up.",
        },
        {
          title: "No one stays in the loop",
          text: "You need someone who tracks tools and methods, picks what is worth adopting, and raises team speed without resetting how the team already works.",
        },
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
      eyebrow: "Proof",
      title: "Proof, not promises.",
      subtitle: "",
      extra: "",
      items: [
        {
          id: "callwise",
          name: "CallWise",
          label: "Lead proof",
          title: "Client conversations become the first scope instead of getting lost in notes.",
          bullets: [
            "Calls, emails, and notes become one client context layer.",
            "Agreements, risks, and questions move into delivery faster.",
          ],
          logoSrc: "/callwise-logo.png",
          logoAlt: "CallWise logo",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "en"),
          cta: "See the proof in CallWise",
          note: "B2B · closed access",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "Workflow orchestration",
          title: "",
          description:
            "The working layer from idea and spec to code, review, and deploy.",
          logoSrc: "/courseai-logo.png",
          logoAlt: "CourseAI logo",
          href: localizedProductUrl("https://course.awesomeworks.ai", "en"),
          cta: "See the workflow",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Ops automation",
          title: "",
          description:
            "Cuts manual admin load where internal ops starts slowing delivery down.",
          logoSrc: "/ask-logo.png",
          logoAlt: "Ask logo",
          href: "https://ask.awesomeworks.ai",
          cta: "See the ops flow",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Evaluation and reliability",
          title: "",
          description:
            "Harness for testing prompts, tool calls, and agent behavior before rollout.",
          logoSrc: "/goose-logo.png",
          logoAlt: "Goose logo",
          href: gooseUrl,
          cta: "See the harness",
        },
      ],
    },
    process: {
      title: "How it works",
      bridge: {
        kicker: "AI enablement in delivery",
        title: "If the bottleneck is missing AI fluency, we close that gap while shipping.",
        bullets: [
          "We build inside the team's real workflow, not beside it.",
          "We explain patterns, guardrails, and trade-offs on live work.",
          "After launch, the team keeps a better operating model, not just a finished feature.",
        ],
        note: "This is embedded enablement inside delivery, not a standalone training offer.",
        storyLabel: "",
        storyHref: "",
      },
      steps: [
        {
          title: "Map the bottleneck",
          text: "We find where context gets lost between decision, scope, and execution.",
        },
        {
          title: "Shape the workflow",
          text: "We tighten handoffs, tools, and rules around the real point of friction.",
        },
        {
          title: "Close the loop",
          text: "We implement, test, and shorten the path from decision to working output.",
        },
      ],
    },
    fit: {
      title: "Who this works for",
      good: [
        "For CTOs and technical founders who see friction between conversations, scope, and implementation.",
        "For product teams with clients and too many manual handoffs.",
        "For companies that want calmer delivery without adding another layer of chaos.",
      ],
      bad: [
        "Not for teams looking only for prompts or an AI workshop.",
        "Not for organizations that prefer a long process over removing one real bottleneck.",
        "Not for projects without product or engineering ownership on the client side.",
      ],
    },
    faq: {
      title: "Questions that come up most often",
      items: [
        {
          q: "What exactly do you do?",
          a: "I help structure what happens between the decision and the deployment: scope, handoffs, workflow, and internal tooling.",
        },
        {
          q: "Is this consulting or implementation?",
          a: "Both. We start by finding the bottleneck, but the goal is an operating change, not a slide deck.",
        },
        {
          q: "Do we need to already use AI or agents?",
          a: "No. I can help you plan where AI makes sense, how to introduce it well, and how to raise the team's confidence with the right AI tools in day-to-day work.",
        },
        {
          q: "What should we prepare for the call?",
          a: "Bring a clear view of which AI tools your developers already use for coding, what their current AI competence looks like, and how practical their LLM knowledge really is.",
        },
        {
          q: "Do you also help the team learn this way of working?",
          a: "Yes, but inside the delivery work. The goal is not an AI workshop. The goal is for your team to leave with better judgment, clearer guardrails, and a system they can keep operating.",
        },
        {
          q: "When does this not make sense?",
          a: "When the real problem is not execution but missing decisions and missing ownership on the business side.",
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
      eyebrow: "Start",
      title: "Show where delivery is getting stuck today.",
      description:
        "We will review scope, handoffs, and workflow. No vague talk.",
      primaryCta: "Book a delivery call",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      microcopy: "This works best when you already have a feature, client flow, or internal process to review.",
    },
    footer: {
      name: "Rafał Łazicki",
      companyInfo: "Awesome Works AI · VAT ID: PL5223202536 · Warsaw, Poland",
      storyLabel: "",
      storyHref: "",
      copyright: "© 2026 Rafał Łazicki / AwesomeWorks",
    },
  },
} as const;

export type PersonalHomeContent = (typeof personalHome)[Locale];

export function getPersonalHome(locale: Locale): PersonalHomeContent {
  return personalHome[locale];
}
