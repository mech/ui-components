"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RefreshUserButton from "@/app/(examples)/users/RefreshUserButton";
import cn from "@/lib/cn";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import Button from "@/components/Button";
import { ChevronDown } from "lucide-react";
import { Sun } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="border-r p-4">
      <nav>
        <ul className="space-y-2">
          <li className="rounded-md bg-amber-100 p-2 dark:bg-amber-800 dark:text-amber-200">
            <Link
              href="/"
              className={cn("inline-flex w-full", {
                "font-bold": pathname === "/",
              })}
            >
              Home
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2 dark:bg-amber-800 dark:text-amber-200">
            <Link
              href="/dashboard"
              className={cn("inline-flex w-full", {
                "font-bold": pathname === "/dashboard",
              })}
            >
              Dashboard
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2 dark:bg-amber-800 dark:text-amber-200">
            <Link
              href="/users"
              className={cn("inline-flex w-full", {
                "font-bold": pathname.startsWith("/dbusers"),
              })}
            >
              Users
            </Link>
          </li>
          <li className="rounded-md bg-amber-100 p-2 dark:bg-amber-800 dark:text-amber-200">
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
          <li>
            <ThemeToggleMenu />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const ThemeToggleMenu = () => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onPointerDown={(e) => e.preventDefault()}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Button variant="secondary" outline prefix={<Sun size={24} />} />
      </DropdownMenuTrigger>

      <DropdownMenuContent loop>
        <DropdownMenuItem>
          <button
            type="button"
            className="w-full text-justify"
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            type="button"
            className="w-full text-justify"
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sidebar;
