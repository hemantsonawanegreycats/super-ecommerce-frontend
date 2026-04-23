export const transitions = {
  instant:   { duration: 0.1, ease: 'easeOut' },
  fast:      { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] },  // easeOutCubic
  normal:    { duration: 0.25, ease: [0.0, 0.0, 0.2, 1] },
  slow:      { duration: 0.4,  ease: [0.0, 0.0, 0.2, 1] },
  spring:    { type: 'spring', stiffness: 300, damping: 30 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 20 },
} as const;

export const variants = {
  fadeIn:     { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp:    { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
  slideRight: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
  scaleIn:    { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  stagger:    { visible: { transition: { staggerChildren: 0.06 } } },
} as const;
