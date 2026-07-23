# SYSTEM.md — 100 prghs for eeshah

Last updated: 2026-07-24 (v4 — visibility gating, final deployment audit)

---

## Overview

A romantic web experience ("100 prghs for eeshah") featuring living companion characters (girl, boy, dragon), procedural skies, interactive tribute sections, and a rich set of easter eggs. Deployed via Netlify, uses Firebase Realtime DB for config/sync.

**Project root:** `D:\fahad\100\100prghs for eeshah`

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page — sky preview, links to content |
| `100-organs.html` | Main content — 213 tribute sections (1-213), 8 accordion groups |
| `love.html` | Love-themed page — 130 tribute divs, 5 accordion groups |
| `fantasies.html` | Fantasies & comforts content |
| `sky-observatory.html` | Sky gallery (renamed from gallery.html) — sky switching, wish jar, star map, moon, fireflies, fragments |
| `photo-gallery.html` | Photo gallery (ash/ images) — includes sky-observatory features (lucky star, coffee, feathers, balloons, butterflies, etc.) |
| `dream.html` | Dream page — images, lanterns, wishes |
| `make-her-sleep.html` | Chat/storyline page — sleep trigger |
| `admin.html` | Admin panel — wishes, songs, config, parallax |
| `stats.html` | Usage statistics viewer |
| `demo-interactions.html` | Interactive features demo — 100% spawn rate, all features showcase |
| `404.html` | Error page |
| `cold-restart.html` | Clears all `ash-*` localStorage keys — cold restart utility |
| `demo-interactions.html` | Interactive features demo — 100% spawn rate, all features showcase |
| `sky-generator.html` | Procedural sky generator |
| `sky-generator-living.html` | Living sky generator (with animations) |

---

## Core Scripts

| File | Purpose |
|------|---------|
| `content-common.js` | Main page logic — TOC, reveal, scroll, parallax, favorites, mood, bookmarks, emoji headings, reading focus, floating quotes, voice controls, love letter generator, .ai-parallax support |
| `interactive.js` | Wish system, journal, lantern world, phase 2 UX |
| `sky-living.js` | Star field, moon, shooting stars, constellations, floaters, birds, dragons, UFOs, weather, audio ambience, supernova effects |
| `skies.js` | 150+ sky definitions, rendering engine |
| `landscape.js` | Living landscape overlays (delegates to SkyLiving) |
| `sky-observatory.js` | Sky observatory UI — category filters, sky grid, real-time clock, moon counter, progress, daily sky, firefly jar, fortune scroll, earth view, make-a-wish, floating hearts, screenshot mode, mood randomizer, constellation names, music sync, floating letters, growing vine, bubble messages, seasonal grading, invisible ink, Konami code dev mode. Interactive features (balloons, feathers, coffee, lucky star, fragments) moved to global-interactions.js |
| `music.js` | Jukebox — playlist, crossfade, Web Audio API |
| `track.js` | IndexedDB visit counters, analytics |
| `global-easter-eggs.js` | Keyboard shortcuts (dream, sleep, matrix, lanterns) |
| `matrix-rain.js` | Matrix rain / binary rain / heart rain |
| `anime.min.js` | anime.js UMD bundle (118KB) — particles + text animations |
| `motion-masterpiece.js` | Cinematic visual system — hero entrance, accordion stagger, end reveal, progress glow, ambient aurora, spark morph |
| `fb-db.js` | Firebase Realtime DB helper (CRUD, blob encode) |
| `sw.js` | Service worker — offline cache (**ash-v22**) |
| `style.css` | All styling + masterpiece enhancements (scrollbar, selection, springy buttons, card hover) |
| `tree-of-memories.js` | Tree of Memories — fractal tree that grows with achievements. Hidden until dream (`ash-viewed-dream`) AND sleep (`ash-viewed-make_her_sleep`) pages visited. Levels 0–9. Reveals via polling every 5s. |
| `random-constellations.js` | Mini canvas constellation viewer — syncs with sky-living.js via localStorage/window callback |
| `butterfly-collection.js` | 24 butterfly species collection — caught via interaction |
| `firefly-jar.js` | Firefly jar — shows firefly catch count + butterfly discovered/total. Syncs firefly count to `ash-obs` for global access across all pages |
| `world-progress.js` | World progress dashboard — completion stats |
| `global-interactions.js` | Global interactive features — balloons (15% every 12s), feathers (15% every 8s), coffee (20min), lucky star (on specific skies), puzzle fragments (8 global + 2 photo, staggered 5s apart, z-index:99996, positioned left 0-65vw top 5-70vh). Runs on all pages except 404.html. Includes achievement system: fragments (10), feathers (20), balloons (20), lucky star (1) |
| `secret-letters.js` | 30 hidden letters unlocked by achievements (moon clicks, lanterns, skies, feathers, wishes, fireflies, fragments, etc.). Locked letters show 🔒 + `???` (not clickable). Found letters toggle content. Collection panel shows progress. Auto-checks every 20s |
| `world-progress.js` | World progress dashboard — button hidden until all 5 sections read. Polls every 5s |

---

## Recent Changes (v4 — Visibility Gating)

| Change | Detail |
|--------|--------|
| **Firefly jar hidden until first catch** | Jar starts `display:none`. Shown when ≥1 firefly or butterfly captured. Checked on load and after every catch |
| **Favorites toggle hidden until first favorite** | `#favToggle` starts `display:none` in 3 pages. Shown when `ash-favorites` has items. Polls every 3s + updates on toggle |
| **Easter egg button hidden until Fantasies visited** | `#easterEggBtn` starts `display:none` in 3 pages. Shown when `ash-viewed-*fantasies*` key exists. Polls every 3s |
| **World progress globe hidden until all sections read** | Globe shows when all 5 sections (100-organs, love, fantasies, sky-observatory, photo-gallery) have `ash-viewed-*` keys. Polls every 5s |
| **Wish journal button hidden until first wish** | `#wishJournalBtn` starts `display:none`. Shown when `ash-wish-journal` has entries. Checked on load + after every `addWish()` call |
| **Tree canvas hidden until dream + sleep visited** | Tree starts `display:none`. Dream.html sets `ash-viewed-dream`, make-her-sleep.html sets `ash-viewed-make_her_sleep`. Polls every 5s. Exposes `TreeOfMemories.reveal()` |
| **Fragment z-index lowered to 99996** | From 999999. Position constrained to left 0-65vw, top 5-70vh to avoid right sidebar buttons |
| **Secret letters reverted** | Locked letters show 🔒 + `???`, not clickable. Only found letters toggle content |
| **Sky auto-init removed** | `autoApply()` removed from `skies.js`. Sky appears on button click only. Exceptions: sky-observatory, dream, make-her-sleep auto-apply on load |
| **Dream/sleep UI** | Backgrounds lightened, `#dreamGlow` removed, `skyOverlay opacity: 1`. Floating Lanterns = dream-only, Dream Clouds = sleep-only |
| **Konami code** | Switched from `e.keyCode` to `e.key.toLowerCase()` (case-insensitive) |
| **Bug fixes** | `document.body` null guard on 4 pages, `window.safeObserve` exposed, orphaned bracket removed, anime.js v4 compat shim added |
| **Cold restart** | `cold-restart.html` clears all `ash-*` localStorage keys |

## Hidden Letters (30 total)

Unlocked by meeting conditions. Auto-checked every 20s. Locked letters show 🔒 + `???` (not clickable).

## Hidden Letters (30 total)

Unlocked by meeting conditions. Auto-checked every 20s. All readable even when locked.

| # | Title | Unlock Condition |
|---|-------|-----------------|
| l1 | The First Step | Always available |
| l2 | Moonlight Whisper | Click the moon 3 times |
| l3 | Lantern Prayer | Release 3 lanterns |
| l4 | Star Seeker | Visit 5 different skies |
| l5 | Wings of Change | Collect 3 feathers |
| l6 | Dreamer's Promise | Visit a dream page |
| l7 | Garden of Stars | Visit 10 skies |
| l8 | The Invisible Thread | Make 5 wishes |
| l9 | Feather Light | Collect 8 feathers |
| l10 | Firefly Dance | Catch 10 fireflies |
| l11 | The Hidden Path | Collect 3 fragments |
| l12 | Echo of Yesterday | 5 total visits |
| l13 | Songs Unspoken | Play music 5+ times |
| l14 | Reading Between Lines | View 20 items |
| l15 | The Dragon's Gift | Find the dragon |
| l16 | Constellation of Us | 15 recent observatory visits |
| l17 | The Quiet Hour | Click coffee once |
| l18 | Gratitude | View 50 items |
| l19 | Butterfly Effect | Favorite 5 things |
| l20 | The Lighthouse | 10 total visits |
| l21 | Fragments of Us | Collect 8 fragments |
| l22 | Stargazer | Visit 20 skies |
| l23 | Roots and Wings | Tree of Memories growth ≥50 |
| l24 | The Gift | Catch 25 fireflies |
| l25 | Wanderer | Release 5 balloon notes |
| l26 | Eternal Spring | Make 15 wishes |
| l27 | The Song of the Sky | Find the lucky star |
| l28 | Home | 20 total visits |
| l29 | The Last Firefly | Catch 50 fireflies |
| l30 | To Eeshah | View 100 items + 30 visits |

---

## Hidden Observatory Features (sky-observatory.js)

All in `sky-observatory.js`. These are subtle easter eggs that activate during sky-gazing.

| Feature | Trigger | Effect | Duration |
|---------|---------|--------|----------|
| **Konami Code (↑↑↓↓←→←→BA)** | Type the code anywhere on an observatory page | Activates "Developer Sky Mode" — neon gradient, 200 stars, aurora colors, green box-shadow glow. Press again to deactivate | Toggle |
| **Earth View** | 12% chance after any sky change | A tiny globe emoji (🌍) floats at bottom-right for ~12s with a gentle bob animation. Opacity 0.5 → fade out | 12s visible, 2s fade |
| **Bubble Messages** | ~0.3% chance every 2s interval | A floating bubble (🌬️) rises from bottom; on click shows an uplifting message ("You are loved beyond measure."). Hover to brighten | Rises over 4-8s, click to dismiss |
| **Invisible Ink** | Mouse stays still for 8+ seconds | A faint golden quote fades in (opacity 0.15), e.g. "You are patient. The sky rewards that." Once all 8 shown, cycle resets | 7s visible, 3s fade |

---

## Companion Systems

Three independent companion systems run simultaneously on each page. All respect `prefers-reduced-motion`.

### Girl Companion (Sprite-Sheet Based)

10 JS modules + atlas assets. Uses a real sprite sheet extracted from `ash_pixel.png`.

**Files:**

| File | Purpose |
|------|---------|
| `GirlConfig.js` | All tunable constants (speeds, thresholds, z-index 999999) |
| `GirlStorage.js` | Defensive localStorage wrapper |
| `GirlMemory.js` | Persistent memory (visits, sections, flowers, stars, hearts, secrets) |
| `GirlEvents.js` | Pub/sub EventBus + shared DOM listeners |
| `GirlAnimationController.js` | Frame playback + fallback to idle |
| `GirlRenderer.js` | Canvas painter — fixed, DPR-aware, nearest-neighbor, pointer-events: none |
| `GirlStateMachine.js` | 7 emotional variables + weighted irregular behaviour picker (27 behaviours + 11 hidden moments) |
| `GirlNavigation.js` | Safe-area wandering — rescans UI exclusions every 2s |
| `GirlInteractions.js` | Cursor proximity, fast-move detection, reading dwell (IntersectionObserver), section changes |
| `GirlCompanion.js` | Public API + main rAF loop |
| `girl-assets/atlas.png` | 119-frame sprite atlas (1.4MB) |
| `girl-assets/atlas.json` | Frame manifest (animation name → rects, fps, loop) |
| `girl-particles.js` | Particle effects powered by anime.js (hearts, stars, flowers, sparkles, notes, zzz) |

**Script load order** (in HTML):
```
anime.min.js → motion-masterpiece.js → dragon-companion.js → GirlConfig → GirlStorage → GirlMemory
→ GirlEvents → GirlAnimationController → GirlRenderer → GirlStateMachine
→ GirlNavigation → GirlInteractions → GirlCompanion → girl-particles.js
→ inline: GirlCompanion.init({container: document.body})
→ boy-companion.js → inline: BoyCompanion.init()
→ matrix-rain.js → global-easter-eggs.js
```

**Init:** `GirlCompanion.init({ container: document.body })` returns a Promise.

**Public API:**
```js
GirlCompanion.init({ container: document.body })
GirlCompanion.pause() / .resume() / .destroy()
GirlCompanion.teleport({x, y})
GirlCompanion.setMood('happy')
GirlCompanion.setWeather('rain' | 'snow' | 'clear')
GirlCompanion.setSky('night' | 'day')
GirlCompanion.setMusicPlaying(true | false)
GirlCompanion.onSectionChange(sectionId, el)
GirlCompanion.save() / .load()
```

**Emotional state variables:** energy, comfort, curiosity, sleepiness, friendship, confidence, joy — each decays/grows per second based on context (time of day, scrolling, music, weather, idle duration).

**Behaviour list (27):** sit, walkSlowly, lookAround, blink, stretch, sleep, wake, wave, inspectFlowers, inspectStars, lookUpward, lookAtCursor, walkToLocation, readNearbyText, admireImages, watchSkies, watchRain, watchSnow, collectFlowers, collectStars, leaveHearts, yawn, thinking, dance, petCat, listenMusic, drinkTea, shy, turnAround, point, sad, spin, idle.

**Hidden moments (11):** screenCorner, fallAsleep, watchStars, drawHearts, waveAtNothing, stareIntoDistance, sitUnderTree, playFlute, fishInClouds, readBook, watchButterfly.

**Context variables:** isNight, weather, musicPlaying, sectionType, idleDurationMs, scrolling, cursorStillNear, shyTrigger.

**Particle triggers:** hearts (heart, leaveHearts, wave, happy, reading+emotional), sparkles (celebrate, returning visitor), notes (dance, listenMusic), zzz (sleep), flowers (collectFlower, touchFlower, emotional sections), stars (collectStar, gazeAtMoon).

**Fallbacks:** Run = faster walk cycle. Wave = happy pose with raised arm. Blink = two idle frames alternating. Missing animation → idle.

### Boy Companion (Procedural Pixel Art)

Single self-contained file. Procedurally drawn — no sprite sheet needed. Enhanced with chibi proportions, detailed shading, ears, eyebrows, nose, V-neck collar, button details, rounded shoes with highlights, proper hand/finger rendering, and blush circles.

**File:** `boy-companion.js` (~750 lines)

**Specs:**
- Height: 96px
- Z-index: 44
- Appearance: brown hair (side-swept with highlights), blue shirt (V-neck collar, buttons, fold lines), dark pants, rounded shoes
- Auto-spawns 2-5 seconds after page load
- 12 states, 27 behaviours + 6 hidden moments
- localStorage memory (`boyCompanion:v1`)
- Exclusion selector same as girl companion
- Drawing features: ground shadow, arm articulation with sleeve/forearm/hand separation, finger detail on wave, iris/pupil with eye shine, curved sleep eyes, nose, ear inner detail

**Script load order:**
```
boy-companion.js → inline: BoyCompanion.init()
```

### Dragon Companion (Procedural Pixel Art)

Single self-contained file. Procedurally drawn — no image loading.

**File:** `dragon-companion.js` (~653 lines)

**Specs:**
- Z-index: 45
- Spawns randomly (0.7% chance per 3.5s check)
- Sessions: 28-95 seconds, 2-5 behaviours per session
- Max 14 fire particles at once
- Procedural body drawing only (image logic removed)

---

## Anime.js Integration

**File:** `anime.min.js` (anime.js UMD bundle, 118KB)

**Usage:** Powers particle effects in `girl-particles.js` and cinematic visual enhancements in `motion-masterpiece.js`. NOT used for companion movement.

**Note:** `motion` (Motion One v12) is installed via npm but NOT loaded in HTML yet — it interfered with anime.js globals. Available at `node_modules/motion/dist/motion.js` for future use with a proper module bundler.

**Particle system:** Shared canvas at z-index 999998, 6 particle types:
- **hearts** — float upward, fade out
- **stars** — radial burst
- **flowers** — gentle float with rotation
- **sparkles** — shimmer (fade in → out)
- **notes** — float upward with slight drift
- **zzz** — staggered rise

---

## Motion Masterpiece (anime.js)

**File:** `motion-masterpiece.js` — loaded after `anime.min.js` on all 8 pages.

**Features:**
- **Hero entrance** — per-character stagger from center with rotateZ bounce, subtitle fade, ornament scale
- **Accordion stagger** — tribute cards cascade in with anime.stagger(60) on accordion open
- **End section reveal** — scroll-triggered fade-in via IntersectionObserver
- **Progress glow** — reading bar breathing pulse (boxShadow animation)
- **Ambient aurora** — 3 layers breathe at different rates (8s, 10s, 12s)
- **Spark morph** — continuous scale + boxShadow pulse on `.spark` elements

**Body visibility guard:** Waits for `body.display !== 'none'` before initializing (respects admin lock).

**Respects:** `prefers-reduced-motion` — entire module skipped if set.

---

## Masterpiece CSS Enhancements

**File:** `style.css` (appended at end)

**Enhancements:**
- **Custom scrollbar** — thin (6px), gold thumb on ink track
- **Text selection** — gold highlight on ink, ember on cream (day mode)
- **Smooth scroll** — CSS `scroll-behavior: smooth`
- **Focus states** — gold outline for keyboard accessibility
- **Springy button hover** — cubic-bezier(0.34, 1.56, 0.64, 1) overshoot curve on floating buttons
- **Card hover lift** — translateY(-2px) on tribute cards with box-shadow expansion

---

## Service Worker

**File:** `sw.js` — cache name `ash-v22`

**Cached assets (45):** All pages, all scripts (companion + core + anime + particles + masterpiece), all companion assets (atlas, girl-assets/*), CSS, manifest.

**Strategy:** Cache-first, network fallback. New responses cached on fetch. Old caches deleted on activate.

---

## Data & Sync

- **Firebase Realtime DB:** `fb-db.js` — CRUD operations, blob encoding. Used for wishes, songs, config, admin sync.
- **IndexedDB:** `track.js` — visit counters, analytics.
- **localStorage:** Used by girl companion (`girlCompanion:v1`), boy companion (`boyCompanion:v1`), and various page state.

---

## Key Conventions

- **Body starts `display:none`** — admin lock script at line 24 of `100-organs.html`.
- **`content-common.js` loaded at line 7350+**, AFTER `ASH_CONFIG` at line ~7316.
- **Skip keywords:** `['inner thigh', 'vagina', 'clitoris', 'vulva', 'labia', 'g-spot', 'ovaries', 'wetness', 'nipples', 'mammary', 'pleasure', 'arous']`
- **Companion z-indexes:** Girl = 999999, Particles = 999998, Dragon = 45, Boy = 44.
- **All companions** respect `prefers-reduced-motion` — skip entirely if set.
- **No external CDNs** — all assets served locally via service worker.

---

## Moved Files (to `D:\fahad\cache`)

These are not part of the main app — utilities, reports, standalone generators:
- `BUG_FIX_REPORT.md`, `DEPLOYMENT_REPORT.md`, `FEATURE_MATRIX.md`, `FINAL_AUDIT_REPORT.md`
- `MATRIX_ENGINE_REPORT.md`, `PERFORMANCE_REPORT.md`, `UNUSED_ASSETS_REPORT.md`, `WORLD_EXPANSION_REPORT.md`
- `cat-animation.png`, `sky-generator.html`, `sky-generator-living.html`
- `demo-interactions.html`, `cold-restart.html`

## Deleted / Replaced Files

These have been removed from the project:
- `companion-render.js` — replaced by GirlCompanion system
- `companion-ai.js` — replaced by GirlStateMachine
- `companion-girl.js` — replaced by GirlCompanion
- `companion-boy.js` — replaced by boy-companion.js
- `ash-pixel.png` — replaced by girl-assets/atlas.png
- `faxy-pixel.png` — removed
- `living-world-global.js` — replaced by individual companion files (dragon-companion.js, etc.)
- `text-effects.js` — replaced by motion-masterpiece.js
- `motion.min.js` — installed via npm but not loaded (interferes with anime.js globals)

---

## Build / Deploy

No build step. Static files served directly via Netlify. Service worker handles offline caching.

**To test locally:**
```bash
cd "D:\fahad\100\100prghs for eeshah"
python3 -m http.server 8000
# Open http://localhost:8000
```

---

## Known Limitations

1. **Girl walk/run:** Only one direction (forward-facing); mirrored horizontally for left/right.
2. **Girl wave:** Reuses happy pose — no dedicated wave frame on sprite sheet.
3. **Girl blink:** Alternates two idle frames — no closed-eye frame distinguishable.
4. **Canvas opacity fade:** Cannot animate CSSStyleDeclaration with anime.js — canvas starts visible, no fade-in effect.
