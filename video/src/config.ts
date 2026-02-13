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
  brandIntro: 3.5,
  heroShowcase: 4,
  servicesReveal: 3.5,
  gallerySpotlight: 3.5,
  bookingShowcase: 3.5,
  hookTransition: 3,
  chatbotDemo: 14,
  ctaOutro: 3.5,
} as const;

/* Transition duration in frames */
export const TRANSITION_FRAMES = 12;
