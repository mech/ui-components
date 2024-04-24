import { getUsers } from "@/app/(examples)/users/getUsers";
import { getTableColumns } from "@/app/(workspace)/dbusers/getTableColumns";
import Table from "@/app/(workspace)/dbusers/Table";
import { DataGrid } from "@/components/DataGrid";
import DataGridTable from "@/components/DataGrid/DataGridTable";

import Pagination from "@/components/Pagination";
import TextColumn from "@/components/DataGrid/TextColumn";
import EmailColumn from "@/components/DataGrid/EmailColumn";

import CustomColumnsDialog from "@/app/(workspace)/dbusers/CustomColumnsDialog";

export const dynamic = "force-dynamic";

const tableColumns_1 = [
  {
    columnName: "Name",
    columnWidth: 500,
    propertyName: "name",
    display: true,
  },
  {
    columnName: "Email",
    columnWidth: 280,
    propertyName: "email",
    display: true,
  },
];

const mapper = {
  Name: TextColumn,
  Email: EmailColumn,
};

export default async function UserPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;

  // https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
  const [users, { tableColumns }] = await Promise.all([
    getUsers({ page: currentPage }),
    getTableColumns(),
  ]);

  console.log(tableColumns);

  // const users = await getUsers({ page: currentPage });
  // const { tableColumns } = await getTableColumns();

  return (
    <DataGrid.Root className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Pagination currentPage={currentPage} totalPages={9800} />
        <CustomColumnsDialog tableColumns={tableColumns} />
      </div>

      <DataGrid.Content className="space-y-4">
        <DataGridTable
          data={users}
          tableColumns={tableColumns}
          components={mapper}
        />

        {/*<Table users={users} />*/}

        <strong>{JSON.stringify(tableColumns, null, 2)}</strong>
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
