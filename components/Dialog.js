"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircle } from "@phosphor-icons/react";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// -----
// DialogOverlay
// -----
const DialogOverlay = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "fixed inset-0 z-50 bg-gray-900/40",
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
const DialogContent = forwardRef(({ className, children, ...props }, ref) => {
  const classNames = cn(
    "z-50 mx-auto mt-16 transform rounded-lg bg-white px-4 shadow-lg outline-none",
    "max-h-[calc(100%-128px)] w-[95vw] max-w-5xl overflow-scroll",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    className,
  );

  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogPrimitive.Content ref={ref} className={classNames} {...props}>
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

// -----
// DialogHeader
// -----
const DialogHeader = forwardRef(({ className, children, ...props }, ref) => {
  const classNames = cn(
    "sticky top-0 z-50 flex items-center justify-between border-b bg-white/95 py-4 font-semibold backdrop-blur-sm",
  );

  return (
    <div ref={ref} className={classNames} {...props}>
      {children}
      <DialogClose className="rounded-full hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:opacity-50">
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
    "sticky bottom-0 flex justify-between border-t bg-white py-4",
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
