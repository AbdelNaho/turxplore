import { ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * The filled aubergine action — the house's single accent, used deliberately
 * and only for real transactional moments (the inquiry funnel), never decoration.
 */
const accentClassName =
  "inline-flex items-center justify-center bg-aubergine text-parchment font-sans " +
  "text-caps-label uppercase tracking-[0.14em] px-5 py-3 transition-all duration-interface ease-out " +
  "hover:bg-aubergine2 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-encre " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export const AccentButton = forwardRef<HTMLButtonElement, ButtonProps>(function AccentButton(
  { className, children, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={className ? `${accentClassName} ${className}` : accentClassName}
      {...rest}
    >
      {children}
    </button>
  );
});

type LinkProps = ComponentPropsWithoutRef<"a">;

export const AccentLink = forwardRef<HTMLAnchorElement, LinkProps>(function AccentLink(
  { className, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={className ? `${accentClassName} ${className}` : accentClassName} {...rest}>
      {children}
    </a>
  );
});
