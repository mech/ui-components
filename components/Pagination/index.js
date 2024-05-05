"use client";

import Button from "@/components/Button";
import pagingCells from "@/components/Pagination/pagingCells";
import cn from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const PrevButton = ({ onClick, currentPage }) => {
  return (
    <Button
      variant="plainIcon"
      onClick={onClick}
      prefix={<ChevronLeft strokeWidth={1.5} />}
      disabled={currentPage === 1}
      aria-label="Previous Page"
      className="min-w-[30px] bg-secondary"
    />
  );
};

const NextButton = ({ onClick, currentPage, totalPages }) => {
  return (
    <Button
      variant="plainIcon"
      onClick={onClick}
      prefix={<ChevronRight strokeWidth={1.5} />}
      disabled={currentPage >= totalPages}
      aria-label="Next Page"
      className="min-w-[30px] bg-secondary"
    />
  );
};

const Pagination = ({
  currentPage = 1,
  totalPages,
  onChange,
  pageParamName = "page",
  maxCells = 9,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  // Allow UI to update quicker even if server is not yet done
  const [optimisticPage, setOptimisticPage] = useOptimistic(currentPage);

  const { push } = useRouter();

  const getPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageParamName, page);
    // params.delete("pick");
    params.delete("random");

    return `${pathname}?${params.toString()}`;
  };

  const moveToPage = (page) => {
    startTransition(() => {
      setOptimisticPage(page);

      if (onChange) {
        onChange(page);
      } else {
        push(getPageUrl(page));
      }
    });
  };

  const dataPending = (pending) => {
    return pending ? "" : undefined;
  };

  return (
    <div className="flex gap-1" data-pending={dataPending(pending)}>
      <PrevButton
        onClick={() => moveToPage(optimisticPage - 1)}
        currentPage={optimisticPage}
      />

      {pagingCells(totalPages, optimisticPage, maxCells).map(
        ({ nr, ellipsis }) => {
          const active = nr === optimisticPage;
          const classNames = cn(
            "min-w-[30px]",
            "dark:hover:enabled:border-transparent dark:hover:enabled:bg-neutral-200 dark:hover:enabled:text-black",
            {
              "border-gray-500 dark:border-transparent dark:bg-neutral-200 dark:text-black":
                active,
            },
          );

          return (
            <Button
              key={nr}
              className={classNames}
              variant="secondary"
              size="sm"
              disabled={ellipsis}
              onClick={() => moveToPage(nr)}
            >
              {!ellipsis && nr}
              {ellipsis && "..."}
            </Button>
          );
        },
      )}

      <NextButton
        currentPage={optimisticPage}
        totalPages={totalPages}
        onClick={() => moveToPage(optimisticPage + 1)}
      />
    </div>
  );
};

export default Pagination;
