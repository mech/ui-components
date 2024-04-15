"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { useController } from "react-hook-form";

const Checkbox = forwardRef(({ className, name, ...props }, ref) => {
  const { field } = useController({
    name,
    defaultValue: props.checked || false,
  });

  const classNames = cn(
    "peer h-5 w-5 shrink-0 rounded-md border-2 border-blue-500 ring-offset-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-blue-500 data-[state=indeterminate]:bg-blue-500",
    className,
  );

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={classNames}
      checked={field.value}
      onCheckedChange={field.onChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.checked === "indeterminate" ? (
          <IndeterminateIcon />
        ) : (
          <CheckmarkIcon />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CheckmarkIcon = () => {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      strokeWidth="2"
      stroke="#fff"
      strokeDasharray="16"
      strokeOpacity="1"
      strokeDashoffset="0"
      focusable={false}
    >
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </svg>
  );
};

const IndeterminateIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2">
      <path
        fill="none"
        fillRule="evenodd"
        stroke="#fff"
        strokeLinecap="square"
        strokeWidth="2"
        d="M1 1h8"
      />
    </svg>
  );
};

export { Checkbox };
