import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import {
  DisplayHero,
  DisplaySection,
  EditorialHeadline,
  BodyLarge,
  BodyStandard,
  CapsLabel,
  Caption,
} from "@/components/typography";
import { AccentLink } from "@/components/ui/AccentButton";
import { InviteForm } from "@/components/home/InviteForm";
import { StickyMobileCta } from "@/components/home/StickyMobileCta";
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
            alt="Le Sahara marocain à la dernière lumière"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative bg-ink/60 backdrop-blur-sm">
            <Container className="flex flex-col gap-4 py-7 desktop:py-8">
              <CapsLabel className="text-bone/80">{content.hero.overline}</CapsLabel>
              <DisplayHero className="text-bone">{content.hero.title}</DisplayHero>
              <div>
                <AccentLink href="#invite">{content.hero.cta}</AccentLink>
              </div>
            </Container>
          </div>
        </section>

        {/* 02 — La promesse */}
        <section className="border-t-[0.5px] border-sand-200">
          <Container className="max-w-reading py-8 desktop:py-9">
            <CapsLabel className="mb-5 block text-slate-400">{content.promise.eyebrow}</CapsLabel>
            <div className="flex flex-col gap-6">
              {content.promise.paragraphs.map((paragraph, i) => (
                <BodyLarge key={i} className="text-ink">
                  {paragraph}
                </BodyLarge>
              ))}
            </div>
          </Container>
        </section>

        {/* 03 — La preuve, en une ligne */}
        <section className="border-y-[0.5px] border-sand-200 bg-sand-100">
          <Container className="py-6 text-center">
            <BodyStandard className="mx-auto max-w-reading text-slate-500">{content.proof}</BodyStandard>
          </Container>
        </section>

        {/* 04 — Quatre voyages */}
        <section>
          <Container className="py-8 desktop:py-9">
            <DisplaySection className="mb-6 text-ink">
              {content.voyagesHeading.line1}
              <br />
              {content.voyagesHeading.line2}
            </DisplaySection>

            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
              {content.voyages.map((voyage) => (
                <article key={voyage.number} className="flex flex-col gap-3">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={voyage.image}
                      alt={voyage.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <CapsLabel className="text-slate-400">
                    Voyage {voyage.number} · {voyage.duration} · {voyage.segment}
                  </CapsLabel>
                  <EditorialHeadline className="text-ink">{voyage.title}</EditorialHeadline>
                  <BodyStandard className="text-slate-500">{voyage.description}</BodyStandard>
                  <Caption className="text-slate-400">{voyage.price}</Caption>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* 05 — L'invitation */}
        <section id="invite" className="scroll-mt-20 border-t-[0.5px] border-sand-200 bg-sand-100">
          <Container className="max-w-reading py-8 desktop:py-9">
            <CapsLabel className="mb-4 block text-slate-400">{content.invite.eyebrow}</CapsLabel>
            <DisplaySection className="mb-4 text-ink">{content.invite.title}</DisplaySection>
            <BodyStandard className="mb-6 text-slate-500">{content.invite.body}</BodyStandard>
            <InviteForm
              emailLabel={content.invite.emailLabel}
              cta={content.invite.cta}
              confirmation={content.invite.confirmation}
            />
          </Container>
        </section>

        {/* 06 — Le contact */}
        <section className="border-t-[0.5px] border-sand-200">
          <Container className="py-7 desktop:py-8">
            <CapsLabel className="mb-5 block text-slate-400">{content.contact.eyebrow}</CapsLabel>
            <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3">
              <div>
                <CapsLabel className="mb-2 block text-ochre">{content.contact.travelersLabel}</CapsLabel>
                <BodyStandard className="text-ink">{content.contact.travelersEmail}</BodyStandard>
                <Caption className="text-slate-400">{content.contact.travelersNote}</Caption>
              </div>
              <div>
                <CapsLabel className="mb-2 block text-ochre">{content.contact.advisorsLabel}</CapsLabel>
                <BodyStandard className="text-ink">{content.contact.advisorsEmail}</BodyStandard>
                <Caption className="text-slate-400">{content.contact.advisorsNote}</Caption>
              </div>
              <div>
                <CapsLabel className="mb-2 block text-ochre">{content.contact.responseLabel}</CapsLabel>
                <BodyStandard className="text-slate-500">{content.contact.responseNote}</BodyStandard>
              </div>
            </div>
          </Container>
        </section>
      </div>

      <StickyMobileCta label={content.hero.cta} />
    </PageShell>
  );
}
