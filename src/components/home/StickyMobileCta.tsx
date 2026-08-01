type StickyMobileCtaProps = {
  label: string;
};

/** Thumb-reachable CTA on mobile — a floating mark, not a banner. */
export function StickyMobileCta({ label }: StickyMobileCtaProps) {
  return (
    <div className="fixed bottom-3 right-3 z-40 desktop:hidden">
      <a
        href="#invite"
        aria-label={label}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ochre text-bone shadow-card transition-transform duration-interface ease-out active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
