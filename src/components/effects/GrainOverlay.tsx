"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const turbulence = svgRef.current?.querySelector("feTurbulence");
    if (!turbulence) return;

    let frame: number;
    let seed = 0;

    const animate = () => {
      seed = (seed + 1) % 10;
      turbulence.setAttribute("seed", String(seed));
      frame = requestAnimationFrame(() => {
        setTimeout(() => {
          frame = requestAnimationFrame(animate);
        }, 120);
      });
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.032]"
      aria-hidden="true"
    >
      <filter id="turxplore-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.7"
          numOctaves="3"
          stitchTiles="stitch"
          seed="0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#turxplore-grain)" />
    </svg>
  );
}
