import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Link } from "@/i18n/navigation";

/**
 * The house has no colored CTA buttons — every interactive element reads as
 * text with a hover underline. This is the one visual style shared by
 * navigational links and form actions alike.
 */
const interactiveClassName =
  "font-sans text-interface-label text-ivory/80 border-b border-transparent " +
  "transition-colors duration-interface ease-out hover:text-champagne hover:border-champagne " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-champagne";

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

/** A locale-aware navigational link, styled as considered text, not a button. */
export const TextLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function TextLink({ className, children, ...rest }, ref) {
    return (
      <Link
        ref={ref}
        className={className ? `${interactiveClassName} ${className}` : interactiveClassName}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);

type ExternalLinkProps = ComponentPropsWithoutRef<"a">;

/** For links leaving the site (mailto:, tel:, external references). */
export const ExternalTextLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  function ExternalTextLink({ className, children, ...rest }, ref) {
    return (
      <a
        ref={ref}
        className={className ? `${interactiveClassName} ${className}` : interactiveClassName}
        {...rest}
      >
        {children}
      </a>
    );
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button">;

/** Form submissions and other in-page actions — same register as TextLink. */
export const TextButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function TextButton({ className, children, type = "button", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={className ? `${interactiveClassName} ${className}` : interactiveClassName}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
