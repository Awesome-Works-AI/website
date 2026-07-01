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
    'meta.title': 'AwesomeBot — AI recepcja 24/7 dla placówek medycznych i zarządców nieruchomości',
    'meta.description':
      'AwesomeBot odbiera telefony, SMS-y i e-maile 24/7, rozpoznaje sprawy, nadaje priorytety i przygotowuje odpowiedzi. Wszystko wychodzące zatwierdza człowiek.',

    // Nav
    'nav.problem': 'Problem',
    'nav.product': 'Produkt',
    'nav.how': 'Jak działa',
    'nav.who': 'Dla kogo',
    'nav.faq': 'FAQ',
    'nav.cta': 'Umów rozmowę',

    // Segment toggle
    'toggle.label': 'Wybierz branżę',
    'toggle.medical': 'Klinika medyczna',
    'toggle.estate': 'Nieruchomości',

    // Hero
    'hero.eyebrow': 'AI recepcja · online 24/7',
    'hero.h1.pre.med': 'Rejestracja, która',
    'hero.h1.accent.med': 'odbiera zawsze',
    'hero.subtitle.med':
      'AI odbiera telefony, SMS-y i e-maile Twojej placówki — 24/7. Pacjent zawsze się dodzwoni, decyzje zostają u personelu.',
    'hero.h1.pre.est': 'Biuro zarządcy, które',
    'hero.h1.accent.est': 'odbiera zawsze',
    'hero.subtitle.est':
      'AI czyta każde zgłoszenie mieszkańca — telefon, SMS, e-mail — 24/7. Priorytety i drafty gotowe, decyzje zostają u Ciebie.',

    // Hero — phone demo card
    'phone.prefix.title': 'Dostępne tylko dla polskich numerów',
    'phone.input.label': 'Numer telefonu',
    'phone.input.placeholder': '600 000 000',
    'phone.cta': 'Wypróbuj rozmowę z AI',
    'phone.error': 'Wpisz 9-cyfrowy numer telefonu.',
    'phone.success':
      'Demo telefoniczne startuje wkrótce. Umów rozmowę — oddzwonimy z demo na Twój numer.',
    'phone.success.link': 'Umów rozmowę',
    'hero.demolink': 'Umów demo',
    'hero.micro': 'Wdrożenia pilotażowe · bez zobowiązań',
    'hero.stat1.value': '24/7',
    'hero.stat1.label': 'odbiera bez przerwy',
    'hero.stat2.value': '2',
    'hero.stat2.label': 'gotowe drafty na sprawę',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'akcji w audycie',

    // Triage card mock (lives in "Jak działa")
    'triage.caption': 'Tak wygląda sprawa gotowa do decyzji',
    'triage.header': 'Triage · sprawa #124',
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
    'pillars.sub': 'Cztery filary jednej recepcji — od odebrania do gotowej odpowiedzi.',
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
      'Porozmawiajmy — wycena zależy od skali: liczby pacjentów lub lokali, kanałów i godzin pracy. Na 30-minutowej rozmowie pokażemy, jak to wygląda dla Twojej placówki albo portfela nieruchomości.',

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
    'nav.faq': 'FAQ',
    'nav.cta': 'Book a call',

    // Segment toggle
    'toggle.label': 'Choose your industry',
    'toggle.medical': 'Medical clinic',
    'toggle.estate': 'Real estate',

    // Hero
    'hero.eyebrow': 'AI front desk · online 24/7',
    'hero.h1.pre.med': 'The front desk that',
    'hero.h1.accent.med': 'always picks up',
    'hero.subtitle.med':
      'AI answers your clinic’s calls, texts and emails — 24/7. Patients always get through, decisions stay with your staff.',
    'hero.h1.pre.est': 'The property desk that',
    'hero.h1.accent.est': 'always picks up',
    'hero.subtitle.est':
      'AI reads every resident request — phone, SMS, email — 24/7. Priorities and drafts ready, decisions stay with you.',

    // Hero — phone demo card
    'phone.prefix.title': 'Available for Polish numbers only',
    'phone.input.label': 'Phone number',
    'phone.input.placeholder': '600 000 000',
    'phone.cta': 'Try the AI call now',
    'phone.error': 'Enter a 9-digit phone number.',
    'phone.success':
      'The phone demo is coming soon. Book a call — we’ll call you back with a live demo.',
    'phone.success.link': 'Book a call',
    'hero.demolink': 'Book a demo',
    'hero.micro': 'Pilot deployments · no commitment',
    'hero.stat1.value': '24/7',
    'hero.stat1.label': 'always answering',
    'hero.stat2.value': '2',
    'hero.stat2.label': 'ready drafts per case',
    'hero.stat3.value': '100%',
    'hero.stat3.label': 'of actions audited',

    // Triage card mock (lives in "How it works")
    'triage.caption': 'This is a case ready for your decision',
    'triage.header': 'Triage · case #124',
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
    'pillars.sub': 'Four pillars of one front desk — from pickup to a ready reply.',
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
      'Let’s talk — pricing depends on scale: the number of patients or units, channels and working hours. In a 30-minute call we’ll show what it looks like for your clinic or property portfolio.',

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
  },
} as const;

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)[typeof defaultLang];
