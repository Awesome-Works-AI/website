import type { Locale } from "@/i18n/utils";

const calendlyUrl = "https://calendly.com/hello-awesomeworks/30min";
const localizedProductUrl = (baseUrl: string, locale: Locale) => `${baseUrl}/${locale}/`;
const githubUrl = "https://github.com/Raff-dev";
const gooseUrl = "https://raff-dev.github.io/goose/";
const aiDailyUrl = "https://raff-dev.github.io/ai-daily/";
const metyraPath = (locale: Locale) => (locale === "en" ? "/metyra/en/" : "/metyra/");
// AwesomeBot now lives on its own subdomain (landing served from the box, like the app).
const awesomebotPath = (locale: Locale) =>
  locale === "en" ? "https://awesomebot.awesomeworks.ai/en/" : "https://awesomebot.awesomeworks.ai/";
const askPath = "/ask/";
const xUrl = "https://x.com/awesomeworksai";
const linkedinUrl = "https://linkedin.com/in/rlazicki";
const instagramUrl = "https://instagram.com/makeitagentic";

export const organizationSameAs = [linkedinUrl, githubUrl, xUrl, instagramUrl] as const;
export const personSameAs = [linkedinUrl, githubUrl] as const;

const personalHome = {
  pl: {
    meta: {
      title: "Rafał Łazicki — AI advisor dla firm usługowych",
      description:
        "Audyt AI w 30 minut dla agencji, kancelarii, biur księgowych i software house'ów. Konkretny plan: co wdrożyć, co pominąć, co odłożyć. Bez sprzedaży i bez slajdów.",
      socialDescription:
        "AI advisor dla firm usługowych. 30 minut rozmowy → konkretny plan wdrożeń. Bez sprzedaży.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "AI advisor",
      links: [
        { id: "fomo", label: "Koszt", href: "#fomo" },
        { id: "work", label: "Proof", href: "#work" },
        { id: "process", label: "Proces", href: "#process" },
        { id: "story", label: "Why me", href: "#story" },
        { id: "faq", label: "FAQ", href: "#faq" },
        { id: "contact", label: "Start", href: "#contact" },
      ],
      cta: "Umów darmowy audyt AI",
      ctaSublabel: "Darmowa 30-minutowa konsultacja",
    },
    hero: {
      eyebrow: "AI advisor dla firm usługowych",
      name: "Rafał Łazicki",
      title: "Twoja konkurencja właśnie wdrożyła AI. Ty się o tym dowiesz po stracie pierwszego klienta.",
      subtitle:
        "Agencje, kancelarie, biura księgowe, software house'y — wszyscy sprzedają czas. Dobrze wdrożone AI mnoży go razy dziesięć. Każdy miesiąc opóźnienia to klienci, którzy po cichu odchodzą tam, gdzie obsługa jest szybsza i tańsza.",
      primaryCta: "Umów darmowy audyt AI",
      primaryHref: calendlyUrl,
      primarySublabel: "Darmowa 30-minutowa konsultacja. Wychodzisz z konkretnym planem.",
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      facts: [],
    },
    bottlenecks: {
      title: "Ile kosztuje cię brak strategii AI?",
      intro: "",
      items: [
        {
          title: "Klienci odchodzą do konkurencji, która używa AI",
          text: "Agencja, która dostarcza brief w cztery godziny zamiast czterech dni, nie musi konkurować ceną — konkuruje czasem. Twój klient już porównuje oferty, nawet jeśli ci o tym nie mówi.",
        },
        {
          title: "Twój zespół traci godziny na powtarzalnej pracy",
          text: "Junior, researcher czy analityk — każdy poświęca 30–50% czasu na zadania, które AI wykonuje w pięć minut. To nie problem efektywności. To marża, którą oddajesz za darmo.",
        },
        {
          title: "Eksperymentowanie kosztuje więcej niż konsultacja",
          text: "Twój zespół próbuje ChatGPT, Zapier, Make, Claude, n8n i co tydzień coś nowego. Każda taka godzina to godzina nieprzepracowana z klientem. Pomnóż przez wielkość zespołu i policz sam.",
        },
        {
          title: "Wdrażasz nie te narzędzia",
          text: "Szum z konferencji to nie jest narzędzie dopasowane do twoich procesów. Wdrożenie bez audytu kończy się subskrypcją, onboardingiem i przeszkoleniem zespołu — a potem rozczarowaniem, którego nie wini się złego wyboru, tylko „cały ten AI hype”.",
        },
      ],
    },
    story: {
      eyebrow: "Why me",
      title: "AI to nie hype. To moja codzienna praca — i sposób, w jaki prowadzę firmę.",
      intro:
        "W branży tech jestem od 2018. Zaczynałem jako programista fullstack, potem backend i DevOps, po drodze projekty z petabajtami danych. Z modelami językowymi pracuję od 2022, dziś specjalizuję się w agentach AI. Siedem wdrożonych produktów, firma zbudowana wokół agentów, codzienne testowanie narzędzi. Nie konsultuję teorii — opowiadam o tym, co robię na co dzień.",
      points: [
        {
          label: "Od 2018 w tech",
          text: "Programista fullstack, później backend i DevOps. Pracowałem przy projektach z petabajtami danych, gdzie liczyły się niezawodność i precyzja. To dało mi fundament, którego konsultantom AI z 2024 zazwyczaj brakuje.",
        },
        {
          label: "Z LLM-ami od 2022",
          text: "Kiedy GPT-3.5 wywrócił rynek do góry nogami, wszedłem w modele językowe na pełen etat. Dziś specjalizuję się w agentach AI — projektuję je, testuję i wpinam w realne procesy biznesowe.",
        },
        {
          label: "Siedem produktów AI",
          text: "CallWise, AwesomeBot, Metyra, CourseAI, Ask, Goose, AI Daily — każdy to AI wdrożone w innej branży: sprzedaż, recepcja, finanse, edukacja, księgowość, ewaluacja, treści.",
        },
        {
          label: "Firma zbudowana na AI",
          text: "W Awesome Works agenty są wpięte w każdy etap pracy: research, sales, brief, scoping, kod, review, deployment, content i marketing. To, co rekomenduję klientom, najpierw uruchamiam u siebie.",
        },
      ],
      quote: "Testuję trzy do pięciu nowych narzędzi tygodniowo. Nie musisz wiedzieć, co działa — wystarczy, że ja wiem.",
      imageAlt: "Rafał Łazicki",
    },
    pivot: {
      line: "2022. GPT-3.5.",
    },
    focus: {
      eyebrow: "Punkt zwrotny",
      title: "To był moment, w którym wszedłem w AI na całość.",
      description:
        "Zacząłem testować dziesiątki narzędzi, budować kolejne RAG-i, projektować agentów i harnessy do ich oceny. Nie chciałem już zajmować się AI „przy okazji” — przeszedłem na pełen etat, jednocześnie jako programista, founder i doradca.",
      points: [
        "Najpierw własne RAG-i.",
        "Później systemy agentowe.",
        "Dziś: harnessy, ewaluacja i doradztwo AI dla firm usługowych.",
      ],
      storyCta: "",
      storyHref: "",
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
          label: "Lead intelligence",
          tagline: "Pokaż klientom, co dzieje się z ich leadami.",
          title: "Każda rozmowa z leadem zamienia się w transkrypcję, brief i zadania — i w dowód, że kampania dowozi.",
          description:
            "Nagrywa i analizuje każdą rozmowę z leadem: transkrypcja, brief, obiekcje i zadania trafiają do pipeline'u w mniej niż 5 minut. Agencja widzi, gdzie lead naprawdę poległ.",
          bullets: [
            "Każda rozmowa z leadem: transkrypcja, brief, obiekcje i zadania w < 5 minut.",
            "Osobna organizacja na każdego klienta i dowód jakości obsługi leadów.",
          ],
          audience: "Agencji marketingowych",
          logoSrc: "/callwise-logo.png",
          logoAlt: "CallWise logo",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "pl"),
          cta: "Zobacz CallWise",
          note: "B2B · dostęp na zaproszenie",
        },
        {
          id: "awesomebot",
          name: "AwesomeBot",
          label: "AI front desk",
          tagline: "Recepcja, która odbiera zawsze.",
          title: "",
          description:
            "AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości: odbiera telefony, SMS-y i e-maile, rozpoznaje sprawy i przygotowuje odpowiedzi. Wszystko wychodzące zatwierdza człowiek.",
          audience: "Klinik i zarządców nieruchomości",
          logoSrc: "/awesomebot-logo.svg",
          logoAlt: "AwesomeBot logo",
          href: awesomebotPath("pl"),
          cta: "Zobacz AwesomeBota",
        },
        {
          id: "metyra",
          name: "Metyra",
          label: "AI CFO",
          tagline: "Brief dla zarządu w 14 dni.",
          title: "",
          description:
            "Rozproszone dane finansowe zamieniają się w decyzje, raporty zarządcze i odpowiedzi dla CEO, CFO i COO.",
          audience: "Executive board",
          logoSrc: "/metyra-logo.svg",
          logoAlt: "Metyra logo",
          href: metyraPath("pl"),
          cta: "Zobacz Metyrę",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "Workflow orchestration",
          tagline: "Od pomysłu do wdrożenia — jeden przepływ.",
          title: "",
          description:
            "Warstwa pracy: specyfikacja → kod → review → wdrożenie, prowadzona przez orkiestrowanego agenta.",
          audience: "AI builders",
          logoSrc: "/courseai-logo.png",
          logoAlt: "CourseAI logo",
          href: localizedProductUrl("https://course.awesomeworks.ai", "pl"),
          cta: "Zobacz CourseAI",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Ops automation",
          tagline: "Faktury dekretują się same.",
          title: "",
          description:
            "Asystent AI zdejmuje ręczny ciężar tam, gdzie biuro rachunkowe blokuje obsługę klientów.",
          audience: "Accounting offices",
          logoSrc: "/ask-logo.png",
          logoAlt: "Ask logo",
          href: askPath,
          cta: "Zobacz Ask",
        },
        {
          id: "ai-daily",
          name: "AI Daily",
          label: "Personal news briefing",
          tagline: "Twoje wiadomości, jeden prompt.",
          title: "",
          description:
            "Jeden plik HTML z dziennym przeglądem newsów — bez kont, kluczy i wdrożenia. Asystent czyta repozytorium i pisze stronę.",
          audience: "Daily readers",
          logoSrc: "/ai-daily-logo.svg",
          logoAlt: "AI Daily logo",
          href: aiDailyUrl,
          cta: "Zobacz AI Daily",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Eval & reliability",
          tagline: "Przetestuj agenta, zanim trafi na produkcję.",
          title: "",
          description:
            "Harness do testowania promptów, wywołań narzędzi i zachowania agentów przed wypuszczeniem na produkcję.",
          audience: "Agent engineers",
          logoSrc: "/goose-logo.png",
          logoAlt: "Goose logo",
          href: gooseUrl,
          cta: "Zobacz Goose",
        },
      ],
    },
    process: {
      title: "Jak to działa",
      bridge: {
        kicker: "",
        title: "",
        bullets: [],
        note: "",
        storyLabel: "",
        storyHref: "",
      },
      steps: [
        {
          title: "30 minut rozmowy",
          text: "Opowiadasz mi, jak wygląda twój dzień: jakie macie procesy, narzędzia, ludzi i gdzie najbardziej boli. Słucham, dopytuję. Bez slajdów i bez sprzedaży.",
        },
        {
          title: "Audyt i lista decyzji",
          text: "Dostajesz konkretną mapę: co wdrożyć teraz, co odłożyć, co pominąć. Każda rekomendacja z szacunkowym kosztem, nakładem pracy i potencjalnym zwrotem z inwestycji.",
        },
        {
          title: "Opcjonalnie: wdrożenie",
          text: "Jeśli chcesz, robimy to razem — w formie projektu albo stałej współpracy. Jeśli wolisz zrobić to sam, masz mapę i wiesz, do kogo się zwrócić.",
        },
      ],
    },
    fit: {
      title: "Dla kogo to działa",
      good: [
        "Dla agencji, kancelarii, biur księgowych i software house'ów z zespołem 5–50 osób, w których ludzie sprzedają swój czas.",
        "Dla założycieli i właścicieli, którzy widzą, że konkurencja przyspiesza, ale nie potrafią ocenić, czy AI to realna dźwignia, czy kolejny hype.",
        "Dla firm, które próbowały już paru narzędzi i utknęły — mają poczucie, że zostawiają pieniądze na stole.",
      ],
      bad: [
        "Nie dla osób szukających darmowego brainstormu — to konsultacja, a nie rozmowa sprzedażowa.",
        "Nie dla zespołów bez mandatu decyzyjnego — jeśli nie masz uprawnień, żeby cokolwiek wdrożyć, audyt skończy w szufladzie.",
        "Nie dla branż, w których AI rzeczywiście nie ma sensu (silnie regulowane procedury, fizyczne rzemiosło) — nie sprzedam ci czegoś, czego nie potrzebujesz.",
      ],
    },
    faq: {
      title: "Pytania, które padają najczęściej",
      items: [
        {
          q: "Czym to się różni od zwykłego konsultanta AI?",
          a: "Nie jestem dystrybutorem żadnej platformy ani partnerem żadnego SaaS-a. Sprzedaję 30 minut rozmowy i listę rekomendacji — a nie subskrypcję. Po konsultacji wiesz, co wdrożyć i u kogo, nawet jeśli ostatecznie nie u mnie.",
        },
        {
          q: "Skąd mam wiedzieć, że się na tym znasz?",
          a: "W AI pracuję od 2018, mam za sobą siedem wdrożonych produktów (zobacz w karuzeli powyżej), na co dzień piszę kod razem z agentami i doradzam firmom usługowym w Polsce i UE. To nie są referencje ze slajdu — to żywe wdrożenia.",
        },
        {
          q: "Co dostaję po konsultacji?",
          a: "Paczkę dokumentów audytowych — nie jeden slajd ani PDF z ogólnikami, tylko realny zestaw do podejmowania decyzji:",
          bullets: [
            {
              title: "Audyt obecnego stacku",
              text: "co naprawdę robi każde z twoich narzędzi, co dubluje funkcje, gdzie zostawiasz pieniądze.",
            },
            {
              title: "Mapa rekomendacji AI",
              text: "co wdrożyć teraz, co w tym kwartale, co odłożyć. Z uzasadnieniem, alternatywami i kosztem każdej decyzji.",
            },
            {
              title: "Analiza ROI dla każdego zastosowania",
              text: "ile godzin tygodniowo oszczędzasz × stawka × częstotliwość, minus koszt wdrożenia. Konkretne liczby, a nie ogólnikowe szacunki.",
            },
            {
              title: "Plan wdrożenia i rejestr ryzyk",
              text: "kolejność ruchów, zależności między nimi, co może pójść nie tak i jak temu zaradzić.",
            },
          ],
          outro:
            "Do tego diagram komponentów twojego systemu — wizualna mapa procesów i ludzi w firmie, z zaznaczonymi miejscami, w których warto podpiąć AI i w jakiej formie (gotowy SaaS, automatyzacja, dedykowane wdrożenie).",
        },
        {
          q: "Czy to coś dla mnie? Mam małą agencję / kancelarię / biuro księgowe.",
          a: "Tak. Najlepiej działa dla firm liczących 5–50 osób. Im więcej powtarzalnej pracy w twoim zespole, tym szybciej AI zwróci się jako dźwignia. Działalność jednoosobowa też ma sens, ale zwrot z inwestycji będzie mniej spektakularny.",
        },
        {
          q: "A jeśli używamy już ChatGPT i kilku innych narzędzi AI?",
          a: "Świetnie — masz fundamenty. Audyt pokaże, gdzie zostawiasz pieniądze na stole: brakujące integracje, droższe narzędzia tam, gdzie wystarczy tańsze, brak zabezpieczeń, niewykorzystane API, ręczne przekazywanie pracy, które od dawna dało się zautomatyzować.",
        },
        {
          q: "Czy musimy mieć w zespole dewelopera?",
          a: "Nie. Część rekomendacji to gotowe rozwiązania SaaS bez kodowania. Część wymaga prostej automatyzacji (Zapier, Make, n8n). Część — jeśli budujesz coś dedykowanego — wymaga dewelopera. Powiem ci, co jest czym i czy w ogóle warto się w to angażować.",
        },
        {
          q: "Ile kosztuje wdrożenie?",
          a: "To zależy, co wdrażasz. Większość początkowych narzędzi to 50–500 zł miesięcznie i 2–10 godzin onboardingu. Cięższe automatyzacje to projekt na 2–8 tygodni. Audyt jest jednocześnie mapą kosztów — wiesz dokładnie, czego co wymaga.",
        },
        {
          q: "Co, jeśli po konsultacji stwierdzę, że jednak nic nie chcę wdrażać?",
          a: "Wychodzisz z mapą rynku, listą narzędzi, wiedzą, czego unikać, i zrozumieniem, gdzie konkurencja może uderzyć. To i tak więcej, niż większość konsultantów dowozi za pieniądze.",
        },
        {
          q: "Jak długo czeka się na rekomendacje po rozmowie?",
          a: "Paczkę dostajesz w ciągu 24 godzin od rozmowy. Krótka, konkretna, gotowa do działania — a nie czterdziestostronicowy raport, który wyląduje w szufladzie.",
        },
        {
          q: "Co, jeśli mam więcej pytań, niż zmieści się w 30 minutach?",
          a: "Wtedy umawiamy się na drugą, dłuższą rozmowę (płatną, godzinną) albo na pełny projekt audytu. 30 minut wystarcza, żeby zidentyfikować główne wąskie gardła i zaproponować pierwsze ruchy.",
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
          meta: "@makeitagentic",
          description: "Krótsze formaty i to, co dzieje się wokół budowania.",
        },
      ],
    },
    closing: {
      eyebrow: "Start",
      title: "Twoja konkurencja właśnie czyta moje rekomendacje.",
      description:
        "30 minut wystarczy, żebyś wiedział, co wdrożyć, co pominąć i ile to kosztuje. Bez sprzedaży. Bez slajdów.",
      primaryCta: "Umów darmowy audyt AI",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      microcopy: "30 minut, za darmo. Wychodzisz z konkretnym planem: co wdrożyć, co pominąć, co odłożyć.",
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
      title: "Rafał Łazicki — AI advisor for service businesses",
      description:
        "30-minute AI audit for agencies, law firms, accounting offices, and software houses. A concrete plan: what to adopt, what to skip, what to delay. No pitch. No slides.",
      socialDescription:
        "AI advisor for service businesses. 30 minutes → concrete adoption plan. No pitch.",
    },
    nav: {
      brand: "Rafał Łazicki",
      brandSubline: "AI advisor",
      links: [
        { id: "fomo", label: "Cost", href: "#fomo" },
        { id: "work", label: "Proof", href: "#work" },
        { id: "process", label: "Flow", href: "#process" },
        { id: "story", label: "Why me", href: "#story" },
        { id: "faq", label: "FAQ", href: "#faq" },
        { id: "contact", label: "Start", href: "#contact" },
      ],
      cta: "Book a Free AI Audit",
      ctaSublabel: "Free 30-minute consultation",
    },
    hero: {
      eyebrow: "AI advisor for service businesses",
      name: "Rafał Łazicki",
      title: "Your competitor just adopted AI. You'll find out after losing your first client.",
      subtitle:
        "Agencies, law firms, accounting offices, software houses — you all sell hours. AI multiplies them by 10. Three months behind is steady margin erosion and pipeline drift.",
      primaryCta: "Book a Free AI Audit",
      primaryHref: calendlyUrl,
      primarySublabel: "Free 30-minute consultation. You leave with a concrete plan.",
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      facts: [],
    },
    bottlenecks: {
      title: "What's not having an AI strategy costing you?",
      intro: "",
      items: [
        {
          title: "Clients leave for AI-native competitors",
          text: "An agency that delivers a brief in 4 hours instead of 4 days doesn't compete on price — it competes on time. Your client is already comparing, even if they don't tell you.",
        },
        {
          title: "Your team burns hours on repetitive work",
          text: "Junior, researcher, analyst — each spends 30-50% of their time on tasks AI does in 5 minutes. That's not inefficiency. That's your margin you're giving away for free.",
        },
        {
          title: "Experimenting costs more than consulting",
          text: "Your team tries ChatGPT, Zapier, Make, Claude, n8n, n+1. Each hour is an hour not billed. Multiply by team size and run the math.",
        },
        {
          title: "You're adopting the wrong tools",
          text: "Conference hype ≠ a tool that fits your processes. Adoption without an audit = subscription + onboarding + retraining + failure you blame on the whole AI hype, not the wrong tool.",
        },
      ],
    },
    story: {
      eyebrow: "Why me",
      title: "AI isn't hype for me. It's my daily work — and the way I run my company.",
      intro:
        "I've been in tech since 2018 — first as a fullstack engineer, then backend and DevOps on petabytes of data. With language models I've been working since 2022, and today I specialize in AI agents. Seven shipped products, a company built on agents, daily tool testing. I don't consult theory — I tell you what I do every day.",
      points: [
        {
          label: "In tech since 2018",
          text: "Fullstack engineer, then backend and DevOps. I worked with petabytes of data, where reliability and precision were non-negotiable. That's the foundation most 2024 AI consultants don't have.",
        },
        {
          label: "On LLMs since 2022",
          text: "When GPT-3.5 flipped the market upside down, I went full-time into language models. Today I specialize in AI agents — designing them, testing them, and wiring them into real business processes.",
        },
        {
          label: "Seven AI products",
          text: "CallWise, AwesomeBot, Metyra, CourseAI, Ask, Goose, AI Daily — each is AI shipped into a different vertical: sales, front desk, finance, education, accounting, eval, content.",
        },
        {
          label: "Company built on AI",
          text: "At Awesome Works, agents are wired into every stage: research, sales, brief, scope, code, review, deploy, content, and marketing. What I recommend to clients, I run on myself first.",
        },
      ],
      quote: "I test three to five new tools every week. You don't need to know what works — you just need someone who does.",
      imageAlt: "Rafał Łazicki",
    },
    pivot: {
      line: "2022. GPT-3.5.",
    },
    focus: {
      eyebrow: "Turning point",
      title: "That was when I moved fully into AI.",
      description:
        "I started testing dozens of tools, building my own RAGs, scoping agents, writing eval harnesses. I didn't want to stay adjacent to AI — I went in full time, as an engineer, founder, and advisor.",
      points: [
        "First, my own RAG systems.",
        "Then, agent systems.",
        "Today: harnesses, evaluation, and AI advisory for service businesses.",
      ],
      storyCta: "",
      storyHref: "",
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
          label: "Lead intelligence",
          tagline: "Show clients what really happens to their leads.",
          title: "Every lead call becomes a transcript, brief, and tasks — and proof the campaign delivers.",
          description:
            "Records and analyzes every lead call: transcript, brief, objections, and tasks land in the pipeline in under 5 minutes. The agency sees where the lead actually died.",
          bullets: [
            "Every lead call: transcript, brief, objections, and tasks in under 5 minutes.",
            "A separate organization per client and proof of lead-handling quality.",
          ],
          audience: "Marketing agencies",
          logoSrc: "/callwise-logo.png",
          logoAlt: "CallWise logo",
          href: localizedProductUrl("https://callwise.awesomeworks.ai", "en"),
          cta: "See the proof in CallWise",
          note: "B2B · invite-only access",
        },
        {
          id: "awesomebot",
          name: "AwesomeBot",
          label: "AI front desk",
          tagline: "The front desk that always picks up.",
          title: "",
          description:
            "24/7 AI front desk for clinics and property managers: it answers calls, texts, and emails, triages every case, and drafts replies. A human approves everything outgoing.",
          audience: "Clinics & property managers",
          logoSrc: "/awesomebot-logo.svg",
          logoAlt: "AwesomeBot logo",
          href: awesomebotPath("en"),
          cta: "See AwesomeBot",
        },
        {
          id: "metyra",
          name: "Metyra",
          label: "AI CFO",
          tagline: "Board-ready brief in 14 days.",
          title: "",
          description:
            "Scattered finance data turns into decisions, board packs, and answers for CEO, CFO, and COO.",
          audience: "Executive board",
          logoSrc: "/metyra-logo.svg",
          logoAlt: "Metyra logo",
          href: metyraPath("en"),
          cta: "See Metyra",
        },
        {
          id: "courseai",
          name: "CourseAI",
          label: "Workflow orchestration",
          tagline: "From idea to deploy in one flow.",
          title: "",
          description:
            "The working layer: spec → code → review → deploy, run by an orchestrated agent.",
          audience: "AI builders",
          logoSrc: "/courseai-logo.png",
          logoAlt: "CourseAI logo",
          href: localizedProductUrl("https://course.awesomeworks.ai", "en"),
          cta: "See the workflow",
        },
        {
          id: "ask",
          name: "Ask",
          label: "Ops automation",
          tagline: "Invoices that file themselves.",
          title: "",
          description:
            "AI assistant cuts the manual load where internal ops starts slowing client delivery down.",
          audience: "Accounting offices",
          logoSrc: "/ask-logo.png",
          logoAlt: "Ask logo",
          href: askPath,
          cta: "See the ops flow",
        },
        {
          id: "ai-daily",
          name: "AI Daily",
          label: "Personal news briefing",
          tagline: "Today's news, one prompt away.",
          title: "",
          description:
            "A single HTML briefing generated by your AI assistant — no accounts, keys, or deploy. The assistant reads the repo and writes the page.",
          audience: "Daily readers",
          logoSrc: "/ai-daily-logo.svg",
          logoAlt: "AI Daily logo",
          href: aiDailyUrl,
          cta: "See the briefing",
        },
        {
          id: "goose",
          name: "Goose",
          label: "Eval & reliability",
          tagline: "Test agent behavior before it ships.",
          title: "",
          description:
            "Harness for testing prompts, tool calls, and agent behavior before rollout.",
          audience: "Agent engineers",
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
        kicker: "",
        title: "",
        bullets: [],
        note: "",
        storyLabel: "",
        storyHref: "",
      },
      steps: [
        {
          title: "30-min discovery call",
          text: "You walk me through your workflow, tools, people. You tell me where it hurts most. I listen, I ask. No slides, no pitch.",
        },
        {
          title: "Audit + decision list",
          text: "You get a concrete map: what to adopt now, what to delay, what to skip. Each recommendation with estimated ROI, effort, and risk.",
        },
        {
          title: "Optional: implementation",
          text: "If you want, I do it with you — project or retainer. If you prefer to run it yourself, you have the map and know exactly where to go (and from whom to buy).",
        },
      ],
    },
    fit: {
      title: "Who this works for",
      good: [
        "For agencies, law firms, accounting offices, and software houses with a team of 5-50 that sells hours.",
        "For founders who see competition speeding up but don't know if AI is hype or real leverage.",
        "For companies already trying a few AI tools and stuck — sensing they're leaving money on the table.",
      ],
      bad: [
        "Not for companies looking for a free brainstorm — this is a consultation, not a sales discovery call.",
        "Not for teams without decision rights — if you can't adopt anything, the audit sits in a drawer.",
        "Not for verticals where AI is only hype (very narrow regulation, physical handcraft) — I won't sell you what you don't need.",
      ],
    },
    faq: {
      title: "Most common questions",
      items: [
        {
          q: "How is this different from a generic AI consultant?",
          a: "I'm not a reseller of any platform or partner of any SaaS. I sell 30 minutes of audit and a list of recommendations — not a subscription. After the call you know exactly what to adopt and from whom, even if it's not from me.",
        },
        {
          q: "How do I know you actually know your stuff?",
          a: "I've been in AI since 2018, I've shipped 7 AI products to production (see the carousel above), I write code daily alongside agents, and I advise service businesses across PL and EU. These aren't references on a slide — they're live deployments.",
        },
        {
          q: "What do I get after the consultation?",
          a: "A full audit pack — not one slide or a generic PDF, but a real decision-grade set of documents:",
          bullets: [
            {
              title: "Current stack audit",
              text: "what each of your tools actually does, where features overlap, where money is leaking.",
            },
            {
              title: "AI recommendations roadmap",
              text: "what to adopt now, what this quarter, what to delay. With reasoning, alternatives, and the cost of each decision.",
            },
            {
              title: "ROI breakdown per use case",
              text: "hours saved per week × rate × frequency, minus implementation cost. Real numbers, not vague estimates.",
            },
            {
              title: "Implementation plan + risk register",
              text: "sequence of moves, dependencies, what could go wrong, and how to handle it.",
            },
          ],
          outro:
            "Plus a component diagram of your system — a visual map of processes and people in your company, with marked points where AI should plug in and in what form (off-the-shelf SaaS, automation, or custom build).",
        },
        {
          q: "Is this for me? I run a small agency / law firm / accounting office.",
          a: "Yes. Sweet spot is service businesses of 5-50 people. The more repetitive work your team has, the faster AI pays back as leverage. Solo? I can still help, but the ROI will be less dramatic.",
        },
        {
          q: "What if we already use ChatGPT and a few AI tools?",
          a: "Great — you have the foundation. The audit will show where you're leaving money on the table: missing integrations, expensive tools where a cheaper one would do, missing guardrails, unused APIs, manual handoffs ripe for automation.",
        },
        {
          q: "Do we need a developer?",
          a: "No. Some recommendations are ready-made SaaS without coding. Some require basic automation (Zapier, Make, n8n). Some — if you're building something custom — require a developer. I'll tell you which is which and whether it's worth it.",
        },
        {
          q: "How much does implementation cost?",
          a: "Depends what you adopt. Most starter tools are $20-150/month + 2-10 hours onboarding. Heavier automations are 2-8 week projects. The audit also gives you the cost map — you know exactly what each move requires.",
        },
        {
          q: "What if I decide after the call not to adopt anything?",
          a: "You still leave with a market map, a tool shortlist, knowledge of what to avoid, and an understanding of where competition might hit. That's more than most consultants deliver for money.",
        },
        {
          q: "How long do recommendations take after the call?",
          a: "You get the audit pack within 24 hours of the call. Short, concrete, action-oriented — not a 40-page report destined for a drawer.",
        },
        {
          q: "What if I have more questions than fit in 30 minutes?",
          a: "We set up a second call (paid, an hour) or a full audit project. 30 minutes is enough to identify the main bottlenecks and propose first moves.",
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
          meta: "@makeitagentic",
          description: "Short-form building updates and behind the scenes.",
        },
      ],
    },
    closing: {
      eyebrow: "Start",
      title: "Your competitor is already reading my recommendations.",
      description:
        "30 minutes is enough to know what to adopt, what to skip, and what it costs. No pitch. No slides.",
      primaryCta: "Book a Free AI Audit",
      primaryHref: calendlyUrl,
      secondaryCta: "",
      secondaryHref: "",
      storyCta: "",
      storyHref: "",
      microcopy: "30 minutes, free. You walk out with a concrete plan: what to adopt, what to skip, what to delay.",
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
