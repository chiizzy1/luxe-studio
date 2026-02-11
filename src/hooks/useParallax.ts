import { useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type RefObject } from "react";

interface ParallaxResult {
  readonly ref: RefObject<HTMLDivElement | null>;
  readonly y: MotionValue<number>;
}

/**
 * Reusable parallax hook.
 * Returns a ref and a `y` motion value for parallax offset.
 */
export function useParallax(distance = 100): ParallaxResult {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return { ref, y };
}
