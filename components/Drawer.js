"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import { cva } from "class-variance-authority";
import * as DrawerPrimitive from "@radix-ui/react-dialog";

const Drawer = DrawerPrimitive.Root;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerTrigger = forwardRef((props, ref) => {
  return <DrawerPrimitive.Trigger ref={ref} asChild {...props} />;
});
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName;

// -----
// DrawerOverlay
// -----
const DrawerOverlay = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "fixed z-50 bg-gray-900/40",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    className,
  );

  return (
    <DrawerPrimitive.Overlay ref={ref} className={classNames} {...props} />
  );
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// -----
// DrawerContent
// -----
const variants = cva(
  "fixed z-50 gap-4 overflow-scroll bg-gray-50 shadow-lg shadow-gray-100 transition ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 rounded-b-xl border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 rounded-t-xl border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "bottom-0 left-0 top-0 m-4 rounded-xl border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "bottom-0 right-0 top-0 m-4 rounded-xl border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const DrawerContent = forwardRef(
  ({ side = "right", className, children, ...props }, ref) => {
    const classNames = cn(variants({ side }), className);

    return (
      <DrawerPortal>
        <DrawerPrimitive.Content ref={ref} className={classNames} {...props}>
          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    );
  },
);
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerClose,
  DrawerTrigger,
  DrawerOverlay,
  DrawerContent,
};
