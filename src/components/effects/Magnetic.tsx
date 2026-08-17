"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * strength,
      y: (e.clientY - (top + height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.1,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
