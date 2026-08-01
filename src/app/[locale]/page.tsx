import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import {
  DisplaySection,
  EditorialHeadline,
  BodyStandard,
  CapsLabel,
  Caption,
} from "@/components/typography";
import { InviteForm } from "@/components/home/InviteForm";
import { StickyMobileCta } from "@/components/home/StickyMobileCta";
import { ChapterRail } from "@/components/home/ChapterRail";
import { Reveal } from "@/components/home/Reveal";
import { SectionDivider } from "@/components/home/SectionDivider";
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
      <ChapterRail labels={content.voyages.map((v) => v.number)} />

      {/* 01 — L'ouverture */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <Image
          src="/images/hero-sahara.jpg"
          alt="Le Sahara marocain à la dernière lumière"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.86] contrast-[1.03]"
        />
        <div className="relative px-3 pb-9 tablet:px-5 desktop:px-9 desktop:pb-10">
          <Reveal>
            <CapsLabel className="mb-3 block text-bone/90 [text-shadow:0_1px_12px_rgba(27,31,46,0.55)]">
              {content.hero.overline}
            </CapsLabel>
            <h1 className="max-w-2xl font-serif text-display-hero leading-[1.02] tracking-[-0.03em] text-bone [text-shadow:0_4px_28px_rgba(27,31,46,0.45)]">
              {content.hero.title}
            </h1>
            <a
              href="#invite"
              className="mt-5 inline-flex items-center gap-3 font-sans text-interface-label text-bone/95 [text-shadow:0_1px_10px_rgba(27,31,46,0.5)] transition-colors duration-interface ease-out hover:text-ochre"
            >
              {content.hero.cta}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      {/* 02 — La promesse */}
      <section className="py-9 desktop:py-10">
        <Container>
          <div className="grid gap-4 desktop:grid-cols-12">
            <div aria-hidden="true" className="hidden desktop:col-span-1 desktop:block">
              <div className="mx-auto h-full w-px bg-ochre" />
            </div>
            <div className="desktop:col-span-6">
              <Reveal>
                <p className="font-serif italic text-display-section leading-[1.2] text-ink">
                  {content.promise.paragraphs[0]}
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6 desktop:col-span-4 desktop:col-start-9 desktop:pt-3">
              <Reveal delay={0.1}>
                <BodyStandard className="text-slate-500">{content.promise.paragraphs[1]}</BodyStandard>
              </Reveal>
              <Reveal delay={0.2}>
                <BodyStandard className="text-slate-500">{content.promise.paragraphs[2]}</BodyStandard>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — La preuve, en une ligne */}
      <section className="border-y-[0.5px] border-sand-200">
        <Container className="py-6 text-center">
          <Reveal>
            <p className="mx-auto max-w-reading font-serif italic text-editorial-subhead text-slate-500">
              {content.proof}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 04 — Les voyages, en chapitres */}
      <div>
        {content.voyages.map((voyage, i) => {
          const imageFirst = i % 2 === 0;
          return (
            <section
              key={voyage.number}
              id={`voyage-${i + 1}`}
              className="relative flex min-h-[90vh] scroll-mt-20 flex-col border-t-[0.5px] border-sand-200 desktop:flex-row"
            >
              <div
                className={
                  "group relative aspect-[4/5] w-full overflow-hidden desktop:aspect-auto desktop:w-1/2 " +
                  (imageFirst ? "desktop:order-1" : "desktop:order-2")
                }
              >
                <Image
                  src={voyage.image}
                  alt={voyage.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-editorial ease-out group-hover:scale-105"
                />
              </div>
              <div
                className={
                  "relative flex w-full flex-col justify-center overflow-hidden px-3 py-8 tablet:px-5 desktop:w-1/2 desktop:px-9 " +
                  (imageFirst ? "desktop:order-2" : "desktop:order-1")
                }
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2 left-3 select-none font-serif text-display-hero text-ink/[0.06] tablet:left-5 desktop:left-9"
                >
                  {voyage.number}
                </span>
                <Reveal className="relative">
                  <CapsLabel className="text-slate-400">
                    Voyage {voyage.number} · {voyage.duration} · {voyage.segment}
                  </CapsLabel>
                  <EditorialHeadline className="mb-4 mt-3 text-ink">{voyage.title}</EditorialHeadline>
                  <BodyStandard className="mb-4 max-w-reading text-slate-500">
                    {voyage.description}
                  </BodyStandard>
                  <Caption className="text-slate-400">{voyage.price}</Caption>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <SectionDivider />

      {/* 05 — L'invitation */}
      <section id="invite" className="scroll-mt-20 py-9 desktop:py-10">
        <Container>
          <div className="grid gap-4 desktop:grid-cols-12">
            <div className="desktop:col-span-5">
              <Reveal>
                <CapsLabel className="mb-4 block text-slate-400">{content.invite.eyebrow}</CapsLabel>
                <DisplaySection className="mb-4 text-ink">{content.invite.title}</DisplaySection>
                <BodyStandard className="max-w-reading text-slate-500">{content.invite.body}</BodyStandard>
              </Reveal>
            </div>
            <div className="desktop:col-span-6 desktop:col-start-7 desktop:pt-3">
              <Reveal delay={0.1}>
                <InviteForm
                  emailLabel={content.invite.emailLabel}
                  cta={content.invite.cta}
                  confirmation={content.invite.confirmation}
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <StickyMobileCta label={content.hero.cta} />
    </PageShell>
  );
}
