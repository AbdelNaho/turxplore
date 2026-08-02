import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import { DisplaySection, EditorialHeadline, BodyStandard, CapsLabel, Caption } from "@/components/typography";
import { AccentLink } from "@/components/ui/AccentButton";
import { InviteForm } from "@/components/home/InviteForm";
import { StickyMobileCta } from "@/components/home/StickyMobileCta";
import { Reveal } from "@/components/home/Reveal";
import { Marquee } from "@/components/home/Marquee";
import { RoutesRail } from "@/components/home/RoutesRail";
import { LeadMagnets } from "@/components/home/LeadMagnets";
import { GlowDot } from "@/components/brand/GlowDot";
import { homeContent } from "@/content/home";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // es / pt-BR content pending native translation — falls back to English.
  const content = homeContent[locale === "fr" ? "fr" : "en"];

  return (
    <PageShell offsetHeader={false}>
      <div className="pb-20 desktop:pb-0">
        {/* 01 — L'ouverture */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
          <Image
            src="/images/hero-sahara.jpg"
            alt="Une dune du Sahara marocain sous un ciel bleu pur"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.65] saturate-[0.9]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/25 to-night/50" />
          <Container className="relative flex flex-col gap-5 pb-9 desktop:max-w-2xl desktop:pb-10">
            <Reveal>
              <GlowDot className="mb-5 h-[6px] w-[6px]" />
              <h1 className="font-serif text-display-hero italic leading-[0.95] tracking-[-0.03em] text-ivory">
                {content.hero.title}
                <br />
                <span className="text-clay">{content.hero.titleEm}</span>
              </h1>
              <p className="mt-5 max-w-md font-serif text-body-standard text-ivory/70">
                {content.hero.subtitle}
              </p>
              <div className="mt-7">
                <AccentLink href="#invite">{content.hero.cta}</AccentLink>
              </div>
            </Reveal>
          </Container>
        </section>

        <Marquee items={content.marquee} />

        {/* 02 — La conviction */}
        <section id="atelier" className="scroll-mt-20 py-9 desktop:py-10">
          <Container className="max-w-reading">
            <Reveal>
              <CapsLabel className="mb-6 block text-clay/60">{content.promise.eyebrow}</CapsLabel>
            </Reveal>
            <div className="flex flex-col gap-6">
              {content.promise.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="font-serif text-body-large text-ivory/80">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.24}>
              <p className="mt-9 border-t-[0.5px] border-ivory/10 pt-7 font-serif text-body-large italic text-clay">
                {content.proof}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* 03 — Les quatre voyages */}
        <section id="compositions" className="scroll-mt-20 py-9 desktop:py-10">
          <Container>
            <Reveal>
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <DisplaySection className="italic text-ivory">
                  {content.voyagesHeading.line1}
                  <br />
                  <span className="text-clay">{content.voyagesHeading.line2}</span>
                </DisplaySection>
                <a
                  href="#invite"
                  className="inline-flex items-center gap-3 font-sans text-interface-label uppercase tracking-[0.2em] text-clay transition-all duration-interface ease-out hover:gap-4"
                >
                  {content.invite.eyebrow}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-[3px] tablet:grid-cols-2 desktop:grid-cols-4">
              {content.voyages.map((voyage, i) => (
                <Reveal key={voyage.number} delay={i * 0.06}>
                  <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden">
                    <Image
                      src={voyage.image}
                      alt={voyage.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover brightness-[0.92] saturate-[0.92] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/95 via-night/25 to-night/10" />
                    <span className="absolute left-5 top-5 font-sans text-caps-label uppercase text-clay/80">
                      Voyage {voyage.number} · {voyage.duration}
                    </span>
                    <div className="relative p-6">
                      <p className="mb-2 font-sans text-caps-label uppercase text-clay/70">
                        {voyage.segment}
                      </p>
                      <h3 className="font-serif text-body-large italic leading-tight text-ivory">
                        {voyage.title}
                      </h3>
                      <p className="mt-2 max-h-none overflow-hidden font-sans text-interface-body text-ivory/50 opacity-100 transition-all duration-editorial ease-out tablet:max-h-0 tablet:opacity-0 tablet:group-hover:max-h-32 tablet:group-hover:opacity-100">
                        {voyage.description}
                      </p>
                      <Caption className="mt-3 block text-clay/70">{voyage.price}</Caption>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* 04 — Sur mesure */}
        <section className="border-y-[0.5px] border-ivory/10 bg-ember py-9 text-center desktop:py-10">
          <Container className="max-w-reading">
            <Reveal>
              <GlowDot className="mx-auto mb-7 h-[9px] w-[9px]" />
              <EditorialHeadline className="text-ivory">
                {content.tailorMade.headline}
                <br />
                <span className="font-serif italic text-clay">{content.tailorMade.headlineEm}</span>
              </EditorialHeadline>
              <BodyStandard className="mx-auto mt-6 max-w-md text-ivory/60">
                {content.tailorMade.body}
              </BodyStandard>
              <a
                href="#invite"
                className="mt-7 inline-block border-[0.5px] border-clay/25 px-8 py-4 font-sans text-interface-label uppercase tracking-[0.2em] text-clay transition-colors duration-interface ease-out hover:bg-clay/10 hover:border-clay"
              >
                {content.tailorMade.cta}
              </a>
            </Reveal>
          </Container>
        </section>

        {/* 05 — Par où commencer */}
        <section id="destinations" className="scroll-mt-20 py-9 desktop:py-10">
          <Container>
            <Reveal>
              <DisplaySection className="italic text-ivory">{content.routesHeading.title}</DisplaySection>
              <BodyStandard className="mb-7 mt-3 max-w-md text-ivory/50">
                {content.routesHeading.body}
              </BodyStandard>
            </Reveal>
            <RoutesRail routes={content.routes} hint={content.routesHeading.hint} />
          </Container>
        </section>

        {/* 05b — Emporter le Maroc (lead magnets) */}
        <section className="border-t-[0.5px] border-ivory/10 py-9 desktop:py-10">
          <Container>
            <Reveal>
              <LeadMagnets {...content.leadMagnets} />
            </Reveal>
          </Container>
        </section>

        {/* 06 — L'invitation */}
        <section id="invite" className="scroll-mt-20 border-t-[0.5px] border-ivory/10">
          <Container className="grid gap-8 py-9 desktop:grid-cols-12 desktop:py-10">
            <div className="desktop:col-span-7">
              <Reveal>
                <CapsLabel className="mb-4 block text-clay/60">{content.invite.eyebrow}</CapsLabel>
                <DisplaySection className="mb-5 italic text-ivory">{content.invite.title}</DisplaySection>
                <BodyStandard className="mb-7 max-w-reading text-ivory/50">{content.invite.body}</BodyStandard>
                <InviteForm
                  seasonLabel={content.invite.seasonLabel}
                  seasonOptions={content.invite.seasonOptions}
                  intentLabel={content.invite.intentLabel}
                  intentOptions={content.invite.intentOptions}
                  emailLabel={content.invite.emailLabel}
                  cta={content.invite.cta}
                  confirmation={content.invite.confirmation}
                  errorNote={content.invite.errorNote}
                />
              </Reveal>
            </div>

            <div className="flex flex-col gap-6 desktop:col-span-4 desktop:col-start-9 desktop:justify-center">
              <Reveal delay={0.1}>
                <CapsLabel className="mb-2 block text-clay/70">
                  {content.contact.travelersLabel}
                </CapsLabel>
                <BodyStandard className="text-ivory">{content.contact.travelersEmail}</BodyStandard>
                <Caption className="text-ivory/40">{content.contact.travelersNote}</Caption>
              </Reveal>
              <Reveal delay={0.16}>
                <CapsLabel className="mb-2 block text-clay/70">{content.contact.advisorsLabel}</CapsLabel>
                <BodyStandard className="text-ivory">{content.contact.advisorsEmail}</BodyStandard>
                <Caption className="text-ivory/40">{content.contact.advisorsNote}</Caption>
              </Reveal>
              <Reveal delay={0.22}>
                <CapsLabel className="mb-2 block text-clay/70">{content.contact.responseLabel}</CapsLabel>
                <BodyStandard className="text-ivory/50">{content.contact.responseNote}</BodyStandard>
              </Reveal>
            </div>
          </Container>
        </section>
      </div>

      <StickyMobileCta label={content.hero.cta} />
    </PageShell>
  );
}
