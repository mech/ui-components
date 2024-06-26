"use server";

import { Client, fetchExchange } from "urql";
import { unstable_cache as cache } from "next/dist/server/web/spec-extension/unstable-cache";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

async function getUsers({ page }) {
  noStore();

  // const cookieStore = cookies();
  // console.log(cookieStore);

  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [fetchExchange],
  });

  const QUERY = `
    query FindUsers($page: Int!) {
      users(page: $page) {
        id
        name
        email
        status
        createdAt
      }
    }
  `;

  // const result = await client.query(QUERY, { page });
  // return result.data.users;

  return client.query(QUERY, { page });
}

// const getUsers = cache(getUncachedUsers, ["users"], {
//   tags: ["users"],
// });

export { getUsers };
