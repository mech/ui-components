"use client";

import { use } from "react";

export default function UserDetails({ userPromise }) {
  // delay for 1 second
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = use(userPromise);

  const { data } = result;
  const user = data?.user;

  return (
    <div>
      <strong>{user?.name}</strong>
    </div>
  );
}
