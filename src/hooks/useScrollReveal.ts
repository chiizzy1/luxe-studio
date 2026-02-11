import { useRef } from "react";
import { useInView, type UseInViewOptions } from "motion/react";

/**
 * Reusable scroll-reveal hook.
 * Returns a ref and an `isInView` boolean to trigger entrance animations.
 */
export function useScrollReveal(options?: UseInViewOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
    ...options,
  });

  return { ref, isInView };
}
