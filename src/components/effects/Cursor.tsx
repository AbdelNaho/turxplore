"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

export function Cursor() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [inverted, setInverted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(false);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const checkDarkSection = useCallback((x: number, y: number) => {
    const el = document.elementFromPoint(x, y);
    if (!el) return;
    const darkAncestor = el.closest('[data-theme="dark"]');
    setInverted(!!darkAncestor);
  }, []);

  useEffect(() => {
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice.current || reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
      checkDarkSection(e.clientX, e.clientY);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const updateHover = () => {
      const hoverEls = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor-label]',
      );

      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setHovered(true);
          const lbl = el.getAttribute("data-cursor-label");
          if (lbl) setLabel(lbl);
        });
        el.addEventListener("mouseleave", () => {
          setHovered(false);
          setLabel(null);
        });
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    updateHover();
    const observer = new MutationObserver(updateHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, reduceMotion, visible, checkDarkSection]);

  if (reduceMotion) return null;

  const dotColor = inverted ? "bg-parchment" : "bg-aubergine";
  const ringBorder = inverted
    ? "border-parchment/60 bg-parchment/10"
    : "border-encre/30 bg-encre/5";
  const labelColor = inverted ? "text-encre" : "text-parchment";

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: hovered ? (label ? 80 : 48) : 10,
          height: hovered ? (label ? 80 : 48) : 10,
          opacity: visible ? 1 : 0,
          marginLeft: hovered ? (label ? -40 : -24) : -5,
          marginTop: hovered ? (label ? -40 : -24) : -5,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 24 },
          height: { type: "spring", stiffness: 300, damping: 24 },
          opacity: { duration: 0.15 },
          marginLeft: { type: "spring", stiffness: 300, damping: 24 },
          marginTop: { type: "spring", stiffness: 300, damping: 24 },
        }}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full border transition-colors duration-200 ${
            hovered
              ? `${ringBorder} backdrop-blur-sm`
              : `border-transparent ${dotColor}`
          }`}
        >
          {label && hovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`font-sans text-[9px] font-medium uppercase tracking-[0.16em] ${labelColor}`}
            >
              {label}
            </motion.span>
          )}
        </div>
      </motion.div>
    </>
  );
}
