"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretDown } from "@phosphor-icons/react";

const Accordion = AccordionPrimitive.Root;

// -----
// AccordionItem
// -----
const AccordionItem = forwardRef(
  ({ outline = true, className, ...props }, ref) => {
    const classNames = cn(
      "overflow-hidden outline-none first:rounded-t-lg last:rounded-b-lg",
      {
        "focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-blue-500":
          outline,
      },
      className,
    );

    return (
      <AccordionPrimitive.Item ref={ref} className={classNames} {...props} />
    );
  },
);
AccordionItem.displayName = "AccordionItem";

// -----
// AccordionTrigger
// -----
const AccordionTrigger = forwardRef(
  ({ className, arrow = true, children, ...props }, ref) => {
    const classNames = cn(
      "flex flex-1 items-center justify-between font-semibold outline-none transition-all [&[data-state=open]>.accordion-arrow]:rotate-180",
      className,
    );

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger ref={ref} className={classNames} {...props}>
          {children}
          {arrow && (
            <CaretDown
              size={16}
              weight="bold"
              className="accordion-arrow shrink-0 transition-transform duration-300"
            />
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// -----
// AccordionContent
// -----
const AccordionContent = forwardRef(
  ({ className, children, ...props }, ref) => {
    const classNames = cn(
      "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    );

    return (
      <AccordionPrimitive.Content ref={ref} className={classNames} {...props}>
        <div className={cn("", className)}>{children}</div>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
