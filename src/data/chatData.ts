/**
 * Chat widget configuration and data.
 * Webhook URL, quick replies, and greeting message.
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
  readonly timestamp: number;
}

export interface QuickAction {
  readonly label: string;
  readonly url?: string;
  readonly action?: string;
  readonly type: "link" | "phone" | "scroll";
}

// n8n webhook URL — update after workflow is created
export const N8N_CHAT_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/luxe-chat";

export const TYPING_DELAY_MS = 800;

export const GREETING_MESSAGE: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: "Welcome to Luxe Studio! ✨ I'm your personal concierge. How can I help you today?",
  quickActions: [
    { label: "📅 Book Appointment", url: "https://cal.com/luxe-studio/appointment", type: "link" },
    { label: "💇 View Services", action: "#services", type: "scroll" },
    { label: "📞 Call Us", action: "tel:+12125550199", type: "phone" },
  ],
  timestamp: Date.now(),
};

export const QUICK_REPLIES: readonly QuickReply[] = [
  { label: "Pricing", message: "What are your prices?" },
  { label: "Hours", message: "What are your operating hours?" },
  { label: "Location", message: "Where are you located?" },
  { label: "Book", message: "I'd like to book an appointment" },
];

export const CAL_BOOKING_URL = "https://cal.com/luxe-studio/appointment";
