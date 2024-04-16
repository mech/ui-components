"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight } from "lucide-react";

const DropdownMenu = DropdownMenuPrimitive.Root;
// const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// -----
// DropdownMenuTrigger
// -----
const DropdownMenuTrigger = forwardRef((props, ref) => {
  return <DropdownMenuPrimitive.Trigger ref={ref} asChild {...props} />;
});
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

// -----
// DropdownMenuContent
// -----
const DropdownMenuContent = forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => {
    const classNames = cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1.5 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2",
      "data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2",
      "data-[side=top]:slide-in-from-bottom-2",
      "dark:shadow-xl",
      className,
    );

    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          className={classNames}
          sideOffset={sideOffset}
          collisionPadding={{ left: 16, right: 16 }}
          align="start"
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// -----
// DropdownMenuItem
// -----
const DropdownMenuItem = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "flex select-none items-center gap-2 rounded-md px-2 py-1.5 outline-none focus:bg-popover-focus hover:active:bg-popover-active data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  );

  return (
    <DropdownMenuPrimitive.Item ref={ref} className={classNames} {...props} />
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// -----
// DropdownMenuLabel
// -----
const DropdownMenuLabel = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "flex select-none gap-2 px-2 py-1.5 font-semibold",
    className,
  );

  return (
    <DropdownMenuPrimitive.Label ref={ref} className={classNames} {...props} />
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// -----
// DropdownMenuSeparator
// -----
const DropdownMenuSeparator = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("-mx-1 my-1.5 h-px bg-border", className);

  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={classNames}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// -----
// DropdownMenuSubTrigger
// -----
const DropdownMenuSubTrigger = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = cn(
      "flex select-none items-center gap-2 rounded-md px-2 py-1.5 outline-none focus:bg-popover-focus hover:active:bg-popover-active",
      className,
    );

    return (
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
        <ChevronRight size={20} className="ml-auto" />
      </DropdownMenuPrimitive.SubTrigger>
    );
  },
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

// -----
// DropdownMenuSubContent
// -----
const DropdownMenuSubContent = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn(
    "z-50 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1.5 shadow-lg",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
    "dark:shadow-3xl",
    className,
  );

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={classNames}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

// -----
// DropdownMenuShortcut
// -----
const DropdownMenuShortcut = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("ml-auto tracking-widest opacity-50", className);

  return <span ref={ref} className={classNames} {...props} />;
});
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// -----
// DropdownMenuEmptyIcon
// -----
const DropdownMenuEmptyIcon = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("w-5", className);

  return <span ref={ref} className={classNames} {...props} />;
});
DropdownMenuEmptyIcon.displayName = "DropdownMenuEmptyIcon";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
  DropdownMenuEmptyIcon,
};
