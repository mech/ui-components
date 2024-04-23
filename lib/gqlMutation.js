import { Client, fetchExchange } from "urql";

export async function gqlMutation(MUTATION, variables) {
  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  // Must "return"
  return await client.mutation(MUTATION, variables);
}
