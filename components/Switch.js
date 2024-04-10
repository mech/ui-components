"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useController } from "react-hook-form";

const Switch = forwardRef(({ className, ...props }, ref) => {
  // const { field } = useController({
  //   name,
  //   rules: { required: requiredMessage },
  //   defaultValue: props.checked || false,
  // });

  const classNames = cn(
    "peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200",
    "data-[error=true]:border data-[error=true]:border-red-500 data-[error=true]:ring-4 data-[error=true]:ring-red-500 data-[error=true]:ring-opacity-30",
    className,
  );

  return (
    <SwitchPrimitive.Root
      // ref={field.ref}
      ref={ref}
      className={classNames}
      // checked={field.value}
      // onCheckedChange={field.onChange}
      // data-error={!!errorMessage}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-6 w-6 rounded-full bg-white ring-0 transition-transform will-change-transform",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1 data-[state=checked]:border-white",
        )}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
