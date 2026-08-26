"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Button that drifts slightly toward the cursor. Pointer-only: touch devices
 * and reduced-motion users get a normal button.
 */
export default function MagneticButton({ children, className = "", strength = 0.35, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    });
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.4 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
