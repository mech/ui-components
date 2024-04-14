"use server";

import { userSchema } from "@/zod_schema/userSchema";
import { redirect } from "next/navigation";
// import { createUsers } from "@/app/users/create/createUser";
import { gqlMutation } from "@/lib/gqlMutation";

const MUTATION = `
    mutation USER_CREATE($name: String!, $email: String!, $attachment: Upload) {
      userCreate(name: $name, email: $email, attachment: $attachment) {
        user {
          id
          name
          email
          status
        }
      }
    }
  `;

export async function submit(prevState, formData) {
  const data = Object.fromEntries(formData);
  const parsed = userSchema.safeParse(data);

  console.log(data);
  console.log(parsed);

  if (parsed.success) {
    const outcome = "okay";
    console.log(outcome);
    // createUsers();

    await gqlMutation(MUTATION, {
      name: parsed.data.name,
      email: parsed.data.email,
      attachment: data.attachment,
    });

    redirect("/users");
  } else {
    const outcome = {
      ...prevState,
      error: parsed.error.issues,
    };
    console.log(outcome);
  }
}
