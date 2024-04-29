"use client";

import { getUsers } from "@/app/(examples)/users/getUsers";
import { getTableColumns } from "@/app/(workspace)/dbusers/getTableColumns";
import { DataGrid } from "@/components/DataGrid";
import DataGridTable from "@/components/DataGrid/DataGridTable";

import Pagination from "@/components/Pagination2";
import TextColumn from "@/components/DataGrid/TextColumn";
import EmailColumn from "@/components/DataGrid/EmailColumn";
import TimestampColumn from "@/components/DataGrid/TimestampColumn";

import CustomColumnsDialog from "@/app/(workspace)/dbusers/CustomColumnsDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "urql";

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

const GET_USERS_QUERY = `
    query FindUsers($page: Int!) {
      users(page: $page) {
        id
        name
        email
        status
        createdAt
      }
      
      tableColumns {
        name
        tableColumns {
          columnName
          columnWidth
          propertyName
          visible
        }
      }
    }
  `;

export default function ClientUsersTable() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const random = searchParams.get("random");
  // const [user, setUser] = useState([]);
  // const [tableColumns, setTableColumns] = useState([]);
  // const [configUpdating, setConfigUpdating] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   fetch("http://192.168.1.235:3000/api/graphql", {
  //     method: "POST",
  //     cache: "no-cache",
  //     body: JSON.stringify({
  //       query: GET_USERS_QUERY,
  //       variables: { page: currentPage },
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.result.data.users);
  //       setTableColumns(data.result.data.tableColumns.tableColumns);
  //     });
  // }, [currentPage, random]);

  // reexecuteQuery
  const [result] = useQuery({
    query: GET_USERS_QUERY,
    variables: { page: currentPage, random },
    requestPolicy: "network-only",
  });

  // useEffect(() => {
  //   if (random) {
  //     console.log("Refetching!!!");
  //     reexecuteQuery();
  //   }
  // }, [random, reexecuteQuery]);

  const { data, fetching } = result;

  const users = data?.users || [];
  const tableColumns = data?.tableColumns.tableColumns || [];

  // return null;

  const mergedColumns = mergeColumns(defaultTableColumns, tableColumns);

  return (
    <DataGrid.Root className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <Pagination currentPage={currentPage} totalPages={9800} />
        <CustomColumnsDialog tableColumns={mergedColumns} />
      </div>

      <DataGrid.Content
        className="space-y-4 data-[fetching=true]:opacity-50"
        data-fetching={fetching}
      >
        <DataGridTable
          data={users}
          tableColumns={mergedColumns.filter((c) => c.visible)}
          components={mapper}
        />
      </DataGrid.Content>
    </DataGrid.Root>
  );
}
