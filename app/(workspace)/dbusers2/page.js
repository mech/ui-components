import UserPage from "@/app/(workspace)/dbusers/UserPage";
import UserDetails from "@/app/(workspace)/dbusers2/UserDetails";
import PanelContainer from "@/app/(workspace)/dbusers2/PanelContainer";
import { Suspense } from "react";
import Users from "@/app/(workspace)/dbusers2/Users";
import Pagination from "@/components/Pagination2";
import { getUsers } from "@/app/(examples)/users/getUsers";
import { getUser } from "@/app/(workspace)/dbusers2/getUser";

export default async function Page({ searchParams }) {
  // const currentPage = Number(searchParams?.page) || 1;
  // const users = await getUsers({ page: currentPage });

  // return (
  //   <div className="space-y-4 p-4">
  //     <Pagination currentPage={currentPage} totalPages={9800} />
  //
  //     <Suspense fallback="Loading users...">
  //       <Users searchParams={searchParams} />
  //     </Suspense>
  //
  //     <Suspense fallback="Loading details...">
  //       <UserDetails searchParams={searchParams} />
  //     </Suspense>
  //   </div>
  // );

  return (
    <PanelContainer
      master={<UserPage searchParams={searchParams} />}
      details={<UserDetails searchParams={searchParams} />}
    />
  );
}
