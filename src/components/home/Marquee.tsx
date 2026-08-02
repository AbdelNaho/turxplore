type MarqueeProps = {
  items: string[];
};

/** A slow, continuous ticker of reassurances. Pure CSS, pauses under reduced motion. */
export function Marquee({ items }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-[0.5px] border-ivory/10 bg-clay/[0.06]"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-7 py-3 font-sans text-caps-label uppercase tracking-[0.25em] text-clay/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
