/**
 * Static content extracted from Stitch V3 design.
 * All text, URLs, and lists are centralized here per react-components skill rules.
 */

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface Service {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly priceFrom: string;
}

export interface GalleryItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly grayscale?: boolean;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

// ─── Navbar ──────────────────────────────────────────────

export const BRAND_NAME = "Luxe Studio";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];

export const NAV_CTA = { label: "Book Now", href: "#book" };

// ─── Hero ────────────────────────────────────────────────

export const HERO = {
  eyebrow: "Premium Grooming & Styling",
  headline: ["WHERE", "ELEGANCE", "MEETS", "EXPERTISE"],
  description:
    "Experience the pinnacle of unisex grooming in an atmosphere of refined luxury. We don't just cut hair; we curate your personal aesthetic.",
  cta: { label: "Explore Collection", href: "#explore" },
  vogue: { quote: '"Iconic."', attribution: "— Vogue Feature" },
  portraitSrc: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800",
  portraitAlt: "High fashion editorial portrait",
} as const;

// ─── Brand Statement ─────────────────────────────────────

export const BRAND_STATEMENT = "Redefining the art of grooming through precision, passion, and pure luxury.";

export const BRAND_HIGHLIGHTS = ["precision", "passion", "luxury"];

// ─── Services ────────────────────────────────────────────

export const SERVICES: readonly Service[] = [
  {
    id: "cut-style",
    number: "01",
    title: "Cut & Style",
    description: "Precision cutting tailored to face shape and lifestyle. Includes consultation, wash, massage, and finish.",
    priceFrom: "From $85",
  },
  {
    id: "color-theory",
    number: "02",
    title: "Color Theory",
    description:
      "Custom color formulation. Balayage, correction, full tints, and creative color applications by master colorists.",
    priceFrom: "From $120",
  },
  {
    id: "treatment",
    number: "03",
    title: "Treatment",
    description: "Restorative hair spas, keratin infusions, and scalp therapies designed to rejuvenate and protect.",
    priceFrom: "From $60",
  },
  {
    id: "grooming",
    number: "04",
    title: "Grooming",
    description: "Traditional hot towel shaves, beard sculpting, and facial treatments for the distinguished gentleman.",
    priceFrom: "From $55",
  },
];

// ─── The Craft (Cinematic Video) ─────────────────────────

export const THE_CRAFT = {
  tagline: "Every cut tells a story. Every style is a signature.",
  videoSrc: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
  videoAlt: "Stylist mid-craft in warm intimate lighting",
  backgroundSrc: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200",
  backgroundAlt: "Blurred warm luxury salon interior",
} as const;

// ─── Gallery ─────────────────────────────────────────────

export const GALLERY = {
  subtitle: "Captured Moments",
  collection: "Collection SS/24",
  featureTitle: "The Modern Muse",
  featureDescription: "Exploring texture and form through our latest seasonal cuts.",
  galleryImages: [
    {
      src: "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Close up portrait of a man with well groomed hair and beard",
      label: "01 / 04",
    },
    {
      src: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Woman with elegant updo hairstyle",
      label: "02 / 04",
    },
    {
      src: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Man with sharp modern fade haircut",
      label: "03 / 04",
    },
    {
      src: "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Artistic hairstyle from behind showing texture and curls",
      label: "04 / 04",
    },
  ],
  portraitFemale: {
    src: "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Artistic portrait of a woman with fashion forward hairstyle",
  },
} as const;

// ─── Testimonials ────────────────────────────────────────

export interface Testimonial {
  readonly quote: string;
  readonly highlightWord: string;
  readonly author: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "Luxe Studio isn't just a salon; it's a sanctuary. The attention to detail is unparalleled, creating a look that feels uniquely yours.",
    highlightWord: "sanctuary",
    author: "Alexandra D., Editor",
  },
  {
    quote:
      "I walked in needing a trim and walked out feeling like a new person. The craft here is genuine — they listen before they cut.",
    highlightWord: "craft",
    author: "Michael R., Creative Director",
  },
  {
    quote:
      "Every appointment feels like an experience, not a transaction. The ambiance, the precision — it's artistry at its finest.",
    highlightWord: "artistry",
    author: "Priya S., Architect",
  },
  {
    quote:
      "I've been to salons across three continents. Luxe Studio is the only place that consistently exceeds my expectations.",
    highlightWord: "exceeds",
    author: "James T., Venture Partner",
  },
] as const;

// ─── Marquee ─────────────────────────────────────────────

export const MARQUEE_ITEMS = [
  { text: "Luxe Studio • Premium Grooming", variant: "ghost" as const },
  { text: "Book Your Appointment", variant: "stroke" as const },
];

// ─── Operating Hours ─────────────────────────────────────

export const OPERATING_HOURS = [
  { day: "Mon — Fri", hours: "9:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

// ─── Booking CTA ─────────────────────────────────────────

export const BOOKING = {
  headline: ["Your Chair", "Awaits"],
  description: "Elevate your style. Secure your appointment with our master stylists today.",
  cta: "Reserve Now",
  imageSrc: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
  imageAlt: "Stylist hands working on hair with scissors",
} as const;

// ─── Footer ──────────────────────────────────────────────

export const FOOTER = {
  address: ["1080 Madison Avenue", "New York, NY 10028", "+1 (212) 555-0199"],
  exploreLinks: [
    { label: "Our Story", href: "#" },
    { label: "Stylists", href: "#" },
    { label: "Lookbook", href: "#" },
    { label: "Careers", href: "#" },
  ] as readonly FooterLink[],
  socialLinks: [
    { label: "IG", href: "#" },
    { label: "FB", href: "#" },
    { label: "PI", href: "#" },
  ] as readonly SocialLink[],
  copyright: `© ${new Date().getFullYear()} Luxe Studio. All rights reserved.`,
  legalLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ] as readonly FooterLink[],
} as const;
