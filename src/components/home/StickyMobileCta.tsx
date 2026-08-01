import { AccentLink } from "@/components/ui/AccentButton";

type StickyMobileCtaProps = {
  label: string;
};

/** Thumb-reachable CTA on mobile — a full-width bar, blurred over the night canvas. */
export function StickyMobileCta({ label }: StickyMobileCtaProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[0.5px] border-ivory/10 bg-night/90 px-3 py-3 backdrop-blur-xl desktop:hidden">
      <AccentLink href="#invite" className="w-full">
        {label}
      </AccentLink>
    </div>
  );
}
