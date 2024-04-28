import Pagination from "@/components/Pagination";
import Link from "next/link";
import { headers } from "next/headers";

export default function DefaultPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;
  const header = headers();
  const pathname = header.get("next-url");

  return (
    <div>
      <h1>Current Page: {currentPage}</h1>

      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
      <pre>{JSON.stringify(header, null, 2)}</pre>

      <Link href={`/dbusers/1?page=${currentPage + 1}`}>Next</Link>

      {/*<Pagination currentPage={currentPage} totalPages={9800} />*/}
    </div>
  );
}
