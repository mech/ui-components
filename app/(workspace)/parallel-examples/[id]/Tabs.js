"use client";

import {
  DatabaseBackup,
  MessageSquareDashed,
  Shapes,
  Sparkles,
} from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { startTransition } from "react";

export default function Tabs() {
  const searchParams = useSearchParams();
  const params = useParams();

  const id = params.id;

  // const visitUrl = (tabName) => {
  //   const params = new URLSearchParams(searchParams);
  //   const url = `/parallel-examples/${id}/${tabName}?${params.toString()}`;
  //
  //   startTransition(() => {
  //     push(url);
  //   });
  // };

  return (
    <ul className="no-scrollbar flex cursor-pointer select-none flex-nowrap items-center gap-0 overflow-y-hidden overflow-x-scroll overscroll-contain border-y">
      <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
        <div className="flex items-center gap-1">
          <MessageSquareDashed className="shrink-0" />
          <Link
            href={`/parallel-examples/${id}/unread?${searchParams.toString()}`}
          >
            Unread
          </Link>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r px-4 py-2 shadow-inner transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
        <div className="flex flex-nowrap items-center gap-1">
          <Sparkles className="shrink-0" />
          <Link
            href={`/parallel-examples/${id}/ai-assistant?${searchParams.toString()}`}
          >
            AI Assistant
          </Link>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
        <div className="flex items-center gap-1">
          <Shapes className="shrink-0" />
          <span className="flex-none">More Options...</span>
        </div>
      </li>
      <li className="rounded-mds flex-none border-r px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800">
        <div className="flex items-center gap-1">
          <DatabaseBackup className="shrink-0" />
          <span className="flex-none">Data Insights</span>
        </div>
      </li>
    </ul>
  );
}
