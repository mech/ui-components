"use client";

import "@blueprintjs/table/lib/css/table.css";
import {
  Cell,
  Column,
  Table2,
  Utils,
  Regions,
  RegionCardinality,
} from "@blueprintjs/table";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HotkeysProvider } from "@blueprintjs/core";
import { useSearchParams } from "next/navigation";

const NameColumn = ({ rowIndex, data }) => {
  return (
    <div className="flex flex-col gap-0">
      <span className="text-base">{data[rowIndex]?.name}</span>
      <span className="text-sm text-gray-500">{data[rowIndex]?.email}</span>
    </div>
  );
};
const EmailColumn = ({ rowIndex, data }) => {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-base">{data[rowIndex]?.email}</span>
    </div>
  );
};
const COLUMNS = {
  Name: NameColumn,
  Email: EmailColumn,
};

const getCellRenderer = (name, data) => (rowIndex) => {
  const Tag = COLUMNS[name];

  return (
    <Cell>
      <Tag rowIndex={rowIndex} data={data} />
    </Cell>
  );
};

const tableColumns = [
  { columnName: "Name", columnWidth: 500 },
  { columnName: "Email", columnWidth: 200 },
];

const Table = ({ users }) => {
  // console.log(users.map((u) => u.name));
  const tableRef = useRef(null);
  const searchParams = useSearchParams();
  const [selection, setSelection] = useState([]);
  const columnsState = tableColumns.map((column) => {
    return (
      <Column
        key={column.columnName}
        name={column.columnName}
        cellRenderer={getCellRenderer(column.columnName, users)}
      />
    );
  });
  const [columns, setColumns] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);

  const deps = JSON.stringify(users.map((u) => u.id));

  useEffect(() => {
    setColumns(
      tableColumns.map((column) => (
        <Column
          key={column.columnName}
          name={column.columnName}
          cellRenderer={getCellRenderer(column.columnName, users)}
        />
      )),
    );

    setColumnWidths(tableColumns.map((column) => column.columnWidth));
  }, [deps]);

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

  const handleColumnsReordered = (oldIndex, newIndex, length) => {
    if (oldIndex === newIndex) return;

    const nextColumns = Utils.reorderArray(columns, oldIndex, newIndex, length);
    const nextColumnWidths = Utils.reorderArray(
      columnWidths,
      oldIndex,
      newIndex,
      length,
    );

    setColumns(nextColumns);
    setColumnWidths(nextColumnWidths);
  };

  const currentPage = Number(searchParams.get("page")) || 1;

  // useEffect(() => {
  //   console.log(tableRef.current);
  //   tableRef.current?.clearSelection([Regions.cell(2, 1)]);
  // }, [currentPage]);

  return (
    <HotkeysProvider>
      <Table2
        enableGhostCells={true}
        forceRerenderOnSelectionChange={true}
        ref={tableRef}
        numRows={25}
        columnWidths={columnWidths}
        onColumnWidthChanged={(whichIndex, width) => {
          setColumnWidths((prev) => {
            const next = [...prev];
            next[whichIndex] = width;
            return next;
          });
        }}
        selectionModes={[]}
        // selectionModes={[RegionCardinality.FULL_ROWS, RegionCardinality.CELLS]}
        // selectedRegions={[Regions.cell(2, 1)]}
        enableColumnReordering={true}
        onColumnsReordered={handleColumnsReordered}
        cellRendererDependencies={[columnWidths, deps]}
        enableMultipleSelection={true}
        enableFocusedCell={true}
        onSelection={(a) => {
          const selected = a.map((s) => s.rows).filter(Boolean);

          const finalSelection = selected.map((s) => {
            if (s[0] === s[1]) {
              // Meaning only one cell is selected, so return that cell
              return users[s[0]];
            } else {
              return users.slice(s[0], s[1] + 1);
            }
          });

          setSelection(finalSelection.flat());
        }}
      >
        {columns}
      </Table2>
      <pre>
        {new Intl.ListFormat("en").format(
          selection.filter(Boolean).map((s) => s.name),
        )}
      </pre>
    </HotkeysProvider>
  );
};

export default Table;
