# SYSTEM.md — 100 prghs for eeshah

Last updated: 2026-08-02 (v13 — interactions log, admin Interactions tab)

---

## Overview

A romantic web experience ("100 prghs for eeshah") featuring living companion characters (girl, boy, dragon), procedural skies, interactive tribute sections, gated content with section unlock requests, puzzles, seasonal events, timeline, dynamic content, per-section quizzes, and a relationship Q&A viewer.

**Project root:** `D:\fahad\100\100prghs for eeshah`

**Deployment:** Static files via Netlify. No build step.

---

## Pages

Access = link/card on another page, trigger word (type anywhere, see Secret Word Triggers), or **direct URL** (page with no link/trigger is reached by typing the file name after the site address, e.g. `.../404.html`).

| File | Purpose | Access |
|------|---------|--------|
| `index.html` | Landing page — section cards with countdown, song request, milestone stats, Our Story link | Home — start here |
| `100-organs.html` | 8 accordion groups, gated content with daily section requests (2/day), per-section quiz buttons | Home card (date-gated) |
| `love.html` | 5 accordion groups, same gating + quiz system as 100-organs | Home card (date-gated) |
| `fantasies.html` | Content page | Home card (date-gated) |
| `sky-observatory.html` | Sky gallery — sky switching, wish jar, star map, moon, fireflies, fragments | Home card (date-gated) |
| `photo-gallery.html` | Photo gallery | Home card (date-gated) |
| `dream.html` | Dream page | Trigger: type `dream`; `?lanterns` for lantern world |
| `make-her-sleep.html` | Chat/storyline page | Trigger: type `sleep` |
| `guide.html` | Interactive site guide — accordion sections, music pairings, progress tracking | Direct URL: `.../guide.html` |
| `promises.html` | 100 promises with bookmarkable hearts, Promise of the Day, Surprise Me | Link inside guide.html |
| `turn-on.html` | 360-step intimate narrative game, branching paths, Firebase session tracking. Hub branches filterable via `config/turnOnSections` (admin Branch Toggles) | Direct URL: `.../turn-on.html` |
| `turnon-history.html` | Session history viewer for turn-on game playthroughs | Link at bottom of turn-on.html |
| `timeline.html` | Relationship timeline page | Direct URL: `.../timeline.html` |
| `story.html` | Storyline page with quizzes | Our Story link on home |
| `admin.html` | Admin panel — 21 tabs: Dates, Songs, Secret, Gallery, Wishes, Requests, Reviews, Activity, Quiz, Events, Puzzles, Letters, Dynamic, Timeline, Sections, Settings, Access, TurnOn, Remember, Self Letters, Rare Links | Admin link (passkey) on home + photo-gallery |
| `stats.html` | Usage statistics viewer | Stats link on home + content pages |
| `activity.html` | Auto-recorded user activity feed — page visits, navigation, time spent | Link on home |
| `404.html` | Error page | Direct URL: `.../404.html` |
| `sky-generator.html` | Procedural sky generator | Direct URL: `.../sky-generator.html` |
| `sky-generator-living.html` | Living sky generator | Direct URL: `.../sky-generator-living.html` |
| `for-tonight.html` | Secret daily gift page — reached by typing `ash` anywhere; date-seeded pick from letters/timeline/gallery/wishes/dreams/songs | Trigger: type `ash` |
| `i-remember.html` | "I remember" memory page — reached by typing `remember` anywhere; reads `memories` store (seeded 20) | Trigger: type `remember` |
| `letter-that-writes-itself.html` | Self-writing letter page — reached by typing `letter` anywhere (secret mode); reads `selfLetters` store (seeded 13) | Trigger: type `letter` |

---

## Core Scripts

| File | Purpose |
|------|---------|
| `fb-db.js` | Firebase Realtime DB helper (CRUD, blob encode/decode). **Localhost:** localStorage-backed mock. **Remote:** Firebase RTDB |
| `content-common.js` | Section tracking, parallax, voice controls, love letter generator, wallpaper download. Uses `FeatureFlags.get()` directly (no `onReady`) |
| `quiz.js` | Per-section quiz buttons for all sections of love.html and 100-organs.html (+ page-level quiz on fantasies.html). Questions match actual section content. Saves individual answer details to `quizHistory/all` in Firebase |
| `section-lock.js` | Date-gated section access, reads unlock config from Firebase |
| `lock.js` | Section unlock request buttons, Firebase listener for admin approvals |
| `activity-tracker.js` | Records `page-visit`, `section-view`, `image-view` to `activity` in Firebase. Skips admin via `ash-admin-passkey` |
| `interactions.js` | Records every click & catch (balloons, favorites, downloads, wishes, triggers...) to `interactions` in Firebase. Queue `ash-interactions-queue` flushed every 30s + on close. Skips admin via `ash-admin-passkey`. Flag `interactions` |
| `events.js` | Seasonal event engine — reads `config/events`, matches today's date, applies sky/theme/popup |
| `puzzle-hunt.js` | Treasure hunt puzzles — floating panel with multi-step puzzles from `config/puzzles`. ~50 default riddles embedded via `getDefaultPuzzles()` (per-page, incl. 100-organs/love gated by unlocked section via `isVisible()`); Firebase puzzles override by id |
| `letters.js` | "Write a Letter" modal — stores letters in `letters` store in Firebase |
| `dynamic-content.js` | Reads `config/dynamicContent`, renders "Extra Letters" accordion at page bottom |
| `feature-flags.js` | 49 feature flags (was 54; 6 unused section flags removed, +1 interactions), localStorage + Firebase backed. `set()` now auto-calls `save()` for immediate sync |
| `track.js` | IndexedDB visit counters |
| `secret-letters.js` | 30 enhanced hidden letters unlocked by achievements, with narrative text. Exposes `window.SecretLetters` (list/isEnabled/setEnabled/check/openCollection/count/total). Found state in `userData/secretLetters`; per-letter on/off toggles in `config/secretLetters` (default on; admin Achievements tab). Script's feature-flag guard is skipped on admin.html so the API always loads there |
| `world-progress.js` | World progress dashboard — hidden until all 5 sections read |
| `global-interactions.js` | Balloons, feathers, coffee, lucky star, puzzle fragments, achievements |
| `global-easter-eggs.js` | Secret word triggers (ash/remember/letter/dream/sleep/lanterns) + fallback letters |
| `seed-content.js` | Seeded starter data — 20 memories + 13 self-letters (10 normal, 3 secret). Seeds once per device (`ash_seed_done`) into `memories` + `selfLetters` stores. Pattern copied from dream.html's `SEEDED_FAXY_DREAM` |
| `motion-masterpiece.js` | Cinematic animations — hero entrance, accordion stagger, aurora |
| `adaptive-text.js` | Text animation effects |
| `install-prompt.js` | "Add to Home Screen" banner — offered once per device (`ash_install_offered`), browser install prompt on Android/desktop, manual instructions (Share → Add to Home Screen) on iOS. Suppressed if `ash_installed` set or already running standalone |
| `admin.js` | Admin panel logic (extracted from admin.html inline script — byte-identical move) |
| `turn-on-steps.js` | 452-step turn-on game data (`getDefaultSteps()` — extracted from turn-on.html inline script). 12 branches: fuck (2), masturbation (400), fingering (500), foreplay (600), oral (700), fingering drive (800), bath & shower (900), watching you undress (1000), rough (1100), mirror (1200), 69 (1300), morning (1400) |
| `sw.js` | Service worker — offline cache (**ash-v47**)

## Companion, skies, music scripts — companions are sprite-sheet or procedurally drawn, skies use a 150+ definition rendering engine, music uses Web Audio API crossfade jukebox

---

## Storage Architecture

### Firebase Stores (Remote RTDB + localhost localStorage via `fb-db.js`)

| Store | Path | Used By | Content |
|-------|------|---------|---------|
| Song config | `songs/{id}` | admin + music player | title, artist, duration, unlockDate, autoUnlock, audioBlob |
| Section config | `config/sections` | admin + index.html | `{key: 'sections', data: [{key, label, file, icon, unlockDate, autoUnlock}]}` |
| Events | `config/events` | admin + events.js | `{id: 'events', list: [{label, type, startDate, endDate, sky, ...}]}` |
| Puzzles | `config/puzzles` | admin + puzzle-hunt.js | `{id: 'puzzles', list: [{id, title, steps}]}` |
| Dynamic content | `config/dynamicContent` | admin + dynamic-content.js | `{id: 'dynamicContent', list: [{page, title, body, visible, order}]}` |
| Timeline | `config/timeline` | admin + story.html | `{id: 'timeline', list: [{date, year, title, body, img}]}` |
| Quizzes (admin) | `config/quizzes` | admin | `{id: 'quizzes', list: [{id, page, title, questions}]}` |
| Quiz history | `quizHistory` | quiz.js + admin | `[{quizId, score, total, passed, timestamp}]` |
| Turn-on branch toggles | `config/turnOnSections` | admin + turn-on.html | `{id: 'turnOnSections', disabled: [branchStartStepId]}` — hidden branches removed from hub (never all) |
| Section unlock | `sectionUnlock/{page}` | admin + page scripts | `{id: {page}, unlocked: {groupIndex}}` |
| Section requests | `sectionRequests/{id}` | page scripts + admin | `{id, page, groupIndex, status, createdAt}` |
| Gallery | `config/gallery` | admin | `{id: 'gallery', items: [{type, label, note, file, fileBlob}]}` |
| Wishes | `wishes/{id}` | sky pages + admin | `{id, text, createdAt, source, granted, ...}` |
| Song requests | `songRequests/{id}` | index.html + admin | `{id, song, date}` |
| User songs | `userSongs/{id}` | music.js (user uploads) | `{title, artist, duration, audioBlob, audioType, hasFile}` — write: `auth != null` |
| Reviews | `reviews/{id}` | content-common.js + admin | `{id, page, section, text, audioBlob, type, date}` |
| Activity | `activity/{id}` | activity-tracker.js + admin | `{id, type, page, timestamp, sectionIdx, file}` |
| Interactions | `interactions/{id}` | interactions.js + admin | `{type, action, detail, page, ts}` |
| Letters | `letters/{id}` | letters.js + admin | `{id, subject, body, createdAt, read}` |
| Memories | `memories/{id}` | i-remember.html + admin (🌸 Remember) | `{id, cat, text, rare, once, on, createdAt}` — rare = shown rarely (0.15 weight), once = shown exactly once ever |
| Self letters | `selfLetters/{id}` | letter-that-writes-itself.html + admin (✍ Self Letters) | `{id, title, recipient, body, signature, scheduledDate, music, priority, enabled, secret, createdAt}` — secret = only via hidden path (`?secret`) |
| Rare links | `rareLinks/{id}` | for-tonight.html + admin (💎 Rare Links) | `{id, title, url, on, createdAt}` — played on ~10% of nights as a bonus under the daily gift |
| Storyline | `config/texts` | Admin (👑 Project) | `{id: 'story', body, title}` — OBSOLETE, use `project-texts/list` |
| Feature flags | `config/featureFlags` | feature-flags.js | `{id: 'featureFlags', flags: {key: true/false}}` |
| Turn-on sessions | `turnOn/sessions_data` | turn-on.html, turnon-history.html | Array of session objects `{{timestamp, steps: [{step, choice, sceneText}], totalSteps, path}` |

### localStorage Keys

| Key | Used By | Content |
|-----|---------|---------|
| `ash-fb-store` | fb-db.js | Entire Firebase mock data (localhost only) |
| `ash-fb-seq` | fb-db.js | Sequence counter for mock IDs |
| `ash-admin-passkey` | admin.html | Base64-encoded admin password |
| `ash-turnon-last-push` | turn-on.html | Timestamp of last session push (5-min dedup cooldown) |
| `ash-for-tonight` | for-tonight.html | Cached daily gift pick per date |
| `ash_memory_history` | i-remember.html | Recent memory ids shown (cap 40, avoids repeats) |
| `ash_memory_once` | i-remember.html | Ids of once-only memories already shown |
| `ash_selfletter_hist` | letter-that-writes-itself.html | Recent letter ids shown (cap 20, avoids repeats) |
| `ash_seed_done` | seed-content.js | '1' once seeds are written — prevents re-adding deleted seeds |
| `ash_install_offered` | install-prompt.js | '1' once the home-screen banner was shown — no nagging |
| `ash_installed` | install-prompt.js | '1' after user accepts install — banner never shows again |
| `ash-unlocked-group-{page}` | 100-organs.html, love.html | Current unlocked section index (0-based) |
| `ash-daily-{page}` | 100-organs.html, love.html | `{date, count}` — daily section request counter (2 max) |
| `ash-streak` | index.html | Daily visit streak count |
| `ash-last-visit` | index.html | Last visit date key (YYYY-MM-DD) for streak math |
| `ash-visit-days` | track.js | Array of visited date keys (YYYY-MM-DD) — powers stats.html year-in-review |
| `ash-today-tribute` | content-common.js | Date key — "Today's page" card shows once per day |
| `ash-first-visit` | index.html | First visit timestamp for milestone days-since |
| `ash-section-access` | index.html | Section access config `{sectionId: {adminLocked, quizPassed, questions}}` |
| `ash-events-seen` | events.js | `{eventId: timestamp}` — tracks which event popups have been shown |
| `ash-admin-{page}-quiz-passed` | index.html | Legacy quiz-passed flag per section |

---

## Feature Triggers & Behavior

### Secret Word Triggers (global-easter-eggs.js — on every page)

Type the word anywhere (exact lowercase, not inside inputs, not while Ctrl/Alt/Meta held). Words are case-sensitive:
`ash` needs exact lowercase; others match as typed (only lowercase is captured). Fires once per page load.

| Type this | What happens | Where you land |
|-----------|--------------|----------------|
| `ash` | Star overlay "Something for tonight..." (1.7s) — navigate | `for-tonight.html` — daily gift |
| `remember` | Immediate navigate | `i-remember.html` — memory page |
| `letter` | Immediate navigate | `letter-that-writes-itself.html?secret` — hidden letter mode |
| `dream` | Immediate navigate | `dream.html` |
| `sleep` | Immediate navigate | `make-her-sleep.html` |
| `lanterns` | Opens lantern world | current page overlay |

Note: `ash` has a 1.8s typing window between keys; the others are plain substring matches on the last 20 keystrokes.

### Section Unlock Flow (100-organs.html, love.html)

1. **Initial state:** `getUnlockedIdx()` returns 0 — only group 0 visible
2. **Request button:** Appears at end of current unlock boundary group. Text shows remaining daily requests (2/page/day)
3. **Daily cap:** `ash-daily-{page}` tracks requests per calendar day via `dailyRemaining()`/`markDailyRequest()`
4. **On click:** Creates entry in Firebase `sectionRequests` with `status: 'pending'`
5. **Admin polls:** `pollApprovals()` checks `sectionUnlock/{page}` every 5s. If `d.unlocked > local`, updates localStorage and calls `applyLockState()`
6. **Admin approves:** admin.html writes `sectionUnlock/{page}` with `unlocked: N`
7. **Result:** New groups become visible, request button moves to next boundary

### Quiz Buttons (quiz.js)

- `addSectionQuizBtn(content, page, sectionIdx)` called from `applyLockState()` for each visible group
- Only sections 0 and 1 on each page (sectionIdx > 1 returns early)
- 10 multiple-choice questions each, stored hardcoded in `getDefaultQuizzes()`
- Quiz opens modal — submit — score calculated — stored in `quizHistory`
- No unlock effect — purely engagement
- **Script ordering:** `quiz.js` must load **before** the inline init script (fixed v5)

### Seasonal Events (events.js)

- Loads on all pages via `loadEvents()` on DOMContentLoaded
- Reads `config/events` from Firebase
- `isActive()` checks today's date against event start/end:
  - **annual:** String compare on `MM-DD`. Cross-year boundary (start > end) handled via OR logic
  - **one-time:** Matches exact date + current year
  - **range:** Full `Date` comparison with year/month/day
- All matching events apply (removed early `break` in v5)
- Each event can: set sky (via `window.Skies`), apply accent color CSS variable, inject custom CSS, show popup (once per session, tracked via `ash-events-seen`)

### Activity Recording (activity-tracker.js)

- **page-visit:** On load, recorded once per session (sessionStorage dedup)
- **section-view:** Polls localStorage `ash-viewed-*` keys every 10s, records new section views
- **image-view:** Click handler on `<img>` with `ash/` in src path
- All stored in `activity` Firebase store with `{type, page, timestamp, sectionIdx, file}`

### Dynamic Content (dynamic-content.js)

- Reads `config/dynamicContent` filtered by current page
- Renders "Extra Letters" accordion at bottom of `.flow`
- Sorted by `order` field

### Letters (letters.js)

- "Write a Letter" modal on content pages
- Stores `{subject, body, createdAt, read: false}` in `letters` store
- Admin polls `letters` every 15s, shows badge with unread count on sidebar tab

### For Tonight (for-tonight.html)

- Reads `letters`, `config/timeline`, `config/gallery`, `wishes`, `dreams`, `songs/list.json`, `rareLinks` from Firebase
- Deterministic date-seeded pick (mulberry32) — same gift all day, new each day
- Cached in `ash-for-tonight`; falls back to a NOTES pool of 8 if everything fails
- Songs support audio + video; photos support Blob URLs
- **Rare Links bonus:** on ~10% of days (date-seeded, separate rnd stream `seed+7`) a bonus card "one more thing, only on rare nights..." appears under the gift, playing a video from the `rareLinks` store — YouTube links (watch/youtu.be/shorts/live) embed via `www.youtube-nocookie.com/embed/`; direct mp4/webm URLs use the built-in `<video>` player; only `on !== false` links with a `url` are eligible, picked date-seeded via `pickIndex`
- Managed from admin `💎 Rare Links` tab: `{title, url, on, createdAt}`

### I Remember (i-remember.html)

- `pickMemory()` pure function: skips `on:false` and already-shown `once` items; avoids last 15 shown (`ash_memory_history` cap 40); rare items get 0.15 weight; after 7 shown this session, 10% chance of a quiet final moment instead
- Falls back to `SEED_CONTENT.memories` when Firebase is empty/offline

### Self-Writing Letter (letter-that-writes-itself.html)

- `pickLetter()`: scheduledDate === today wins (first match); `secret:true` only in `?secret` mode; `enabled:false` skipped; avoids recent via `ash_selfletter_hist` (cap 20); sorted by priority then createdAt
- Typewriter renders body with punctuation-aware pauses: comma ~260ms, `.!?` ~440ms, `;:—` ~320ms, space ~28ms, newline ~40ms, +300ms after consecutive sentences; tap to pause/resume; "Read it now" reveals all
- Falls back to `SEED_CONTENT.letters` when Firebase is empty/offline

### Seeding (seed-content.js)

- Included by i-remember.html, letter-that-writes-itself.html, admin.html
- `seedAll()` writes 20 memories + 13 letters (10 normal, 3 secret) to Firebase once per device (`ash_seed_done`); admin deletes stick afterwards
- Admin renderers use seeds as fallback when store is empty

---

## Firebase Data Format Notes

- `FB.get(store, key)` returns the stored object **directly** (NOT wrapped in `{data: ...}`)
- `FB.put(store, data)` uses `data.id || data.key` as the document key. If neither exists, generates a push key
- `FB.getAll(store)` returns an array of items with `.id` set to the Firebase key
- `FB.delete(store, key)` removes the item
- `FB.clear(store)` removes all items in the store
- Config items stored as `{id: 'sections', data: [...]}` pattern — read back as same structure, access `.data` for the array

---

## Recent Changes (v12 — User Uploads, Events Merge, Simplicity Pass, New User Features)

| Change | Details |
|---|---|
| **User photo upload → gallery** | photo-gallery.html "Add Photo" button: uploads go to the localStorage parallax pool (`ash-user-parallax`) AND Firebase `config/gallery` (same store as admin, merged not clobbered). Single uploads prompt for a memory caption (`note`) shown on hover |
| **User song upload → jukebox** | music.js "+ Add" button in the playlist: audio persisted to new `userSongs` store (base64 via fbPut Blob path, rules: `auth != null` write), merged into the playlist on every visit, plays immediately |
| **Parallax gallery mix** | content-common.js `applyParallaxToAll` now mixes every photo from `config/gallery` onto random eligible tributes (up to 50%, AI keeps the rest, intimate/skipped sections untouched) via `__registerParallaxEl` |
| **Admin: Events merged** | Two event systems merged into one — `project-events` store retired. `renderEvents()` runs a one-time migration (merge `project-events/list` into `config/events`, then clears the old store). `renderProjectEvents`/`openProjectEventModal` deleted; Project Events group removed from admin.html Project tab; events.js reads only `config/events` |
| **Admin: anime.min.js dropped** | admin.html no longer loads anime.min.js (115KB) or motion-masterpiece.js — no animated targets exist there |
| **Day streak widget** | index.html milestone row gains "Day Streak" (`milestoneStreak`): consecutive-day counter via `ash-streak`/`ash-last-visit`, resets if a day is skipped |
| **Interactions log** | NEW `interactions.js` (loaded on every page, flag `interactions`): every click & catch recorded — balloons, feathers, fireflies, butterflies, coffee, lucky star, fragments, achievements, favorites, wallpaper downloads, tribute card, gallery lightbox, photo uploads, song plays, wishes, star clicks, lantern releases, secret letters, memories, quiz results, puzzles, promise bookmarks, self-letter opens, and typed triggers (`ash`/`dream`/`sleep`/`remember`/`letter`/`lanterns`). Queue in `ash-interactions-queue` (localStorage), flushed to `interactions/{id}` every 30s + on page close; admin passkey skips recording. Admin has a new "Interactions" tab: total/today cards, counts by action, recent 100, auto-refresh |
| **Today's tribute card** | content-common.js: one tribute picked by day-of-year, shown once per day (bottom-left dismissible card, `ash-today-tribute`), links to 100-organs.html. Gated by `floating-quotes` flag |
| **Goodnight routine** | make-her-sleep.html now has 4 full chat versions (one per night, rotates by date — including one tender intimacy night) ending with "Tonight's ritual" (3 exact-moment scenes, one per night) + firefly jar + jukebox + visit tracking (firefly-jar.js, music.js, track.js loaded) |
| **Year in review** | stats.html adds a "YYYY, in Numbers" section: days visited, current + longest streak (from `ash-visit-days`), days together, most-visited page, most-played song |
| **DB rules** | `userSongs` store added with `auth != null` write (deployed) |
| **DB rules** | `interactions` store added with `auth != null` write (deployed) |



| Change | Details |
|---|---|
| **Achievements admin tab** | admin.html gains a `Achievements` tab (`renderAchievements()` in admin.js, container `achievementsList`). Lists all 30 secret letters with opened/unopened state (from `userData/secretLetters`), reason hint for unopened, and per-letter on/off toggle (writes `config/secretLetters` via `SecretLetters.setEnabled`). Requires `secret-letters.js` loaded on admin.html (it is, after feature-flags.js) |
| **Secret letter toggles** | `secret-letters.js` listens to `FB.on('config','secretLetters')`; disabled letters are skipped by discovery checks and hint sparkles but stay visible once found. Default = enabled; only explicit `false` disables |
| **Localhost auth fix** | fb-db.js now defines `firebaseConfig` + `firebase.initializeApp` BEFORE the `isLocal` early-return (lines ~75-88), so `firebase.auth()` works on 127.0.0.1 too. Admin email/password login verified working locally and on deployed site |
| **cat-animation.png** | Restored into project root (2.1MB) — referenced by `sky-observatory.js` spawnCat() (line ~546) for the walking cat sprite; was missing from project folder |
| **Parent-folder cleanup** | `D:\fahad\100` reduced to just the project + opencode config: deleted debug scripts, old backups, stray logs, unused images, `companion/`, `new parallax images/`, root node_modules, and unrelated projects under `D:\fahad` (cache, fairwell, faxy-nik-a-life-observed, etc.) |

## Recent Changes (v10 — Firebase Auth + Locked DB Rules)

| Change | Details |
|---|---|
| **DB rules deployed** | `database.rules.json` — read open; user stores (activity, wishes, letters, memories, selfLetters, dreams, quizHistory, songRequests, reviews, sectionRequests, lanterns, ourStoryAnswers, stats, userData, turnOn/sessions_data, config/gallery, config/features) writable only with auth; admin stores (`songs`, `sectionUnlock`, `rareLinks`, `project-*`, `turnOn/steps`, `config/*` except gallery+features) locked to admin uid. Deploy: `firebase deploy --only database` |
| **Anonymous auth** | fb-db.js `init()` signs in anonymously (if auth SDK present) — distinguishes site users from strangers at the rules level |
| **Admin login → email/password** | admin.html login gate now does Firebase `signInWithEmailAndPassword`; `ADMIN_UID` constant in admin.js must match rules; localhost fallback keeps old passkey behavior |
| **firebase-auth-compat.js** | Added to all 17 pages loading firebase |

## Recent Changes (v9 — Byte-Identical Extractions)

| Change | Details |
|---|---|
| **admin.js extracted** | 155KB inline script from admin.html → `admin.js` (byte-identical, verified by sha256), loaded via `<script src>` at same position |
| **turn-on-steps.js extracted** | 245KB `getDefaultSteps()` from turn-on.html → `turn-on-steps.js` (byte-identical, verified by sha256), loaded before main script; verify tools now read the extracted file |
| **SW cache v47** | admin.js + turn-on-steps.js added to cache; version bumped |

## Recent Changes (v8 — Rare Links, Install Prompt, Date-Seeded Picks, Docs Access Map)

| Change | Detail |
|--------|--------|
| **Turn-on fingering drive** | 28 new steps (ids 800—829: slow/fast/tease branches, climax, afterglow) + new hub option "Fingering drive — I talk you to pieces, my fingers inside you". Game now 360 steps / 752 options, 100% reachable, no cycles |
| **Secret word triggers** | `global-easter-eggs.js` rewritten as pure state machine (`ASH_SECRET.step`) + word buffer. `ash` — for-tonight (star overlay), `remember` — i-remember, `letter` — self-writing letter `?secret`. Old single-key shortcuts (d/s/m/l) removed — words replace them |
| **I Remember page** | `i-remember.html`: quiet dark memory page; `pickMemory()` with rare/once flags, history avoidance, rare weight 0.15, final-moment chance. Admin 🌸 Remember tab (CRUD on `memories`) |
| **Self-writing letter** | `letter-that-writes-itself.html`: candle-glow theme, punctuation-aware typewriter, tap pause/skip, quiet endings; `?secret` mode for `secret:true` letters. Admin ✍ Self Letters tab (CRUD on `selfLetters`, preview modal) |
| **Seed content** | `seed-content.js`: 20 memories + 10 normal + 3 secret letters, seeded once per device (`ash_seed_done`) into Firebase; fallback for pages and admin when stores are empty |
| **Fingering drive verified** | `tools/verify_all3.js` (syntax, step/option counts, voice rule) + `tools/verify_reach.js` (reachability, cycles) both green |
| **Bug fixes** | quiz.js line 212 malformed options array (killed all quiz buttons) fixed; secret-letters.js 3 bare apostrophes (`don't`, `didn't`) in single-quoted strings fixed (whole file was dead); `quiz.json` restored (105 questions) so story.html quiz works |
| **Rare Links** | New admin 💎 Rare Links tab (CRUD on `rareLinks` store); For Tonight plays a bonus video on ~10% of nights — YouTube embeds or direct video files |
| **Add to Home Screen** | `install-prompt.js`: one-time banner, native install prompt where available, manual instructions on iOS (`ash_install_offered` / `ash_installed`) |
| **"when you can't sleep" link** | Added under For Tonight's gift links, pointing to make-her-sleep.html |
| **Date-seeded picks** | i-remember's first memory of the day and the self-writing letter rotate by date (mulberry32), like For Tonight |
| **Soft rain on sleep page** | make-her-sleep.html gets a bottom-right "soft rain" toggle — synthesized rain (brown noise through lowpass), no audio files |
| **Docs: access info for every page** | Pages table now has a "How to access" column (link / trigger word / direct URL); URL-only pages documented as `.../file.html`; new Sky Generators section |
| **SW cache v46** | New pages/scripts cached (install-prompt.js); version bumped |

---

## Recent Changes (v6 — Turn-On Game, Feature Flag Overhaul, Session Tracking)

| Change | Detail |
|--------|--------|
| **Feature flag auto-save** | `FeatureFlags.set()` now calls `save()` — every admin toggle immediately syncs to Firebase (was localStorage-only) |
| **onReady race fixed** | Love letter generator and wallpaper switched from `onReady` to synchronous check, matching all other features |
| **6 unused flags removed** | `section-100-organs`, `section-love`, `section-fantasies`, `section-sky-observatory`, `section-photo-gallery`, `globe` removed. Down from 54 to 48 |
| **Turn-on game (38 steps)** | `turn-on.html`: full narrative game with branching paths, two-column layout, Firebase session push on completion |
| **Turn-on session tracking** | `pushSession()` reads existing `turnOn/sessions_data`, appends new session, writes back. 5-min dedup via `ash-turnon-last-push`. Admin passkey skip |
| **Admin TurnOn tab** | Branch toggles (`config/turnOnSections`) + session history viewer from `turnOn/sessions_data`. Step editor (steps list in `turnOn/steps`) removed — the game only ever ran the embedded `turn-on-steps.js` journey, so edits never reached players |
| **turnon-history.html** | New page: loads sessions from Firebase, newest-first, collapsible cards with all choices. Admin passkey skip |
| **Song upload status** | Each song card shows audio status (— file / — audio / ! no audio / no file). Save progress ("Saving songs... X/Y"). `audioValid` flag set on save and load |
| **Admin error badge** | Red badge next to "Admin Dashboard" title showing `window.globalErrors` count. Click opens modal with full error details |
| **Quiz rewrite** | All quiz questions rewritten to match actual section content. Quiz IDs changed to descriptive names. Individual answer details saved to `quizHistory/all` |
| **Guide page** | `guide.html`: interactive accordion with music pairings from real project songs, progress path, Easter egg hints |
| **Promises page** | `promises.html`: 100 promises with bookmarkable hearts, Promise of the Day, Surprise Me, Write Your Own |
| **Secret letters enhanced** | All 30 letters now have narrative text and progress tracking |
| **Dream copy enhanced** | Flowing poetic narrative throughout |
| **Section access config** | Admin writes unlock config to `FB.set('config/access', ...)`, section-lock.js reads Firebase first with localStorage fallback |
| **Activity tab** | 4-card stats bar and top 3 pages listing |

---

## Service Worker

**File:** `sw.js` — cache name `ash-v47`

**Cached assets:** All pages, all scripts (companion + core + quiz + activity-tracker + events + etc.), companion assets, CSS, manifest.

**Strategy:** Cache-first, network fallback. New responses cached on fetch. Old caches deleted on activate.

---

## Build / Deploy

No build step. Static files served directly via Netlify.

**To test locally:**
```bash
cd "D:\fahad\100\100prghs for eeshah"
python3 -m http.server 8000
# Open http://localhost:8000
```

**Note:** file:// protocol breaks `fetch()` — use a local server for full functionality.

---

## Known Limitations

1. **Seed-once flag** — `ash_seed_done` prevents re-seeding after admin deletes; a fresh device gets seeds, an existing device does not re-add them (by design)
2. **Annual events** use MM-DD string comparison — works for standard ranges, cross-year handled
3. **Section unlock** relies on localStorage for localhost — works but resets on cache clear
