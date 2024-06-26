import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import cn from "@/lib/cn";
import RaceBy from "@/components/RaceBy";

// https://web.dev/articles/building/a-button-component
// https://ui.shadcn.com/docs/components/button
// Can consider: tracking-wide, flex-shrink-0
const variants = cva(
  "inline-flex flex-shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border font-normal ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-100 active:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-primary-border bg-primary text-primary-foreground focus-visible:ring-primary-ring hover:enabled:bg-primary/90",
        secondary:
          "border-secondary-border bg-secondary text-secondary-foreground focus-visible:ring-secondary-ring hover:enabled:bg-secondary/90",
        destructive:
          "border-destructive-border bg-destructive text-destructive-foreground focus-visible:ring-destructive-ring hover:enabled:bg-destructive/90",
        ghost:
          "border-transparent bg-transparent text-foreground focus-visible:ring-secondary-ring hover:enabled:bg-gray-200 dark:hover:enabled:bg-neutral-700",
        plainIcon: "border-transparent",
        bgIcon:
          "rounded-md border-transparent focus:bg-gray-200 focus-visible:ring-secondary-ring hover:enabled:bg-gray-200 dark:focus:bg-neutral-800 dark:hover:enabled:bg-neutral-800",
      },
      size: {
        sm: ["px-2", "py-1", "text-sm"],
        md: ["px-3", "py-1.5", "text-base"],
        lg: ["px-4", "py-2", "text-lg"],
      },
      fullWidth: { true: "w-full active:scale-[0.98]" },
      pill: { true: "rounded-full" },
      outline: { true: "bg-transparent hover:enabled:bg-transparent" },
    },
    compoundVariants: [
      {
        variant: "primary",
        outline: true,
        className: "text-green-600 dark:text-green-400",
      },
      {
        variant: "secondary",
        outline: true,
        className: "border-gray-400 dark:border-neutral-400",
      },
      {
        variant: "destructive",
        outline: true,
        className: "text-red-600 dark:text-red-300",
      },
      {
        variant: "ghost",
        outline: true,
        className: "text-black",
      },
      {
        variant: "plainIcon",
        size: "md",
        className: "p-0",
      },
      {
        variant: "bgIcon",
        size: "md",
        className: "px-4 py-1",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

const SpinnerWithoutLoadingText = ({ variant }) => {
  const spinnerColor = ["secondary", "ghost"].includes(variant)
    ? "#000"
    : "#fff";

  return (
    <div
      aria-live="polite"
      aria-busy
      className="absolute flex w-[calc(100%-1.5rem)] items-center justify-center"
    >
      <RaceBy color={spinnerColor} size={40} />
    </div>
  );
};

const Button = (
  {
    asChild,
    className,
    variant,
    size,
    fullWidth,
    pill,
    outline,
    prefix = null,
    suffix = null,
    loading = false,
    disabled = false,
    children,
    ...props
  },
  ref,
) => {
  const Comp = asChild ? Slot : "button";
  const _disabled = disabled || loading;

  return (
    <Comp
      className={cn(
        variants({
          variant,
          size,
          fullWidth,
          pill,
          outline,
          className,
        }),
        {
          "gap-2": prefix || suffix,
        },
      )}
      type="button"
      ref={ref}
      disabled={_disabled}
      aria-disabled={_disabled}
      tabIndex={_disabled ? -1 : 0}
      {...props}
    >
      <Prefix prefix={prefix} loading={loading} />
      {loading && <SpinnerWithoutLoadingText variant={variant} />}
      {loading ? <span className="invisible">{children}</span> : children}
      <Suffix suffix={suffix} loading={loading} />
    </Comp>
  );
};

const Prefix = ({ prefix, loading }) => {
  if (!prefix) return null;

  return loading ? <div className="opacity-0">{prefix}</div> : prefix;
};

const Suffix = ({ suffix, loading }) => {
  if (!suffix) return null;

  return loading ? <div className="opacity-0">{suffix}</div> : suffix;
};

Button.displayName = "Button";

export default forwardRef(Button);
