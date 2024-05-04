"use client";

import {
  DatabaseBackup,
  MessageSquareDashed,
  Shapes,
  Sparkles,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Tabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  console.log(`${pathname}/unread?${searchParams.toString()}`);

  return (
    <ul className="no-scrollbar flex cursor-pointer select-none flex-nowrap items-center gap-0 overflow-y-hidden overflow-x-scroll overscroll-contain border-y border-gray-300">
      <li className="rounded-mds flex-none border-r border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-1">
          <MessageSquareDashed className="shrink-0" />
          <Link
            href={`${pathname}/unread?${searchParams.toString()}`}
            className="flex-none"
          >
            Unread
          </Link>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r border-gray-300 bg-gray-100 px-4 py-2 shadow-inner transition-colors">
        <div className="flex flex-nowrap items-center gap-1">
          <Sparkles className="shrink-0" />
          <span className="flex-none">AI Assistant</span>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-1">
          <Shapes className="shrink-0" />
          <span className="flex-none">More Options...</span>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-1">
          <DatabaseBackup className="shrink-0" />
          <span className="flex-none">Data Insights</span>
        </div>
      </li>
    </ul>
  );
}
