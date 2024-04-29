import UserPage from "@/app/(workspace)/dbusers/UserPage";
import UserDetails from "@/app/(workspace)/dbusers2/UserDetails";
import PanelContainer from "@/app/(workspace)/dbusers2/PanelContainer";
import { Suspense } from "react";
import Users from "@/app/(workspace)/dbusers2/Users";
import Pagination from "@/components/Pagination2";
import { getUsers } from "@/app/(examples)/users/getUsers";
import { getUser } from "@/app/(workspace)/dbusers2/getUser";
import ClientUsersTable from "@/app/(workspace)/fetch-examples/ClientUsersTable";
import ClientUserDetails from "@/app/(workspace)/fetch-examples/ClientUserDetails";
import {
  ArrowDownUp,
  Filter,
  ListFilter,
  TableProperties,
  Braces,
  Search,
} from "lucide-react";
import { ColumnsPlusRight } from "@phosphor-icons/react/dist/ssr";
import Input from "@/components/Input";

export default function Page({ searchParams }) {
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

  // return <ClientUsersTable />;

  // return (
  //   <PanelContainer
  //     master={<ClientUsersTable />}
  //     details={<UserDetails searchParams={searchParams} />}
  //   />
  // );

  return (
    <>
      <div className="flex items-center justify-between gap-8 border-b px-4 py-2">
        <Input
          prefix={<Search size={16} />}
          prefixStyling={false}
          placeholder="Cmd+K"
          wrapperClassName="focus-within:ring-0 focus-within:border-transparent border-transparent rounded-full bg-gray-100 w-[200px] focus-within:w-full transition-all duration-300"
        />

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <Braces size={16} />
            <span>Operations</span>
          </div>
          <div className="flex items-center gap-1">
            <TableProperties size={16} />
            <span>Fields</span>
          </div>
          <div className="flex items-center gap-1">
            <Filter size={16} />
            <span>Filter</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDownUp size={16} />
            <span>Sort</span>
          </div>
        </div>
      </div>

      <PanelContainer
        master={<UserPage searchParams={searchParams} />}
        details={<ClientUserDetails />}
      />
    </>
  );
}
