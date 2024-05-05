import cn from "@/lib/cn";

export default function FormCol({ children, className }) {
  const classNames = cn(
    "flex flex-wrap items-start gap-4 sm:flex-nowrap",
    className,
  );

  return <div className={classNames}>{children}</div>;
}
