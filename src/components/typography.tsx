import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type PolymorphicProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "as" | "className" | "children">;

/**
 * Color is deliberately excluded from every base className below. Tailwind
 * utilities have equal specificity, so a color passed via `className` to
 * override a color baked in here would win or lose depending on the
 * generated stylesheet's internal order, not on where it appears in the
 * `class` attribute — an easy, silent bug. Every call site sets its own
 * text color explicitly instead.
 */
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
export const DisplayHero = createTypeComponent("DisplayHero", "font-serif text-display-hero", "h1");

/** 4rem serif, weight 300 — section-opening feature moments. */
export const DisplayFeature = createTypeComponent(
  "DisplayFeature",
  "font-serif text-display-feature",
  "h1",
);

/** 3rem serif — page and chapter titles. */
export const DisplaySection = createTypeComponent(
  "DisplaySection",
  "font-serif text-display-section",
  "h2",
);

/** 2rem serif — article and card headlines. */
export const EditorialHeadline = createTypeComponent(
  "EditorialHeadline",
  "font-serif text-editorial-headline",
  "h3",
);

/** 1.5rem serif italic — subtitles, considered emphasis. */
export const EditorialSubhead = createTypeComponent(
  "EditorialSubhead",
  "font-serif italic text-editorial-subhead",
  "p",
);

/** 1.25rem serif — lead paragraphs. */
export const BodyLarge = createTypeComponent("BodyLarge", "font-serif text-body-large", "p");

/** 1.0625rem serif — the default reading size for prose. */
export const BodyStandard = createTypeComponent("BodyStandard", "font-serif text-body-standard", "p");

/** 0.9375rem sans — interface copy: form help text, footer prose. */
export const InterfaceBody = createTypeComponent(
  "InterfaceBody",
  "font-sans text-interface-body",
  "span",
);

/** 0.8125rem sans, medium — buttons, nav items, field labels. */
export const InterfaceLabel = createTypeComponent(
  "InterfaceLabel",
  "font-sans text-interface-label",
  "span",
);

/** 0.6875rem sans, wide tracking, uppercase — the only place caps appear. */
export const CapsLabel = createTypeComponent(
  "CapsLabel",
  "font-sans text-caps-label uppercase",
  "span",
);

/** 0.875rem serif italic — image credits, colophon lines. */
export const Caption = createTypeComponent("Caption", "font-serif italic text-caption", "span");
