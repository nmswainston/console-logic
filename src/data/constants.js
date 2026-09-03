/** Shared easing curve for all motion (cubic-bezier) */
export const EASE_SMOOTH = [0.16, 1, 0.3, 1];

/** Animation durations (seconds) - for Framer Motion */
export const DURATION_FAST = 0.2;
export const DURATION_NORMAL = 0.5;
export const DURATION_SECTION = 0.6;
export const DURATION_SLOW = 0.7;

/** Standard transitions */
export const TRANSITION_STANDARD = { duration: DURATION_NORMAL, ease: EASE_SMOOTH };
export const TRANSITION_SECTION = { duration: DURATION_SECTION, ease: EASE_SMOOTH };

/** Opacity transition - shared by SectionLoader, PromptHeader */
export const OPACITY_DURATION = 0.25;
export const OPACITY_TRANSITION = { duration: OPACITY_DURATION, ease: EASE_SMOOTH };

/** Reveal distance (px) - y offset for fade-up motion */
export const DISTANCE_SM = 8;
export const DISTANCE_MD = 16;

/** Stagger timing for scroll/motion groups */
export const STAGGER_CHILDREN = 0.08;

/** Scroll motion defaults - use across ScrollMotion, ScrollStagger */
export const SCROLL_OFFSET = ["start end", "end start"];

export const SCROLL_Y_RANGE = [40, -20];
export const OPACITY_INPUT_RANGE = [0, 0.15];
export const OPACITY_OUTPUT_RANGE = [0, 1];
export const SCALE_RANGE = [0.98, 1];

/** Terminal-style loader timing (ms) - shared by SectionLoader and PromptHeader */
export const TERMINAL_DELAY_AFTER_COMPLETE = 500;
export const TERMINAL_VERIFY_DELAY = 1200;

/** Typing animation (ms) */
export const TYPING_SPEED_MS = 50;
export const TYPING_LINE_DELAY_MS = 100;

/** SectionLoader timed progress (no scroll) */
export const PROGRESS_INCREMENT = 2;
export const PROGRESS_INTERVAL_MS = 12;
export const PAUSE_AFTER_100_MS = 250;
export const VERIFY_TO_LOADED_DELAY_MS = 350;

/** Scanline overlay opacity */
export const SCANLINE_OPACITY = 0.04;

