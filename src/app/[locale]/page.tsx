import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/layout/Container";
import {
  DisplayHero,
  DisplaySection,
  EditorialHeadline,
  EditorialSubhead,
  BodyStandard,
  CapsLabel,
  Caption,
} from "@/components/typography";
import { TextLink } from "@/components/ui/interactive";

/**
 * Foundation preview — confirms tokens, type scale, and layout shell render
 * correctly. Phase B replaces this with the six-section homepage.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <Container as="section" className="flex min-h-[70vh] flex-col justify-center gap-6">
        <CapsLabel>Foundation preview — phase A</CapsLabel>
        <DisplayHero>Morocco, composed.</DisplayHero>
        <EditorialSubhead className="max-w-reading">
          The homepage itself arrives in phase B. This screen exists to prove the
          type scale, spacing, and palette before any editorial content is laid over them.
        </EditorialSubhead>
      </Container>

      <Container as="section" className="flex flex-col gap-8 py-9">
        <DisplaySection>Editorial headline</DisplaySection>
        <EditorialHeadline>An editorial headline, set in serif</EditorialHeadline>
        <BodyStandard className="max-w-reading">
          Body copy is always serif, always generously leaded. Turxplore composes
          journeys through Morocco with those who know it from within — the
          atelier does not visit the country, it belongs to it.
        </BodyStandard>
        <Caption>A caption, set in serif italic — for credits and asides.</Caption>
        <TextLink href="/about">Continue to the atelier</TextLink>
      </Container>
    </PageShell>
  );
}
