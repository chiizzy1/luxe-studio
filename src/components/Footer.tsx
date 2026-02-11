import React, { useState, useCallback } from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { BRAND_NAME, FOOTER, OPERATING_HOURS } from "../data/mockData";

const N8N_LEAD_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/luxe-lead";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FooterProps {
  readonly className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || status === "loading") return;

      setStatus("loading");
      try {
        await fetch(N8N_LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source: "luxe-studio-newsletter", timestamp: new Date().toISOString() }),
        });
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    },
    [email, status],
  );

  return (
    <footer ref={ref} className={`bg-background-dark pt-24 pb-12 border-t border-white/5 ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
      >
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand + Address + Hours */}
          <div>
            <h4 className="text-white text-lg font-bold uppercase tracking-widest mb-6">{BRAND_NAME}</h4>
            <address className="not-italic text-gray-400 font-light text-sm leading-loose">
              {FOOTER.address.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < FOOTER.address.length - 1 && <br />}
                </React.Fragment>
              ))}
            </address>
            <div className="mt-6 space-y-1">
              {OPERATING_HOURS.map((item) => (
                <div key={item.day} className="flex justify-between text-xs text-gray-500 max-w-[200px]">
                  <span>{item.day}</span>
                  <span className="tabular-nums">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              {FOOTER.exploreLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Stay Updated</h4>
            {status === "success" ? (
              <p className="text-primary text-sm font-medium">Thanks for subscribing! ✨</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex border-b border-gray-700 pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Email Address"
                  className="bg-transparent border-none text-white w-full placeholder-gray-600 focus:ring-0 px-0 focus:outline-none"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="text-gray-400 hover:text-primary uppercase text-xs font-bold tracking-widest disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Join"}
                </button>
              </form>
            )}
            {status === "error" && <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>}
            <div className="flex space-x-6 mt-8">
              {FOOTER.socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-500 hover:text-primary transition-colors text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Gold Gradient Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent mb-8" />

        {/* Copyright + Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider">
          <p>{FOOTER.copyright}</p>
          <div className="space-x-6 mt-4 md:mt-0">
            {FOOTER.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-gray-400">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
