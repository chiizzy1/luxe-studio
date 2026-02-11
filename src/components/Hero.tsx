import React from "react";
import { motion, type Variants } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { HERO } from "../data/mockData";

const headlineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.7, bounce: 0 },
  },
};

interface HeroProps {
  readonly className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();

  return (
    <header ref={ref} className={`relative min-h-screen pt-20 flex items-center overflow-hidden bg-editorial-dark ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 relative z-10 py-12">
          <motion.p
            className="text-primary text-sm uppercase tracking-[0.3em] mb-6"
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          >
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 text-white"
            variants={headlineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {HERO.headline.map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariant}
                className={`block ${i === 1 ? "italic text-primary/90 font-light" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-gray-400 font-light text-lg max-w-md leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 0.8 }}
          >
            {HERO.description}
          </motion.p>

          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.5, bounce: 0, delay: 1 }}
          >
            <a
              href={HERO.cta.href}
              className="border-b border-primary pb-1 text-sm uppercase tracking-widest hover:text-primary transition-colors"
            >
              {HERO.cta.label}
            </a>
            <span className="material-icons text-primary text-sm">arrow_forward</span>
          </motion.div>
        </div>

        {/* Portrait */}
        <div className="lg:col-span-5 relative h-[600px] w-full flex items-center justify-center lg:justify-end">
          {/* Gold Arc SVG */}
          <svg
            className="absolute -top-12 -left-12 w-64 h-64 text-primary/20 z-0 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            viewBox="0 0 100 100"
          >
            <path d="M10,50 A40,40 0 1,1 90,50" />
            <path d="M20,50 A30,30 0 1,1 80,50" />
            <path d="M30,50 A20,20 0 1,1 70,50" />
          </svg>

          <motion.div
            className="relative z-10 w-full h-full max-h-[550px] overflow-hidden rounded-sm"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 1, bounce: 0, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-editorial-dark via-transparent to-transparent opacity-40 z-20" />
            <motion.img
              src={HERO.portraitSrc}
              alt={HERO.portraitAlt}
              className="w-full h-full object-cover object-top grayscale contrast-110"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </motion.div>

          {/* Vogue Badge */}
          <motion.div
            className="absolute -bottom-6 -right-6 z-30 bg-editorial-dark p-6 border border-white/10 max-w-[200px] hidden md:block"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.6, bounce: 0, delay: 1.2 }}
          >
            <p className="font-serif italic text-2xl text-primary">{HERO.vogue.quote}</p>
            <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">{HERO.vogue.attribution}</p>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
