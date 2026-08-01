import { ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * The one place the site uses a filled, colored action — the quick-inquiry
 * funnel the client approved as a deliberate departure from the otherwise
 * text-only interactive register. Ochre fill stays under 5% of any given
 * screen because the button itself is small.
 */
const accentClassName =
  "inline-flex items-center justify-center bg-ochre text-bone font-sans text-interface-label " +
  "px-4 py-2 transition-colors duration-interface ease-out hover:bg-ochre/90 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink " +
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
