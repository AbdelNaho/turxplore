"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const RESOURCES = [
  {
    title: "Carte du Maroc",
    description: "Carte éditoriale illustrée à l'aquarelle.",
    image: "/images/carte du maroc.jpg",
    file: "/downloads/carte-maroc.pdf",
  },
  {
    title: "Les Notes de Marge",
    description: "Darija, coutumes, contacts.",
    image: "/images/le carnet secret.jpg",
    file: "/downloads/carnet-secrets.pdf",
  },
];

export function SectionRessources() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="bg-parchment py-6 desktop:py-7"
      data-chapter="ressources"
    >
      <div className="mx-auto max-w-content px-5 desktop:px-7">
        <span className="mb-4 block font-sans text-caps-label uppercase tracking-[0.14em] text-pierre2">
          Hors-Texte
        </span>

        <div className="grid grid-cols-2 gap-4 desktop:gap-5">
          {RESOURCES.map((res, i) => (
            <ResourceCard key={res.title} resource={res} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({
  resource,
  index,
  inView,
}: {
  resource: (typeof RESOURCES)[number];
  index: number;
  inView: boolean;
}) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subject = encodeURIComponent(`Turxplore — ${resource.title}`);
    const body = encodeURIComponent(
      `Bonjour,\n\nVoici votre ressource "${resource.title}" demandée sur turxplore.com.\n\nBonne découverte du Maroc.\n\n— L'équipe Turxplore`,
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowForm(false);
      setEmail("");
    }, 3000);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        className="relative aspect-[3/2] cursor-pointer overflow-hidden rounded-[0.25rem]"
        onClick={() => !showForm && setShowForm(true)}
      >
        <Image
          src={resource.image}
          alt={resource.title}
          fill
          sizes="(min-width: 1024px) 40vw, 50vw"
          className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-[1.04]"
        />

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-encre/85 backdrop-blur-sm"
            >
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-sans text-interface-label text-parchment"
                >
                  Envoyé !
                </motion.p>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full max-w-[85%] flex-col gap-2 px-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="mb-1 text-center font-sans text-interface-body text-parchment/70">
                    Recevoir par email
                  </p>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full border-b border-parchment/30 bg-transparent px-0 py-1.5 text-center font-sans text-interface-body text-parchment placeholder:text-parchment/30 outline-none focus:border-parchment/60"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="font-sans text-interface-body text-parchment/40 transition-colors hover:text-parchment/70"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-aubergine px-4 py-1.5 font-sans text-interface-body text-parchment transition-colors hover:bg-aubergine2"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h3
        className="mt-2 cursor-pointer font-serif text-body-standard text-encre"
        onClick={() => !showForm && setShowForm(true)}
      >
        {resource.title}
      </h3>
      <p className="mt-0.5 font-sans text-interface-body text-encre2/60">
        {resource.description}
      </p>
      <button
        onClick={() => setShowForm(true)}
        className="mt-2 inline-flex items-center gap-1.5 border-b border-encre/20 pb-0.5 font-sans text-caption uppercase tracking-[0.1em] text-encre/70 transition-colors duration-200 hover:border-encre/50 hover:text-encre"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-3 w-3"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M3 14h10" />
        </svg>
        Télécharger
      </button>
    </motion.article>
  );
}
