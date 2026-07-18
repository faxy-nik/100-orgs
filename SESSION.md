# Session Context — 100 Orgs Project

## Current Objective
Fix live site bugs: audio/text reviews and song requests not rendering on GitHub Pages. Root cause: `VersionError` from IndexedDB version mismatches between lock-check inline scripts (v2) and the rest of the app (v3), cascading into `safeObserve is not defined` and breaking all downstream init code.

---

## What We've Done This Session

### Bug: IndexedDB VersionError (v2 < v3)
- **Root cause**: Top-of-page inline lock-check scripts opened `ash-jukebox-db` at **version 2**, but `music.js` and admin code upgraded it to **version 3**. `indexedDB.open(n, 2)` on an existing v3 DB throws `VersionError`.
- **Fix**: Removed explicit version from all 5 pages' inline lock-check/preview/note scripts → `indexedDB.open(n)`. Added `r.onerror=function(){}` to swallow silent failures.
- **Files changed**: `100-organs.html`, `love.html`, `fantasies.html`, `gallery.html`, `index.html`

### Bug: safeObserve is not defined
- **Root cause**: Cascading failure from VersionError — page init script never completed, so `safeObserve` (defined in same IIFE at line 7334) was never registered before it was called.
- **Fix**: Eliminate the VersionError (above). The definition and all references are correctly scoped inside the same IIFE.
- **No additional change needed**.

### Sky Generator + Emotion Engine Sync
- `skies.js` has **100 skies** (not 46 as initially assumed).
- `sky-living.js` Emotion Engine originally had 70 entries; added 30 missing `getMeta(sky)` blocks so all 100 skies have emotional metadata.
- Exposed `EMOTION_ENGINE`, `getMeta` on `window.SkyLiving`.
- `objectsForSky()`, `ambienceKeyForSky()`, `skyIsNight()` all use `getMeta()` before keyword fallback.

### Mood Filter Bug
- **Bug**: `m === mood` (strict equality on space-separated `data-mood` strings like "romantic intense").
- **Fix**: Changed to `m.split(' ').indexOf(mood) !== -1` in all 3 content files (`100-organs.html`, `love.html`, `fantasies.html`).
- Expanded keyword sets for playful, intimate, grateful, longing, romantic.

### C# Server — Multithreading
- Rewrote sync HTTP server to use `ThreadPool.QueueUserWorkItem` for concurrent browser requests.
- Previously hung when the browser sent multiple parallel requests for the same page.

### Voice Recording & Reviews
- IndexedDB v3: `reviews` store in `music.js` and `admin.html`.
- Voice recording: 120s default, 180s hard limit, saves blob + text.
- Reviews tab in `admin.html`.
- Song requests stored in `localStorage['ash-song-requests']`.

---

## Important Details

### File Layout
```
D:\fahad\100\
├── 100prghs for eeshah\   ← GitHub submodule (origin: faxy-nik/100-orgs)
│   ├── 100-organs.html     ← Main content page (9005 lines)
│   ├── love.html           ← Love sections
│   ├── fantasies.html      ← Fantasies sections
│   ├── gallery.html        ← Gallery page
│   ├── index.html          ← Home / landing
│   ├── admin.html          ← Admin panel (reviews, sections)
│   ├── music.js            ← Music player + DB v3 init
│   ├── sky-living.js       ← Emotion Engine + sky metadata
│   ├── skies.js            ← 100 sky definitions
│   └── style.css           ← Styles
├── server.cs               ← C# HTTP server source
└── .git/                   ← Parent repo (no remote)
```

### Git Status
| Repo | Branch | Remote | Clean? |
|------|--------|--------|--------|
| `100prghs for eeshah` | `main` | `faxy-nik/100-orgs.git` | ✅ Clean, pushed (`50e6965`) |
| Parent `D:\fahad\100` | `master` | *(none)* | ✅ Clean, submodule pointer committed (`f326d2a`) |

### IndexedDB Schema
- DB name: `ash-jukebox-db`
- Current version: **3**
- Stores: `config`, `reviews` (created by `music.js` `onupgradeneeded`)
- Pages that read it: all 5 content pages (lock-check, section dates, personal notes)
- Pages that upgrade it: `music.js` v3, `admin.html` v3

### Key Functions (100-organs.html)
| Line | Function | Purpose |
|------|----------|---------|
| 17 | Inline IIFE | Lock-check: loads sections from DB, blocks if locked |
| 7300 | Outer IIFE | Main init: cursor, petals, fireflies, TOC, scroll, reveal, reading focus, recording |
| 7334 | `safeObserve` | Wraps `observer.observe` with cleanup tracking |
| 8540 | `indexedDB.open(..., 3)` | Recording code opens DB for reviews |

### Server
- Compiled binary: `C:\Users\Faizi's Computers\AppData\Local\Temp\opencode\server.exe`
- Multi-threaded, serves `100prghs for eeshah` on port 8080
- Source: `D:\fahad\100\server.cs`

### Deployment
- GitHub Pages: auto-deploys from `faxy-nik/100-orgs` main branch
- May take 2-5 minutes after push
- Hard refresh (`Ctrl+Shift+R`) required to bypass browser cache

---

## Things to Watch Out For
- **Caching**: GitHub Pages + browser cache may serve stale files. Always hard-refresh after deploy.
- **IndexedDB**: Per-origin data. Recording on localhost ≠ GitHub Pages.
- **Minified HTML**: All code is in giant single files. No modules/imports. Everything is inline `<script>` blocks.
- **No Node/Python/PHP**: Pure static HTML+JS. Only tool is compiled C# server for local testing.
- **safeObserve**: Only defined inside the main IIFE (line 7300). Ensure all references stay within that scope.
- **Version upgrades**: If the DB version ever needs to bump to v4, update `indexedDB.open(..., 3)` calls in music.js, admin.html, AND all recording code paths.
