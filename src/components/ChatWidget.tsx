import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  N8N_CHAT_WEBHOOK_URL,
  GREETING_MESSAGE,
  QUICK_REPLIES,
  TYPING_DELAY_MS,
  PROACTIVE_TRIGGER_DELAY_MS,
  getBrowserLanguage,
  type ChatMessage,
  type QuickAction,
} from "../data/chatData";

interface ChatWidgetProps {
  readonly className?: string;
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function getSessionId(): string {
  const key = "luxe_chat_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

/**
 * Determines the status card style based on message type.
 * Returns icon, label, and color classes for confirmation cards.
 */
function getStatusCard(
  msg: ChatMessage,
): { icon: string; label: string; colorClass: string; borderClass: string; bgClass: string } | null {
  if (msg.isBookingConfirmation) {
    return {
      icon: "check_circle",
      label: "Booking Confirmed",
      colorClass: "text-emerald-400",
      borderClass: "border-emerald-500/20",
      bgClass: "bg-emerald-900/30",
    };
  }
  if (msg.isRescheduleConfirmation) {
    return {
      icon: "update",
      label: "Rescheduled",
      colorClass: "text-blue-400",
      borderClass: "border-blue-500/20",
      bgClass: "bg-blue-900/30",
    };
  }
  if (msg.isCancellationConfirmation) {
    return {
      icon: "cancel",
      label: "Cancelled",
      colorClass: "text-red-400",
      borderClass: "border-red-500/20",
      bgClass: "bg-red-900/30",
    };
  }
  if (msg.isHandoff) {
    return {
      icon: "support_agent",
      label: "Live Support",
      colorClass: "text-amber-400",
      borderClass: "border-amber-500/20",
      bgClass: "bg-amber-900/30",
    };
  }
  if (msg.isComplaint) {
    return {
      icon: "feedback",
      label: "We're On It",
      colorClass: "text-orange-400",
      borderClass: "border-orange-500/20",
      bgClass: "bg-orange-900/30",
    };
  }
  return null;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [proactiveShown, setProactiveShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Proactive engagement: auto-open chat after user lingers on booking section
  useEffect(() => {
    if (proactiveShown || isOpen) return;

    const timer = setTimeout(() => {
      const bookingSection = document.getElementById("booking") ?? document.getElementById("cta");
      if (!bookingSection) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsOpen(true);
            setProactiveShown(true);
            setMessages((prev) => [
              ...prev,
              {
                id: generateId(),
                role: "assistant",
                text: "I noticed you're looking at booking! 👀 Want me to check available time slots for you, or would you prefer to book online yourself?",
                quickActions: [
                  { label: "🤖 Help Me Book", url: undefined, action: undefined, type: "scroll" },
                  { label: "📅 Book Online", url: "https://cal.com/izzydev-studio/30min", type: "link" },
                ],
                timestamp: Date.now(),
              },
            ]);
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(bookingSection);
      return () => observer.disconnect();
    }, PROACTIVE_TRIGGER_DELAY_MS);

    return () => clearTimeout(timer);
  }, [proactiveShown, isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        text: text.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      try {
        const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            sessionId: getSessionId(),
            userName: "Visitor",
            language: getBrowserLanguage(),
          }),
        });

        const data = await response.json();

        const botMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          text: data.response || "I apologize, but I couldn't process that. Please try again or call us at +1 (212) 555-0199.",
          quickActions: data.quickActions as QuickAction[] | undefined,
          availableSlots: data.availableSlots as string[] | undefined,
          isBookingConfirmation: data.isBookingConfirmation as boolean | undefined,
          isRescheduleConfirmation: data.isRescheduleConfirmation as boolean | undefined,
          isCancellationConfirmation: data.isCancellationConfirmation as boolean | undefined,
          isHandoff: data.isHandoff as boolean | undefined,
          isComplaint: data.isComplaint as boolean | undefined,
          timestamp: Date.now(),
        };

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, botMessage]);
          if (!isOpen) setHasUnread(true);
        }, TYPING_DELAY_MS);
      } catch {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: generateId(),
              role: "assistant",
              text: "I'm having trouble connecting right now. Please call us at +1 (212) 555-0199 or try again in a moment.",
              quickActions: [
                { label: "📞 Call Us", action: "tel:+12125550199", type: "phone" },
                { label: "💬 WhatsApp", url: "https://wa.me/12125550199", type: "link" },
              ],
              timestamp: Date.now(),
            },
          ]);
        }, TYPING_DELAY_MS);
      }
    },
    [isOpen],
  );

  const handleQuickAction = (action: QuickAction) => {
    if (action.type === "link" && action.url) {
      window.open(action.url, "_blank", "noopener,noreferrer");
    } else if (action.type === "phone" && action.action) {
      window.location.href = action.action;
    } else if (action.type === "scroll" && action.action) {
      setIsOpen(false);
      document.querySelector(action.action)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-100 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-3rem)] bg-editorial-dark border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "min(520px, calc(100vh - 8rem))" }}
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.97, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-background-dark border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-white text-sm font-bold tracking-wide">Luxe Studio</p>
                  <p className="text-gray-500 text-xs">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <span className="material-icons text-lg">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => {
                const statusCard = msg.role === "assistant" ? getStatusCard(msg) : null;

                return (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-editorial-dark font-medium"
                          : statusCard
                            ? `${statusCard.bgClass} border ${statusCard.borderClass} text-gray-200`
                            : "bg-white/5 text-gray-200"
                      }`}
                    >
                      {statusCard && (
                        <div className={`flex items-center gap-2 mb-2 ${statusCard.colorClass}`}>
                          <span className="material-icons text-base">{statusCard.icon}</span>
                          <span className="text-xs font-bold uppercase tracking-widest">{statusCard.label}</span>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      {msg.availableSlots && msg.availableSlots.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.availableSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => sendMessage(slot)}
                              className="px-3 py-1.5 text-xs font-bold border border-primary/40 text-primary rounded-sm hover:bg-primary hover:text-editorial-dark transition-colors"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}

                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.quickActions.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => handleQuickAction(action)}
                              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider border border-primary/30 text-primary rounded-sm hover:bg-primary/10 transition-colors"
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="bg-white/5 rounded-lg px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="flex gap-2 px-5 pb-2 overflow-x-auto">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.message)}
                    className="shrink-0 px-3 py-1.5 text-xs font-medium border border-white/10 text-gray-400 rounded-full hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 px-5 py-3 border-t border-white/5 bg-background-dark"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="text-primary disabled:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Send message"
              >
                <span className="material-icons text-xl">send</span>
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-primary text-editorial-dark shadow-lg shadow-primary/20 flex items-center justify-center"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "chat"}
            className="material-icons text-2xl"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: "spring", duration: 0.25, bounce: 0 }}
          >
            {isOpen ? "close" : "chat"}
          </motion.span>
        </AnimatePresence>

        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-editorial-dark" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
