import { AccentLink } from "@/components/ui/AccentButton";

type StickyMobileCtaProps = {
  label: string;
};

/** Thumb-reachable CTA on mobile, per the approved fast-funnel direction. */
export function StickyMobileCta({ label }: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[0.5px] border-sand-200 bg-bone p-3 desktop:hidden">
      <AccentLink href="#invite" className="w-full">
        {label}
      </AccentLink>
    </div>
  );
}
