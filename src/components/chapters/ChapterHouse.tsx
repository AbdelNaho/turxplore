"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BLOCKS = [
  {
    label: "Notre vision",
    title: "Un regard sur\nle Maroc",
    body: "Turxplore n’est pas une agence de voyage. C’est un regard. Une manière de lire le Maroc à travers ses silences autant que ses éclats.",
    image: "/images/Photo H 2.jpg",
    imageAlt: "Architecture traditionnelle marocaine",
    dark: false,
    imageRight: true,
  },
  {
    label: "L’art de composer",
    title: "Chaque voyage est\nune composition",
    body: "Nous composons des itinéraires comme on compose un livre : chaque chapitre a son rythme, sa lumière, ses personnages. Le désert ne ressemble pas à la médina. L’Atlantique ne parle pas comme l’Atlas.",
    image: "/images/Photo E.jpg",
    imageAlt: "Paysage marocain",
    dark: true,
    imageRight: false,
    cta: { label: "Nos expériences", chapter: "experiences" },
  },
  {
    label: "Sur-mesure",
    title: "Une édition\nlimitée",
    body: "Chaque voyage est une édition limitée. Pas de catalogue, pas de circuit. Un dialogue entre vos envies et notre connaissance intime du territoire.",
    image: "/images/Photo A.jpg",
    imageAlt: "Détail artisanal marocain",
    dark: false,
    imageRight: true,
    cta: { label: "Composer votre voyage", chapter: "compose" },
  },
];

function EditorialBlock({ block }: { block: (typeof BLOCKS)[number] }) {
  const textColor = block.dark ? "text-parchment" : "text-encre";
  const bodyColor = block.dark ? "text-parchment/70" : "text-encre/80";
  const labelColor = block.dark ? "text-pierre" : "text-pierre2";

  return (
    <div
      className={`relative overflow-hidden ${
        block.dark ? "bg-encre" : "bg-parchment"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className={`relative aspect-[4/5] desktop:absolute desktop:top-0 desktop:bottom-0 desktop:w-1/2 ${
          block.imageRight ? "desktop:right-0" : "desktop:left-0"
        }`}
      >
        <Image
          src={block.image}
          alt={block.imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-5 desktop:px-7">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`flex flex-col justify-center py-9 desktop:min-h-[600px] desktop:w-[45%] desktop:py-10 ${
            !block.imageRight ? "desktop:ml-auto" : ""
          }`}
        >
          <span
            className={`mb-3 block font-sans text-caps-label uppercase tracking-[0.14em] ${labelColor}`}
          >
            {block.label}
          </span>

          <h3
            className={`font-serif text-display-section uppercase tracking-[0.02em] ${textColor}`}
          >
            {block.title.split("\n").map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {line}
              </span>
            ))}
          </h3>

          <p
            className={`mt-5 max-w-reading font-serif text-body-large leading-relaxed ${bodyColor}`}
          >
            {block.body}
          </p>

          {block.cta && (
            <div className="mt-6">
              <button
                onClick={() => {
                  const el = document.querySelector(
                    `[data-chapter="${block.cta!.chapter}"]`,
                  );
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`border px-5 py-2 font-sans text-interface-label uppercase tracking-[0.14em] transition-colors duration-200 ${
                  block.dark
                    ? "border-parchment bg-parchment text-encre hover:bg-transparent hover:text-parchment"
                    : "border-encre bg-encre text-parchment hover:bg-transparent hover:text-encre"
                }`}
              >
                {block.cta.label}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export function ChapterHouse() {
  return (
    <section data-chapter="house">
      {BLOCKS.map((block, i) => (
        <EditorialBlock key={i} block={block} />
      ))}
    </section>
  );
}
