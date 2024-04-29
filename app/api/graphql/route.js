import { Client, fetchExchange } from "urql";

export async function POST(request) {
  const res = await request.json();

  const query = res.query;
  const variables = res.variables;

  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  const result = await client.query(query, variables);
  return Response.json(result); // This will work with Client's URQL

  // return Response.json({ result });
}
