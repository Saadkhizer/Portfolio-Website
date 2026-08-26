"use client";

import { motion, useReducedMotion } from "framer-motion";

const container = (stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

/** Wrap a list; each direct child should be a <StaggerItem>. */
export function Stagger({ children, className = "", stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      variants={container(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
