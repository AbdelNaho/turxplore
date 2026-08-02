"use client";

import { useState } from "react";
import { useActionState } from "react";
import { submitQuickInquiry } from "@/app/actions/inquiry";
import { AccentButton } from "@/components/ui/AccentButton";
import { BodyStandard } from "@/components/typography";

type ChipGroupProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function ChipGroup({ label, name, options, value, onChange }: ChipGroupProps) {
  return (
    <div className="mb-5">
      <p className="mb-3 font-sans text-caps-label uppercase text-ivory/40">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={
              "border-[0.5px] px-4 py-2 font-sans text-interface-body transition-colors duration-interface ease-out " +
              (value === option
                ? "border-clay bg-clay text-night"
                : "border-ivory/10 text-ivory/80 hover:border-clay/40 hover:text-ivory")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

type InviteFormProps = {
  seasonLabel: string;
  seasonOptions: string[];
  intentLabel: string;
  intentOptions: string[];
  emailLabel: string;
  cta: string;
  confirmation: string;
};

export function InviteForm({
  seasonLabel,
  seasonOptions,
  intentLabel,
  intentOptions,
  emailLabel,
  cta,
  confirmation,
}: InviteFormProps) {
  const [state, formAction, pending] = useActionState(submitQuickInquiry, null);
  const [season, setSeason] = useState("");
  const [intent, setIntent] = useState("");

  if (state?.ok) {
    return (
      <BodyStandard className="max-w-reading text-ivory" role="status">
        {confirmation}
      </BodyStandard>
    );
  }

  return (
    <form action={formAction}>
      <ChipGroup
        label={seasonLabel}
        name="saison"
        options={seasonOptions}
        value={season}
        onChange={setSeason}
      />
      <ChipGroup
        label={intentLabel}
        name="envie"
        options={intentOptions}
        value={intent}
        onChange={setIntent}
      />

      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end">
        <div className="flex-1">
          <label htmlFor="quick-email" className="font-sans text-caps-label uppercase text-ivory/40">
            {emailLabel}
          </label>
          <input
            id="quick-email"
            name="email"
            type="email"
            required
            className="w-full border-0 border-b border-ivory/10 bg-transparent py-2 font-serif text-body-standard text-ivory focus:border-clay focus:outline-none"
          />
        </div>
        <AccentButton type="submit" disabled={pending}>
          {cta}
        </AccentButton>
      </div>
      {state && !state.ok ? (
        <p className="mt-3 font-serif italic text-caption text-clay">
          That message did not reach us. Please try again, or write directly to journeys@turxplore.com.
        </p>
      ) : null}
    </form>
  );
}
