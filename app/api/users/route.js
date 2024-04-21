// Route handler with a GET that do not read anything from incoming
// request like query parameters, cookies, headers, etc. will be cached
// during build time and served as static JSON file unless we use this!
// export const dynamic = "force-dynamic";

import { faker } from "@faker-js/faker";
import { setTimeout } from "timers/promises";
import { Client, fetchExchange } from "urql";
import { revalidateTag } from "next/cache";
import { unstable_cache as cache } from "next/cache";

async function getUsers() {
  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  const QUERY = `
    query {
      users {
        id
        name
        email
      }
    }
  `;

  return await client.query(QUERY);
}

const getCachedUsers = cache(getUsers, ["users"], {
  tags: ["users"],
});

// POST will not be cached!
export async function POST(req) {
  // const dbusers = Array.from({ length: 5 }, () => ({
  //   id: faker.string.uuid(),
  //   name: faker.internet.userName(),
  //   email: faker.internet.email(),
  // }));

  // Sleep for 5 seconds
  // await create Promise((resolve) => setTimeout(resolve, 5000));
  // await setTimeout(500);

  // const client = create Client({
  //   url: "http://192.168.1.235:8000/graphql",
  //   exchanges: [fetchExchange],
  // });
  //
  // const QUERY = `
  //   query {
  //     dbusers {
  //       id
  //       name
  //       email
  //     }
  //   }
  // `;
  //
  // const result = await client.query(QUERY);

  const result = await getCachedUsers();

  // revalidateTag("dbusers");

  return Response.json(result.data.users);
}
