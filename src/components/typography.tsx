import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PolymorphicProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "as" | "className" | "children">;

function createTypeComponent(name: string, baseClassName: string, defaultElement: ElementType) {
  function TypeComponent({ as, className, children, ...rest }: PolymorphicProps) {
    const Tag = as || defaultElement;
    return (
      <Tag className={className ? `${baseClassName} ${className}` : baseClassName} {...rest}>
        {children}
      </Tag>
    );
  }
  TypeComponent.displayName = name;
  return TypeComponent;
}

/** 6rem serif, weight 300 — homepage hero and other full-screen openings. */
export const DisplayHero = createTypeComponent(
  "DisplayHero",
  "font-serif text-display-hero text-ink",
  "h1",
);

/** 4rem serif, weight 300 — section-opening feature moments. */
export const DisplayFeature = createTypeComponent(
  "DisplayFeature",
  "font-serif text-display-feature text-ink",
  "h1",
);

/** 3rem serif — page and chapter titles. */
export const DisplaySection = createTypeComponent(
  "DisplaySection",
  "font-serif text-display-section text-ink",
  "h2",
);

/** 2rem serif — article and card headlines. */
export const EditorialHeadline = createTypeComponent(
  "EditorialHeadline",
  "font-serif text-editorial-headline text-ink",
  "h3",
);

/** 1.5rem serif italic — subtitles, considered emphasis. */
export const EditorialSubhead = createTypeComponent(
  "EditorialSubhead",
  "font-serif italic text-editorial-subhead text-ink",
  "p",
);

/** 1.25rem serif — lead paragraphs. */
export const BodyLarge = createTypeComponent(
  "BodyLarge",
  "font-serif text-body-large text-ink",
  "p",
);

/** 1.0625rem serif — the default reading size for prose. */
export const BodyStandard = createTypeComponent(
  "BodyStandard",
  "font-serif text-body-standard text-ink",
  "p",
);

/** 0.9375rem sans — interface copy: form help text, footer prose. */
export const InterfaceBody = createTypeComponent(
  "InterfaceBody",
  "font-sans text-interface-body text-ink",
  "span",
);

/** 0.8125rem sans, medium — buttons, nav items, field labels. */
export const InterfaceLabel = createTypeComponent(
  "InterfaceLabel",
  "font-sans text-interface-label text-ink",
  "span",
);

/** 0.6875rem sans, wide tracking, uppercase — the only place caps appear. */
export const CapsLabel = createTypeComponent(
  "CapsLabel",
  "font-sans text-caps-label uppercase text-ink",
  "span",
);

/** 0.875rem serif italic — image credits, colophon lines. */
export const Caption = createTypeComponent(
  "Caption",
  "font-serif italic text-caption text-slate-400",
  "span",
);
