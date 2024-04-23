import cn from "@/lib/cn";

const DataGrid = ({ children, className }) => {
  return <div className={cn("group", className)}>{children}</div>;
};

const DataGridContent = ({ children, className }) => {
  return (
    <div className={cn("group-has-[[data-pending]]:opacity-50", className)}>
      {children}
    </div>
  );
};

DataGrid.Root = DataGrid;
DataGrid.Content = DataGridContent;

export { DataGrid };
