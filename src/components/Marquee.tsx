import React from "react";
import { MARQUEE_ITEMS } from "../data/mockData";

interface MarqueeProps {
  readonly className?: string;
}

function MarqueeBand() {
  return (
    <>
      {[...Array(3)].map((_, setIndex) =>
        MARQUEE_ITEMS.map((item, i) => (
          <span
            key={`${setIndex}-${i}`}
            className={`text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter mx-4 sm:mx-8 ${
              item.variant === "stroke" ? "text-stroke-gold opacity-30" : "text-white opacity-20"
            }`}
          >
            {item.text}
          </span>
        )),
      )}
    </>
  );
}

export const Marquee: React.FC<MarqueeProps> = ({ className = "" }) => {
  return (
    <div className={`bg-editorial-dark py-6 overflow-hidden border-b border-white/5 ${className}`}>
      <div className="whitespace-nowrap overflow-hidden">
        <div className="inline-block animate-marquee">
          <MarqueeBand />
        </div>
        <div className="inline-block animate-marquee" aria-hidden="true">
          <MarqueeBand />
        </div>
      </div>
    </div>
  );
};

export default Marquee;
