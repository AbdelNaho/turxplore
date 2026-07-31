import { Link } from "@/i18n/navigation";

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
          ? `font-serif text-lg tracking-[0.06em] text-inherit ${className}`
          : "font-serif text-lg tracking-[0.06em] text-inherit"
      }
    >
      Turxplore
    </Link>
  );
}
