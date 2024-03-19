"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;
const PopoverAnchor = PopoverPrimitive.Anchor;

// -----
// PopoverTrigger
// -----
const PopoverTrigger = forwardRef((props, ref) => {
  return <PopoverPrimitive.Trigger ref={ref} asChild {...props} />;
});
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

// -----
// PopoverContent
// -----
const PopoverContent = forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    const classNames = cn(
      "z-50 rounded-lg border bg-white p-2 shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      // "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      // "data-[side=bottom]:slide-in-from-top-2",
      // "data-[side=left]:slide-in-from-right-2",
      // "data-[side=right]:slide-in-from-left-2",
      // "data-[side=top]:slide-in-from-bottom-2",
      className,
    );

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={classNames}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent };
