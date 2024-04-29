import ClientUsersTable from "@/app/(workspace)/fetch-examples/ClientUsersTable";
import UrqlProvider from "@/app/(workspace)/fetch-examples/UrqlProvider";

export default function Page({ searchParams }) {
  // const QUERY = `
  //   query FindUsers($page: Int!) {
  //     users(page: $page) {
  //       id
  //       name
  //       email
  //       status
  //       createdAt
  //     }
  //   }
  // `;
  //
  // const res = await fetch("http://192.168.1.235:3000/api/graphql", {
  //   method: "POST",
  //   cache: "no-cache",
  //   body: JSON.stringify({ query: QUERY, variables: { page: 1 } }),
  // });
  //
  // const outcome = await res.json();

  return (
    <div className="space-y-4 rounded-lg bg-gray-100 p-4">
      <h1 className="font-bold">Fetch Page</h1>

      <UrqlProvider>
        <ClientUsersTable />
      </UrqlProvider>

      {/*<pre>{JSON.stringify(outcome, null, 2)}</pre>*/}
    </div>
  );
}
