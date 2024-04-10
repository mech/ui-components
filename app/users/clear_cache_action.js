"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export async function clearTag(tag) {
  revalidateTag(tag);
}

export async function clearPath(path) {
  revalidatePath(path);
}
