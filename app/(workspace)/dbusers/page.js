import { getUsers } from "@/app/(examples)/users/getUsers";
import Table from "@/app/(workspace)/dbusers/Table";
import Pagination from "@/app/(workspace)/dbusers/Pagination";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function UserPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const users = await getUsers({ page: currentPage });

  // key={users[0].id}

  return (
    <div className="group p-4">
      <Pagination />

      <div className="group-has-[[data-pending]]:opacity-50">
        <Table users={users} />
      </div>
    </div>
  );
}
