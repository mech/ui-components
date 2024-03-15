import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import cn from "@/lib/cn";
import RaceBy from "@/components/RaceBy";

// https://web.dev/articles/building/a-button-component
// https://ui.shadcn.com/docs/components/button
// Can consider: tracking-wide, flex-shrink-0
const variants = cva(
  "inline-flex flex-shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-100 active:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-green-600 bg-green-500 text-white focus-visible:ring-green-500 hover:enabled:bg-green-500/90",
        secondary:
          "border-gray-300 bg-gray-200 text-black focus-visible:ring-gray-400",
        destructive:
          "border-red-600 bg-red-500 text-white focus-visible:ring-red-500 hover:enabled:bg-red-500/90",
        ghost:
          "border-transparent bg-white text-black focus-visible:ring-gray-400 hover:enabled:bg-gray-200",
        plainIcon: "border-transparent",
        bgIcon:
          "rounded border-transparent focus:bg-gray-100 active:bg-gray-200 hover:enabled:bg-gray-100",
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
        className: "text-green-600",
      },
      {
        variant: "secondary",
        outline: true,
        className: "border-gray-400 bg-white text-black",
      },
      {
        variant: "destructive",
        outline: true,
        className: "text-red-600",
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
      ref={ref}
      disabled={_disabled}
      aria-disabled={_disabled}
      tabIndex={_disabled ? -1 : 0}
      {...props}
    >
      {prefix}
      {loading && <SpinnerWithoutLoadingText variant={variant} />}
      {loading ? <span className="invisible">{children}</span> : children}
      {suffix}
    </Comp>
  );
};

Button.displayName = "Button";

export default forwardRef(Button);
