import { Mark } from "@/components/brand/Mark";

/** Hairline · mark · hairline — the signature standing in for a plain rule. */
export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 border-t-[0.5px] border-sand-200 py-4" aria-hidden="true">
      <div className="h-px flex-1 bg-sand-200" />
      <Mark className="h-3 w-3 shrink-0 text-ochre" />
      <div className="h-px flex-1 bg-sand-200" />
    </div>
  );
}
