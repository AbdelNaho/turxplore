import { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** The 12/6/4-column shell with the brief's minimum edge margins baked in. */
export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  const base = "mx-auto max-w-content px-3 tablet:px-5 desktop:px-7";
  return <Tag className={className ? `${base} ${className}` : base}>{children}</Tag>;
}

type ReadingColumnProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** The editorial reading column — 6 desktop columns, ~66 characters at body size. */
export function ReadingColumn({ as: Tag = "div", children, className }: ReadingColumnProps) {
  const base = "mx-auto max-w-reading";
  return <Tag className={className ? `${base} ${className}` : base}>{children}</Tag>;
}
