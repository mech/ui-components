import { Suspense } from "react";
import UserDetails from "@/app/(workspace)/stream-examples/UserDetails";
import Pager from "@/app/(workspace)/stream-examples/Pager";
import { Client, fetchExchange } from "urql";
import { unstable_noStore as noStore } from "next/cache";
import UsersTable from "@/app/(workspace)/stream-examples/UsersTable";
import Pagination from "@/components/Pagination";

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

// Telling Next that it needs to re-run (re-validate) the output of this page
// with every request. This is useful for pages that are updated frequently.
export const revalidate = 0;

export default async function Page({ searchParams }) {
  // noStore();

  const currentPage = Number(searchParams?.page) || 1;
  const id = Number(searchParams?.id) || 9338;
  const userPromise = getUserPromise(id);

  return (
    <div className="space-y-4 p-4">
      <h1>Streaming Example</h1>

      <Pager />

      <Pagination currentPage={currentPage} totalPages={9000} />

      <Suspense fallback={<div>Loading table...</div>}>
        <UsersTable currentPage={currentPage} />
      </Suspense>

      <Suspense
        key={id + currentPage}
        fallback={
          <Skeleton className="h-[1.25rem] w-[30ch]">Loading...</Skeleton>
        }
      >
        <UserDetails id={9338} userPromise={userPromise} />
      </Suspense>
    </div>
  );
}

function Skeleton({ className }) {
  return (
    <div
      className={`rounded bg-slate-200 motion-safe:animate-pulse ${className}`}
    />
  );
}

function getUserPromise(id) {
  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  return client.query(QUERY, { id }).toPromise();
}
