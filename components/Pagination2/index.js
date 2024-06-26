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
  // const [pending, startTransition] = useTransition();

  // Allow UI to update quicker even if server is not yet done

  const { push } = useRouter();

  const getPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageParamName, page);
    params.delete("random");
    // params.delete("pick");

    return `${pathname}?${params.toString()}`;
  };

  const moveToPage = (page) => {
    if (onChange) {
      onChange(page);
    } else {
      push(getPageUrl(page));
    }

    // startTransition(() => {
    //   // setOptimisticPage(page);
    //
    //   if (onChange) {
    //     onChange(page);
    //   } else {
    //     push(getPageUrl(page));
    //   }
    // });
  };

  const dataPending = (pending) => {
    return pending ? "" : undefined;
  };

  return (
    <div className="flex gap-1">
      <PrevButton
        onClick={() => moveToPage(currentPage - 1)}
        currentPage={currentPage}
      />

      {pagingCells(totalPages, currentPage, maxCells).map(
        ({ nr, ellipsis }) => {
          const active = nr === currentPage;
          const classNames = cn(
            "min-w-[30px] focus:border-gray-500 focus-visible:border-gray-500",
            {
              "border-gray-500": active,
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
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={() => moveToPage(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
