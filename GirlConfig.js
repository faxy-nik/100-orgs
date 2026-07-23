/**
 * GirlConfig.js
 * Every tunable number the companion uses lives here. Nothing else in the
 * system should hardcode a magic number — if behaviour needs adjusting,
 * this is the file to edit.
 */
(function (root) {
  'use strict';

  var GirlCompanion = root.GirlCompanion = root.GirlCompanion || {};

  GirlCompanion.Config = {
    // --- Assets ---
    ATLAS_JSON_URL: 'girl-assets/atlas.json',
    ATLAS_IMAGE_URL: 'girl-assets/atlas.png',

    // --- Rendering ---
    RENDER_HEIGHT_PX: 96,        // on-screen height; width derives from frame aspect ratio
    Z_INDEX: 999999,
    PIXELATED: true,             // nearest-neighbor, never blur

    // --- Storage ---
    STORAGE_KEY: 'girlCompanion:v1',
    AUTOSAVE_INTERVAL_MS: 15000,

    // --- Decision timing (the "no obvious loops" requirement) ---
    // Every decision waits a random interval inside this range, never a fixed tick.
    DECISION_INTERVAL_MIN_MS: 3500,
    DECISION_INTERVAL_MAX_MS: 11000,
    // How many recent actions to avoid immediately repeating.
    ACTION_HISTORY_LENGTH: 4,

    // --- Movement ---
    WALK_SPEED_PX_S: 46,
    RUN_SPEED_PX_S: 92,
    SCREEN_MARGIN_PX: 24,        // never wander closer than this to viewport edges
    EXCLUSION_SELECTOR: 'button, a, [role="dialog"], dialog, input, textarea, select, .no-companion, #dragon, .dragon, .fav-toggle-btn, .theme-toggle-btn, .dice-btn, .toc-toggle-btn, .easter-egg-btn, .easter-egg-restart-btn, .to-top-btn, .mood-btn, nav, header, .floating-btn, .modal, .overlay, [role="navigation"], [role="banner"]',
    EXCLUSION_PADDING_PX: 14,

    // --- Cursor interaction ---
    CURSOR_NEAR_PX: 90,
    CURSOR_VERY_NEAR_PX: 40,
    CURSOR_FAST_PX_PER_S: 900,
    CURSOR_STILL_MS: 1800,

    // --- Reading behaviour ---
    READING_MIN_DWELL_MS: 4000,
    EMOTIONAL_SECTION_ATTR: 'data-companion-emotional', // host page marks sections with this

    // --- Hidden / rare moments ---
    HIDDEN_MOMENT_CHANCE: 0.05,  // rolled on each decision tick

    // --- Emotional state decay/regen rates (units per second) ---
    STATE_RATES: {
      energy:     { decay: 0.0025, floor: 0.05 },
      comfort:    { decay: 0.0015, floor: 0.1 },
      curiosity:  { decay: 0.0008, floor: 0.05 },
      sleepiness: { growth: 0.0018, ceiling: 1 },
      friendship: { growth: 0.00005, ceiling: 1 },
      confidence: { decay: 0.0006, floor: 0.1 },
      joy:        { decay: 0.0012, floor: 0.05 }
    },

    // --- Accessibility ---
    RESPECT_REDUCED_MOTION: true,
    BATTERY_SAVER_FPS_CAP: 20,

    // --- Debug ---
    DEBUG: false
  };
})(typeof window !== 'undefined' ? window : this);
