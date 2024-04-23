import { Client, fetchExchange } from "urql";
import { unstable_noStore as noStore } from "next/dist/server/web/spec-extension/unstable-no-store";

async function getTableColumns() {
  noStore();

  const client = new Client({
    url: "http://192.168.1.235:8000/graphql",
    exchanges: [fetchExchange],
  });

  const QUERY = `
    query FindTableColumns {
      tableColumns {
        name
        tableColumns {
          columnName
          columnWidth
          propertyName
        }
      }
    }
  `;

  const result = await client.query(QUERY);

  return result.data.tableColumns;
}

export { getTableColumns };
