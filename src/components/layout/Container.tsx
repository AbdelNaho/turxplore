import { ReactNode } from "react";

type HtmlTag = "div" | "section" | "article" | "main" | "aside" | "header" | "footer" | "nav";

type ContainerProps = {
  as?: HtmlTag;
  children: ReactNode;
  className?: string;
};

export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  const base = "mx-auto max-w-content px-3 tablet:px-5 desktop:px-7";
  return <Tag className={className ? `${base} ${className}` : base}>{children}</Tag>;
}

type ReadingColumnProps = {
  as?: HtmlTag;
  children: ReactNode;
  className?: string;
};

export function ReadingColumn({ as: Tag = "div", children, className }: ReadingColumnProps) {
  const base = "mx-auto max-w-reading";
  return <Tag className={className ? `${base} ${className}` : base}>{children}</Tag>;
}
