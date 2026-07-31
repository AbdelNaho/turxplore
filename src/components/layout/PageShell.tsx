import { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  /** Full-bleed hero sections manage their own top spacing against the fixed header. */
  offsetHeader?: boolean;
};

export function PageShell({ children, offsetHeader = true }: PageShellProps) {
  return (
    <main
      id="main-content"
      className={offsetHeader ? "flex-1 pt-6 desktop:pt-6" : "flex-1"}
    >
      {children}
    </main>
  );
}
