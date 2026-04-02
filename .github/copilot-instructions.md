# Website — Instrukcje dla AI

## Workspace safety

- **Bazowe repo = inspection-only** — nie edytuj, nie twórz i nie usuwaj plików w bazowym checkoutcie repo.
- **Absolutny zakaz outputów w bazowym repo** — dotyczy to też planów, notatek, raportów, backupów, logów, scratch files i innych artefaktów pracy agenta.
- **Wszystkie mutacje tylko w worktree** — branch, `git checkout` / `git switch`, edycje, nowe pliki, test artefakty, commit i push wykonuj wyłącznie w `worktrees/website/<task-slug>`.
- **Dirty base repo zostaw w spokoju** — bez `git stash`, bez cleanupu; utwórz czysty worktree z `origin/main`.
