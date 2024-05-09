"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useController } from "react-hook-form";

// -----
// RadioGroup
// -----
const RadioGroup = forwardRef(
  ({ name, rules, errorMessage, className, ...props }, ref) => {
    const { field } = useController({ name, rules });
    const classNames = cn("grid gap-2", className);

    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={classNames}
        value={field.value}
        onValueChange={field.onChange}
        {...props}
      />
    );
  },
);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// -----
// RadioGroupItem
// -----
const RadioGroupItem = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "aspect-square h-5 w-5 rounded-full border-2 border-blue-500",
    "ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-blue-500",
    className,
  );

  return (
    <RadioGroupPrimitive.Item ref={ref} className={classNames} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-2 w-2 rounded-full bg-white"></span>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
