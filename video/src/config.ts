/**
 * Design tokens for the Luxe Studio promo, matching the website brand.
 */
export const COLORS = {
  dark: "#0a0a0a",
  darkOverlay: "#111111",
  gold: "#eead2b",
  goldLight: "#f5c842",
  cream: "#f5f0e8",
  white: "#ffffff",
  whiteSubtle: "rgba(255, 255, 255, 0.6)",
} as const;

export const FPS = 30;

/* Scene durations in seconds */
export const SCENE_DURATIONS = {
  brandIntro: 4,
  heroShowcase: 5,
  servicesReveal: 4.5,
  gallerySpotlight: 4.5,
  ctaOutro: 3,
} as const;

/* Transition duration in frames */
export const TRANSITION_FRAMES = 15;
