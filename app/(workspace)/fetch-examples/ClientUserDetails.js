"use client";

import { IdentificationBadge } from "@phosphor-icons/react/dist/ssr";
import {
  InfoIcon,
  MessageSquareDashed,
  Sparkles,
  Shapes,
  DatabaseBackup,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "urql";
import RaceBy from "@/components/RaceBy";

const QUERY = `
    query FindUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
        status
        createdAt
      }
    }
  `;

export default function ClientUserDetails() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("pick"));
  // const [user, setUser] = useState(null);

  const [result] = useQuery({
    query: QUERY,
    variables: { id: id },
  });

  const { data, fetching } = result;
  const user = data?.user;

  console.log(user?.name);

  // useEffect(() => {
  //   fetch("http://192.168.1.235:3000/api/graphql", {
  //     method: "POST",
  //     cache: "no-cache",
  //     body: JSON.stringify({
  //       query: QUERY,
  //       variables: { id: id },
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data.data.user);
  //       // setUser(data.result.data.user);
  //     });
  // }, [id]);

  if (fetching && user === undefined) {
    return <div className="grid h-full place-content-center">Loading...</div>;
  }

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 flex items-center justify-center ${fetching ? "block" : "hidden"}`}
      >
        <div className="z-50 w-[100px] rounded-full border bg-gray-100 p-4 shadow-2xl">
          <RaceBy />
        </div>
      </div>

      <div
        className="space-y-4 p-4 data-[fetching=true]:opacity-20"
        data-fetching={fetching}
      >
        <h1 className="flex items-center gap-2 text-lg font-semibold leading-tight">
          <IdentificationBadge weight="fill" size={32} className="shrink-0" />{" "}
          {user.name}
        </h1>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">ID</span>
            <span className="truncate">{user.id}</span>
          </div>
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">Name</span>
            <strong className="truncate">{user.name}</strong>
          </div>
          <div className="flex items-center justify-between gap-8 py-2">
            <span className="text-gray-500">Email</span>
            <a href={`mailto:${user.email}`} className="truncate text-blue-700">
              {user.email}
            </a>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="flex items-center gap-1 truncate text-gray-500">
              Status
              <InfoIcon size={18} />
            </span>
            <span>{user.status}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">Created</span>
            <span className="truncate">{user.createdAt}</span>
          </div>
        </div>

        <ul className="no-scrollbar flex items-center gap-8 overflow-y-hidden overflow-x-scroll overscroll-contain border-b pb-1">
          <li>
            <div className="flex flex-col items-center">
              Tab 1<span className="h-1 w-3/5 rounded-full bg-blue-500"></span>
            </div>
          </li>
          <li>Tab 2</li>
          <li>Tab 3</li>
        </ul>

        <p className="rounded-lg bg-gray-50 p-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          architecto assumenda at atque dicta ea error excepturi, facere fugit
          id impedit in iste, minus molestias necessitatibus repellat suscipit,
          velit voluptatem.
        </p>

        <ul className="no-scrollbar -mx-4 flex cursor-pointer select-none flex-nowrap items-center gap-0 overflow-y-hidden overflow-x-scroll overscroll-contain border-y border-gray-300">
          <li className="rounded-mds flex-none border-r border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100">
            <div className="flex items-center gap-1">
              <MessageSquareDashed className="shrink-0" />
              <span className="flex-none">Unread</span>
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
      </div>
    </div>
  );
}
