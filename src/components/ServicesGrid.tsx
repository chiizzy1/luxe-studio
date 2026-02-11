import React from "react";
import { motion, type Variants } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SERVICES } from "../data/mockData";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", duration: 0.6, bounce: 0 },
  },
};

interface ServicesGridProps {
  readonly className?: string;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className={`bg-editorial-dark py-32 ${className}`} id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-6"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.6, bounce: 0 }}
        >
          <h2 className="font-serif text-5xl md:text-6xl text-white">Menu</h2>
          <p className="text-gray-400 mt-4 md:mt-0 max-w-xs text-sm">Curated treatments designed for the modern individual.</p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              className="group border-t border-white/10 pt-8 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-primary text-xs font-bold tracking-widest">{service.number}</span>
                  <h3 className="font-serif text-3xl text-white mt-2 group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                </div>
                <motion.span
                  className="material-icons text-gray-600 mt-2 group-hover:text-primary transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                  arrow_forward
                </motion.span>
              </div>
              <p className="text-gray-400 font-light mt-4 text-sm leading-relaxed max-w-md">{service.description}</p>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-4 group-hover:text-white transition-opacity duration-200">
                {service.priceFrom}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
