import type { Locale } from "@/i18n/utils";

// Live product URLs (both systems run in production).
const odbieraUrl = (locale: Locale) => (locale === "en" ? "https://odbiera.ai/en/" : "https://odbiera.ai/");
const callwiseUrl = (locale: Locale) => `https://callwise.awesomeworks.ai/${locale}/`;

const githubUrl = "https://github.com/Raff-dev";
const xUrl = "https://x.com/awesomeworksai";
const linkedinUrl = "https://linkedin.com/in/rlazicki";

export const organizationSameAs = [linkedinUrl, githubUrl, xUrl] as const;
export const personSameAs = [linkedinUrl, githubUrl] as const;

export const privacyPath = (locale: Locale) => (locale === "en" ? "/en/privacy/" : "/pl/prywatnosc/");

const socialLinks = [
  { icon: "linkedin", name: "LinkedIn", href: linkedinUrl },
  { icon: "github", name: "GitHub", href: githubUrl },
  { icon: "x-brand", name: "X", href: xUrl },
] as const;

const companyHome = {
  pl: {
    meta: {
      title: "AwesomeWorks | Agenci AI i oprogramowanie na zamówienie",
      description:
        "Polski software house od agentów AI: agenci głosowi i konwersacyjni, dedykowane oprogramowanie i szkolenia AI. Trzy własne produkty na produkcji. Darmowy audyt AI na start.",
      socialDescription:
        "Polski software house od agentów AI. Agenci głosowi, konwersacyjni, dedykowany software i szkolenia. Trzy własne produkty na produkcji.",
      ogImageAlt: "AwesomeWorks: agenci AI i oprogramowanie na zamówienie",
    },
    nav: {
      brand: "AwesomeWorks",
      links: [
        { id: "uslugi", label: "Usługi", href: "#uslugi" },
        { id: "produkty", label: "Produkty", href: "#produkty" },
        { id: "proces", label: "Proces", href: "#proces" },
        { id: "faq", label: "FAQ", href: "#faq" },
      ],
      reviewsLink: { id: "opinie", label: "Opinie", href: "#opinie" },
      cta: "Darmowy audyt AI",
    },
    hero: {
      title: "Systemy AI dla biznesu.",
      subtitle:
        "Projektujemy i utrzymujemy agentów głosowych, konwersacyjnych i dedykowany software. Zacznij od darmowego audytu AI twojej firmy.",
      primaryCta: "Darmowy audyt AI",
      trust: ["100% polska firma", "działający system co sprint", "utrzymanie i rozwój po starcie"],
    },
    services: {
      title: "Co robimy",
      subtitle: "Budujemy systemy, które przejmują powtarzalną pracę i zostają z tobą na produkcji.",
      items: [
        {
          id: "automation",
          icon: "workflow",
          image: "/services/automation.webp",
          imageAlt: "Ilustracja automatycznego przepływu pracy",
          name: "Automatyzacje AI",
          text: "Łączymy narzędzia, które już masz, w przepływy, które robią robotę same: dokumenty, maile, CRM, raporty. Rutyna przestaje zjadać dzień zespołu.",
          proofLabel: "Od jednego przepływu po cały proces.",
          proofHref: "",
        },
        {
          id: "voice",
          icon: "audio-lines",
          image: "/services/voice-assistant.webp",
          imageAlt: "Ilustracja agenta głosowego odbierającego telefon",
          name: "Agenci głosowi",
          text: "Odbierają telefony, umawiają terminy i odpowiadają na pytania klientów 24/7. Twoja recepcja nie ma kolejki i nie bierze wolnego.",
          proofLabel: "Tak działa nasz produkt odbiera.ai",
          proofHref: "https://odbiera.ai/",
        },
        {
          id: "chat",
          icon: "message-square",
          image: "/services/chat-assistant.webp",
          imageAlt: "Ilustracja agenta konwersacyjnego w oknie czatu",
          name: "Agenci konwersacyjni",
          text: "Czat na twojej stronie lub w aplikacji, podpięty do twojej bazy wiedzy. Odpowiada klientom, zanim zdążą napisać maila.",
          proofLabel: "Przykład? Otwórz czat demo w rogu ekranu.",
          proofHref: "",
        },
        {
          id: "data",
          icon: "cpu",
          image: "/services/data-analysis.webp",
          imageAlt: "Ilustracja analizy danych",
          name: "Analiza danych",
          text: "Łączymy dane z twoich systemów i przepuszczamy przez AI: transkrypcje, oceny, trendy, raporty. Decyzje podejmujesz na liczbach, nie na przeczuciu.",
          proofLabel: "Tak działa nasz produkt CallWise",
          proofHref: "https://callwise.awesomeworks.ai/pl/",
        },
        {
          id: "training",
          icon: "graduation-cap",
          image: "/services/training.webp",
          imageAlt: "Ilustracja warsztatu szkoleniowego z AI",
          name: "Szkolenia AI",
          text: "Warsztaty dla zespołów: narzędzia, agenci i bezpieczna praca z AI na co dzień. Po warsztacie zespół umie korzystać z tych narzędzi w swojej pracy.",
          proofLabel: "Format: warsztaty na żywo, na waszych przykładach.",
          proofHref: "",
        },
      ],
    },
    craft: {
      title: "Wykonujemy dedykowane oprogramowanie.",
      text: "Aplikacje i systemy z AI, od projektu po wdrożenie i utrzymanie. Dostajesz software dopasowany do procesu, nie proces dopasowany do softwaru.",
      linkLabel: "Zobacz, jak pracujemy",
    },
    products: {
      eyebrow: "produkty",
      title: "Rozwijamy własne produkty.",
      subtitle: "odbiera.ai, CallWise i CourseAI: na produkcji, z prawdziwymi użytkownikami.",
      liveLabel: "na produkcji",
      items: [
        {
          id: "odbiera",
          name: "odbiera.ai",
          description:
            "AI recepcjonistka głosowa dla firm. Odbiera telefony, umawia terminy i potwierdza je SMS-em, także po godzinach.",
          shot: "/projects/odbiera-pl.webp",
          shotAlt: "odbiera.ai: strona produktu AI recepcjonistki",
          href: odbieraUrl("pl"),
          linkLabel: "odbiera.ai",
        },
        {
          id: "callwise",
          name: "CallWise",
          description:
            "AI Call Scoring dla zespołów sprzedaży. Każda rozmowa handlowa zamienia się w transkrypcję, ocenę i zadania w CRM.",
          shot: "/projects/callwise-pl.webp",
          shotAlt: "CallWise: panel analizy rozmów sprzedażowych",
          href: callwiseUrl("pl"),
          linkLabel: "callwise.awesomeworks.ai",
        },
        {
          id: "courseai",
          name: "CourseAI",
          description:
            "Kurs online AI codingu. Uczymy budować oprogramowanie z agentami AI na realnych projektach, nie na slajdach.",
          shot: "/projects/courseai-pl.webp",
          shotAlt: "CourseAI: platforma kursu AI codingu",
          href: "https://course.awesomeworks.ai/",
          linkLabel: "course.awesomeworks.ai",
        },
      ],
    },
    process: {
      title: "Jak pracujemy",
      steps: [
        {
          title: "Rozmowa o potrzebie",
          text: "Opowiadasz, co ma się zmienić w twojej firmie. Bez zobowiązań i bez slajdów.",
        },
        {
          title: "Plan i wycena",
          text: "Dostajesz zakres, harmonogram i koszt z góry. Wiesz, za co płacisz, zanim zapłacisz.",
        },
        {
          title: "Wdrożenie",
          text: "Pracujemy iteracyjnie i pokazujemy działający system co sprint, nie raport co kwartał.",
        },
        {
          title: "Utrzymanie i rozwój",
          text: "Po starcie zostajemy: monitorujemy, poprawiamy i rozwijamy. Tak samo dbamy o własne produkty.",
        },
      ],
      cta: "Darmowy audyt AI",
    },
    reviews: {
      eyebrow: "opinie",
      title: "Co mówią klienci",
      onGoogle: "na Google",
      reviewsCount: "opinii",
      seeOnGoogle: "Zobacz w Google",
    },
    faq: {
      title: "Pytania przed decyzją",
      items: [
        {
          q: "Na czym polega darmowy audyt AI?",
          a: "To krótka analiza twoich procesów: sprawdzamy, gdzie powtarzalna praca zjada czas zespołu i co realnie przejmie agent albo automatyzacja. Kończy się listą konkretnych rekomendacji, za którą nic nie płacisz.",
        },
        {
          q: "Ile kosztuje wdrożenie agenta albo projektu?",
          a: "Koszt zależy od zakresu: liczby procesów, integracji i tego, czy budujemy od zera, czy na twoich systemach. Po pierwszej rozmowie dostajesz wycenę z konkretnym zakresem i harmonogramem, zanim podejmiesz jakąkolwiek decyzję.",
        },
        {
          q: "Ile trwa wdrożenie i kiedy zobaczę pierwszą działającą wersję?",
          a: "Pierwszą działającą wersję pokazujemy już w trakcie wdrożenia. Zakres dzielimy na etapy, a każdy etap kończy się czymś, co możesz kliknąć i ocenić. Harmonogram dostajesz razem z wyceną.",
        },
        {
          q: "Co z danymi: gdzie są przetwarzane i jak wygląda RODO?",
          a: "Infrastrukturę utrzymujemy w UE wszędzie tam, gdzie to możliwe, a z klientami podpisujemy umowę powierzenia danych (DPA). Zakres przetwarzania, retencję i podwykonawców opisujemy wprost w umowie, a architekturę projektujemy tak, żeby twoje dane nie wychodziły poza nią bez kontroli.",
        },
        {
          q: "Czy utrzymujecie i rozwijacie system po wdrożeniu?",
          a: "Tak, to nasz domyślny model współpracy. Własne produkty utrzymujemy na produkcji od lat i tak samo traktujemy systemy klientów po wdrożeniu.",
        },
        {
          q: "Pracujecie na naszych systemach czy budujecie od zera?",
          a: "Jedno i drugie. Jeśli masz działający CRM, telefonię czy bazę wiedzy, podpinamy się do nich przez API. Od zera budujemy wtedy, gdy istniejące narzędzia blokują proces.",
        },
        {
          q: "Jak wyglądają szkolenia AI: format i dla kogo?",
          a: "Warsztaty na żywo, na przykładach z twojej firmy. Zakres i wielkość grupy dopasowujemy do zespołu, od handlowców po zarząd.",
        },
      ],
    },
    contact: {
      eyebrow: "kontakt",
      title: "Zacznij od darmowego audytu AI",
      subtitle: "Napisz, z czym przychodzisz. Wrócimy z konkretnymi pytaniami, nie z gotową ofertą z szablonu.",
      nextTitle: "Co dalej",
      next: [
        "Odpowiadamy w ciągu 24 godzin.",
        "Robimy darmowy audyt AI: patrzymy na twoje procesy i wskazujemy, co przejmie agent albo automatyzacja.",
        "Dostajesz plan i wycenę wdrożenia.",
      ],
      altLabel: "Wolisz maila?",
      email: "hello@awesomeworks.ai",
      form: {
        name: "Imię i nazwisko",
        company: "Firma",
        companyPlaceholder: "opcjonalnie",
        phone: "Telefon",
        email: "Email",
        message: "Wiadomość",
        messagePlaceholder: "Opowiedz w dwóch zdaniach, czego potrzebujesz",
        submit: "Wyślij",
        submitLoading: "Wysyłanie",
        success: "Dziękujemy! Odpowiemy w ciągu 24 godzin.",
        consentPre: "Wysyłając formularz, akceptujesz przetwarzanie danych zgodnie z ",
        consentLink: "polityką prywatności",
        errors: {
          required: "Uzupełnij imię i nazwisko, telefon oraz email.",
          email: "Sprawdź adres email, wygląda na niepełny.",
          phone: "Sprawdź numer telefonu, potrzebujemy co najmniej 9 cyfr.",
          capacity: "Przyjęliśmy dziś komplet zgłoszeń. Napisz na hello@awesomeworks.ai albo spróbuj jutro.",
          generic: "Nie udało się wysłać formularza. Spróbuj ponownie albo napisz na hello@awesomeworks.ai.",
        },
      },
    },
    footer: {
      brandLine: "Polski software house od agentów AI i dedykowanego oprogramowania.",
      legalLine: "Awesome Works AI Rafał Łazicki, NIP 5223202536, Warszawa",
      companyTitle: "Firma",
      companyLinks: [
        { label: "Usługi", href: "#uslugi" },
        { label: "Produkty", href: "#produkty" },
        { label: "Proces", href: "#proces" },
        { label: "FAQ", href: "#faq" },
        { label: "Kontakt", href: "#kontakt" },
      ],
      productsTitle: "Produkty",
      productLinks: [
        { label: "odbiera.ai", href: odbieraUrl("pl") },
        { label: "CallWise", href: callwiseUrl("pl") },
      ],
      legalTitle: "Prawo i sociale",
      privacyLabel: "Polityka prywatności",
      socials: socialLinks,
      copyright: "© 2026 AwesomeWorks",
    },
    chat: {
      openLabel: "Otwórz czat (wersja pokazowa)",
      closeLabel: "Zamknij czat",
      dialogLabel: "Czat z AwesomeWorks (wersja pokazowa)",
      header: "AwesomeWorks · asystent demo",
      nudge: "Masz pytanie?",
      nudgeDismiss: "Zamknij podpowiedź",
      inputPlaceholder: "Napisz wiadomość",
      sendLabel: "Wyślij wiadomość",
      typingLabel: "Asystent pisze",
      goToForm: "Przejdź do formularza",
      welcome:
        "Cześć! Jestem wersją pokazową agenta konwersacyjnego. Takie agenty budujemy dla klientów. Napisz coś albo od razu przejdź do formularza, a porozmawiasz z człowiekiem.",
      replies: [
        "Jestem wersją pokazową, więc nie odpowiem sensownie na to pytanie. Człowiek odpowie w 24 godziny: zostaw kontakt w formularzu.",
        "Produkcyjna wersja takiego agenta odpowiedziałaby z twojej bazy wiedzy. Napisz do nas przez formularz, pokażemy jak.",
        "Tu kończy się demo, a zaczyna rozmowa z człowiekiem. Umów darmowy audyt przez formularz albo napisz na hello@awesomeworks.ai.",
        "Nie mam dostępu do wiedzy o twojej sprawie, jestem tylko pokazem interfejsu. Formularz na dole strony trafia prosto do zespołu.",
        "Takiego agenta, tylko podpiętego do twoich danych, wdrażamy u klientów. Zostaw kontakt, opowiemy o szczegółach.",
        "Rozumiem mniej, niż udaję. Prawdziwy projekt zaczyna się od rozmowy: zostaw kontakt w formularzu, odezwiemy się w 24 godziny.",
      ],
    },
  },
  en: {
    meta: {
      title: "AwesomeWorks | AI agents and custom software",
      description:
        "Polish software house building AI agents: voice and chat agents, custom software, and AI training. Three in-house products in production. Start with a free AI audit.",
      socialDescription:
        "Polish software house building AI agents. Voice agents, chat agents, custom software, and training. Three in-house products in production.",
      ogImageAlt: "AwesomeWorks: AI agents and custom software",
    },
    nav: {
      brand: "AwesomeWorks",
      links: [
        { id: "uslugi", label: "Services", href: "#uslugi" },
        { id: "produkty", label: "Products", href: "#produkty" },
        { id: "proces", label: "Process", href: "#proces" },
        { id: "faq", label: "FAQ", href: "#faq" },
      ],
      reviewsLink: { id: "opinie", label: "Reviews", href: "#opinie" },
      cta: "Free AI audit",
    },
    hero: {
      title: "AI systems for business.",
      subtitle:
        "We design and run voice agents, chat agents, and custom software. Start with a free AI audit of your company.",
      primaryCta: "Free AI audit",
      trust: ["100% Polish company", "a working system every sprint", "maintenance and growth after launch"],
    },
    services: {
      title: "What we do",
      subtitle: "We build systems that take over repetitive work, and we keep them running in production.",
      items: [
        {
          id: "automation",
          icon: "workflow",
          image: "/services/automation.webp",
          imageAlt: "Illustration of an automated workflow",
          name: "AI automations",
          text: "We connect the tools you already use into flows that do the work on their own: documents, email, CRM, reports. Routine stops eating your team's day.",
          proofLabel: "From a single flow to a whole process.",
          proofHref: "",
        },
        {
          id: "voice",
          icon: "audio-lines",
          image: "/services/voice-assistant.webp",
          imageAlt: "Illustration of a voice agent answering a phone call",
          name: "Voice agents",
          text: "They answer calls, book appointments, and handle customer questions 24/7. Your front desk has no queue and never takes a day off.",
          proofLabel: "This is how our product odbiera.ai works",
          proofHref: "https://odbiera.ai/en/",
        },
        {
          id: "chat",
          icon: "message-square",
          image: "/services/chat-assistant.webp",
          imageAlt: "Illustration of a chat agent in a conversation window",
          name: "Chat agents",
          text: "A chat on your website or in your app, wired to your knowledge base. It answers customers before they get around to writing an email.",
          proofLabel: "An example? Open the demo chat in the corner of this screen.",
          proofHref: "",
        },
        {
          id: "data",
          icon: "cpu",
          image: "/services/data-analysis.webp",
          imageAlt: "Illustration of data analysis",
          name: "Data analysis",
          text: "We connect data from your systems and run AI over it: transcripts, scoring, trends, reports. You decide on numbers, not gut feeling.",
          proofLabel: "This is how our product CallWise works",
          proofHref: "https://callwise.awesomeworks.ai/en/",
        },
        {
          id: "training",
          icon: "graduation-cap",
          image: "/services/training.webp",
          imageAlt: "Illustration of an AI training workshop",
          name: "AI training",
          text: "Workshops for teams: tools, agents, and safe day-to-day work with AI. After the workshop your team knows how to use these tools in their own work.",
          proofLabel: "Format: live workshops, built on your own examples.",
          proofHref: "",
        },
      ],
    },
    craft: {
      title: "We build custom software.",
      text: "Applications and AI systems, from design through delivery and maintenance. You get software shaped around your process, not a process shaped around software.",
      linkLabel: "See how we work",
    },
    products: {
      eyebrow: "products",
      title: "We grow our own products.",
      subtitle: "odbiera.ai, CallWise, and CourseAI: in production, with real users.",
      liveLabel: "in production",
      items: [
        {
          id: "odbiera",
          name: "odbiera.ai",
          description:
            "An AI voice receptionist for businesses. It answers calls, books appointments, and confirms them by SMS, after hours too.",
          shot: "/projects/odbiera-en.webp",
          shotAlt: "odbiera.ai: AI receptionist product page",
          href: odbieraUrl("en"),
          linkLabel: "odbiera.ai",
        },
        {
          id: "callwise",
          name: "CallWise",
          description:
            "AI Call Scoring for sales teams. Every sales call turns into a transcript, a score, and tasks in the CRM.",
          shot: "/projects/callwise-en.webp",
          shotAlt: "CallWise: sales call analysis dashboard",
          href: callwiseUrl("en"),
          linkLabel: "callwise.awesomeworks.ai",
        },
        {
          id: "courseai",
          name: "CourseAI",
          description:
            "An online AI-coding course. We teach building software with AI agents on real projects, not slides.",
          shot: "/projects/courseai-en.webp",
          shotAlt: "CourseAI: AI-coding course platform",
          href: "https://course.awesomeworks.ai/en/",
          linkLabel: "course.awesomeworks.ai",
        },
      ],
    },
    process: {
      title: "How we work",
      steps: [
        {
          title: "A conversation about what you need",
          text: "You tell us what should change in your company. No commitments and no slides.",
        },
        {
          title: "Plan and quote",
          text: "You get the scope, timeline, and cost up front. You know what you pay for before you pay.",
        },
        {
          title: "Delivery",
          text: "We work in iterations and show a working system every sprint, not a report every quarter.",
        },
        {
          title: "Maintenance and growth",
          text: "After launch we stay: we monitor, fix, and keep building, the same way we care for our own products.",
        },
      ],
      cta: "Free AI audit",
    },
    reviews: {
      eyebrow: "reviews",
      title: "What clients say",
      onGoogle: "on Google",
      reviewsCount: "reviews",
      seeOnGoogle: "See on Google",
    },
    faq: {
      title: "Questions before you decide",
      items: [
        {
          q: "What does the free AI audit cover?",
          a: "A short analysis of your processes: we check where repetitive work eats your team's time and what an agent or automation can realistically take over. It ends with a list of concrete recommendations, and you pay nothing for it.",
        },
        {
          q: "How much does an agent or a project cost?",
          a: "The cost depends on scope: the number of processes, integrations, and whether we build from scratch or on top of your systems. After the first call you get a quote with a concrete scope and timeline, before you decide anything.",
        },
        {
          q: "How long does delivery take and when do I see the first working version?",
          a: "We show the first working version while delivery is still underway. We split the scope into stages, and every stage ends with something you can click and judge. The timeline comes with the quote.",
        },
        {
          q: "What about data: where is it processed and how does GDPR work?",
          a: "We keep infrastructure in the EU wherever possible and sign a data processing agreement (DPA) with clients. Processing scope, retention, and subprocessors are spelled out in the contract, and we design the architecture so your data stays under your control.",
        },
        {
          q: "Do you maintain and extend the system after launch?",
          a: "Yes, that is our default way of working. We have kept our own products in production for years, and we treat client systems the same way after launch.",
        },
        {
          q: "Do you work on our systems or build from scratch?",
          a: "Both. If you have a working CRM, telephony, or knowledge base, we connect to them through APIs. We build from scratch when existing tools block the process.",
        },
        {
          q: "What does AI training look like: format and audience?",
          a: "Live workshops built on examples from your company. We match the scope and group size to your team, from sales reps to the board.",
        },
      ],
    },
    contact: {
      eyebrow: "contact",
      title: "Start with a free AI audit",
      subtitle: "Tell us what brings you here. We will come back with concrete questions, not a templated offer.",
      nextTitle: "What happens next",
      next: [
        "We reply within 24 hours.",
        "We run a free AI audit: we look at your processes and point out what an agent or automation can take over.",
        "You get a plan and a quote.",
      ],
      altLabel: "Prefer email?",
      email: "hello@awesomeworks.ai",
      form: {
        name: "Full name",
        company: "Company",
        companyPlaceholder: "optional",
        phone: "Phone",
        email: "Email",
        message: "Message",
        messagePlaceholder: "Tell us in two sentences what you need",
        submit: "Send",
        submitLoading: "Sending",
        success: "Thank you! We will reply within 24 hours.",
        consentPre: "By sending the form you accept data processing under our ",
        consentLink: "privacy policy",
        errors: {
          required: "Fill in your name, phone, and email.",
          email: "Check the email address, it looks incomplete.",
          phone: "Check the phone number, we need at least 9 digits.",
          capacity: "We are at capacity today. Email hello@awesomeworks.ai or try again tomorrow.",
          generic: "We could not send the form. Try again or email hello@awesomeworks.ai.",
        },
      },
    },
    footer: {
      brandLine: "A Polish software house building AI agents and custom software.",
      legalLine: "Awesome Works AI Rafał Łazicki, VAT ID PL5223202536, Warsaw",
      companyTitle: "Company",
      companyLinks: [
        { label: "Services", href: "#uslugi" },
        { label: "Products", href: "#produkty" },
        { label: "Process", href: "#proces" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#kontakt" },
      ],
      productsTitle: "Products",
      productLinks: [
        { label: "odbiera.ai", href: odbieraUrl("en") },
        { label: "CallWise", href: callwiseUrl("en") },
      ],
      legalTitle: "Legal and socials",
      privacyLabel: "Privacy policy",
      socials: socialLinks,
      copyright: "© 2026 AwesomeWorks",
    },
    chat: {
      openLabel: "Open chat (demo version)",
      closeLabel: "Close chat",
      dialogLabel: "Chat with AwesomeWorks (demo version)",
      header: "AwesomeWorks · demo assistant",
      nudge: "Have a question?",
      nudgeDismiss: "Dismiss hint",
      inputPlaceholder: "Type a message",
      sendLabel: "Send message",
      typingLabel: "Assistant is typing",
      goToForm: "Go to the form",
      welcome:
        "Hi! I am a demo version of the chat agents we build for clients. Write something, or go straight to the form and talk to a human.",
      replies: [
        "I am a demo, so I will not answer that question well. A human will, within 24 hours: leave your details in the form.",
        "The production version of this agent would answer from your knowledge base. Reach us through the form and we will show you how.",
        "This is where the demo ends and a human conversation starts. Book the free AI audit through the form or email hello@awesomeworks.ai.",
        "I have no access to your case, I am just a preview of the interface. The form at the bottom of the page goes straight to the team.",
        "We deploy agents like this one, wired to your data, for clients. Leave your details and we will walk you through it.",
        "I understand less than I pretend to. Real projects start with a conversation: leave your details in the form and we reply within 24 hours.",
      ],
    },
  },
} as const;

export type CompanyHomeContent = (typeof companyHome)[Locale];

export function getCompanyHome(locale: Locale): CompanyHomeContent {
  return companyHome[locale];
}
