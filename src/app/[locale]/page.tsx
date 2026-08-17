import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { ChapterEntry } from "@/components/chapters/ChapterEntry";
import { ChapterJourneys } from "@/components/chapters/ChapterJourneys";
import { ChapterMorocco } from "@/components/chapters/ChapterMorocco";
import { ChapterExperiences } from "@/components/chapters/ChapterExperiences";
import { ChapterHouse } from "@/components/chapters/ChapterHouse";
import { ChapterCompose } from "@/components/chapters/ChapterCompose";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell offsetHeader={false}>
      <ChapterEntry />
      <ChapterJourneys />
      <ChapterMorocco />
      <ChapterExperiences />
      <ChapterHouse />
      <ChapterCompose />
    </PageShell>
  );
}
