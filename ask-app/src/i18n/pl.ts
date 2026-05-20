export const pl = {
  meta: {
    title: "AwesomeWorks Ask — Automatyczna dekretacja faktur dla biur rachunkowych",
    description:
      "AI dekretuje faktury kosztowe. Automatyczne OCR, klasyfikacja kosztów, kwalifikacja VAT i KUP. Księgowy tylko zatwierdza.",
  },
  nav: {
    features: "Funkcje",
    howItWorks: "Jak to działa",
    comparison: "AI vs tradycyjne",
    pricing: "Cennik",
    faq: "FAQ",
    cta: "Umów się na demo",
  },
  hero: {
    line1: "Faktury dekretują się",
    line2: "same",
    subtitle:
      "AI odczytuje fakturę, klasyfikuje koszt, kwalifikuje VAT i KUP i generuje dekret. Im dłużej pracujesz, tym trafniejsze propozycje — system uczy się z każdej poprawki.",
    ctaPrimary: "Umów się na demo",
    ctaSecondary: "Zobacz jak działa",
    micro: "45-minutowa rozmowa • Zobaczymy razem Twoje faktury",
  },
  socialProof: {
    label: "Liczby mówią same za siebie",
    stats: [
      { value: "od 50 gr", label: "koszt przetworzenia jednej faktury" },
      { value: "95%", label: "celność dekretacji po 2 tygodniach" },
      { value: "3s", label: "zamiast 4 minut na fakturę" },
      { value: "80%", label: "faktur zatwierdzanych jednym klikiem" },
    ],
  },
  features: {
    title: "Im dłużej pracujesz, tym lepiej działa",
    subtitle: "System uczy się z każdej poprawki. Po 2 tygodniach trafia w 95% przypadków. Po miesiącu — prawie się nie mylisz.",
    items: [
      {
        icon: "Scan",
        title: "Zero przepisywania — system czyta każdą fakturę",
        description:
          "Wrzuć PDF, zdjęcie, skan lub mail — dane są gotowe w 3 sekundy. Bez szablonów, bez konfiguracji per dostawca. Działa od pierwszej faktury, z każdym formatem.",
        badge: "W każdym planie",
      },
      {
        icon: "FileCheck",
        title: "4 minuty pracy → 1 klik zatwierdzenia",
        description:
          "System sam proponuje kolumnę KPiR, kwalifikuje VAT i KUP. Prosta faktura = 1 klik. Złożona = poprawka, z której system się uczy. Następnym razem zrobi lepiej.",
        badge: "W każdym planie",
      },
      {
        icon: "Shield",
        title: "Zero pomyłek — system sprawdza za Ciebie",
        description:
          "Biała Lista VAT, poprawność kwot, duplikaty, zgodność z profilem firmy — automatycznie. Podejrzana faktura? Czerwona lampka zanim trafi do dekretu.",
        badge: "W każdym planie",
      },
      {
        icon: "Bell",
        title: "Koniec z mailami i telefonami do klientów",
        description:
          "Gdy system potrzebuje wyjaśnień od klienta — cel wydatku, typ samochodu — sam wysyła pytanie. Klient odpowiada w portalu, chatbot pomaga. Minuty zamiast dni.",
        badge: "od Standard",
      },
      {
        icon: "Brain",
        title: "Jak nowy pracownik — ale nigdy nie zapomina",
        description:
          "Każda poprawka księgowego to lekcja na zawsze. Po miesiącu system zna Twoich dostawców lepiej niż nowy pracownik po roku. Im dłużej pracujesz, tym mniej poprawiasz.",
        badge: "od Standard",
      },
      {
        icon: "BarChart3",
        title: "Odpowiedzi w sekundach, nie godzinach",
        description:
          '"Ile wydał klient X na paliwo w Q1?" — agent odpowiada natychmiast. Dashboard z przeglądem faktur, trendami kosztów i statystykami. Bez kopania po Excelu.',
        badge: "od Standard",
      },
    ],
  },
  howItWorks: {
    title: "Jak wygląda praca z Ask",
    subtitle: "7 kroków od faktury do dekretu — większość automatyczna.",
    steps: [
      {
        step: "1",
        title: "Faktura wpływa",
        description:
          "Z KSeF, mailem lub wrzucona ręcznie. AI odczytuje dane: pozycje, kwoty, stawki VAT, kontrahenta. Bez szablonów — działa z dowolnym formatem.",
      },
      {
        step: "2",
        title: "AI dekretuje",
        description:
          "Po wgraniu faktury system automatycznie klasyfikuje koszt do odpowiedniej kolumny KPiR, ustala stawkę VAT i kwalifikację KUP, weryfikuje kontrahenta na Białej Liście. Gdy brakuje informacji — portal sam wysyła pytanie do klienta wraz z powiadomieniem e-mail. Bez udziału księgowego.",
      },
      {
        step: "3",
        title: "Księgowy zatwierdza",
        description:
          "Gotowy dekret z confidence score. Prosty przypadek = 1 klik. Złożony = poprawka, z której system się uczy na przyszłość.",
      },
    ],
  },
  comparison: {
    title: "AI vs tradycyjne systemy księgowe",
    subtitle: "Porównanie krok po kroku — co robi człowiek, a co AI.",
    traditional: "Tradycyjne systemy",
    ai: "AwesomeWorks Ask",
    steps: [
      {
        name: "Wprowadzanie danych",
        traditional: "Ręczne przepisywanie lub OCR szablonowy (trzeba uczyć per dostawca). 2-5 min/fakturę.",
        ai: "GPT-4o Vision — dowolny format, 95%+ accuracy. 3 sekundy, zero konfiguracji.",
      },
      {
        name: "Walidacja formalna",
        traditional: "Ręczne sprawdzanie Białej Listy w przeglądarce, kwoty kalkulatorem.",
        ai: "Automatyczne API — Biała Lista, poprawność kwot, duplikaty, data. Zero inputu człowieka.",
      },
      {
        name: "Klasyfikacja kosztu",
        traditional: "Księgowy wybiera z listy 100+ kont. Każda faktura od zera — system nie pamięta.",
        ai: "AI proponuje konto na podstawie treści + historii. Po kilku fakturach od dostawcy → 95% accuracy.",
      },
      {
        name: "Kwalifikacja VAT",
        traditional: "Księgowy pamięta zasady z głowy. 50% przy samochodzie? Łatwo zapomnieć.",
        ai: "Automatyczne reguły + konfiguracja klienta. Samochód mieszany → zawsze 50%. Zero błędów.",
      },
      {
        name: "Dekretacja",
        traditional: "Ręczne wpisywanie kwot i kont. Kalkulacja proporcji ręcznie lub w Excelu.",
        ai: "100% automatyczna po ustaleniu parametrów. Czysta matematyka — zero błędów rachunkowych.",
      },
      {
        name: "Komunikacja z klientem",
        traditional: "Email lub telefon. Dni oczekiwania, brak trackingu, rozmowa ginie.",
        ai: "Automatyczna notyfikacja w portalu + email. Klient odpowiada w minuty, historia przy fakturze.",
      },
    ],
    savings: {
      title: "Oszczędność na 200 fakturach/miesiąc",
      traditional: {
        label: "Tradycyjnie",
        time: "16 godzin",
        detail: "~4 min × 200 faktur + kontekst",
      },
      ai: {
        label: "Z AwesomeWorks Ask",
        time: "1,5 godziny",
        detail: "80% jednym klikiem, 20% szybka korekta",
      },
      saving: "14,5 godziny miesięcznie na jednego klienta",
      scale: "Przy 50 klientach — setki godzin oszczędności miesięcznie",
    },
  },
  pricing: {
    title: "Wybierz plan dopasowany do Twojego biura",
    subtitle: "Wybierz plan dopasowany do wielkości Twojego biura. Umów się na demo — pokażemy system na Twoich fakturach.",
    perInvoice: {
      price: "od 50 gr",
      unit: "za fakturę",
      description: "Pełne przetworzenie faktury: OCR + walidacja + dekretacja — taniej niż minuta pracy księgowego",
      includes: [
        "Odczyt danych (OCR) z dowolnego formatu",
        "Walidacja formalna (Biała Lista, kwoty, duplikaty)",
        "Klasyfikacja kosztu (kolumna KPiR)",
        "Kwalifikacja VAT i KUP",
        "Generowanie dekretu",
        "Weryfikacja zgodności z profilem firmy",
        "System uczenia się z poprawek księgowego",
        "Im dłużej pracujesz, tym mniej poprawiasz",
      ],
    },
    plans: [
      {
        name: "Podstawowy",
        price: "499",
        period: "/ miesiąc",
        description: "Automatyzuj dekretację — oszczędź godziny ręcznej pracy",
        features: [
          "Do 500 faktur kosztowych / miesiąc",
          "Do 30 klientów (firm)",
          "Do 3 użytkowników",
          "OCR — dowolny format faktury",
          "Automatyczna dekretacja kosztów",
          "Walidacja (Biała Lista, kwoty, duplikaty)",
          "Kwalifikacja VAT i KUP",
          "Podstawowy dashboard",
          "Samodzielna konfiguracja (docs + wideo)",
          "Email support (48h)",
        ],
        cta: "Umów się na demo",
        highlighted: false,
      },
      {
        name: "Standard",
        price: "999",
        period: "/ miesiąc",
        description: "Pełna platforma — transformuj sposób pracy całego biura",
        features: [
          "Do 2 000 faktur / miesiąc",
          "Do 100 klientów (firm)",
          "Do 10 użytkowników",
          "Wszystko z planu Podstawowy, plus:",
          "Portal klienta z notyfikacjami",
          "Chatbot dla klientów biura (500 rozmów/mies.)",
          "Agent AI — pytania, raporty, analizy",
          "Wystawianie faktur sprzedażowych",
          "Zaawansowane raporty i analityka",
          "System uczenia się z poprawek",
          "4h szkolenia wdrożeniowego",
          "Kwartalna konsultacja procesów",
          "Priorytetowy support (24h)",
        ],
        cta: "Umów się na demo",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Kontakt",
        period: "",
        description: "Wdrożenie pod klucz dla dużych biur i sieci",
        features: [
          "Nielimitowane faktury i klienci",
          "Nielimitowani użytkownicy",
          "Wszystko z planu Standard, plus:",
          "Integracja z Optima / Symfonia / enova",
          "Dedykowany opiekun klienta",
          "SLA 99,9%",
          "Opcja on-premise / private cloud",
          "Program szkoleniowy (12h + cykliczne)",
          "Wdrożenie procesów pod klucz",
          "Dostęp API",
        ],
        cta: "Porozmawiajmy",
        highlighted: false,
      },
    ],
  },
  faq: {
    title: "Najczęstsze pytania",
    items: [
      {
        q: "Jak dokładny jest OCR i dekretacja?",
        a: "OCR bazuje na GPT-4o Vision — accuracy powyżej 95% na dowolnym formacie faktury, bez konfiguracji szablonów. Dekretacja uczy się z poprawek księgowego — po 2 tygodniach trafia w 95% przypadków. Im dłużej pracujesz, tym mniej poprawiasz.",
      },
      {
        q: "Ile kosztuje przetworzenie jednej faktury?",
        a: "Efektywny koszt to od 50 groszy za fakturę w planie Standard (999 zł/mies. za 2000 faktur). Plan Podstawowy to 499 zł/mies. za 500 faktur (~1 zł/fakturę). W cenie: OCR, walidacja, klasyfikacja, kwalifikacja VAT/KUP, dekretacja i weryfikacja. Dla porównania: manualna dekretacja to ~4 minuty pracy księgowego — przy stawce 40 zł/h to ~2,70 zł za fakturę.",
      },
      {
        q: "Czym różni się plan Podstawowy od Standard?",
        a: "Podstawowy daje Ci automatyczną dekretację — OCR, walidację, klasyfikację kosztów. Standard to pełna platforma: portal klienta z chatbotem, agent AI do pytań i raportów, wystawianie faktur sprzedażowych, system który uczy się z poprawek, plus 4h szkolenia wdrożeniowego i kwartalną konsultację procesów.",
      },
      {
        q: "Czy pomagacie we wdrożeniu?",
        a: "Nie tylko dostarczamy oprogramowanie — pomagamy wdrożyć nowy sposób pracy. W planie Standard: 4h szkolenia wdrożeniowego + kwartalna konsultacja procesów. Enterprise: pełne wdrożenie pod klucz z 12h+ szkolenia. Uczymy nie tylko systemu, ale też efektywniejszych metod pracy z fakturami.",
      },
      {
        q: "Czy moje dane są bezpieczne?",
        a: "Tak. Każde biuro rachunkowe ma całkowicie oddzielone dane (multi-tenant). Komunikacja jest szyfrowana, a serwery znajdują się w UE. Dane klientów nigdy nie mieszają się między sobą.",
      },
      {
        q: "Czy system zastąpi księgowego?",
        a: "Nie — system robi 80% pracy, ale każdy dekret wymaga zatwierdzenia przez księgowego. AI proponuje, człowiek decyduje. To narzędzie które odciąża seniorów i przyspiesza onboarding juniorów.",
      },
      {
        q: "Co jeśli AI źle zadekretuje fakturę?",
        a: "Każda propozycja ma wskaźnik pewności (confidence score). Niskie confidence = automatyczne flagowanie do ręcznej weryfikacji. Gdy poprawisz — system zapamiętuje i następnym razem zrobi lepiej. Po miesiącu trafia w 95%+ przypadków.",
      },
      {
        q: "Czy system integruje się z Optimą / Symfonią?",
        a: "W planach Podstawowy i Standard system generuje gotowe dekrety do zatwierdzenia. Eksport do formatów Optima/Symfonia/enova jest dostępny w planie Enterprise. Porozmawiaj z nami o integracji z Twoim systemem.",
      },
    ],
  },
  invoiceDemo: {
    badge: "Nowe — wystawianie faktur",
    title: "Wystaw fakturę jednym zdaniem",
    subtitle:
      "Napisz czego potrzebujesz — agent znajdzie kontrahenta, sprawdzi poprzednie faktury i przygotuje wszystko za Ciebie.",
    header: {
      title: "Ask — Asystent faktur",
      subtitle: "Wystawianie faktur sprzedażowych",
      status: "Online",
    },
    userMessage:
      "Wystaw fakturę na 7 tys netto dla Twoja Firma sp. z o.o., termin płatności i konto takie jak w ostatniej fakturze",
    agentSteps: [
      {
        text: "Szukam kontrahenta 'Twoja Firma sp. z o.o.' ...",
        icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        done: true,
      },
      {
        text: "Znaleziono — NIP 5213000111, ul. Przykładowa 10, Warszawa",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        done: true,
      },
      {
        text: "Przeszukuję istniejące faktury dla tego kontrahenta ...",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        done: true,
      },
      {
        text: "Ostatnia faktura: FV/2026/01/038 — termin 14 dni, konto mBank",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        done: true,
      },
      {
        text: "Tworzę fakturę FV/2026/02/051 ...",
        icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        done: false,
      },
    ],
    invoice: {
      title: "Faktura FV/2026/02/051",
      statusLabel: "Gotowa",
      fields: [
        { label: "Nabywca:", value: "Twoja Firma sp. z o.o." },
        { label: "NIP:", value: "521-300-01-11" },
        { label: "Usługa:", value: "Usługi księgowe — luty 2026" },
        { label: "Termin płatności:", value: "14 dni (02.03.2026)" },
        { label: "Konto bankowe:", value: "mBank •••• 4521" },
      ],
      totals: [
        { label: "Netto:", value: "7 000,00 zł", highlight: false },
        { label: "VAT 23%:", value: "1 610,00 zł", highlight: false },
        { label: "Brutto:", value: "8 610,00 zł", highlight: true },
      ],
    },
    agentSummary:
      "Faktura gotowa! Dane kontrahenta i warunki płatności pobrane z FV/2026/01/038. Co chcesz zrobić dalej?",
    actions: [
      {
        label: "Wyślij e-mailem",
        icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        primary: true,
      },
      {
        label: "Wyślij do KSeF",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        primary: false,
      },
      {
        label: "Podgląd PDF",
        icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
        primary: false,
      },
      {
        label: "Edytuj",
        icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
        primary: false,
      },
    ],
  },
  finalCta: {
    title: "Zobacz jak to działa na Twoich fakturach",
    subtitle:
      "Umów 45-minutowe demo — pokażemy automatyczną dekretację na żywo, na prawdziwych dokumentach z Twojego biura.",
    ctaPrimary: "Umów się na demo",
    ctaSecondary: "Napisz do nas",
    micro: "45 minut • Pokażemy system na Twoich fakturach",
  },
  footer: {
    brand: "AwesomeWorks Ask",
    tagline: "Asystent wiedzy dla biur rachunkowych",
    product: {
      title: "Produkt",
      links: [
        { label: "Funkcje", href: "#features" },
        { label: "Cennik", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    company: {
      title: "Firma",
      links: [
        { label: "O nas", href: "https://awesomeworks.ai" },
        { label: "Kontakt", href: "mailto:hello@awesomeworks.ai" },
      ],
    },
    legal: {
      title: "Prawne",
      links: [
        { label: "Polityka prywatności", href: "/privacy" },
        { label: "Regulamin", href: "/terms" },
      ],
    },
    copyright: "AwesomeWorks. Wszelkie prawa zastrzeżone.",
  },
};
