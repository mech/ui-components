"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import "@blueprintjs/table/lib/css/table.css";
import {
  Cell,
  Column,
  Table2,
  Utils,
  Regions,
  RegionCardinality,
  RenderMode,
} from "@blueprintjs/table";
import { columnWidthsUpdate } from "@/components/DataGrid/actions/columnWidthsUpdate";

const EmptyDiv = () => <div className="hidden"></div>;

// const tableColumns = [
//   {columnName: "Name", columnWidth: 500, propertyName: "name", component: TextColumn}
// ];

const getCellRenderer = (column, data, component) => (rowIndex) => {
  const Tag = component;

  return (
    <Cell>
      <Tag rowIndex={rowIndex} data={data} propertyName={column.propertyName} />
    </Cell>
  );
};

const DataGridTable = ({ data, tableColumns, components, numRows = 25 }) => {
  const tableRef = useRef(null);
  const [columns, setColumns] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);

  // In case user want to use a different deps than relying on ID
  // const effectDeps = deps ? deps : JSON.stringify(data.map((u) => u.id));

  useEffect(() => {
    setColumns(
      tableColumns.map((column) => (
        <Column
          key={column.columnName}
          name={column.columnName}
          cellRenderer={getCellRenderer(
            column,
            data,
            components[column.columnName],
          )}
        />
      )),
    );

    setColumnWidths(tableColumns.map((column) => column.columnWidth));
  }, [components, data, tableColumns]);

  useLayoutEffect(() => {
    // Prevent this warning from showing:
    // blueprint Table resize method called while component is unmounted, this is a no-op.
    let isMounted = true;
    setTimeout(() => {
      if (!isMounted) return;
      tableRef.current?.resizeRowsByTallestCell();
    }, 0);

    return () => {
      isMounted = false;
    };
  }, []);

  // Must async due to Server Action
  const handleColumnsReordered = async (oldIndex, newIndex, length) => {
    if (oldIndex === newIndex) return;

    const nextColumns = Utils.reorderArray(columns, oldIndex, newIndex, length);
    const nextColumnWidths = Utils.reorderArray(
      columnWidths,
      oldIndex,
      newIndex,
      length,
    );

    setColumns(nextColumns);
    // Might not need this when we re-order and saved to DB and let it re-query again
    setColumnWidths(nextColumnWidths);

    // Set up a startTransition here to show a Toast notifying column is being re-ordered
    await columnWidthsUpdate({ columnNames: nextColumns.map((c) => c.key) });
  };

  // Must async due to Server Action
  const handleColumnWidthChanged = async (whichIndex, width) => {
    const next = [...columnWidths];
    next[whichIndex] = width;

    setColumnWidths(next);
    await columnWidthsUpdate({ columnWidths: next });

    // Below will hit with this error:
    // DataGridTable.js:103 Warning: Cannot update a component (`Router`) while rendering a different component (`DataGridTable`). To locate the bad setState() call inside `DataGridTable`, follow the stack trace as described in

    // setColumnWidths((prev) => {
    //   const next = [...prev];
    //   next[whichIndex] = width;
    //
    //   const outcome = columnWidthsUpdate(next);
    //   console.log(outcome);
    //
    //   return next;
    // });
  };

  const columnNames = columns.map((c) => c.key);

  return (
    <HotkeysProvider renderDialog={() => <EmptyDiv />}>
      <div className="space-y-4">
        <Table2
          ref={tableRef}
          numRows={numRows}
          columnWidths={columnWidths}
          cellRendererDependencies={[columnWidths, data, tableColumns]}
          selectionModes={[
            RegionCardinality.FULL_ROWS,
            RegionCardinality.CELLS,
          ]}
          enableGhostCells={true}
          enableFocusedCell={true}
          enableColumnReordering={true}
          onColumnsReordered={handleColumnsReordered}
          renderMode={RenderMode.NONE}
          onColumnWidthChanged={handleColumnWidthChanged}
        >
          {columns}
        </Table2>

        <div className="space-y-2">
          <div>
            <strong>{JSON.stringify(columnWidths, null, 2)}</strong>
          </div>

          <div>
            <strong>{JSON.stringify(columnNames, null, 2)}</strong>
          </div>
        </div>
      </div>
    </HotkeysProvider>
  );
};

export default DataGridTable;
