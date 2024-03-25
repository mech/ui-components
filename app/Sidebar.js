"use client";

import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="border-r p-4">
      <nav>
        <ul className="space-y-2">
          <li className="rounded-md bg-amber-100 p-2">
            <Link href="/" className="inline-flex w-full">
              Home
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2">
            <Link href="/users" className="inline-flex w-full">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
