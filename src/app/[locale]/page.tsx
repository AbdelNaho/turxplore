import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { ChapterEntry } from "@/components/chapters/ChapterEntry";
import { ChapterExperiences } from "@/components/chapters/ChapterExperiences";
import { ChapterHouse } from "@/components/chapters/ChapterHouse";
import { ChapterCompose } from "@/components/chapters/ChapterCompose";
import { SectionRessources } from "@/components/sections/SectionRessources";
import { PoinconNav } from "@/components/layout/PoinconNav";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell offsetHeader={false}>
      <PoinconNav />
      <ChapterEntry />
      <ChapterExperiences />
      <ChapterHouse />
      <ChapterCompose />
      <SectionRessources />
    </PageShell>
  );
}
