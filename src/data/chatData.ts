/**
 * Chat widget configuration and data.
 * Supports Level 5 AI Agent with Cal.com booking, rescheduling,
 * cancellation, multi-language, and human handoff.
 */

export interface QuickReply {
  readonly label: string;
  readonly message: string;
}

export interface ChatMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly text: string;
  readonly quickActions?: readonly QuickAction[];
  readonly availableSlots?: readonly string[];
  readonly isBookingConfirmation?: boolean;
  readonly isRescheduleConfirmation?: boolean;
  readonly isCancellationConfirmation?: boolean;
  readonly isHandoff?: boolean;
  readonly isComplaint?: boolean;
  readonly timestamp: number;
}

export interface QuickAction {
  readonly label: string;
  readonly url?: string;
  readonly action?: string;
  readonly type: "link" | "phone" | "scroll";
}

// n8n webhook URL — update after workflow is imported
export const N8N_CHAT_WEBHOOK_URL = "https://izzyd.app.n8n.cloud/webhook/luxe-chat";

export const TYPING_DELAY_MS = 1200;

/** Proactive engagement: auto-open delay when user is on booking section (ms) */
export const PROACTIVE_TRIGGER_DELAY_MS = 15_000;

export const GREETING_MESSAGE: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Welcome to Luxe Studio! ✨ I'm your personal concierge. I can check available time slots, book or reschedule appointments, and answer any questions about our services.",
  quickActions: [
    { label: "📅 Book Appointment", url: "https://cal.com/izzydev-studio/30min", type: "link" },
    { label: "💇 View Services", action: "#services", type: "scroll" },
    { label: "📞 Call Us", action: "tel:+12125550199", type: "phone" },
  ],
  timestamp: Date.now(),
};

export const QUICK_REPLIES: readonly QuickReply[] = [
  { label: "📅 Book Now", message: "I'd like to book an appointment" },
  { label: "🔄 Reschedule", message: "I need to reschedule my appointment" },
  { label: "💰 Pricing", message: "What are your prices?" },
  { label: "📍 Location", message: "Where are you located?" },
];

export const CAL_BOOKING_URL = "https://cal.com/izzydev-studio/30min";

/** Returns the browser's primary language code (e.g. 'en', 'es', 'fr') */
export function getBrowserLanguage(): string {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "en";
  return lang.split("-")[0].toLowerCase();
}
