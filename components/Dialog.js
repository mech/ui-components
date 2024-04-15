"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircle } from "@phosphor-icons/react";

// Problem with pointer-event: none locking
// https://github.com/radix-ui/primitives/issues/1859
// https://github.com/radix-ui/primitives/issues/2219

const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// -----
// Dialog
// Automatically remove pointer-events: none from <body> so that Combobox can overlap.
// -----
const Dialog = forwardRef(({ onOpenChange = () => {}, ...props }, ref) => {
  return (
    <DialogPrimitive.Root
      ref={ref}
      onOpenChange={(e) => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 0);

        onOpenChange && onOpenChange(e);
      }}
      {...props}
    />
  );
});
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = forwardRef((props, ref) => {
  return <DialogPrimitive.Trigger ref={ref} asChild {...props} />;
});
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

// -----
// DialogOverlay
// -----
const DialogOverlay = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "bg-gray-900/40 fixed inset-0 z-50",
    "dark:bg-neutral-900/70",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    className,
  );

  return (
    <DialogPrimitive.Overlay ref={ref} className={classNames} {...props} />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// -----
// DialogContent
// -----
const DialogContent = forwardRef(
  ({ preventClose = false, className, children, ...props }, ref) => {
    const classNames = cn(
      "z-50 mx-auto mt-16 transform rounded-lg bg-background px-4 shadow-lg outline-none",
      "max-h-[calc(100%-128px)] w-[95vw] max-w-5xl overflow-scroll",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "dark:bg-neutral-800 dark:border dark:shadow-2xl",
      className,
    );

    const onInteractOutside = (e) => {
      if (preventClose) {
        e.preventDefault();
      } else {
        props.onInteractOutside && props.onInteractOutside(e);
      }
    };

    return (
      <DialogPortal>
        <DialogOverlay>
          <DialogPrimitive.Content
            ref={ref}
            className={classNames}
            onInteractOutside={onInteractOutside}
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </DialogOverlay>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

// -----
// DialogHeader
// -----
const DialogHeader = forwardRef(({ className, children, ...props }, ref) => {
  const classNames = cn(
    "sticky top-0 z-50 flex items-center justify-between border-b bg-background/95 py-4 font-semibold backdrop-blur-sm",
    "dark:dark:bg-neutral-800/95",
    className,
  );

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
      <DialogClose className="focus-visible:ring-blue-500 rounded-full hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 active:opacity-50">
        <XCircle size="32" weight="fill" />
      </DialogClose>
    </div>
  );
});
DialogHeader.displayName = "DialogHeader";

// -----
// DialogFooter
// -----
const DialogFooter = forwardRef(({ className, children, ...props }, ref) => {
  const classNames = cn(
    "sticky bottom-0 flex justify-between border-t bg-background py-4",
    "dark:bg-neutral-800",
    className,
  );

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
    </div>
  );
});
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
};
