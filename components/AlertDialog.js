"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

const AlertDialogPortal = AlertDialogPrimitive.Portal;

// -----
// AlertDialog
// Automatically remove pointer-events: none from <body> so that Combobox can overlap.
// -----
const AlertDialog = forwardRef(({ onOpenChange = () => {}, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Root
      ref={ref}
      onOpenChange={(e) => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 0);

        onOpenChange && onOpenChange(e);
      }}
      {...props}
    />
  );
});
AlertDialog.displayName = AlertDialogPrimitive.Root.displayName;

const AlertDialogTrigger = forwardRef((props, ref) => {
  return <AlertDialogPrimitive.Trigger ref={ref} asChild {...props} />;
});
AlertDialogTrigger.displayName = AlertDialogPrimitive.Trigger.displayName;

const AlertDialogCancel = forwardRef((props, ref) => {
  return <AlertDialogPrimitive.Cancel ref={ref} asChild {...props} />;
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// -----
// AlertDialogOverlay
// -----
const AlertDialogOverlay = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "fixed inset-0 z-50 bg-gray-900/40",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    className,
  );

  return (
    <AlertDialogPrimitive.Overlay ref={ref} className={classNames} {...props} />
  );
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// -----
// AlertDialogContent
// -----
const AlertDialogContent = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = cn(
      "z-50 mx-auto mt-32 transform rounded-lg bg-white px-4 shadow-lg outline-none",
      "w-[95vw] max-w-2xl overflow-scroll",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className,
    );

    return (
      <AlertDialogPortal>
        <AlertDialogOverlay>
          <AlertDialogPrimitive.Content
            ref={ref}
            className={classNames}
            {...props}
          >
            {children}
          </AlertDialogPrimitive.Content>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    );
  },
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

// -----
// AlertDialogTitle
// -----
const AlertDialogTitle = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("py-4 text-lg font-semibold", className);

  return <h1 ref={ref} className={classNames} {...props} />;
});
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

// -----
// AlertDialogFooter
// -----
const AlertDialogFooter = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = cn(
      "sticky bottom-0 flex justify-between border-t bg-white py-4",
      className,
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
};
