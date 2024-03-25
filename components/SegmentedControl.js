"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import "./SegmentedControl.css";

// -----
// SegmentedControlRoot
// -----
const SegmentedControlRoot = forwardRef(
  ({ size = "md", children, className, ...props }, ref) => {
    const classNames = cn("rt-SegmentedControlRoot", className);

    return (
      <ToggleGroupPrimitive.Root
        data-control="segmented-control"
        data-size={size}
        type="single"
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
        <div className="rt-SegmentedControlIndicator" />
      </ToggleGroupPrimitive.Root>
    );
  },
);
SegmentedControlRoot.displayName = "SegmentedControlRoot";

// -----
// SegmentedControlItem
// -----
const SegmentedControlItem = forwardRef(
  ({ children, className, ...props }, ref) => {
    const classNames = cn("rt-SegmentedControlItem", className);

    const labelClassNames = cn("rt-SegmentedControlItemLabel");

    return (
      <ToggleGroupPrimitive.Item ref={ref} className={classNames} {...props}>
        <span className="rt-SegmentedControlItemSeparator" />
        <span className="rt-SegmentedControlItemLabel">
          <span className="rt-SegmentedControlItemLabelActive">{children}</span>
          <span className="rt-SegmentedControlItemLabelInactive">
            {children}
          </span>
        </span>
      </ToggleGroupPrimitive.Item>
    );
  },
);
SegmentedControlItem.displayName = "SegmentedControlItem";

export { SegmentedControlRoot, SegmentedControlItem };
