// Single source of truth for translations. Każda nowa string = dodaj klucz w obu lokalizacjach.
// PL jest defaultem (root URL). EN żyje pod /en/. PL copy jest adaptowana, nie tłumaczona.
//
// Klucze z sufiksem `.med` / `.est` to warianty segmentowe (medical | estate),
// przełączane in-page przez html[data-segment] — oba warianty żyją w DOM.

export const languages = {
  pl: 'PL',
  en: 'EN',
} as const;

export const defaultLang = 'pl' as const;

export const ui = {
  pl: {
    // Meta / SEO
    'meta.title': 'AwesomeBot — AI recepcja 24/7 dla klinik i zarządców',
    'meta.description':
      'AwesomeBot odbiera telefony, SMS-y i e-maile 24/7, rozpoznaje sprawy, nadaje priorytety i przygotowuje odpowiedzi. Wszystko wychodzące zatwierdza człowiek.',

    // Nav
    'nav.problem': 'Problem',
    'nav.product': 'Produkt',
    'nav.how': 'Jak działa',
    'nav.who': 'Dla kogo',
    'nav.pricing': 'Cennik',
    'nav.faq': 'FAQ',
    'nav.cta': 'Umów rozmowę',

    // Segment toggle
    'toggle.label': 'Wybierz branżę',
    'toggle.medical': 'Klinika medyczna',
    'toggle.estate': 'Nieruchomości',

    // Hero
    'hero.h1.pre.med': 'AI recepcja, która',
    'hero.h1.accent.med': 'odbiera zawsze',
    'hero.h1.pre.est': 'AI recepcja zarządcy, która',
    'hero.h1.accent.est': 'odbiera zawsze',

    // Hero — live status log (cycling reception feed above the H1)
    'hero.log.med.1': 'odebrano SMS · 02:14',
    'hero.log.med.2': 'nowa sprawa: przełożenie wizyty',
    'hero.log.med.3': 'online · 24/7',
    'hero.log.est.1': 'odebrano zgłoszenie: przeciek',
    'hero.log.est.2': 'draft odpowiedzi gotowy',
    'hero.log.est.3': 'online · 24/7',

    // Hero — phone demo card
    'phone.prefix.title': 'Dostępne tylko dla polskich numerów',
    'phone.input.label': 'Numer telefonu',
    'phone.input.placeholder': '600 000 000',
    'phone.cta': 'Wypróbuj rozmowę z AI',
    'phone.cta.loading': 'Łączę…',
    'phone.error': 'Wpisz 9-cyfrowy numer telefonu.',
    'phone.error.cooldown': 'Właśnie dzwoniliśmy pod ten numer — spróbuj ponownie za kilka minut.',
    'phone.error.capacity': 'Dzisiejszy limit rozmów demo jest już wyczerpany.',
    'phone.error.generic': 'Nie udało się zamówić połączenia. Spróbuj ponownie za chwilę.',
    'phone.success':
      'Demo telefoniczne startuje wkrótce. Umów rozmowę — oddzwonimy z demo na Twój numer.',
    'phone.success.calling': 'Dzwonimy — odbierz telefon. Połączenie przyjdzie w ciągu kilkunastu sekund.',
    'phone.success.link': 'Umów rozmowę',
    'phone.consent': 'Podając numer, zamawiasz jednorazową rozmowę demo z agentem AI.',
    'hero.demolink': 'Umów demo',
    'hero.micro': 'Wdrożenia pilotażowe · bez zobowiązań',
    'hero.stat1.value': '24/7',
    'hero.stat1.label': 'odbiera bez przerwy',
    'hero.stat2.value': '2',
    'hero.stat2.label': 'gotowe drafty na sprawę',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'akcji w audycie',

    // Hero — floating message chips (decoration around the orb)
    'chips.med.1': 'Czy mogę przełożyć wizytę na piątek?',
    'chips.med.2': 'Jak przygotować się do USG?',
    'chips.med.3': '+48 512 ··· ··· — odebrane 02:14',
    'chips.est.1': 'Cieknie z sufitu w łazience',
    'chips.est.2': 'Faktura od hydraulika — zatwierdzić?',
    'chips.est.3': '+48 601 ··· ··· — odebrane 23:47',

    // Pricing
    'pricing.eyebrow': 'Cennik',
    'pricing.heading': 'Trzy plany, jedna recepcja',
    'pricing.sub': 'Od gabinetu po portfel nieruchomości. Zakres i wdrożenie ustalamy na rozmowie.',
    'pricing.p1.name': 'Start',
    'pricing.p1.price': '499 zł',
    'pricing.p1.per': '/ mc',
    'pricing.p1.fit': 'Dla 1–20 rozmów dziennie',
    'pricing.p1.f1': '1 numer telefonu',
    'pricing.p1.f2': 'Wszystkie kanały: telefon, SMS, e-mail',
    'pricing.p1.f3': 'Kolejka zatwierdzeń i pełny audyt',
    'pricing.p1.f4': '1 użytkownik',
    'pricing.p2.name': 'Zespół',
    'pricing.p2.price': '1499 zł',
    'pricing.p2.per': '/ mc',
    'pricing.p2.badge': 'Najczęściej wybierany',
    'pricing.p2.fit': 'Dla 20–100 rozmów dziennie',
    'pricing.p2.f1': '3 numery telefonu',
    'pricing.p2.f2': 'Użytkownicy bez limitu',
    'pricing.p2.f3': 'Wszystko z planu Start',
    'pricing.p2.f4': 'Priorytetowe wsparcie',
    'pricing.p3.name': 'Skala',
    'pricing.p3.price': 'od 2499 zł',
    'pricing.p3.per': '/ mc',
    'pricing.p3.fit': 'Powyżej 100 rozmów dziennie',
    'pricing.p3.f1': 'Numery i lokalizacje pod wymiar',
    'pricing.p3.f2': 'Integracje pod klienta',
    'pricing.p3.f3': 'SLA i opiekun wdrożenia',
    'pricing.cta': 'Umów rozmowę',
    'pricing.cta.scale': 'Skonfiguruj plan',

    // Triage card mock (lives in "Jak działa")
    'triage.caption': 'Tak wygląda sprawa gotowa do decyzji',
    'triage.header': 'Triage · przykładowa sprawa #124',
    'triage.online': 'Online',
    'triage.tag.label': 'Tag',
    'triage.prio.label': 'Priorytet',
    'triage.approval': 'Czeka na Twoje zatwierdzenie',
    'triage.approve': 'Zatwierdź',
    'triage.msg.label.med': 'Wiadomość · SMS · 20:12',
    'triage.msg.text.med':
      'Dzień dobry, mam jutro o 9:00 USG jamy brzusznej — czy muszę być na czczo?',
    'triage.tag.value.med': 'Przygotowanie do badania',
    'triage.linked.med': '+1 podobne pytanie w tym tygodniu',
    'triage.prio.value.med': 'Dziś',
    'triage.prio.why.med': 'badanie jutro rano — odpowiedź musi zdążyć',
    'triage.draft.label.med': 'Draft odpowiedzi · PL',
    'triage.draft.text.med':
      'Dzień dobry! Tak — na USG jamy brzusznej prosimy przyjść na czczo, minimum 6 godzin bez posiłku. Woda niegazowana jest dozwolona…',
    'triage.msg.label.est': 'Wiadomość · SMS · 07:42',
    'triage.msg.text.est':
      'Dzień dobry, od wczoraj cieknie z sufitu w łazience, 3. piętro. U sąsiadów podobno też.',
    'triage.tag.value.est': 'Awaria · utrzymanie',
    'triage.linked.est': '+2 zgłoszenia tego samego problemu',
    'triage.prio.value.est': 'Pilne',
    'triage.prio.why.est': 'ryzyko zalania niższych pięter',
    'triage.draft.label.est': 'Draft odpowiedzi · PL',
    'triage.draft.text.est':
      'Dziękujemy za zgłoszenie — sprawa jest już u zarządcy jako pilna. Hydraulik skontaktuje się dziś przed 16:00…',

    // Problem
    'problem.eyebrow': 'Problem',
    'problem.heading': 'Telefon dzwoni. Skrzynka rośnie. Ludzie czekają.',
    'problem.sub.med': 'Rejestracja robi triage zamiast zajmować się pacjentami.',
    'problem.sub.est': 'Zarządca robi triage zamiast zarządzać nieruchomościami.',
    'problem.label.med': 'Rejestracja medyczna',
    'problem.item1.med': 'Pacjenci nie mogą się dodzwonić w godzinach szczytu — i dzwonią gdzie indziej.',
    'problem.item2.med': 'Umawianie, odwoływanie i pytania o przygotowanie do badań blokują linię na cały dzień.',
    'problem.item3.med': 'Recepcja ręcznie sortuje wiadomości zamiast zajmować się pacjentami na miejscu.',
    'problem.label.est': 'Zarządzanie nieruchomościami',
    'problem.item1.est': '40–60 zgłoszeń dziennie: awarie, faktury, pytania — e-mailem, SMS-em i telefonem.',
    'problem.item2.est': 'Ręczny triage w skrzynce i Excelu — wolne odpowiedzi i zgubione sprawy.',
    'problem.item3.est': 'Ta sama awaria zgłoszona przez pięć osób to pięć wątków zamiast jednej sprawy.',

    // Product pillars
    'pillars.eyebrow': 'Produkt',
    'pillars.heading': 'Co robi AwesomeBot',
    'pillars.sub':
      'AwesomeBot to AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości — odbiera telefony, SMS-y i e-maile, a wszystko wychodzące zatwierdza człowiek.',
    'pillars.p1.title': 'Odbiera zawsze',
    'pillars.p1.body':
      'Telefon, SMS i e-mail — 24/7. Każda wiadomość jest przeczytana i podpięta do właściwej sprawy, zanim otworzysz skrzynkę.',
    'pillars.p1.ex.med': 'np. pacjent umawia wizytę o 21:30',
    'pillars.p1.ex.est': 'np. awaria zgłoszona o 23:40 ma rano gotowy priorytet',
    'pillars.p2.title': 'Rozumie sprawę',
    'pillars.p2.body':
      'Rozpoznaje typ zgłoszenia, łączy duplikaty tego samego problemu i nadaje priorytet z jednozdaniowym uzasadnieniem — dlaczego pilne.',
    'pillars.p2.ex.med': 'np. „pilne: pacjentka przed jutrzejszym zabiegiem”',
    'pillars.p2.ex.est': 'np. pięć zgłoszeń tej samej awarii = jedna sprawa',
    'pillars.p3.title': 'Działa w granicach',
    'pillars.p3.body':
      'Bezpieczne akcje wykonuje sam: eskalacja, otwarcie sprawy, draft. Wszystko wychodzące zatwierdzasz jednym tapnięciem. Pełny audyt i cofnięcie.',
    'pillars.p3.ex.med': 'np. zmiana terminu wizyty czeka na OK rejestracji',
    'pillars.p3.ex.est': 'np. dyspozycja dla hydraulika czeka na Twoje OK',
    'pillars.p4.title': 'Mówi po polsku',
    'pillars.p4.body':
      'Głosowy agent odbiera prawdziwy numer i rozmawia naturalnym polskim głosem. Rano dostajesz głosowy briefing z podsumowaniem spraw.',
    'pillars.p4.ex.med': 'np. pacjent dzwoni po 18:00 i normalnie rozmawia',
    'pillars.p4.ex.est': 'np. mieszkaniec zgłasza awarię głosem, bez formularza',

    // How it works
    'how.eyebrow': 'Proces',
    'how.heading': 'Jak działa',
    'how.sub': 'Od wiadomości do decyzji w czterech krokach.',
    'how.s1.title': 'Wiadomość wpada',
    'how.s1.body': 'Telefon, SMS albo e-mail — o 8:00 i o 23:40. Każdy kanał trafia do jednej kolejki.',
    'how.s2.title': 'AI rozumie i kwalifikuje',
    'how.s2.body':
      'Tag, priorytet z uzasadnieniem, duplikaty połączone w jedną sprawę i dwa drafty odpowiedzi w języku nadawcy.',
    'how.s3.title': 'Bezpieczne akcje od razu',
    'how.s3.body':
      'Eskalacja i otwarcie sprawy dzieją się same. Wszystko, co wychodzi na zewnątrz, czeka na Twoje OK.',
    'how.s4.title': 'Ty masz kolejkę',
    'how.s4.body':
      'Posortowaną według priorytetów, z gotowymi draftami. Zatwierdzasz jednym tapnięciem, poprawiasz albo cofasz.',

    // Use cases (Dla kogo — active segment)
    'usecases.eyebrow': 'Dla kogo',
    'usecases.title.med': 'Placówki medyczne',
    'usecases.lead.med': 'Rejestracja, która nigdy nie ma zajętej linii.',
    'usecases.item1.med': 'Umawianie i odwoływanie wizyt przez telefon — naturalnym głosem, po polsku.',
    'usecases.item2.med': 'Odpowiedzi na pytania o przygotowanie do badań i godziny przyjęć.',
    'usecases.item3.med': 'Godziny szczytu bez zajętej linii — każda sprawa ląduje w kolejce z priorytetem.',
    'usecases.item4.med': 'Decyzje medyczne i wrażliwe zawsze po stronie personelu.',
    'usecases.title.est': 'Zarządcy nieruchomości',
    'usecases.lead.est': 'Spokój w skrzynce, nawet przy dziesiątkach zgłoszeń dziennie.',
    'usecases.item1.est': 'Awaria zgłoszona przez pięciu mieszkańców to jedna sprawa i jedna decyzja.',
    'usecases.item2.est': 'Priorytet z uzasadnieniem — od razu widzisz, co grozi szkodą, a co poczeka.',
    'usecases.item3.est': 'Faktury i wiadomości od wykonawców rozpoznane i skierowane do akceptacji.',
    'usecases.item4.est': 'Poranny głosowy briefing: co pilne, co nowe, co czeka na Twoje OK.',

    // Trust / control
    'trust.eyebrow': 'Kontrola',
    'trust.heading': 'Ty decydujesz, co wychodzi',
    'trust.sub': 'AwesomeBot działa samodzielnie tylko tam, gdzie to bezpieczne i odwracalne.',
    'trust.i1.title': 'Człowiek zatwierdza',
    'trust.i1.body': 'Każdy e-mail, SMS i dyspozycja do wykonawcy czeka na Twoje zatwierdzenie jednym tapnięciem.',
    'trust.i2.title': 'Pełny audyt',
    'trust.i2.body': 'Każda akcja AI jest zapisana: co zrobił, kiedy i dlaczego. Zero czarnej skrzynki.',
    'trust.i3.title': 'Cofnięcie w każdej chwili',
    'trust.i3.body': 'Każdą decyzję możesz wycofać, a zatwierdzone odpowiedzi stają się wzorcem dla kolejnych spraw.',
    'trust.i4.title': 'Jasne granice',
    'trust.i4.body': 'Sam wykonuje tylko akcje wewnętrzne i odwracalne: priorytet, eskalację, otwarcie sprawy, draft.',

    // FAQ
    'faq.heading': 'FAQ',
    'faq.q1.q.med': 'Czy AI nie odpowie pacjentowi czegoś głupiego?',
    'faq.q1.q.est': 'Czy AI nie odpowie mieszkańcowi czegoś głupiego?',
    'faq.q1.a':
      'Nie — nic wychodzącego nie opuszcza systemu bez człowieka. AI przygotowuje dwa drafty odpowiedzi, a Ty wybierasz, poprawiasz albo odrzucasz. Zatwierdzenie to jedno tapnięcie.',
    'faq.q2.q': 'Czy naprawdę mówi po polsku?',
    'faq.q2.a':
      'Tak. Głosowy agent odbiera prawdziwy numer telefonu i rozmawia naturalnym polskim głosem. Odpowiedzi pisemne powstają w języku nadawcy — po polsku na polską wiadomość, po angielsku na angielską.',
    'faq.q3.q': 'Co z moim obecnym numerem telefonu?',
    'faq.q3.a':
      'Twój numer zostaje. Sposób podpięcia — przekierowanie połączeń albo osobna linia dla AI — ustalamy przy wdrożeniu, pod Twoją centralę i godziny pracy.',
    'faq.q4.q': 'Co AI robi samo, a co czeka na człowieka?',
    'faq.q4.a':
      'Samo: czyta i klasyfikuje wiadomości, łączy duplikaty, nadaje priorytety, eskaluje pilne sprawy i pisze drafty. Na Twoje zatwierdzenie czeka wszystko wychodzące: e-maile, SMS-y i dyspozycje do wykonawców.',
    'faq.q5.q': 'Jak szybko można wdrożyć?',
    'faq.q5.a':
      'Zaczynamy od rozmowy i pilotażu na Twoich realnych zgłoszeniach. Zakres i termin ustalamy wspólnie — to wdrożenie asystenta, nie wielomiesięczny projekt IT.',
    'faq.q6.q.med': 'Czy AwesomeBot zastępuje rejestrację?',
    'faq.q6.a.med':
      'Nie — zdejmuje z niej telefon i sortowanie wiadomości. Personel dostaje gotową kolejkę spraw z priorytetami i decyduje o każdej odpowiedzi. Sprawy medyczne zawsze trafiają do człowieka.',
    'faq.q6.q.est': 'Co z fakturami od wykonawców?',
    'faq.q6.a.est':
      'AwesomeBot rozpoznaje faktury i wiadomości od wykonawców, podpina je do właściwej sprawy i kieruje do Twojej akceptacji. Nic nie jest opłacane ani wysyłane automatycznie.',
    'faq.q7.q': 'Ile to kosztuje?',
    'faq.q7.a':
      'Plany zaczynają się od 499 zł miesięcznie — szczegóły znajdziesz w cenniku. Dokładny zakres pod skalę Twojej placówki albo portfela nieruchomości ustalamy na 30-minutowej rozmowie.',

    // Final CTA
    'cta.eyebrow': 'Pilotaż',
    'cta.heading': 'Posłuchaj, jak brzmi Twoja nowa recepcja',
    'cta.sub': '30 minut konkretów o Twoich zgłoszeniach i wdrożeniu pilotażowym. Bez zobowiązań.',
    'cta.primary': 'Umów rozmowę',
    'cta.secondary': 'Napisz do nas',

    // Footer
    'footer.tagline': 'AI recepcja 24/7 — odbiera, rozumie i przygotowuje odpowiedzi. Decyzje zostają u Ciebie.',
    'footer.product': 'Produkt',
    'footer.company': 'Firma',
    'footer.company.aw': 'AwesomeWorks',
    'footer.company.contact': 'Kontakt',
    'footer.legal': 'Awesome Works AI · NIP: 5223202536 · Warszawa',
    'footer.copyright': '© 2026 AwesomeWorks',
    'footer.madeby': 'Stworzone przez AwesomeWorks',
    'footer.terms': 'Regulamin',
    'footer.privacy': 'Polityka prywatności',
    'footer.subprocessors': 'Podprocesorzy',
    'legal.back': 'Powrót do strony głównej',
  },
  en: {
    // Meta / SEO
    'meta.title': 'AwesomeBot — 24/7 AI front desk for clinics and property managers',
    'meta.description':
      'AwesomeBot answers calls, texts and emails 24/7, triages every case, sets priorities and drafts replies. Everything outbound is approved by a human.',

    // Nav
    'nav.problem': 'Problem',
    'nav.product': 'Product',
    'nav.how': 'How it works',
    'nav.who': 'Who it’s for',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.cta': 'Book a call',

    // Segment toggle
    'toggle.label': 'Choose your industry',
    'toggle.medical': 'Medical clinic',
    'toggle.estate': 'Real estate',

    // Hero
    'hero.h1.pre.med': 'The AI front desk that',
    'hero.h1.accent.med': 'always picks up',
    'hero.h1.pre.est': 'The AI property desk that',
    'hero.h1.accent.est': 'always picks up',

    // Hero — live status log (cycling reception feed above the H1)
    'hero.log.med.1': 'SMS answered · 02:14',
    'hero.log.med.2': 'new case: visit reschedule',
    'hero.log.med.3': 'online · 24/7',
    'hero.log.est.1': 'report received: ceiling leak',
    'hero.log.est.2': 'reply draft ready',
    'hero.log.est.3': 'online · 24/7',

    // Hero — phone demo card
    'phone.prefix.title': 'Available for Polish numbers only',
    'phone.input.label': 'Phone number',
    'phone.input.placeholder': '600 000 000',
    'phone.cta': 'Try the AI call now',
    'phone.cta.loading': 'Connecting…',
    'phone.error': 'Enter a 9-digit phone number.',
    'phone.error.cooldown': 'We just called this number — try again in a few minutes.',
    'phone.error.capacity': 'Today’s demo call limit has been reached.',
    'phone.error.generic': 'We couldn’t place the call. Try again in a moment.',
    'phone.success':
      'The phone demo is coming soon. Book a call — we’ll call you back with a live demo.',
    'phone.success.calling': 'Calling you now — pick up. Your phone should ring within seconds.',
    'phone.success.link': 'Book a call',
    'phone.consent': 'By entering your number you request a single demo call with an AI agent.',
    'hero.demolink': 'Book a demo',
    'hero.micro': 'Pilot deployments · no commitment',
    'hero.stat1.value': '24/7',
    'hero.stat1.label': 'always answering',
    'hero.stat2.value': '2',
    'hero.stat2.label': 'ready drafts per case',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'of actions audited',

    // Hero — floating message chips (decoration around the orb)
    'chips.med.1': 'Can I move my visit to Friday?',
    'chips.med.2': 'How do I prepare for the ultrasound?',
    'chips.med.3': '+48 512 ··· ··· — answered 02:14',
    'chips.est.1': 'Water leaking from the bathroom ceiling',
    'chips.est.2': 'Plumber’s invoice — approve it?',
    'chips.est.3': '+48 601 ··· ··· — answered 23:47',

    // Pricing
    'pricing.eyebrow': 'Pricing',
    'pricing.heading': 'Three plans, one front desk',
    'pricing.sub': 'From a single practice to a property portfolio. Scope and rollout are agreed on a call.',
    'pricing.p1.name': 'Start',
    'pricing.p1.price': '499 PLN',
    'pricing.p1.per': '/ mo',
    'pricing.p1.fit': 'For 1–20 calls a day',
    'pricing.p1.f1': '1 phone number',
    'pricing.p1.f2': 'All channels: phone, SMS, email',
    'pricing.p1.f3': 'Approval queue and full audit trail',
    'pricing.p1.f4': '1 user',
    'pricing.p2.name': 'Team',
    'pricing.p2.price': '1499 PLN',
    'pricing.p2.per': '/ mo',
    'pricing.p2.badge': 'Most popular',
    'pricing.p2.fit': 'For 20–100 calls a day',
    'pricing.p2.f1': '3 phone numbers',
    'pricing.p2.f2': 'Unlimited users',
    'pricing.p2.f3': 'Everything in Start',
    'pricing.p2.f4': 'Priority support',
    'pricing.p3.name': 'Scale',
    'pricing.p3.price': 'from 2499 PLN',
    'pricing.p3.per': '/ mo',
    'pricing.p3.fit': 'Above 100 calls a day',
    'pricing.p3.f1': 'Numbers and locations to fit',
    'pricing.p3.f2': 'Custom integrations',
    'pricing.p3.f3': 'SLA and a dedicated rollout lead',
    'pricing.cta': 'Book a call',
    'pricing.cta.scale': 'Configure your plan',

    // Triage card mock (lives in "How it works")
    'triage.caption': 'This is a case ready for your decision',
    'triage.header': 'Triage · example case #124',
    'triage.online': 'Online',
    'triage.tag.label': 'Tag',
    'triage.prio.label': 'Priority',
    'triage.approval': 'Waiting for your approval',
    'triage.approve': 'Approve',
    'triage.msg.label.med': 'Message · SMS · 20:12',
    'triage.msg.text.med':
      'Hi, I have an abdominal ultrasound tomorrow at 9:00 — do I need to fast beforehand?',
    'triage.tag.value.med': 'Exam preparation',
    'triage.linked.med': '+1 similar question this week',
    'triage.prio.value.med': 'Today',
    'triage.prio.why.med': 'exam tomorrow morning — the reply must arrive in time',
    'triage.draft.label.med': 'Reply draft · EN',
    'triage.draft.text.med':
      'Hello! Yes — please come fasting for an abdominal ultrasound, at least 6 hours without food. Still water is fine…',
    'triage.msg.label.est': 'Message · SMS · 07:42',
    'triage.msg.text.est':
      'Hi, water has been leaking from my bathroom ceiling since yesterday, 3rd floor. Neighbours say the same.',
    'triage.tag.value.est': 'Maintenance',
    'triage.linked.est': '+2 reports of the same problem',
    'triage.prio.value.est': 'Urgent',
    'triage.prio.why.est': 'risk of flooding the floors below',
    'triage.draft.label.est': 'Reply draft · EN',
    'triage.draft.text.est':
      'Thank you for reporting this — it’s already with the manager as urgent. A plumber will contact you today before 4 pm…',

    // Problem
    'problem.eyebrow': 'Problem',
    'problem.heading': 'The phone rings. The inbox grows. People wait.',
    'problem.sub.med': 'The front desk does triage instead of taking care of patients.',
    'problem.sub.est': 'The manager does triage instead of managing properties.',
    'problem.label.med': 'Medical front desk',
    'problem.item1.med': 'Patients can’t get through at peak hours — and they call somewhere else.',
    'problem.item2.med': 'Booking, cancelling and exam-prep questions block the line all day.',
    'problem.item3.med': 'Staff sort messages by hand instead of taking care of patients on site.',
    'problem.label.est': 'Property management',
    'problem.item1.est': '40–60 requests a day: faults, invoices, questions — by email, SMS and phone.',
    'problem.item2.est': 'Manual triage in the inbox and a spreadsheet — slow replies and lost cases.',
    'problem.item3.est': 'The same fault reported by five residents becomes five threads instead of one case.',

    // Product pillars
    'pillars.eyebrow': 'Product',
    'pillars.heading': 'What AwesomeBot does',
    'pillars.sub':
      'AwesomeBot is a 24/7 AI front desk for medical clinics and property managers — it answers calls, texts and emails, and everything outbound is approved by a human.',
    'pillars.p1.title': 'Always answers',
    'pillars.p1.body':
      'Phone, SMS and email — 24/7. Every message is read and attached to the right case before you open your inbox.',
    'pillars.p1.ex.med': 'e.g. a patient books a visit at 9:30 pm',
    'pillars.p1.ex.est': 'e.g. a fault reported at 11:40 pm is prioritised by morning',
    'pillars.p2.title': 'Understands the case',
    'pillars.p2.body':
      'Recognises the request type, merges duplicate reports of the same problem and sets a priority with a one-line reason — why it’s urgent.',
    'pillars.p2.ex.med': 'e.g. “urgent: patient before tomorrow’s procedure”',
    'pillars.p2.ex.est': 'e.g. five reports of the same fault = one case',
    'pillars.p3.title': 'Acts within limits',
    'pillars.p3.body':
      'Safe actions run on their own: escalation, opening a case, drafting. Everything outbound is approved with one tap. Full audit trail and undo.',
    'pillars.p3.ex.med': 'e.g. rescheduling a visit waits for the front desk’s OK',
    'pillars.p3.ex.est': 'e.g. dispatching the plumber waits for your OK',
    'pillars.p4.title': 'Speaks Polish',
    'pillars.p4.body':
      'A voice agent answers a real phone number in natural Polish. Every morning you get a spoken briefing with a summary of your cases.',
    'pillars.p4.ex.med': 'e.g. a patient calls after 6 pm and just talks',
    'pillars.p4.ex.est': 'e.g. a resident reports a fault by voice, no forms',

    // How it works
    'how.eyebrow': 'Process',
    'how.heading': 'How it works',
    'how.sub': 'From a message to a decision in four steps.',
    'how.s1.title': 'A message comes in',
    'how.s1.body': 'Phone, SMS or email — at 8:00 or at 23:40. Every channel lands in one queue.',
    'how.s2.title': 'AI understands and qualifies',
    'how.s2.body':
      'A tag, a priority with a reason, duplicates merged into one case and two reply drafts in the sender’s language.',
    'how.s3.title': 'Safe actions run instantly',
    'how.s3.body':
      'Escalation and case opening happen on their own. Everything that leaves the system waits for your OK.',
    'how.s4.title': 'You get the queue',
    'how.s4.body':
      'Sorted by priority, with drafts ready to send. Approve with one tap, edit, or undo.',

    // Use cases (Who it's for — active segment)
    'usecases.eyebrow': 'Who it’s for',
    'usecases.title.med': 'Medical clinics',
    'usecases.lead.med': 'A front desk whose line is never busy.',
    'usecases.item1.med': 'Booking and cancelling appointments by phone — in a natural voice, in Polish.',
    'usecases.item2.med': 'Answers to exam-prep questions and opening hours.',
    'usecases.item3.med': 'Peak hours without a busy line — every case lands in a prioritised queue.',
    'usecases.item4.med': 'Medical and sensitive decisions always stay with your staff.',
    'usecases.title.est': 'Property managers',
    'usecases.lead.est': 'A calm inbox, even with dozens of requests a day.',
    'usecases.item1.est': 'A fault reported by five residents becomes one case and one decision.',
    'usecases.item2.est': 'Priority with a reason — you instantly see what risks damage and what can wait.',
    'usecases.item3.est': 'Vendor invoices and messages recognised and routed for your approval.',
    'usecases.item4.est': 'A spoken morning briefing: what’s urgent, what’s new, what waits for your OK.',

    // Trust / control
    'trust.eyebrow': 'Control',
    'trust.heading': 'You decide what goes out',
    'trust.sub': 'AwesomeBot acts on its own only where it’s safe and reversible.',
    'trust.i1.title': 'A human approves',
    'trust.i1.body': 'Every email, SMS and vendor dispatch waits for your one-tap approval.',
    'trust.i2.title': 'Full audit trail',
    'trust.i2.body': 'Every AI action is recorded: what it did, when and why. No black box.',
    'trust.i3.title': 'Undo at any time',
    'trust.i3.body': 'Any decision can be reversed, and approved replies become the pattern for future cases.',
    'trust.i4.title': 'Clear boundaries',
    'trust.i4.body': 'It only self-executes internal, reversible actions: priority, escalation, opening a case, drafting.',

    // FAQ
    'faq.heading': 'FAQ',
    'faq.q1.q.med': 'Won’t the AI say something stupid to a patient?',
    'faq.q1.q.est': 'Won’t the AI say something stupid to a resident?',
    'faq.q1.a':
      'No — nothing outbound leaves the system without a human. The AI prepares two reply drafts, and you pick, edit or reject them. Approval is a single tap.',
    'faq.q2.q': 'Does it really speak Polish?',
    'faq.q2.a':
      'Yes. The voice agent answers a real phone number in natural Polish. Written replies are drafted in the sender’s language — Polish to a Polish message, English to an English one.',
    'faq.q3.q': 'What about my current phone number?',
    'faq.q3.a':
      'Your number stays. How we plug in — call forwarding or a separate AI line — is set up during onboarding, around your phone system and working hours.',
    'faq.q4.q': 'What does the AI do on its own, and what waits for a human?',
    'faq.q4.a':
      'On its own: it reads and classifies messages, merges duplicates, sets priorities, escalates urgent cases and writes drafts. Everything outbound waits for your approval: emails, texts and vendor dispatches.',
    'faq.q5.q': 'How fast can we deploy?',
    'faq.q5.a':
      'We start with a call and a pilot on your real messages. Scope and timing are agreed together — it’s an assistant rollout, not a months-long IT project.',
    'faq.q6.q.med': 'Does AwesomeBot replace my front-desk staff?',
    'faq.q6.a.med':
      'No — it takes the phone and message sorting off their hands. Your staff get a ready, prioritised queue and decide on every reply. Medical matters always go to a human.',
    'faq.q6.q.est': 'What about vendor invoices?',
    'faq.q6.a.est':
      'AwesomeBot recognises vendor invoices and messages, attaches them to the right case and routes them for your approval. Nothing is paid or sent automatically.',
    'faq.q7.q': 'How much does it cost?',
    'faq.q7.a':
      'Plans start at 499 PLN per month — see the pricing section for details. The exact scope for your clinic or property portfolio is agreed in a 30-minute call.',

    // Final CTA
    'cta.eyebrow': 'Pilot',
    'cta.heading': 'Hear what your new front desk sounds like',
    'cta.sub': '30 minutes of specifics about your messages and a pilot rollout. No commitment.',
    'cta.primary': 'Book a call',
    'cta.secondary': 'Write to us',

    // Footer
    'footer.tagline': 'A 24/7 AI front desk — it answers, understands and drafts the replies. Decisions stay with you.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.company.aw': 'AwesomeWorks',
    'footer.company.contact': 'Contact',
    'footer.legal': 'Awesome Works AI · NIP: 5223202536 · Warszawa',
    'footer.copyright': '© 2026 AwesomeWorks',
    'footer.madeby': 'Built by AwesomeWorks',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy Policy',
    'footer.subprocessors': 'Subprocessors',
    'legal.back': 'Back to home',
  },
} as const;

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)[typeof defaultLang];
