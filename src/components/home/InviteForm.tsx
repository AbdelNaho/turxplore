"use client";

import { useActionState } from "react";
import { submitQuickInquiry } from "@/app/actions/inquiry";
import { AccentButton } from "@/components/ui/AccentButton";
import { BodyStandard } from "@/components/typography";

type InviteFormProps = {
  emailLabel: string;
  cta: string;
  confirmation: string;
};

export function InviteForm({ emailLabel, cta, confirmation }: InviteFormProps) {
  const [state, formAction, pending] = useActionState(submitQuickInquiry, null);

  if (state?.ok) {
    return (
      <BodyStandard className="max-w-reading text-ink" role="status">
        {confirmation}
      </BodyStandard>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 tablet:flex-row tablet:items-end">
      <div className="flex-1">
        <label htmlFor="quick-email" className="font-sans text-caps-label uppercase text-slate-400">
          {emailLabel}
        </label>
        <input
          id="quick-email"
          name="email"
          type="email"
          required
          className="w-full border-0 border-b border-sand-200 bg-transparent py-2 font-serif text-body-standard text-ink focus:border-ink focus:outline-none"
        />
      </div>
      <AccentButton type="submit" disabled={pending}>
        {cta}
      </AccentButton>
      {state && !state.ok ? (
        <p className="font-serif italic text-caption text-ochre">
          That message did not reach us. Please try again, or write directly to hello@turxplore.com.
        </p>
      ) : null}
    </form>
  );
}
