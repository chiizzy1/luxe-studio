import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { GALLERY } from "../data/mockData";

interface GalleryProps {
  readonly className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = GALLERY.galleryImages;

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const currentImage = images[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, filter: "blur(4px)" }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, filter: "blur(4px)" }),
  };

  return (
    <section ref={ref} className={`bg-editorial-light text-editorial-dark py-32 overflow-hidden ${className}`} id="gallery">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end min-h-[800px]">
          {/* Left Column — Carousel */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-end h-full pb-12"
            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.2 }}
          >
            {/* Watermark */}
            <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] font-black leading-none tracking-tighter text-editorial-dark/[0.07] mb-4">
              GALLERY
            </h2>

            <p className="font-serif italic text-2xl mb-8">{GALLERY.subtitle}</p>

            {/* Carousel image */}
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm mb-6 shadow-2xl relative bg-editorial-dark/5 group">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between border-t border-editorial-dark/20 pt-4">
              <span className="text-xs uppercase tracking-widest tabular-nums">
                {currentImage.label} &nbsp;·&nbsp; {GALLERY.collection}
              </span>
              <div className="flex space-x-4">
                <button
                  onClick={goToPrev}
                  className="hover:text-primary transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <span className="material-icons">west</span>
                </button>
                <button
                  onClick={goToNext}
                  className="hover:text-primary transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <span className="material-icons">east</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="lg:col-span-1 hidden lg:block" />

          {/* Right Column — Feature Portrait */}
          <motion.div
            className="lg:col-span-7 pt-24 lg:pt-0"
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ type: "spring", duration: 0.7, bounce: 0, delay: 0.4 }}
          >
            <div className="w-full aspect-[4/5] overflow-hidden rounded-sm shadow-2xl group">
              <img
                src={GALLERY.portraitFemale.src}
                alt={GALLERY.portraitFemale.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-3xl italic">{GALLERY.featureTitle}</h3>
              <p className="text-sm mt-2 text-editorial-dark/70 max-w-xs">{GALLERY.featureDescription}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
