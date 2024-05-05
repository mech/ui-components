import cn from "@/lib/cn";

const Card = ({ children, className, ...props }) => {
  const classNames = cn(
    "border-card-border rounded-2xl border bg-card p-4 text-card-foreground",
    className,
  );

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};

export default Card;
