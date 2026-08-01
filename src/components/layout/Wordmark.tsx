import { Link } from "@/i18n/navigation";
import { Mark } from "@/components/brand/Mark";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label="Turxplore — home"
      className={
        className
          ? `flex items-center gap-2 font-serif text-lg tracking-[0.06em] text-inherit ${className}`
          : "flex items-center gap-2 font-serif text-lg tracking-[0.06em] text-inherit"
      }
    >
      <Mark className="h-4 w-4" />
      Turxplore
    </Link>
  );
}
