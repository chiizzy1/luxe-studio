import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { TESTIMONIALS } from "../data/mockData";

interface TestimonialProps {
  readonly className?: string;
}

const AUTO_ADVANCE_MS = 6000;

export const Testimonial: React.FC<TestimonialProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(advance, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isInView, advance]);

  const current = TESTIMONIALS[activeIndex];

  const highlightedQuote = current.quote.split(current.highlightWord).map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="text-primary italic">{current.highlightWord}</span>}
    </React.Fragment>
  ));

  return (
    <section ref={ref} className={`bg-editorial-dark py-32 border-t border-white/5 ${className}`}>
      <motion.div
        className="max-w-4xl mx-auto px-6 md:px-12 text-center"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
      >
        {/* Quote carousel */}
        <div className="relative min-h-[180px] md:min-h-[140px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeIndex}
              className="font-serif italic text-2xl md:text-4xl leading-snug text-white/90 absolute"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            >
              "{highlightedQuote}"
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="w-12 h-px bg-primary mx-auto mb-6" />

        {/* Author with crossfade */}
        <div className="relative h-6 flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.cite
              key={activeIndex}
              className="not-italic text-sm text-gray-400 uppercase tracking-widest absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {current.author}
            </motion.cite>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View testimonial ${i + 1}`}
              className="group relative p-1"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-primary scale-100" : "bg-white/20 scale-75 group-hover:bg-white/40"
                }`}
              />
              {/* Progress ring for active dot */}
              {i === activeIndex && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-primary/40"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: [0, 1, 0] }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  key={`ring-${activeIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonial;
