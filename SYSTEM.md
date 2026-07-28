# SYSTEM.md — 100 prghs for eeshah

Last updated: 2026-07-27 (v5 — gated content, interactive features, storage audit)

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
| `admin.html` | Admin panel — 16 tabs: Dates, Songs, Secret, Gallery, Wishes, Requests, Reviews, Activity, Quiz, Events, Puzzles, Letters, Dynamic, Timeline, Sections, Settings, Access |
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
| `fb-db.js` | Firebase Realtime DB helper (CRUD, blob encode). **Localhost:** localStorage-backed mock. **Remote:** Firebase RTDB |
| `content-common.js` | IntersectionObserver for section tracking, streak counter, parallax, voice controls, review tracking |
| `quiz.js` | Per-section quiz buttons (`addSectionQuizBtn`, `addQuizButtons`). 10 questions each for sections 0-1 on both 100-organs and love. Submits scores to `quizHistory` in Firebase |
| `activity-tracker.js` | Auto-records `page-visit`, `section-view`, `image-view` to `activity` in Firebase |
| `events.js` | Seasonal event engine — reads `config/events`, matches today's date, applies sky/theme/popup |
| `puzzle-hunt.js` | Treasure hunt puzzles — floating panel with multi-step puzzles from `config/puzzles` |
| `letters.js` | "Write a Letter" modal — stores letters in `letters` store in Firebase |
| `dynamic-content.js` | Reads `config/dynamicContent`, renders "Extra Letters" accordion at page bottom |
| `feature-flags.js` | Feature flag system — reads from Firebase `config/featureFlags`, localhost defaults |
| `track.js` | IndexedDB visit counters |
| `sw.js` | Service worker — offline cache (**ash-v36**) |

## Companion scripts (girl, boy, dragon), skies, music, easter eggs — see v4 section below

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

### localStorage Keys

| Key | Used By | Content |
|-----|---------|---------|
| `ash-fb-store` | fb-db.js | Entire Firebase mock data (localhost only) |
| `ash-fb-seq` | fb-db.js | Sequence counter for mock IDs |
| `ash-admin-passkey` | admin.html | Base64-encoded admin password |
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

## Recent Changes (v5 — Gated Content + Interactive Features)

| Change | Detail |
|--------|--------|
| **Section unlock flow** | 100-organs and love: groups hidden by default, request button at boundary, admin approval, daily cap 2/page/day |
| **Quiz buttons** | Per-section quiz (10 Qs) for sections 0-1 on both pages. `quiz.js` must load before inline init script |
| **Story quiz data collection** | Story page (story.html) loads quiz.json inline with save to Firebase |
| **Seasonal events fix** | Cross-year boundary annual events now work. Multiple overlapping events apply (removed `break`) |
| **Admin layout fix** | Activity and Quiz tabs moved inside `admin-content` div (were floating outside) |
| **Wish grant fix** | Fixed `result.data` → `result` (FB.get returns object directly). Fixed `new (w.releasedAt)` → `new Date(w.releasedAt)` |
| **SW bumped** | ash-v35 → ash-v36 |
| **quiz.json fixed** | Was two separate JSON values (invalid). Merged into single valid object with all 105 questions |
| **Inline quiz data** | quiz.json embedded as `<script id="quizJsonData">` in index.html for localhost fallback |

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
