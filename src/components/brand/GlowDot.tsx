type GlowDotProps = {
  className?: string;
};

/**
 * The signature within the page content: a small point of light — a lamp
 * in a courtyard at night — that recurs quietly through the site rather
 * than a badge or icon set. Champagne fill, soft glow, nothing else.
 */
export function GlowDot({ className }: GlowDotProps) {
  const base = "inline-block rounded-full bg-champagne shadow-glow";
  return <span aria-hidden="true" className={className ? `${base} ${className}` : base} />;
}
