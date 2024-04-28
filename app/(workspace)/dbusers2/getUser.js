import { Client, fetchExchange } from "urql";
import { unstable_noStore as noStore } from "next/cache";

async function getUser({ id }) {
  noStore();

  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

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

  // const result = await client.query(QUERY, { id });
  // return result.data.user;

  return client.query(QUERY, { id });
}

export { getUser };
