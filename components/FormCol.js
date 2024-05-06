import cn from "@/lib/cn";
import { Children } from "react";

export default function FormCol({ children, className }) {
  const cols = Children.toArray(children);
  const colsCount = Children.count(cols);
  if (colsCount === 0) return null;

  const classNames = cn(
    "grid w-full grid-cols-1 items-start gap-4",
    "data-[cols='1']:sm:grid-cols-1",
    "data-[cols='2']:sm:grid-cols-2",
    "data-[cols='3']:sm:grid-cols-3",
    "data-[cols='4']:sm:grid-cols-4",
    "data-[cols='5']:sm:grid-cols-5",
    "data-[cols='6']:sm:grid-cols-6",
    "data-[cols='7']:sm:grid-cols-7",
    "data-[cols='8']:sm:grid-cols-8",
    "data-[cols='9']:sm:grid-cols-9",
    "data-[cols='10']:sm:grid-cols-10",
    className,
  );

  // `repeat(${rowsCount}, minmax(0, 1fr))`

  // const styles = {
  //   "--grid-cols": `repeat(${rowsCount}, minmax(0, 1fr))`,
  //   gridTemplateColumns: "var(--grid-cols)",
  // };

  return (
    <div className={classNames} data-cols={colsCount}>
      {children}
    </div>
  );
}
