import "@blueprintjs/table/lib/css/table.css";
import { HotkeysProvider } from "@blueprintjs/core";
import {
  Cell,
  Column,
  ColumnHeaderCell2,
  Table2,
  SelectionModes,
  Utils,
} from "@blueprintjs/table";
import { faker } from "@faker-js/faker";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { TextAa } from "@phosphor-icons/react";
import { Checkbox } from "@/components/Checkbox";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button";

function generateData() {
  // return Array.from({ length: 5 }, () => ({
  //   name: faker.internet.userName(),
  //   email: faker.internet.email(),
  // }));

  return [
    { name: "Dovie.Haley-Bogisich", email: "Gabrielle.Beahan@gmail.com" },
    { name: "Laurine86", email: "Amely_Simonis24@gmail.com" },
    { name: "Veda80", email: "Fern_Bode75@hotmail.com" },
    { name: "Roberto_Kreiger", email: "Adrianna.Ledner84@gmail.com" },
    { name: "Maudie37", email: "Trever.Russel83@hotmail.com" },
    { name: "Faye.Von", email: "Glenna71@hotmail.com" },
    { name: "Claudie_Altenwerth", email: "Alan.Goldner21@yahoo.com" },
    { name: "Ellis_OConner45", email: "Cordia78@gmail.com" },
    { name: "Sophia.Jones87", email: "Norwood21@gmail.com" },
  ];
}

function renderColumnHeader(index) {
  const name = ["Name", "Email"][index];
  return (
    <ColumnHeaderCell2 name={name} index={index} nameRenderer={renderName} />
  );
}

function renderName(name) {
  return (
    <div className="flex h-[30px] w-full flex-col justify-center">
      <div className="flex justify-between gap-0">
        <div className="flex items-center gap-1">
          <IDIcon />
          <div className="text-sm font-semibold">{name}</div>
        </div>
        <ChevronUp size="16" />
      </div>
    </div>
  );
}

// Column re-ordering example: https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/table-examples/tableReorderableExample.tsx

// Do not use <Cell> for this reusable cell renderer
const NameColumn = ({ rowIndex, data }) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <Checkbox name={`cb-${rowIndex}`} />

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-400 text-white">
        AWS
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold">{data[rowIndex].name}</span>
        {rowIndex === 4 && <span>Extra line!</span>}
        <div
          // href={`mailto:${data[rowIndex].email}`}
          className="font-mono text-sm text-gray-500"
        >
          {data[rowIndex].email}
        </div>
      </div>
    </div>
  );
};
const EmailColumn = ({ rowIndex, data }) => {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-sm text-orange-500">
        {data[rowIndex].email}
      </span>
    </div>
  );
};
const ActionColumn = ({ rowIndex, data }) => {
  return (
    <div className="flex items-center justify-center py-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => console.log("Action...")}
      >
        Click me
      </Button>
    </div>
  );
};

const COLUMNS = {
  Name: NameColumn,
  Email: EmailColumn,
  Action: ActionColumn,
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
  { columnName: "Action", columnWidth: 120 },
];

console.log(tableColumns);

const TableTest = () => {
  const [selection, setSelection] = useState([]);
  const DATA = generateData();
  const tableRef = useRef(null);
  const columnsState = tableColumns.map((column) => {
    return (
      <Column
        key={column.columnName}
        name={column.columnName}
        cellRenderer={getCellRenderer(column.columnName, DATA)}
      />
    );
  });

  const [columns, setColumns] = useState(columnsState);
  const [columnWidths, setColumnWidths] = useState(
    tableColumns.map((c) => c.columnWidth),
  );

  const methods = useForm();
  const { register } = methods;

  useLayoutEffect(() => {
    // Prevent this warning from showing:
    // blueprint Table resize method called while component is unmounted, this is a no-op.
    let isMounted = true;
    setTimeout(() => {
      if (!isMounted) return;
      tableRef.current?.resizeRowsByTallestCell();
    }, 1);

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

  return (
    <HotkeysProvider>
      <FormProvider {...methods}>
        <Table2
          // selectionModes={SelectionModes.ROWS_ONLY}
          ref={tableRef}
          numRows={columns.length}
          enableFocusedCell={true}
          enableMultipleSelection={true}
          columnWidths={columnWidths}
          onColumnWidthChanged={(whichIndex, width) => {
            setColumnWidths((prev) => {
              const next = [...prev];
              next[whichIndex] = width;
              return next;
            });
          }}
          enableColumnReordering={true}
          onSelection={(a) => {
            // We filter out the undefined values if you select header cells
            const selected = a.map((s) => s.rows).filter(Boolean);

            // selected will return an array of 2-dim arrays
            // [
            //   [2, 2],
            //   [5, 5],
            //   [6, 6],
            // ];

            // setSelection(selected.map((s) => DATA.slice(s[0], s[1])));

            const finalSelection = selected.map((s) => {
              if (s[0] === s[1]) {
                // Meaning only one cell is selected, so return that cell
                return DATA[s[0]];
              } else {
                return DATA.slice(s[0], s[1] + 1);
              }
            });

            setSelection(finalSelection.flat());
          }}
          onColumnsReordered={handleColumnsReordered}
          cellRendererDependencies={columnWidths}
        >
          {columns}
        </Table2>

        <div>
          {/*<pre>{JSON.stringify(selection, null, 2)}</pre>*/}
          <pre>{JSON.stringify(columnWidths, null, 2)}</pre>
          <pre>
            {new Intl.ListFormat("en").format(selection.map((s) => s.name))}
          </pre>
        </div>
      </FormProvider>
    </HotkeysProvider>
  );
};

const TextIcon = ({ color = "#6D7278" }) => (
  <svg width="15" height="13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.427 2.01h12.578a.78.78 0 1 0 0-1.558H1.427a.779.779 0 1 0 0 1.559Zm0 3.385h7.191c.43 0 .78-.342.78-.78a.775.775 0 0 0-.78-.78H1.427c-.43 0-.78.343-.78.78 0 .438.35.78.78.78Zm0 3.383h12.578a.78.78 0 1 0 0-1.559H1.427a.779.779 0 1 0 0 1.56Zm0 3.39h7.191a.78.78 0 0 0 .78-.785c0-.43-.35-.78-.78-.78H1.427c-.43 0-.78.35-.78.78a.78.78 0 0 0 .78.786Z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);

const IDIcon = ({ color = "#6D7278" }) => (
  <svg width="18" height="11" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.823 10.383c.677 0 1.053-.308 1.238-1.019l.417-1.285h3.37l.417 1.285c.184.711.56 1.019 1.237 1.019.745 0 1.23-.451 1.23-1.135 0-.273-.04-.492-.136-.766L7.189 1.667C6.87.73 6.232.287 5.18.287c-.99 0-1.613.45-1.934 1.373L.777 8.585c-.082.246-.13.485-.13.697 0 .677.452 1.1 1.176 1.1ZM3.99 6.295l1.176-3.8h.048l1.176 3.8h-2.4Zm9.229 4.108c.93 0 1.818-.471 2.221-1.264h.041v.403c.035.567.404.861.964.861.588 0 .978-.328.978-.977V5.283c0-1.47-1.217-2.454-3.124-2.454-1.559 0-2.714.554-3.056 1.45-.068.15-.096.286-.096.444 0 .437.329.738.834.738.342 0 .602-.123.814-.37.43-.6.82-.82 1.422-.82.745 0 1.237.417 1.237 1.135v.479l-1.846.102c-1.859.11-2.878.882-2.878 2.208 0 1.313 1.053 2.208 2.489 2.208Zm.622-1.387c-.65 0-1.114-.363-1.114-.93 0-.533.43-.896 1.175-.943l1.552-.103v.574c0 .807-.71 1.402-1.613 1.402Z"
      fill={color}
      fillRule="nonzero"
    />
  </svg>
);

export default TableTest;
