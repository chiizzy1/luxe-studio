import React from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { BRAND_STATEMENT, BRAND_HIGHLIGHTS } from "../data/mockData";

interface BrandStatementProps {
  readonly className?: string;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();

  const highlightWord = (text: string) => {
    const words = text.split(" ");
    return words.map((word, i) => {
      const cleanWord = word.replace(/[.,]/g, "");
      const isHighlighted = BRAND_HIGHLIGHTS.includes(cleanWord.toLowerCase());
      return (
        <React.Fragment key={i}>
          {isHighlighted ? <span className="text-primary italic">{word}</span> : word}
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      );
    });
  };

  return (
    <section ref={ref} className={`bg-editorial-dark py-32 border-b border-white/5 ${className}`} id="about">
      <motion.div
        className="max-w-5xl mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ type: "spring", duration: 0.7, bounce: 0 }}
      >
        <blockquote className="font-serif text-3xl md:text-5xl leading-tight text-white/90 text-center">
          "{highlightWord(BRAND_STATEMENT)}"
        </blockquote>
      </motion.div>
    </section>
  );
};

export default BrandStatement;
