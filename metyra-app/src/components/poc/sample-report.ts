/**
 * Sample reports — generated manually acting as generator + formatter agents
 * for query: "Q3 2026 sales report for a logistics company (50-200 FTE)".
 *
 * Shows the full block set the Metyra Report Viewer can render.
 * In production this string streams in over SSE from the formatter LLM.
 */

export const SAMPLE_REPORT_PL = `:::report-header
{"title":"Polmix Distribution Sp. z o.o.","subtitle":"Raport sprzedaży i outlook · transport i logistyka kontraktowa · 312 FTE","period":"Q3 2026","stats":[{"label":"Revenue","value":"248.4 mln PLN"},{"label":"EBITDA margin","value":"14.2%"},{"label":"Headcount","value":"312 FTE"},{"label":"Avg deal B2B","value":"86.3 tys PLN"},{"label":"DSO","value":"47 dni"}]}
:::

# 1. Przegląd

Polmix Distribution zamknął **Q3 2026 z revenue 248.4 mln PLN** (+11.8% r/r) — to trzeci kwartał z rzędu z dwucyfrowym wzrostem. Marża EBITDA utrzymała się na poziomie 14.2% pomimo presji kosztowej w transporcie krajowym. Najszybciej rośnie last-mile (+34% r/r) — segment osiągnął skalę uzasadniającą wydzielenie własnego P&L.

:::metric-cards
{"cards":[{"label":"P25 · Konserwatywnie","value":"212","unit":"mln PLN","tone":"orange","caption":"Q4 2026 — dolny przedział planistyczny"},{"label":"P50 · Bazowo","value":"258","unit":"mln PLN","tone":"blue","caption":"Środek przedziału — kontynuacja pipeline'u"},{"label":"P75 · Aspiracyjnie","value":"291","unit":"mln PLN","tone":"green","caption":"Pełne uruchomienie hubu Praga"}]}
:::

:::kpi-card
{"label":"Revenue","value":"248.4","unit":"mln PLN","delta":{"value":"+11.8%","direction":"up","label":"r/r"},"spark":[212,218,222,228,235,240,244,248],"status":"green","caption":"3 kwartały z rzędu powyżej +11%"}
:::

:::kpi-card
{"label":"EBITDA margin","value":"14.2","unit":"%","delta":{"value":"−0.3pp","direction":"down","label":"q/q"},"spark":[14.6,14.8,14.5,14.7,14.5,14.4,14.5,14.2],"status":"amber","caption":"Presja kosztowa na transport krajowy"}
:::

:::kpi-card
{"label":"DSO","value":"47","unit":"dni","delta":{"value":"+4 dni","direction":"down","label":"q/q"},"spark":[42,43,41,44,43,45,46,47],"status":"red","caption":"Wydłużenie cyklu należności B2B"}
:::

:::kpi-card
{"label":"Last-mile rev","value":"19.9","unit":"mln PLN","delta":{"value":"+34%","direction":"up","label":"r/r"},"spark":[12,13,14,15,16,17,18,19.9],"status":"green","caption":"Kandydat na osobny segment od Q1 2027"}
:::

:::callout:insight
{"text":"**Trzy kwartały z rzędu** revenue rośnie powyżej 11% r/r — pipeline B2B się utrwala, to nie jednorazowy peak."}
:::

# 2. Struktura przychodów

Revenue mix pokazuje dominację transportu (łącznie 71%), ale dynamika koncentruje się w last-mile i magazynowaniu — to tam dzieje się zmiana modelu biznesowego.

:::chart:donut
{"title":"Revenue mix · Q3 2026","unit":"%","data":[{"name":"Transport krajowy","value":42},{"name":"Transport międzynarodowy","value":29},{"name":"Magazynowanie","value":17},{"name":"Last-mile","value":8},{"name":"Inne","value":4}]}
:::

Wzrost revenue Q2 → Q3 to **+26 mln PLN**. Bridge poniżej rozkłada to na cztery drivery: nowe kontrakty, churn jednego dużego klienta retailowego, indeksację taryf i pozytywny mix w stronę usług o wyższej marży.

:::chart:waterfall
{"title":"Revenue bridge Q2 → Q3 (mln PLN)","unit":"mln PLN","start":{"label":"Q2 2026","value":222},"steps":[{"label":"New logos","delta":18,"kind":"positive"},{"label":"Churn","delta":-4,"kind":"negative"},{"label":"Indeksacja taryf","delta":8,"kind":"positive"},{"label":"Mix","delta":4,"kind":"positive"}],"end":{"label":"Q3 2026","value":248}}
:::

:::callout:insight
{"text":"**Nowe kontrakty (+18 mln)** odpowiadają za 68% wzrostu — dwa duże dealy z e-commerce w DE i dystrybucji B2B w CZ dorzucają łącznie 14 mln. Bez nich Q3 byłby tylko +8 mln."}
:::

# 3. Porównanie i wariancja

Trend miesięczny revenue (12 ostatnich miesięcy) — Polmix konsekwentnie powyżej mediany peer group, ale w ostatnich 4 miesiącach lekko poniżej własnego forecastu P50:

:::chart:line
{"title":"Revenue · trend miesięczny (mln PLN)","unit":" mln","x_label":"Miesiąc","series":["Polmix","Peer median","Forecast P50"],"data":[{"period":"2025-08","Polmix":68,"Peer median":62,"Forecast P50":70},{"period":"2025-09","Polmix":71,"Peer median":63,"Forecast P50":72},{"period":"2025-10","Polmix":74,"Peer median":65,"Forecast P50":75},{"period":"2025-11","Polmix":76,"Peer median":66,"Forecast P50":77},{"period":"2025-12","Polmix":79,"Peer median":68,"Forecast P50":80},{"period":"2026-01","Polmix":72,"Peer median":64,"Forecast P50":76},{"period":"2026-02","Polmix":75,"Peer median":66,"Forecast P50":78},{"period":"2026-03","Polmix":78,"Peer median":68,"Forecast P50":81},{"period":"2026-04","Polmix":80,"Peer median":70,"Forecast P50":83},{"period":"2026-05","Polmix":82,"Peer median":71,"Forecast P50":84},{"period":"2026-06","Polmix":84,"Peer median":72,"Forecast P50":86},{"period":"2026-07","Polmix":83,"Peer median":71,"Forecast P50":85}]}
:::

Revenue rośnie, ale marża EBITDA lekko spada — sygnał że wzrost wolumenu kosztuje więcej niż oczekiwano:

:::chart:combo
{"title":"Revenue vs marża EBITDA · 8 ostatnich miesięcy","x_key":"period","bars":{"key":"revenue","label":"Revenue","unit":"mln PLN"},"line":{"key":"margin","label":"EBITDA margin","unit":"%"},"data":[{"period":"2025-12","revenue":79,"margin":15.1},{"period":"2026-01","revenue":72,"margin":14.3},{"period":"2026-02","revenue":75,"margin":14.6},{"period":"2026-03","revenue":78,"margin":14.4},{"period":"2026-04","revenue":80,"margin":14.5},{"period":"2026-05","revenue":82,"margin":14.4},{"period":"2026-06","revenue":84,"margin":14.3},{"period":"2026-07","revenue":83,"margin":14.2}]}
:::

:::chart:bar
{"title":"Revenue Q2 vs Q3 · peer group (mln PLN)","unit":" mln","series":["Q2 2026","Q3 2026"],"data":[{"category":"Polmix","Q2 2026":222,"Q3 2026":248},{"category":"Acme Freight","Q2 2026":195,"Q3 2026":201},{"category":"Cargo Holdings","Q2 2026":278,"Q3 2026":283},{"category":"Vortex Lines","Q2 2026":168,"Q3 2026":174},{"category":"PolarBox","Q2 2026":134,"Q3 2026":139}]}
:::

:::data-table
{"title":"Peer group · profile Q3 2026","columns":[{"key":"name","label":"Firma","align":"left"},{"key":"rev","label":"Revenue Q3","align":"right"},{"key":"growth","label":"Growth r/r","align":"right"},{"key":"margin","label":"EBITDA %","align":"right"},{"key":"fte","label":"FTE","align":"right"}],"rows":[{"name":"Polmix Distribution","rev":"248.4 mln","growth":"+11.8%","margin":"14.2%","fte":312},{"name":"Acme Freight","rev":"201.2 mln","growth":"+6.4%","margin":"9.8%","fte":287},{"name":"Cargo Holdings","rev":"283.1 mln","growth":"+4.1%","margin":"16.0%","fte":401},{"name":"Vortex Lines","rev":"174.0 mln","growth":"+8.9%","margin":"11.3%","fte":198},{"name":"PolarBox","rev":"139.2 mln","growth":"+13.7%","margin":"7.1%","fte":168}]}
:::

W ujęciu vs plan tylko transport krajowy oraz "Inne" poniżej budżetu. Last-mile mocno przebił plan o 37%:

:::variance-table
{"title":"Actual vs Plan · Q3 2026","metric_label":"Revenue (mln PLN)","baseline_label":"Plan","rows":[{"name":"Transport krajowy","actual":104.3,"baseline":108.0,"delta_abs":-3.7,"delta_pct":-3.4,"status":"amber"},{"name":"Transport międzynarodowy","actual":72.0,"baseline":68.0,"delta_abs":4.0,"delta_pct":5.9,"status":"green"},{"name":"Magazynowanie","actual":42.2,"baseline":40.0,"delta_abs":2.2,"delta_pct":5.5,"status":"green"},{"name":"Last-mile","actual":19.9,"baseline":14.5,"delta_abs":5.4,"delta_pct":37.2,"status":"green"},{"name":"Inne","actual":10.0,"baseline":11.0,"delta_abs":-1.0,"delta_pct":-9.1,"status":"amber"}]}
:::

:::callout:insight
{"text":"**Polmix ma najwyższy growth w peer group** (+11.8% r/r) przy 2-giej najlepszej marży (14.2%) — pozycja \\"premium\\" w segmencie się utrwala."}
:::

# 4. Scenariusze i drivery

:::scenario-range
{"title":"Forecast Q4 2026","unit":" mln PLN","scenarios":[{"name":"Bearish","value":"212","color":"red","description":"Stagnacja kursu EUR/PLN + spadek wolumenu B2B w grudniu"},{"name":"Base","value":"258","color":"blue","description":"Kontynuacja obecnego pipeline'u + sezonowy szczyt"},{"name":"Bullish","value":"291","color":"green","description":"Pełne uruchomienie hubu last-mile Praga w listopadzie"}]}
:::

:::driver-cards
{"title":"Kluczowe drivery scenariuszy","drivers":[{"name":"Kurs EUR/PLN","direction":"up","impact":"±8 mln PLN","description":"Każdy ruch 0.10 PLN to ok. 8 mln PLN revenue międzynarodowego"},{"name":"Ceny paliw","direction":"down","impact":"−12 mln PLN przy +15%","description":"Indeksacja taryf z opóźnieniem 4-6 tygodni"},{"name":"Last-mile capacity Praga","direction":"up","impact":"+18 mln PLN","description":"Pełne uruchomienie hubu = nowy revenue"},{"name":"Churn B2B (top-20)","direction":"neutral","impact":"−3 do +2 mln PLN","description":"Top-20 klientów retencjonowanych do 2027"},{"name":"Headcount magazyny (peak)","direction":"up","impact":"+4 mln PLN","description":"Dodatkowe 30 FTE w listopadzie zwiększa capacity sezonowo"}]}
:::

:::callout:insight
{"text":"Drivery są **asymetryczne**: upside z last-mile (+18) większy niż realny downside z FX (±8). Trzymamy kierunek Base z opcją na Bullish."}
:::

# 5. Wnioski i rekomendacja

:::callout:insight
{"text":"**Last-mile rośnie 34% r/r przy 8% udziale w revenue** — przekracza próg uzasadniający wydzielenie osobnego segmentu od Q1 2027."}
:::

:::callout:insight
{"text":"**Marża międzynarodowa rośnie pomimo wolumenu** — sygnał lepszego pricingu, nie tylko mixu. Mamy moc cenową w EU."}
:::

:::callout:insight
{"text":"**DSO 47 dni (+4 q/q)** — drobne pogorszenie, ale top-5 klientów nadal w terminie. Sprawdzić top-20 dłużników indywidualnie przed zamknięciem Q4."}
:::

:::callout:info
{"text":"Raport bazuje na danych z Comarch ERP + system WMS, konsolidacja na 30.09.2026. Peer group benchmarki z publicznych raportów rocznych konkurencji za Q3 2026."}
:::

:::callout:warning
{"text":"Wydłużenie DSO o 4 dni przy rosnącym revenue może maskować problemy z windykacją w 1-2 dużych kontraktach. Rekomendowane szybkie review top-20 należności przed zamknięciem Q4."}
:::

:::recommendation
{"verdict":"warunkowo","title":"Wydzielić last-mile jako osobny segment od Q1 2027","rationale":"Last-mile rośnie 34% r/r przy 8% udziale w revenue — granica przy której osobne raportowanie zaczyna mieć sens. Wymaga zamknięcia uruchomienia hubu Praga (capex 4 mln PLN) oraz stabilizacji marży powyżej 10%.","actions":[{"what":"Walidacja popytu last-mile w Czechach (3 pilot accounts)","owner":"BD","by":"2026-07-15"},{"what":"Zatwierdzenie capex 4 mln PLN na hub Praga","owner":"CFO","by":"2026-08-01"},{"what":"Setup osobnego P&L w Comarch + przepięcie kont","owner":"Controller","by":"2026-12-15"},{"what":"Komunikacja ze stakeholderami (zarząd + bank)","owner":"CEO","by":"2026-09-30"}]}
:::
`;


/* =============================================================================
 *  EN — same scenario, fully translated. Company name is a Polish "Sp. z o.o."
 *  because Metyra targets the Polish mid-market; we preserve that even on the EN
 *  surface so the demo reads as a localized Polish-business example.
 * ============================================================================= */

export const SAMPLE_REPORT_EN = `:::report-header
{"title":"Polmix Distribution","subtitle":"Sales report & outlook · contract logistics and road transport · 312 FTE","period":"Q3 2026","stats":[{"label":"Revenue","value":"PLN 248.4M"},{"label":"EBITDA margin","value":"14.2%"},{"label":"Headcount","value":"312 FTE"},{"label":"Avg B2B deal","value":"PLN 86.3K"},{"label":"DSO","value":"47 days"}]}
:::

# 1. Overview

Polmix Distribution closed **Q3 2026 with PLN 248.4M revenue** (+11.8% YoY) — the third consecutive quarter of double-digit growth. EBITDA margin held at 14.2% despite cost pressure in domestic transport. Last-mile is the fastest-growing line (+34% YoY) and has reached the scale that justifies a separate P&L.

:::metric-cards
{"cards":[{"label":"P25 · Conservative","value":"212","unit":"PLN M","tone":"orange","caption":"Q4 2026 forecast — lower planning range"},{"label":"P50 · Base","value":"258","unit":"PLN M","tone":"blue","caption":"Mid-range — pipeline continuation"},{"label":"P75 · Aspirational","value":"291","unit":"PLN M","tone":"green","caption":"Full launch of the Prague hub"}]}
:::

:::kpi-card
{"label":"Revenue","value":"248.4","unit":"PLN M","delta":{"value":"+11.8%","direction":"up","label":"YoY"},"spark":[212,218,222,228,235,240,244,248],"status":"green","caption":"3 consecutive quarters above +11%"}
:::

:::kpi-card
{"label":"EBITDA margin","value":"14.2","unit":"%","delta":{"value":"−0.3pp","direction":"down","label":"QoQ"},"spark":[14.6,14.8,14.5,14.7,14.5,14.4,14.5,14.2],"status":"amber","caption":"Cost pressure on domestic transport"}
:::

:::kpi-card
{"label":"DSO","value":"47","unit":"days","delta":{"value":"+4 days","direction":"down","label":"QoQ"},"spark":[42,43,41,44,43,45,46,47],"status":"red","caption":"B2B receivables cycle lengthening"}
:::

:::kpi-card
{"label":"Last-mile rev","value":"19.9","unit":"PLN M","delta":{"value":"+34%","direction":"up","label":"YoY"},"spark":[12,13,14,15,16,17,18,19.9],"status":"green","caption":"Candidate to become a standalone segment from Q1 2027"}
:::

:::callout:insight
{"text":"**Three consecutive quarters** of revenue growth above 11% YoY — the B2B pipeline is consolidating, not a one-off peak."}
:::

# 2. Revenue structure

The revenue mix shows transport dominance (71% combined), but the dynamics are concentrated in last-mile and warehousing — that's where the business model is shifting.

:::chart:donut
{"title":"Revenue mix · Q3 2026","unit":"%","data":[{"name":"Domestic transport","value":42},{"name":"International transport","value":29},{"name":"Warehousing","value":17},{"name":"Last-mile","value":8},{"name":"Other","value":4}]}
:::

The Q2 → Q3 revenue change is **+PLN 26M**. The bridge below breaks it down by driver: new contracts, churn of one large retail client, tariff indexation, and a positive mix shift toward higher-margin services.

:::chart:waterfall
{"title":"Revenue bridge Q2 → Q3 (PLN M)","unit":"PLN M","start":{"label":"Q2 2026","value":222},"steps":[{"label":"New logos","delta":18,"kind":"positive"},{"label":"Churn","delta":-4,"kind":"negative"},{"label":"Tariff indexation","delta":8,"kind":"positive"},{"label":"Mix","delta":4,"kind":"positive"}],"end":{"label":"Q3 2026","value":248}}
:::

:::callout:insight
{"text":"**+PLN 18M from new logos** = 68% of the growth — two large deals (e-commerce in DE and B2B distribution in CZ) contribute PLN 14M combined. Without them Q3 would only be +PLN 8M."}
:::

# 3. Benchmark & variance

Monthly revenue trend (last 12 months) — Polmix consistently above peer median, but in the last 4 months slightly below its own P50 forecast:

:::chart:line
{"title":"Revenue · monthly trend (PLN M)","unit":" M","x_label":"Month","series":["Polmix","Peer median","Forecast P50"],"data":[{"period":"2025-08","Polmix":68,"Peer median":62,"Forecast P50":70},{"period":"2025-09","Polmix":71,"Peer median":63,"Forecast P50":72},{"period":"2025-10","Polmix":74,"Peer median":65,"Forecast P50":75},{"period":"2025-11","Polmix":76,"Peer median":66,"Forecast P50":77},{"period":"2025-12","Polmix":79,"Peer median":68,"Forecast P50":80},{"period":"2026-01","Polmix":72,"Peer median":64,"Forecast P50":76},{"period":"2026-02","Polmix":75,"Peer median":66,"Forecast P50":78},{"period":"2026-03","Polmix":78,"Peer median":68,"Forecast P50":81},{"period":"2026-04","Polmix":80,"Peer median":70,"Forecast P50":83},{"period":"2026-05","Polmix":82,"Peer median":71,"Forecast P50":84},{"period":"2026-06","Polmix":84,"Peer median":72,"Forecast P50":86},{"period":"2026-07","Polmix":83,"Peer median":71,"Forecast P50":85}]}
:::

Revenue is growing, but EBITDA margin is drifting down — a signal that volume growth is costing more than expected:

:::chart:combo
{"title":"Revenue vs EBITDA margin · last 8 months","x_key":"period","bars":{"key":"revenue","label":"Revenue","unit":"PLN M"},"line":{"key":"margin","label":"EBITDA margin","unit":"%"},"data":[{"period":"2025-12","revenue":79,"margin":15.1},{"period":"2026-01","revenue":72,"margin":14.3},{"period":"2026-02","revenue":75,"margin":14.6},{"period":"2026-03","revenue":78,"margin":14.4},{"period":"2026-04","revenue":80,"margin":14.5},{"period":"2026-05","revenue":82,"margin":14.4},{"period":"2026-06","revenue":84,"margin":14.3},{"period":"2026-07","revenue":83,"margin":14.2}]}
:::

:::chart:bar
{"title":"Revenue Q2 vs Q3 · peer group (PLN M)","unit":" M","series":["Q2 2026","Q3 2026"],"data":[{"category":"Polmix","Q2 2026":222,"Q3 2026":248},{"category":"Acme Freight","Q2 2026":195,"Q3 2026":201},{"category":"Cargo Holdings","Q2 2026":278,"Q3 2026":283},{"category":"Vortex Lines","Q2 2026":168,"Q3 2026":174},{"category":"PolarBox","Q2 2026":134,"Q3 2026":139}]}
:::

:::data-table
{"title":"Peer group · Q3 2026 profiles","columns":[{"key":"name","label":"Company","align":"left"},{"key":"rev","label":"Revenue Q3","align":"right"},{"key":"growth","label":"YoY growth","align":"right"},{"key":"margin","label":"EBITDA %","align":"right"},{"key":"fte","label":"FTE","align":"right"}],"rows":[{"name":"Polmix Distribution","rev":"248.4 M","growth":"+11.8%","margin":"14.2%","fte":312},{"name":"Acme Freight","rev":"201.2 M","growth":"+6.4%","margin":"9.8%","fte":287},{"name":"Cargo Holdings","rev":"283.1 M","growth":"+4.1%","margin":"16.0%","fte":401},{"name":"Vortex Lines","rev":"174.0 M","growth":"+8.9%","margin":"11.3%","fte":198},{"name":"PolarBox","rev":"139.2 M","growth":"+13.7%","margin":"7.1%","fte":168}]}
:::

Against plan, only domestic transport and "Other" are under budget. Last-mile blew past plan by 37%:

:::variance-table
{"title":"Actual vs Plan · Q3 2026","metric_label":"Revenue (PLN M)","baseline_label":"Plan","rows":[{"name":"Domestic transport","actual":104.3,"baseline":108.0,"delta_abs":-3.7,"delta_pct":-3.4,"status":"amber"},{"name":"International transport","actual":72.0,"baseline":68.0,"delta_abs":4.0,"delta_pct":5.9,"status":"green"},{"name":"Warehousing","actual":42.2,"baseline":40.0,"delta_abs":2.2,"delta_pct":5.5,"status":"green"},{"name":"Last-mile","actual":19.9,"baseline":14.5,"delta_abs":5.4,"delta_pct":37.2,"status":"green"},{"name":"Other","actual":10.0,"baseline":11.0,"delta_abs":-1.0,"delta_pct":-9.1,"status":"amber"}]}
:::

:::callout:insight
{"text":"**Polmix has the highest YoY growth in the peer group** (+11.8%) with the 2nd-best margin (14.2%) — the \\"premium\\" segment position is consolidating."}
:::

# 4. Scenarios & drivers

:::scenario-range
{"title":"Q4 2026 forecast","unit":" PLN M","scenarios":[{"name":"Bearish","value":"212","color":"red","description":"EUR/PLN stagnation + B2B volume drop in December"},{"name":"Base","value":"258","color":"blue","description":"Continued current pipeline + seasonal peak"},{"name":"Bullish","value":"291","color":"green","description":"Successful launch of the last-mile Prague hub in November"}]}
:::

:::driver-cards
{"title":"Key scenario drivers","drivers":[{"name":"EUR/PLN exchange rate","direction":"up","impact":"±PLN 8M","description":"Every 0.10 PLN move ≈ PLN 8M in international revenue"},{"name":"Fuel prices","direction":"down","impact":"−PLN 12M at +15%","description":"Tariff indexation lags by 4–6 weeks"},{"name":"Last-mile Prague capacity","direction":"up","impact":"+PLN 18M","description":"Full hub launch = net-new revenue"},{"name":"B2B churn (top-20)","direction":"neutral","impact":"−PLN 3M to +PLN 2M","description":"Top-20 clients retained through 2027"},{"name":"Warehouse headcount (peak)","direction":"up","impact":"+PLN 4M","description":"Additional 30 FTE in November expands seasonal capacity"}]}
:::

:::callout:insight
{"text":"Drivers are **asymmetric**: last-mile upside (+18) is larger than the realistic FX downside (±8). We're holding Base with an option on Bullish."}
:::

# 5. Conclusions & recommendation

:::callout:insight
{"text":"**Last-mile is growing 34% YoY at 8% of revenue** — past the threshold that justifies a standalone segment from Q1 2027."}
:::

:::callout:insight
{"text":"**International margin is rising despite volume** — a sign of better pricing, not just mix. We have pricing power in the EU."}
:::

:::callout:insight
{"text":"**DSO 47 days (+4 QoQ)** — a mild deterioration, but the top-5 clients are still on time. Review the top-20 debtors individually before Q4 close."}
:::

:::callout:info
{"text":"The report is based on data from the ERP + the WMS, consolidated as of 2026-09-30. Peer benchmarks come from publicly available competitor annual reports for Q3 2026."}
:::

:::callout:warning
{"text":"DSO lengthening by 4 days while revenue grows may mask collection problems in 1–2 large contracts. Recommended quick review of the top-20 receivables before Q4 close."}
:::

:::recommendation
{"verdict":"conditional","title":"Spin off last-mile as a standalone segment from Q1 2027","rationale":"Last-mile is growing 34% YoY at 8% of revenue — the threshold where standalone reporting starts to make sense. Requires closing the Prague hub launch (capex PLN 4M) and stabilising margin above 10%.","actions":[{"what":"Validate last-mile demand in Czechia (3 pilot accounts)","owner":"BD","by":"2026-07-15"},{"what":"Approve capex of PLN 4M for the Prague hub","owner":"CFO","by":"2026-08-01"},{"what":"Set up a separate P&L in the ERP + re-map accounts","owner":"Controller","by":"2026-12-15"},{"what":"Communicate with stakeholders (board + bank)","owner":"CEO","by":"2026-09-30"}]}
:::
`;
