# SYSTEM.md — 100 prghs for eeshah

Last updated: 2026-07-31 (v6 — turn-on game, feature flag overhaul, session tracking, song status)

---

## Overview

A romantic web experience ("100 prghs for eeshah") featuring living companion characters (girl, boy, dragon), procedural skies, interactive tribute sections, gated content with section unlock requests, puzzles, seasonal events, timeline, dynamic content, per-section quizzes, and a relationship Q&A viewer.

**Project root:** `D:\fahad\100\100prghs for eeshah`

**Deployment:** Static files via Netlify. No build step.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page — section cards with countdown, song request, milestone stats, Our Story link |
| `100-organs.html` | 8 accordion groups, gated content with daily section requests (2/day), per-section quiz buttons |
| `love.html` | 5 accordion groups, same gating + quiz system as 100-organs |
| `fantasies.html` | Content page |
| `sky-observatory.html` | Sky gallery — sky switching, wish jar, star map, moon, fireflies, fragments |
| `photo-gallery.html` | Photo gallery |
| `dream.html` | Dream page |
| `make-her-sleep.html` | Chat/storyline page |
| `guide.html` | Interactive site guide — accordion sections, music pairings, progress tracking |
| `promises.html` | 100 promises with bookmarkable hearts, Promise of the Day, Surprise Me |
| `turn-on.html` | 38-step intimate narrative game, branching paths, Firebase session tracking |
| `turnon-history.html` | Session history viewer for turn-on game playthroughs |
| `timeline.html` | Relationship timeline page |
| `story.html` | Storyline page with quizzes |
| `admin.html` | Admin panel — 18 tabs: Dates, Songs, Secret, Gallery, Wishes, Requests, Reviews, Activity, Quiz, Events, Puzzles, Letters, Dynamic, Timeline, Sections, Settings, Access, TurnOn |
| `stats.html` | Usage statistics viewer |
| `activity.html` | Auto-recorded user activity feed — page visits, navigation, time spent |
| `404.html` | Error page |
| `cold-restart.html` | Clears all `ash-*` localStorage keys |
| `sky-generator.html` | Procedural sky generator |
| `sky-generator-living.html` | Living sky generator |

---

## Core Scripts

| File | Purpose |
|------|---------|
| `fb-db.js` | Firebase Realtime DB helper (CRUD, blob encode/decode). **Localhost:** localStorage-backed mock. **Remote:** Firebase RTDB |
| `content-common.js` | Section tracking, parallax, voice controls, love letter generator, wallpaper download. Uses `FeatureFlags.get()` directly (no `onReady`) |
| `quiz.js` | Per-section quiz buttons for all sections of love.html and 100-organs.html. Questions now match actual section content. Saves individual answer details to `quizHistory/all` in Firebase |
| `section-lock.js` | Date-gated section access, reads unlock config from Firebase |
| `lock.js` | Section unlock request buttons, Firebase listener for admin approvals |
| `activity-tracker.js` | Records `page-visit`, `section-view`, `image-view` to `activity` in Firebase. Skips admin via `ash-admin-passkey` |
| `events.js` | Seasonal event engine — reads `config/events`, matches today's date, applies sky/theme/popup |
| `puzzle-hunt.js` | Treasure hunt puzzles — floating panel with multi-step puzzles from `config/puzzles` |
| `letters.js` | "Write a Letter" modal — stores letters in `letters` store in Firebase |
| `dynamic-content.js` | Reads `config/dynamicContent`, renders "Extra Letters" accordion at page bottom |
| `feature-flags.js` | 48 feature flags (was 54), localStorage + Firebase backed. `set()` now auto-calls `save()` for immediate sync. 6 unused section flags removed |
| `track.js` | IndexedDB visit counters |
| `secret-letters.js` | 30 enhanced hidden letters unlocked by achievements, with narrative text |
| `world-progress.js` | World progress dashboard — hidden until all 5 sections read |
| `global-interactions.js` | Balloons, feathers, coffee, lucky star, puzzle fragments, achievements |
| `global-easter-eggs.js` | Keyboard shortcuts (dream, sleep, matrix, lanterns) |
| `motion-masterpiece.js` | Cinematic animations — hero entrance, accordion stagger, aurora |
| `adaptive-text.js` | Text animation effects |
| `sw.js` | Service worker — offline cache (**ash-v36**)

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
| Section unlock | `sectionUnlock/{page}` | admin + page scripts | `{id: {page}, unlocked: {groupIndex}}` |
| Section requests | `sectionRequests/{id}` | page scripts + admin | `{id, page, groupIndex, status, createdAt}` |
| Gallery | `config/gallery` | admin | `{id: 'gallery', items: [{type, label, note, file, fileBlob}]}` |
| Wishes | `wishes/{id}` | sky pages + admin | `{id, text, createdAt, source, granted, ...}` |
| Song requests | `songRequests/{id}` | index.html + admin | `{id, song, date}` |
| Reviews | `reviews/{id}` | content-common.js + admin | `{id, page, section, text, audioBlob, type, date}` |
| Activity | `activity/{id}` | activity-tracker.js + admin | `{id, type, page, timestamp, sectionIdx, file}` |
| Letters | `letters/{id}` | letters.js + admin | `{id, subject, body, createdAt, read}` |
| Storyline | `config/texts` | Admin (💎 Project) | `{id: 'story', body, title}` — OBSOLETE, use `project-texts/list` |
| Feature flags | `config/featureFlags` | feature-flags.js | `{id: 'featureFlags', flags: {key: true/false}}` |
| Turn-on sessions | `turnOn/sessions_data` | turn-on.html, turnon-history.html | Array of session objects `{{timestamp, steps: [{step, choice, sceneText}], totalSteps, path}` |

### localStorage Keys

| Key | Used By | Content |
|-----|---------|---------|
| `ash-fb-store` | fb-db.js | Entire Firebase mock data (localhost only) |
| `ash-fb-seq` | fb-db.js | Sequence counter for mock IDs |
| `ash-admin-passkey` | admin.html | Base64-encoded admin password |
| `ash-turnon-last-push` | turn-on.html | Timestamp of last session push (5-min dedup cooldown) |
| `ash-unlocked-group-{page}` | 100-organs.html, love.html | Current unlocked section index (0-based) |
| `ash-daily-{page}` | 100-organs.html, love.html | `{date, count}` — daily section request counter (2 max) |
| `ash-streak` | content-common.js | Daily visit streak count |
| `ash-first-visit` | index.html | First visit timestamp for milestone days-since |
| `ash-section-access` | index.html | Section access config `{sectionId: {adminLocked, quizPassed, questions}}` |
| `ash-events-seen` | events.js | `{eventId: timestamp}` — tracks which event popups have been shown |
| `ash-admin-{page}-quiz-passed` | index.html | Legacy quiz-passed flag per section |

---

## Feature Triggers & Behavior

### Section Unlock Flow (100-organs.html, love.html)

1. **Initial state:** `getUnlockedIdx()` returns 0 → only group 0 visible
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
- Quiz opens modal → submit → score calculated → stored in `quizHistory`
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

---

## Firebase Data Format Notes

- `FB.get(store, key)` returns the stored object **directly** (NOT wrapped in `{data: ...}`)
- `FB.put(store, data)` uses `data.id || data.key` as the document key. If neither exists, generates a push key
- `FB.getAll(store)` returns an array of items with `.id` set to the Firebase key
- `FB.delete(store, key)` removes the item
- `FB.clear(store)` removes all items in the store
- Config items stored as `{id: 'sections', data: [...]}` pattern → read back as same structure, access `.data` for the array

---

## Recent Changes (v6 — Turn-On Game, Feature Flag Overhaul, Session Tracking)

| Change | Detail |
|--------|--------|
| **Feature flag auto-save** | `FeatureFlags.set()` now calls `save()` — every admin toggle immediately syncs to Firebase (was localStorage-only) |
| **onReady race fixed** | Love letter generator and wallpaper switched from `onReady` to synchronous check, matching all other features |
| **6 unused flags removed** | `section-100-organs`, `section-love`, `section-fantasies`, `section-sky-observatory`, `section-photo-gallery`, `globe` removed. Down from 54 to 48 |
| **Turn-on game (38 steps)** | `turn-on.html`: full narrative game with branching paths, two-column layout, Firebase session push on completion |
| **Turn-on session tracking** | `pushSession()` reads existing `turnOn/sessions_data`, appends new session, writes back. 5-min dedup via `ash-turnon-last-push`. Admin passkey skip |
| **Admin TurnOn tab** | Fixed `turnOnStatus` element missing bug. Added session history viewer below step editor — loads from Firebase, shows each playthrough |
| **turnon-history.html** | New page: loads sessions from Firebase, newest-first, collapsible cards with all choices. Admin passkey skip |
| **Song upload status** | Each song card shows audio status (✓ file / ✓ audio / ! no audio / no file). Save progress ("Saving songs... X/Y"). `audioValid` flag set on save and load |
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

**File:** `sw.js` — cache name `ash-v36`

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

1. **quiz.json fetch fails on file://** — mitigated by inline `<script id="quizJsonData">` in index.html
2. **Annual events** use MM-DD string comparison — works for standard ranges, cross-year handled
3. **Section unlock** relies on localStorage for localhost — works but resets on cache clear
