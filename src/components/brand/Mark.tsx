type MarkProps = {
  className?: string;
};

/**
 * The Turxplore signature: two squares, one rotated 45°, forming an
 * eight-point star — the same construction underlying Moroccan zellige
 * tessellation, reduced to a Bauhaus-flat line mark. No fill, no
 * gradient, one stroke weight. This is the one recurring graphic
 * signature; everywhere it appears, it appears exactly this way.
 */
export function Mark({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="7" y="7" width="18" height="18" stroke="currentColor" strokeWidth="1.25" />
      <rect
        x="7"
        y="7"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.25"
        transform="rotate(45 16 16)"
      />
    </svg>
  );
}
