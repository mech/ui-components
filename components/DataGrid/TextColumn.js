"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useTransition } from "react";
import { PendingContext } from "@/app/(workspace)/dbusers2/PendingContext";

const complianceMask = (input) => {
  // Take input and return series of random "*" characters
  // Make the length random so can't be guessed
  // But must be at least 3 characters long
  const length = Math.floor(Math.random() * 10) + 3;
  return "*".repeat(length);
};

const TextColumn = ({ rowIndex, data, propertyName }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [pending, startTransition] = useTransition();
  // const { setIsPanelPending } = useContext(PendingContext);

  // useEffect(() => {
  //   setIsPanelPending(pending);
  // }, [pending, setIsPanelPending]);

  if (!data[rowIndex]) return null;

  const getPageUrl = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      const id = data[rowIndex]["id"];

      // params.set("pick", id);
      // const url = `${pathname}?${params.toString()}`;

      const url = `/parallel-examples/${id}?${params.toString()}`;

      push(url);
    });
  };

  return (
    <span className="text-base">
      <button type="button" onClick={getPageUrl}>
        {data[rowIndex][propertyName]}
      </button>
    </span>
  );
};

export default TextColumn;
