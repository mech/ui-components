import Link from "next/link";

export default async function UserDetailsPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      <h1>Showing details</h1>

      <pre>{JSON.stringify(searchParams, null, 2)}</pre>

      <Link href={`/dbusers/1?page=${currentPage + 1}`}>Next</Link>
    </div>
  );
}
