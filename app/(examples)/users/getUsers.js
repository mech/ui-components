import { Client, fetchExchange } from "urql";
import { unstable_cache as cache } from "next/dist/server/web/spec-extension/unstable-cache";

async function getUncachedUsers() {
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
        status
      }
    }
  `;

  const result = await client.query(QUERY);

  return result.data.users;
}

const getUsers = cache(getUncachedUsers, ["users"], {
  tags: ["users"],
});

export { getUsers };
