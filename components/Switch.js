"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import { useController } from "react-hook-form";

const rootVariants = cva(
  [
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-primary data-[state=unchecked]:bg-border",
    "dark:data-[state=unchecked]:bg-input",
    "data-[error=true]:border data-[error=true]:border-red-500 data-[error=true]:ring-4 data-[error=true]:ring-red-500 data-[error=true]:ring-opacity-30",
  ],
  {
    variants: {
      size: {
        sm: ["h-6 w-10"],
        md: ["h-8 w-14"],
        lg: ["h-8 w-14"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white ring-0 transition-transform will-change-transform",
    "data-[state=checked]:border-white",
  ],
  {
    variants: {
      size: {
        sm: [
          "h-4 w-4",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-1",
        ],
        md: [
          "h-6 w-6",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
        ],
        lg: [
          "h-6 w-6",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
        ],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const Switch = forwardRef(({ name, rules, className, size, ...props }, ref) => {
  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: props.defaultChecked || false,
  });

  const errors = fieldState.error;
  const hasError = !!errors;

  const classNames = cn(rootVariants({ size, className }));

  return (
    <SwitchPrimitive.Root
      ref={field.ref}
      className={classNames}
      checked={field.value}
      onCheckedChange={field.onChange}
      data-error={hasError}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
