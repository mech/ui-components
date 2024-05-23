import { Client, fetchExchange } from "urql";
import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = cookies();

  console.log(cookieStore);

  const res = await request.json();

  const query = res.query;
  const variables = res.variables;

  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    fetchOptions: {
      credentials: "include",
      headers: {
        "X-Next-Version": "Next v15.1",
      },
    },
    exchanges: [fetchExchange],
  });

  const result = await client.query(query, variables);
  return Response.json(result); // This will work with Client's URQL

  // return Response.json({ result });
}
