"use server";

import { userSchema } from "@/zod_schema/userSchema";

export async function submit(prevState, formData) {
  const data = Object.fromEntries(formData);
  const parsed = userSchema.safeParse(data);

  if (parsed.success) {
    const outcome = "okay";
    console.log(outcome);
  } else {
    const outcome = {
      ...prevState,
      error: parsed.error.issues,
    };
    console.log(outcome);
  }
}
