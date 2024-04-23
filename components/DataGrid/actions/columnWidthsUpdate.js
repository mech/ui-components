"use server";

import { gqlMutation } from "@/lib/gqlMutation";
import { revalidatePath } from "next/cache";

const MUTATION = `
  mutation PersonalTableColumnUpdate($columnWidths: [Int!], $columnNames: [String!]) {
    personalTableColumnUpdate(columnWidths: $columnWidths, columnNames: $columnNames) {
      record {
        id
      }
    }
  }
`;

export async function columnWidthsUpdate({ columnWidths, columnNames }) {
  const outcome = await gqlMutation(MUTATION, {
    columnWidths,
    columnNames,
  });

  // Must revalidatePath to clear Router Cache so whatever visited page can clear the columnWidths cache
  revalidatePath("/dbusers");

  // Optional
  return outcome;
}
