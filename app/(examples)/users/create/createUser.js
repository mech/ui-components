import { Client, fetchExchange } from "urql";

async function createUsers() {
  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  const MUTATION = `
    mutation USER_CREATE($name: String!, $email: String!) {
      userCreate(name: $name, email: $email) {
        user {
          id
          name
          email
          status
        }
      }
    }
  `;

  const result = await client.mutation(MUTATION, {
    name: "John Doe",
    email: "john-1@example.com",
  });

  return result.data.users;
}

export { createUsers };
