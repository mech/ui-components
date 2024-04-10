"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submit } from "@/app/users/create/action";
import { useFormState } from "react-dom";
import { useRef } from "react";

import { userSchema } from "@/zod_schema/userSchema";
// On server-side, we can use:
// const parsed = userSchema.safeParse(data);
// parsed.success
// parsed.error
// parsed.data

export default function Page() {
  const formRef = useRef();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const [state, formAction] = useFormState(submit, {});

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    console.log(data);

    await submit(data);
  };

  return (
    <div className="p-4">
      <form
        ref={formRef}
        className="space-y-4"
        action={formAction}
        onSubmit={handleSubmit(() => formRef?.current?.submit())}
        // onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Name"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Email"
          name="email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />

        <Button>Add</Button>
      </form>
    </div>
  );
}
