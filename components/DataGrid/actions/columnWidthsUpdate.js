"use server";

import { gqlMutation } from "@/lib/gqlMutation";
import { revalidatePath, revalidateTag } from "next/cache";

const MUTATION = `
  mutation PersonalTableColumnUpdate($columnWidths: [Int!], $columnNames: [String!], $tableColumns: [TableColumnInput!]) {
    personalTableColumnUpdate(columnWidths: $columnWidths, columnNames: $columnNames, tableColumns: $tableColumns) {
      record {
        id
      }
    }
  }
`;

export async function columnWidthsUpdate({
  columnWidths,
  columnNames,
  tableColumns,
}) {
  const outcome = await gqlMutation(MUTATION, {
    columnWidths,
    columnNames,
    tableColumns,
  });

  // Must revalidatePath to clear Router Cache so whatever visited page can clear the columnWidths cache
  revalidatePath("/dbusers");
  revalidateTag("table-columns");

  // Optional
  return outcome;
}
