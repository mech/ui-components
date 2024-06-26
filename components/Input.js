"use client";

import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import cn from "@/lib/cn";
import { Info, SealWarning } from "@phosphor-icons/react";
import { useController } from "react-hook-form";
import { useMergeRefs } from "@floating-ui/react";

// Using focus-within to style inner input
// group and group-focus-within

const variants = cva([], {
  variants: {
    size: {
      sm: ["px-2 py-1 text-sm"],
      md: ["p-1.5 text-base"], // p-[0.3125rem]
      lg: ["p-2 text-lg"],
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
      prefix,
      suffix,
      prefixStyling = true,
      suffixStyling = true,
      className,
      wrapperClassName,
      name,
      rules,
      defaultValue = "", // Need this to be empty string to prevent error on controlled/uncontrolled switching
      ...props
    },
    ref,
  ) => {
    const { field, fieldState } = useController({ name, rules, defaultValue });
    const id = `input-${useId()}`;
    const mergeRefs = useMergeRefs([field.ref, ref]);
    const errors = fieldState.error;
    const hasError = !!errors;
    const errorMessage = errors?.message;

    const labelClassNames = cn(
      "absolute -top-3 left-2 bg-dialog px-1 text-sm text-foreground",
      {
        "text-input-error": hasError,
        "-top-2.5 text-xs": size === "sm",
      },
    );

    const prefixSuffixClassNames =
      "flex items-center border-input text-black group-focus-within:border-input-focus group-data-[invalid=true]:border-input-error";

    return (
      <div
        data-control="input"
        className={cn("w-full", {
          "opacity-50": props.disabled,
        })}
      >
        <div
          data-invalid={hasError}
          className={cn(
            "group relative flex w-full rounded-md border border-input text-black transition ease-in-out file:border-0 file:bg-transparent",
            "focus-within:border-input-focus focus-within:text-input-ring focus-within:ring-4 focus-within:ring-input-ring focus-within:ring-opacity-30 focus:outline-none",
            "data-[invalid=true]:border-input-error data-[invalid=true]:ring-4 data-[invalid=true]:ring-input-error data-[invalid=true]:ring-opacity-30",
            wrapperClassName,
          )}
        >
          <label htmlFor={id} className={labelClassNames}>
            {label}
          </label>
          <input
            id={id}
            type={type}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            data-invalid={hasError}
            className={cn(
              variants({ size }),
              "order-2 w-full appearance-none rounded-md bg-transparent text-foreground outline-none disabled:cursor-not-allowed data-[invalid=true]:text-red-500",
              "dark:data-[invalid=true]:text-red-300",
              {
                "pl-2": prefix,
                "pr-2": suffix,
                "pl-1": !prefixStyling,
                "pr-1": !suffixStyling,
              },
              className,
            )}
            {...field}
            {...props}
            ref={mergeRefs}
          />
          {prefix && (
            <span
              className={cn(
                prefixSuffixClassNames,
                "order-1 rounded-l-md text-foreground",
                {
                  "border-r px-2": prefixStyling,
                  "pl-2": !prefixStyling,
                },
              )}
            >
              {prefix}
            </span>
          )}

          {suffix && !hasError && (
            <span
              className={cn(
                prefixSuffixClassNames,
                "order-3 rounded-r-md text-foreground",
                {
                  "border-l px-2": suffixStyling,
                  "pr-2": !suffixStyling,
                },
              )}
            >
              {suffix}
            </span>
          )}

          {hasError && (
            <span
              className={cn(
                prefixSuffixClassNames,
                "order-3 rounded-r-md px-2",
              )}
            >
              <SealWarning
                size={24}
                weight="regular"
                className="text-input-error"
              />
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
    <div role="alert" className="mt-1 text-sm text-input-error">
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
