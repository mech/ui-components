"use client";

import { forwardRef } from "react";
import cn from "@/lib/cn";
import { OTPInput } from "input-otp";
import { useController } from "react-hook-form";

// -----
// InputOTP
// -----
const InputOTP = forwardRef(
  (
    {
      className,
      disabled = false,
      name,
      requiredMessage,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const { field } = useController({
      name,
      rules: { required: requiredMessage },
    });

    const classNames = cn(
      "group flex items-center gap-2 has-[:disabled]:opacity-50",
      className,
    );

    // Will have horizontal scroll if not in flex container
    // We also cannot past data-error to the OTPInput component as it is not a valid prop
    return (
      <div className="flex">
        <div className="group flex flex-col" data-error={!!errorMessage}>
          <OTPInput
            ref={field.ref}
            containerClassName={classNames}
            disabled={disabled}
            value={field.value}
            onChange={field.onChange}
            {...props}
          />
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      </div>
    );
  },
);
InputOTP.displayName = "InputOTP";

// -----
// InputOTPGroup
// -----
const InputOTPGroup = forwardRef(({ className, ...props }, ref) => {
  const classNames = cn("flex items-center gap-1", className);

  return <div ref={ref} className={classNames} {...props} />;
});
InputOTPGroup.displayName = "InputOTPGroup";

// -----
// InputOTPSlot
// -----
const InputOTPSlot = forwardRef(
  ({ order = 1, char, hasFakeCaret, isActive, className, ...props }, ref) => {
    const classNames = cn(
      "relative flex h-10 w-10 items-center justify-center border border-gray-400 transition-all first:border-l",
      isActive &&
        "z-50 border-blue-600 ring-4 ring-blue-500 ring-opacity-30 ring-offset-white",
      "group-data-[error=true]:border-red-500 group-data-[error=true]:bg-red-50 group-data-[error=true]:ring-red-500 group-data-[error=true]:ring-opacity-30",
      { "first:rounded-l-md": order === 1 },
      { "last:rounded-r-md": order === 2 },
      { "first:border-r": order === 2 },
      className,
    );

    return (
      <div data-active={isActive} ref={ref} className={classNames} {...props}>
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-black duration-1000" />
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
      <div className="h-1 w-4 rounded-full bg-gray-200" />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === undefined || errorMessage === null) return null;
  if (errorMessage === " ") return null;

  return (
    <div role="alert" className="mt-1 text-sm text-red-500">
      {errorMessage}
    </div>
  );
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
