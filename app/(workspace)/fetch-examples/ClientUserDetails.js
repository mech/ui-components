"use client";

import { IdentificationBadge } from "@phosphor-icons/react/dist/ssr";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "urql";

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

  return (
    user && (
      <div
        className="space-y-4 p-4 data-[fetching=true]:opacity-50"
        data-fetching={fetching}
      >
        <h1 className="flex items-center gap-2 text-lg font-semibold leading-tight">
          <IdentificationBadge weight="fill" size={32} className="shrink-0" />{" "}
          {user.name}
        </h1>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">ID</span>
            <span>{user.id}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">Name</span>
            <strong>{user.name}</strong>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">Email</span>
            <a href={`mailto:${user.email}`} className="text-blue-700">
              {user.email}
            </a>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="flex items-center gap-1 text-gray-500">
              Status
              <InfoIcon size={18} />
            </span>
            <span>{user.status}</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2">
            <span className="text-gray-500">Created</span>
            {user.createdAt}
          </div>
        </div>
      </div>
    )
  );
}
