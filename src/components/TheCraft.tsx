import React from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useParallax } from "../hooks/useParallax";
import { THE_CRAFT } from "../data/mockData";

interface TheCraftProps {
  readonly className?: string;
}

export const TheCraft: React.FC<TheCraftProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();
  const { ref: parallaxRef, y } = useParallax(40);

  return (
    <section
      ref={ref}
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-editorial-dark border-t border-white/5 ${className}`}
    >
      {/* Blurred background — parallax */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <motion.img
          src={THE_CRAFT.backgroundSrc}
          alt={THE_CRAFT.backgroundAlt}
          className="w-full h-full object-cover blur-[50px] opacity-40 scale-110"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Golden Arc */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none opacity-30"
        preserveAspectRatio="none"
        viewBox="0 0 1000 600"
      >
        <path d="M-100,50 C200,50 300,550 1100,550" fill="none" stroke="#eead2b" strokeWidth="1" />
      </svg>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-7xl px-6">
        {/* Mobile section title */}
        <h2 className="lg:hidden font-serif italic text-3xl text-primary mb-8 text-center">The Craft</h2>

        <div className="flex items-center justify-between w-full relative">
          {/* Vertical "THE" */}
          <motion.div
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.3 }}
          >
            <span className="writing-vertical text-6xl font-light tracking-[0.2em] text-white/20 font-[Inter]">THE</span>
          </motion.div>

          {/* Video Frame */}
          <motion.div
            className="w-full lg:w-[70%] mx-auto relative group"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.2 }}
          >
            <div className="relative w-full aspect-video border border-editorial-dark/80 bg-black overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <motion.img
                src={THE_CRAFT.videoSrc}
                alt={THE_CRAFT.videoAlt}
                className="w-full h-full object-cover opacity-90"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Vertical "CRAFT" */}
          <motion.div
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.3 }}
          >
            <span className="writing-vertical text-6xl font-serif font-bold italic text-primary tracking-widest rotate-180">
              CRAFT
            </span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.div
          className="mt-12 text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.6 }}
        >
          <p className="font-serif italic text-2xl text-surface-warm leading-relaxed opacity-90">"{THE_CRAFT.tagline}"</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TheCraft;
