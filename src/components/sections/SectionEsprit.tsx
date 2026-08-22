"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PILLARS = [
  {
    title: "Où vous voulez",
    body: "Chaque riad, chaque route, chaque artisan — nous connaissons le Maroc dans ses moindres recoins, bien au-delà des guides.",
  },
  {
    title: "Comme vous voulez",
    body: "Chaque voyage est composé sur mesure — itinéraire, rythme, accès privés — une partition unique écrite pour vous.",
  },
  {
    title: "Quand vous voulez",
    body: "Présents sur le terrain, disponibles en temps réel — La Casa vous accompagne 24/7, le voyage libre et bien encadré.",
  },
];

export function SectionEsprit() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="bg-parchment py-9 desktop:py-10">
      <div className="mx-auto max-w-[960px] px-5 desktop:px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="mb-3 block font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2">
            Ce que nous faisons pour vous
          </span>
          <h2 className="font-serif text-display-section text-encre">
            L&apos;esprit <em className="italic">turxplore</em>
          </h2>
          <p className="mx-auto mt-3 max-w-[400px] font-serif text-body-standard italic text-pierre2">
            Composer en toute liberté selon vos envies, vos rêves, vos
            exigences.
          </p>
        </motion.div>

        <div className="mx-auto my-7 h-px w-5 bg-pierre/40" />

        <div className="grid gap-6 tablet:grid-cols-3 tablet:gap-5">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 h-8 w-8 tablet:h-10 tablet:w-10">
                {i === 0 && <IconWhere />}
                {i === 1 && <IconHow />}
                {i === 2 && <IconWhen />}
              </div>
              <h3 className="mb-2 font-serif text-editorial-headline text-encre">
                {pillar.title}
              </h3>
              <p className="max-w-[240px] font-sans text-interface-body leading-relaxed text-pierre2">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex flex-col items-center justify-center gap-3 tablet:flex-row tablet:gap-4"
        >
          <a
            href="https://wa.me/212697047692"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-pierre/40 px-5 py-2 font-sans text-interface-label uppercase tracking-[0.14em] text-encre transition-colors duration-200 hover:border-encre"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:contact@turxplore.com"
            className="inline-flex items-center gap-2 rounded-full bg-encre px-5 py-2 font-sans text-interface-label uppercase tracking-[0.14em] text-parchment transition-colors duration-200 hover:bg-encre2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function IconWhere() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 4C25.6 4 14 15.2 14 29.2C14 48 40 76 40 76C40 76 66 48 66 29.2C66 15.2 54.4 4 40 4Z"
        fill="#4E2E3C"
      />
      <path
        d="M32 44V28C32 22.5 35.6 18 40 18C44.4 18 48 22.5 48 28V44H44V28C44 24.7 42.2 22 40 22C37.8 22 36 24.7 36 28V44Z"
        fill="#F0EAD8"
      />
      <rect
        x="28"
        y="34"
        width="24"
        height="2.5"
        rx="1"
        fill="#F0EAD8"
        opacity=".4"
      />
      <rect
        x="30"
        y="40"
        width="20"
        height="2"
        rx="1"
        fill="#F0EAD8"
        opacity=".3"
      />
      <rect
        x="38"
        y="12"
        width="4"
        height="5"
        rx="1"
        fill="#F0EAD8"
        opacity=".5"
      />
      <circle cx="40" cy="30" r="2.5" fill="#F0EAD8" />
    </svg>
  );
}

function IconHow() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="8" width="52" height="64" rx="8" fill="#4E2E3C" />
      <rect x="20" y="14" width="40" height="52" rx="4" fill="#F0EAD8" />
      <path d="M40 28L44 32L40 36L36 32Z" fill="#4E2E3C" />
      <path d="M40 24L44 28L40 32L36 28Z" fill="#4E2E3C" opacity=".5" />
      <path d="M40 32L44 36L40 40L36 36Z" fill="#4E2E3C" opacity=".5" />
      <path d="M36 28L32 32L36 36L40 32Z" fill="#4E2E3C" opacity=".35" />
      <path d="M44 28L48 32L44 36L40 32Z" fill="#4E2E3C" opacity=".35" />
      <rect
        x="26"
        y="46"
        width="28"
        height="2"
        rx="1"
        fill="#4E2E3C"
        opacity=".2"
      />
      <rect
        x="26"
        y="51"
        width="22"
        height="2"
        rx="1"
        fill="#4E2E3C"
        opacity=".15"
      />
      <rect
        x="26"
        y="56"
        width="16"
        height="2"
        rx="1"
        fill="#4E2E3C"
        opacity=".1"
      />
      <path d="M54 10L58 6L62 10L58 14Z" fill="#1F1B15" opacity=".9" />
      <path d="M58 14L56 18L60 18Z" fill="#1F1B15" opacity=".6" />
    </svg>
  );
}

function IconWhen() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 4C24 4 12 14 12 28V48C12 62 24 76 40 76C56 76 68 62 68 48V28C68 14 56 4 40 4Z"
        fill="#4E2E3C"
      />
      <circle cx="40" cy="36" r="16" fill="#F0EAD8" />
      <rect
        x="39"
        y="22"
        width="2"
        height="4"
        rx="1"
        fill="#4E2E3C"
        opacity=".5"
      />
      <rect
        x="39"
        y="46"
        width="2"
        height="4"
        rx="1"
        fill="#4E2E3C"
        opacity=".5"
      />
      <rect
        x="54"
        y="35"
        width="4"
        height="2"
        rx="1"
        fill="#4E2E3C"
        opacity=".5"
      />
      <rect
        x="22"
        y="35"
        width="4"
        height="2"
        rx="1"
        fill="#4E2E3C"
        opacity=".5"
      />
      <line
        x1="40"
        y1="36"
        x2="40"
        y2="27"
        stroke="#1F1B15"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="40"
        y1="36"
        x2="48"
        y2="36"
        stroke="#1F1B15"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="40" cy="36" r="2" fill="#1F1B15" />
      <path
        d="M34 58C34 55 36 52 40 52C36.5 52 34 55 34 58C34 61 36.5 64 40 64C36 64 34 61 34 58Z"
        fill="#F0EAD8"
        opacity=".6"
      />
      <circle cx="48" cy="58" r="1.5" fill="#F0EAD8" opacity=".7" />
      <circle cx="52" cy="54" r="1" fill="#F0EAD8" opacity=".5" />
      <circle cx="44" cy="62" r="1" fill="#F0EAD8" opacity=".4" />
    </svg>
  );
}
