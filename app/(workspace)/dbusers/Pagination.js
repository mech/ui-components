"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Pagination() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const getPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page) => {
    startTransition(() => {
      push(getPageUrl(page));
    });
  };

  const dataPending = (pending) => {
    return pending ? "" : undefined;
  };

  return (
    <div
      className="mb-4 flex gap-2 border-b"
      data-pending={dataPending(pending)}
    >
      <button onClick={() => handlePageChange(1)}>Page 1</button>
      <button onClick={() => handlePageChange(2)}>Page 2</button>
      <button onClick={() => handlePageChange(3)}>Page 3</button>
      <button onClick={() => handlePageChange(4)}>Page 4</button>
      <button onClick={() => handlePageChange(5)}>Page 5</button>
      <button onClick={() => handlePageChange(6)}>Page 6</button>
      <button onClick={() => handlePageChange(134)}>Page 134</button>
      <button onClick={() => handlePageChange(135)}>Page 135</button>
    </div>
  );
}
