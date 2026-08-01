"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Route } from "@/content/home";

type RoutesRailProps = {
  routes: Route[];
  hint: string;
};

export function RoutesRail({ routes, hint }: RoutesRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.min(rail.clientWidth * 0.8, 340);
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {routes.map((route) => (
          <a
            key={route.name}
            href="#invite"
            aria-label={route.name}
            className="group relative flex aspect-[3/2] w-[clamp(240px,72vw,320px)] shrink-0 snap-start items-end overflow-hidden"
          >
            <Image
              src={route.image}
              alt={route.imageAlt}
              fill
              sizes="320px"
              className="object-cover brightness-90 saturate-[0.92] transition-transform duration-editorial ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent" />
            <div className="relative p-5">
              <p className="font-serif text-body-large italic text-ivory">{route.name}</p>
              <p className="mt-1 font-sans text-interface-body text-ivory/40">{route.subtitle}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => scrollBy(-1)}
          className="grid h-11 w-11 place-items-center border-[0.5px] border-champagne/25 text-champagne transition-colors duration-interface ease-out hover:bg-champagne/10 hover:border-champagne"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => scrollBy(1)}
          className="grid h-11 w-11 place-items-center border-[0.5px] border-champagne/25 text-champagne transition-colors duration-interface ease-out hover:bg-champagne/10 hover:border-champagne"
        >
          →
        </button>
        <span className="ml-auto font-sans text-caps-label uppercase text-ivory/20">{hint}</span>
      </div>
    </div>
  );
}
