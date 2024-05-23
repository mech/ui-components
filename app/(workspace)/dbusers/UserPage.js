import { getUsers } from "@/app/(examples)/users/getUsers";
import { getTableColumns } from "@/app/(workspace)/dbusers/getTableColumns";
import { DataGrid } from "@/components/DataGrid";
import DataGridTable from "@/components/DataGrid/DataGridTable";

import Pagination from "@/components/Pagination";
import TextColumn from "@/components/DataGrid/TextColumn";
import EmailColumn from "@/components/DataGrid/EmailColumn";
import TimestampColumn from "@/components/DataGrid/TimestampColumn";

import CustomColumnsDialog from "@/app/(workspace)/dbusers/CustomColumnsDialog";
import ServerComponentTest from "@/app/(examples)/users/ServerComponentTest";

import { ChevronRightIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const defaultTableColumns = [
  {
    columnName: "ID",
    columnWidth: 100,
    propertyName: "id",
    visible: true,
  },
  {
    columnName: "Name",
    columnWidth: 500,
    propertyName: "name",
    visible: true,
  },
  {
    columnName: "Email",
    columnWidth: 280,
    propertyName: "email",
    visible: true,
  },
  {
    columnName: "Created At",
    columnWidth: 100,
    propertyName: "createdAt",
    visible: false,
  },
];

const mapper = {
  Name: TextColumn,
  Email: EmailColumn,
  "Created At": TimestampColumn,
};

const mergeColumns = (defaultTableColumns, tableColumns) => {
  const missingDefaultColumns = [];

  defaultTableColumns.forEach((column) => {
    const tableColumn = tableColumns.find(
      (tc) => tc.columnName === column.columnName,
    );

    if (!tableColumn) {
      missingDefaultColumns.push(column);
    }
  });

  return [...tableColumns, ...missingDefaultColumns];
};

export default async function UserPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;

  // https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
  // const [users, { tableColumns }] = await Promise.all([
  //   getUsers({ page: currentPage }),
  //   getTableColumns(),
  // ]);

  const res = await getUsers({ page: currentPage });
  const users = res.data.users;
  const { tableColumns } = await getTableColumns();

  const mergedColumns = mergeColumns(defaultTableColumns, tableColumns);

  return (
    <DataGrid.Root className="space-y-4 p-4">
      {/*<ServerComponentTest />*/}

      <div className="flex items-center gap-2">
        <strong>Organizations</strong>
        <ChevronRightIcon size={18} />
        <span>Create &amp; Manage Views</span>
      </div>

      <div className="flex items-center justify-between">
        <Pagination currentPage={currentPage} totalPages={9800} />
        <CustomColumnsDialog tableColumns={mergedColumns} />
      </div>

      <DataGrid.Content className="space-y-4">
        <DataGridTable
          data={users}
          tableColumns={mergedColumns.filter((c) => c.visible)}
          components={mapper}
        />

        {/*<Table users={users} />*/}

        {/*<strong>{JSON.stringify(tableColumns, null, 2)}</strong>*/}
      </DataGrid.Content>
    </DataGrid.Root>
  );
}

// const tableColumns = {
//   Name: {
//     columnWidth: 500,
//     propertyName: "name",
//     component: TextColumn,
//   },
//   Email: {
//     columnWidth: 280,
//     propertyName: "email",
//     component: EmailColumn,
//   },
// };
