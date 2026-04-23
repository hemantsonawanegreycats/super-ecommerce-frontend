import { Transition, Variants } from "framer-motion";

/**
 * Unified Micro-interactions & Framer Motion Variants
 * (A12)
 */
export const transitions: Record<string, Transition> = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    type: "tween",
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.3,
  },
};

export const variants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: transitions.smooth },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: transitions.spring },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: transitions.spring },
  },
};
