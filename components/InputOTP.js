"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import { OTPInput } from "input-otp";

// -----
// InputOTP
// -----
const InputOTP = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("flex items-center gap-2", className);

  return <OTPInput ref={ref} containerClassName={classNames} {...props} />;
});
InputOTP.displayName = "InputOTP";

// -----
// InputOTPGroup
// -----
const InputOTPGroup = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("flex items-center", className);

  return <div ref={ref} className={classNames} {...props} />;
});
InputOTPGroup.displayName = "InputOTPGroup";

// -----
// InputOTPSlot
// -----
const InputOTPSlot = forwardRef(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
    const classNames = cn(
      "border-input relative flex h-10 w-10 items-center justify-center border-y border-r transition-all first:rounded-l-md first:border-l last:rounded-r-md",
      isActive && "z-10 ring-2 ring-blue-500 ring-offset-white",
      className,
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink h-4 w-px bg-black duration-1000" />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

// -----
// InputOTPSeparator
// -----
const InputOTPSeparator = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className="flex items-center justify-center"
      {...props}
    >
      <div className="h-1 w-3 rounded-full bg-gray-200" />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
