import React from "react";
import { motion } from "motion/react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { BOOKING, OPERATING_HOURS } from "../data/mockData";
import { CAL_BOOKING_URL } from "../data/chatData";

interface BookingCTAProps {
  readonly className?: string;
}

export const BookingCTA: React.FC<BookingCTAProps> = ({ className = "" }) => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section ref={ref} className={`bg-editorial-dark min-h-[600px] flex items-center ${className}`} id="book">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Image Side */}
        <motion.div
          className="relative h-[400px] lg:h-full w-full overflow-hidden"
          initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0 }}
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
          <img src={BOOKING.imageSrc} alt={BOOKING.imageAlt} className="w-full h-full object-cover grayscale opacity-80" />
        </motion.div>

        {/* CTA Side */}
        <motion.div
          className="flex flex-col justify-center px-12 py-20 lg:p-32 bg-editorial-dark border-l border-white/5"
          initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", duration: 0.8, bounce: 0, delay: 0.2 }}
        >
          <h2 className="font-serif text-5xl lg:text-7xl text-white mb-6">
            {BOOKING.headline[0]} <br />
            <span className="italic text-primary">{BOOKING.headline[1]}</span>
          </h2>
          <p className="text-gray-400 text-lg font-light mb-8 max-w-md">{BOOKING.description}</p>

          {/* Operating Hours */}
          <div className="mb-10 max-w-xs">
            <div className="w-8 h-px bg-primary mb-4" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">Hours</h3>
            <dl className="space-y-1.5">
              {OPERATING_HOURS.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <dt className="text-gray-400 font-light">{item.day}</dt>
                  <dd className={`${item.hours === "Closed" ? "text-white/30" : "text-white/80"} tabular-nums`}>{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <motion.a
            href={CAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-fit px-10 py-4 border border-primary text-primary text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-editorial-dark transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {BOOKING.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingCTA;
