"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RefreshUserButton from "@/app/(examples)/users/RefreshUserButton";
import cn from "@/lib/cn";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="border-r p-4">
      <nav>
        <ul className="space-y-2">
          <li className="rounded-md bg-amber-100 p-2">
            <Link
              href="/"
              className={cn("inline-flex w-full", {
                "font-bold": pathname === "/",
              })}
            >
              Home
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2">
            <Link
              href="/dashboard"
              className={cn("inline-flex w-full", {
                "font-bold": pathname === "/dashboard",
              })}
            >
              Dashboard
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2">
            <Link
              href="/users"
              className={cn("inline-flex w-full", {
                "font-bold": pathname.startsWith("/users"),
              })}
            >
              Users
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2">
            <Link
              href="/server-actions"
              className={cn("inline-flex w-full", {
                "font-bold": pathname === "/server-actions",
              })}
            >
              Server Actions
            </Link>
          </li>
          <li>
            <RefreshUserButton />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
