"use client";

import { useActionState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { sendLeadMagnet } from "@/app/actions/leadMagnet";
import { AccentButton } from "@/components/ui/AccentButton";
import { BodyStandard, Caption, CapsLabel, DisplaySection } from "@/components/typography";

type LeadMagnetItem = {
  key: "carnet" | "cartes";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type SharedFormCopy = {
  emailLabel: string;
  cta: string;
  confirmation: string;
  errorNote: string;
};

function LeadMagnetCard({ item, form }: { item: LeadMagnetItem; form: SharedFormCopy }) {
  const [state, formAction, pending] = useActionState(sendLeadMagnet, null);
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-5 border-[0.5px] border-ivory/10 p-6 tablet:flex-row tablet:items-center">
      <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden tablet:h-40 tablet:w-28">
        <Image src={item.image} alt={item.imageAlt} fill sizes="120px" className="object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-body-large italic text-ivory">{item.title}</h3>
        <BodyStandard className="mt-2 text-ivory/55">{item.description}</BodyStandard>

        {state?.ok ? (
          <Caption className="mt-4 block text-clay" role="status">
            {form.confirmation}
          </Caption>
        ) : (
          <form action={formAction} className="mt-4 flex flex-col gap-3 tablet:flex-row tablet:items-end">
            <input type="hidden" name="magnet" value={item.key} />
            <input type="hidden" name="locale" value={locale} />
            <div className="flex-1">
              <label
                htmlFor={`lead-email-${item.key}`}
                className="font-sans text-caps-label uppercase text-ivory/40"
              >
                {form.emailLabel}
              </label>
              <input
                id={`lead-email-${item.key}`}
                name="email"
                type="email"
                required
                className="w-full border-0 border-b border-ivory/10 bg-transparent py-2 font-serif text-body-standard text-ivory focus:border-clay focus:outline-none"
              />
            </div>
            <AccentButton type="submit" disabled={pending}>
              {form.cta}
            </AccentButton>
          </form>
        )}
        {state && !state.ok ? (
          <p className="mt-3 font-serif italic text-caption text-clay">{form.errorNote}</p>
        ) : null}
      </div>
    </div>
  );
}

type LeadMagnetsProps = {
  eyebrow: string;
  title: string;
  titleEm: string;
  body: string;
  items: LeadMagnetItem[];
} & SharedFormCopy;

export function LeadMagnets({ eyebrow, title, titleEm, body, items, ...form }: LeadMagnetsProps) {
  return (
    <div>
      <CapsLabel className="mb-4 block text-clay/60">{eyebrow}</CapsLabel>
      <DisplaySection className="italic text-ivory">
        {title} <span className="text-clay">{titleEm}</span>
      </DisplaySection>
      <BodyStandard className="mb-8 mt-3 max-w-reading text-ivory/50">{body}</BodyStandard>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
        {items.map((item) => (
          <LeadMagnetCard key={item.key} item={item} form={form} />
        ))}
      </div>
    </div>
  );
}
