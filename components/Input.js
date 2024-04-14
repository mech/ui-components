"use client";

import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import cn from "@/lib/cn";
import { Info, SealWarning } from "@phosphor-icons/react";

// Using focus-within to style inner input
// group and group-focus-within

const sizeVariants = cva([], {
  variants: {
    size: {
      sm: ["px-2 py-1 text-sm"],
      md: ["p-1.5 text-base"], // p-[0.3125rem]
      lg: ["text-lg"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      size,
      helpText,
      errorMessage,
      prefix,
      suffix,
      prefixStyling = true,
      suffixStyling = true,
      className,
      ...props
    },
    ref,
  ) => {
    const id = `input-${useId()}`;

    const labelClassNames = cn("absolute -top-3 left-2 bg-white px-1 text-sm", {
      "text-red-500": errorMessage,
      "-top-2.5 text-xs": size === "sm",
    });

    const prefixSuffixClassNames =
      "flex items-center border-gray-400 text-black group-focus-within:border-blue-600 group-data-[invalid=true]:border-red-500";

    return (
      <div
        data-control="input"
        className={cn("w-full", {
          "opacity-50": props.disabled,
        })}
      >
        <div
          data-invalid={!!errorMessage}
          className={cn(
            "group relative flex w-full rounded-md border border-gray-400 text-black transition ease-in-out file:border-0 file:bg-transparent focus-within:border-blue-600 focus-within:text-blue-500 focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-opacity-30 focus:outline-none data-[invalid=true]:border-red-500 data-[invalid=true]:ring-4 data-[invalid=true]:ring-red-500 data-[invalid=true]:ring-opacity-30",
          )}
        >
          <label htmlFor={id} className={labelClassNames}>
            {label}
          </label>
          <input
            id={id}
            type={type}
            ref={ref}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            data-invalid={!!errorMessage}
            className={cn(
              sizeVariants({ size }),
              "order-2 w-full appearance-none rounded-md text-black outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              {
                "pl-2": prefix,
                "pr-2": suffix,
                "pl-1": !prefixStyling,
                "pr-1": !suffixStyling,
              },
              className,
            )}
            {...props}
          />
          {prefix && (
            <span
              className={cn(prefixSuffixClassNames, "order-1 rounded-l-md", {
                "border-r px-2": prefixStyling,
                "pl-2": !prefixStyling,
              })}
            >
              {prefix}
            </span>
          )}

          {suffix && !errorMessage && (
            <span
              className={cn(prefixSuffixClassNames, "order-3 rounded-r-md", {
                "border-l px-2": suffixStyling,
                "pr-2": !suffixStyling,
              })}
            >
              {suffix}
            </span>
          )}

          {!!errorMessage && (
            <span
              className={cn(
                prefixSuffixClassNames,
                "order-3 rounded-r-md px-2",
              )}
            >
              <SealWarning size={24} color="#ef4444" weight="regular" />
            </span>
          )}
        </div>
        <ErrorMessage errorMessage={errorMessage} />
        <HelpText helpText={helpText} />
      </div>
    );
  },
);
Input.displayName = "Input";

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === undefined || errorMessage === null) return null;
  if (errorMessage === " ") return null;

  return (
    <div role="alert" className="mt-1 text-sm text-red-500">
      {errorMessage}
    </div>
  );
};

const HelpText = ({ helpText }) => {
  if (helpText === undefined || helpText === null) return null;
  if (helpText === " ") return null;

  return (
    <div className="mt-1 flex items-center gap-0.5 text-sm leading-tight text-gray-500">
      <Info size={16} weight="bold" />
      {helpText}
    </div>
  );
};

export default Input;
