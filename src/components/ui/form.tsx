import { ComponentPropsWithoutRef, forwardRef, useId } from "react";

const fieldBaseClassName =
  "w-full bg-transparent border-0 border-b border-ivory/10 py-2 font-sans " +
  "text-interface-body text-ivory placeholder:text-ivory/20 placeholder:italic " +
  "focus:outline-none focus:border-clay transition-colors duration-interface ease-out";

const labelClassName = "font-sans text-caps-label uppercase text-ivory/40";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
};

/** Wraps a real, visible label around a field — never placeholder-as-label. */
function FieldShell({ label, htmlFor, optional, hint, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
        {optional ? " (optional)" : ""}
      </label>
      {children}
      {hint ? <p className="font-serif italic text-caption text-ivory/40">{hint}</p> : null}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  optional?: boolean;
  hint?: string;
};

export const TextField = forwardRef<HTMLInputElement, InputProps>(function TextField(
  { label, optional, hint, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldShell label={label} htmlFor={fieldId} optional={optional} hint={hint}>
      <input
        ref={ref}
        id={fieldId}
        className={className ? `${fieldBaseClassName} ${className}` : fieldBaseClassName}
        {...rest}
      />
    </FieldShell>
  );
});

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  optional?: boolean;
  hint?: string;
};

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaField({ label, optional, hint, id, className, rows = 4, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <FieldShell label={label} htmlFor={fieldId} optional={optional} hint={hint}>
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={
            className
              ? `${fieldBaseClassName} resize-none ${className}`
              : `${fieldBaseClassName} resize-none`
          }
          {...rest}
        />
      </FieldShell>
    );
  },
);
