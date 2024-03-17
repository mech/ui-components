"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

// -----
// RadioGroup
// -----
const RadioGroup = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("grid gap-2", className);

  return (
    <RadioGroupPrimitive.Root ref={ref} className={classNames} {...props} />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// -----
// RadioGroupItem
// -----
const RadioGroupItem = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "aspect-square h-5 w-5 rounded-full border-2 border-blue-500",
    "ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  return (
    <RadioGroupPrimitive.Item ref={ref} className={classNames} {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
