type GlowDotProps = {
  className?: string;
};

/**
 * A quiet recurring mark rather than a badge or icon set — a single
 * pierre-toned dot, flat, no glow (glows are forbidden by the design system).
 */
export function GlowDot({ className }: GlowDotProps) {
  const base = "inline-block rounded-full bg-pierre";
  return <span aria-hidden="true" className={className ? `${base} ${className}` : base} />;
}
