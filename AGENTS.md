# AGENTS.md — 100 prghs for eeshah

A romantic, interactive multi-page gift website for one person ("Eeshah"). Vanilla JS + Firebase Realtime DB, static site, no build step. All content is hand-written and personal — treat it with care, never lose or rewrite the writing.

## Read first
- `SYSTEM.md` — full architecture: pages, scripts, Firebase stores, localStorage keys, triggers, recent changes. This is the source of truth; read it before touching anything.

## Key facts
- Project root: this folder. Git repo: `github.com/faxy-nik/100-orgs` (branch `main`).
- No build step. Files run as-is; deploy = upload folder to Netlify (netlify.toml: `skip_processing=true`).
- Firebase project `faxy-ash` (RTDB). Config lives in `fb-db.js`; on localhost it falls back to a localStorage mock. Admin login = email/password; `ADMIN_UID` in `admin.js` (~line 2520) must match `database.rules.json`.
- Feature flags: `feature-flags.js` (48 flags, localStorage + Firebase `config/features`). Many scripts gate on `FeatureFlags.get(...)`.
- User uploads: photos persist to `config/gallery` (same store as admin — merge, never replace), songs to `userSongs` (`auth != null` write rule, deployed).
- Interactions log: `interactions.js` (loaded on every page) records clicks/catches to `interactions/{id}` (queue `ash-interactions-queue`, flush 30s + close; skips admin via passkey). Admin "Interactions" tab (admin.js `renderInteractions`) shows counts + recent 100. Hook points use `if (window.Interactions) window.Interactions.record(type, action, detail)`.
- Events: single store `config/events` (old `project-events` retired — admin.js migrates it on first render).
- Service worker `sw.js` caches `ash-v47` — bump version when adding/renaming cached files.
- The site is date-gated (`lock.js`/`section-lock.js`), full of secret triggers (type `ash`, `remember`, `letter`, `dream`, `sleep`), and has personal/admin data — never expose or log credentials, and never delete user-generated data from Firebase.

## Commands
- Tests: `cd tools && npm test` — verifies syntax, refs, letters, memories, turn-on game integrity (486 steps reachable). Run after any change.
- Quick syntax check: `node --check <file>.js`
- Final asset check: `tools\final_check.js` (39 JS / 24 HTML files)
- Deploy rules only: `firebase deploy --only database --project faxy-ash` (requires firebase CLI + credentials)

## Conventions
- Vanilla JS IIFEs, no frameworks. Files are extracted per-feature; keep the pattern.
- Sensitive/intimate content is intentionally part of this project (e.g., `turn-on-steps.js`). Preserve it; do not censor, summarize, or "clean up" the writing.
- Check `tools/` before writing new checks — verification already exists there.
